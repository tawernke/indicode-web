import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../components/InputField";
import { PageLayout } from "../components/PageLayout";
import { useCreateOrderMutation } from "../generated/graphql";
import { useCartItems } from "../utils/useCartItems";

const DynamicCheckoutWithNoSSR = dynamic(
  () => import("../components/Payment"),
  { ssr: false }
);

const Checkout: React.FC = ({}) => {
  const [view, setView] = useState("shipping");
  const [createOrder] = useCreateOrderMutation();
  const {
    cartItems,
    cartData: { cartTotal, cartCount },
  } = useCartItems();
  const orderItems = cartItems.map(({ product, quantity }) => {
    const { name, price } = product
    return {
      productName: name,
      quantity,
      price,
      total: price * quantity
    }
  })
  return (
    <PageLayout variant="regular">
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          city: "",
          country: "",
          zip: "",
        }}
        onSubmit={async () => {}}
        validationSchema={CheckoutSchema}
      >
        {({ values, validateForm }) => (
          <Flex justifyContent="center">
            {view === "shipping" && (
              <Box mt={10} pr={[0, 5]} width={["100%", 3 / 5]}>
                <Form>
                  <Text fontSize="xl">Contact Information</Text>
                  <Box mt={4}>
                    <InputField name="email" placeholder="Email" type="email" />
                  </Box>
                  <Text mt={4} fontSize="xl">
                    Shipping Address
                  </Text>
                  <Box mt={4}>
                    <InputField
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="address"
                      placeholder="Address"
                      type="text"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="address2"
                      placeholder="Address, suite, etc. (optional)"
                      type="text"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField name="city" placeholder="City" type="text" />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="country"
                      placeholder="Country"
                      type="text"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="zip"
                      placeholder="Zip Code"
                      type="text"
                    />
                  </Box>
                  <Button
                    onClick={async () => {
                      const validationErrors = await validateForm();
                      if (!Object.keys(validationErrors).length) {
                        // setView("payment");
                        const { errors } = await createOrder({
                          variables: {
                            orderInput: {
                              ...values,
                              total: cartTotal,
                              totalQuantity: cartCount,
                              orderItems,
                            },
                          },
                        });
                      }
                    }}
                  >
                    Continue to Payment
                  </Button>
                </Form>
              </Box>
            )}
            {view === "payment" && (
              <DynamicCheckoutWithNoSSR shippingDetails={values} />
            )}
          </Flex>
        )}
      </Formik>
    </PageLayout>
  );
};

export default Checkout;

const CheckoutSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  address2: Yup.string(),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
});
