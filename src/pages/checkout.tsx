import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../components/InputField";
import { PageLayout } from "../components/PageLayout";

const Payment = dynamic(
  () => import("../components/Payment"),
  { ssr: false }
);

export type CheckoutState = "shipping" | "payment" | "orderSaved" | "orderSaveFailed";

const Checkout: React.FC = ({}) => {
  const [view, setView] = useState <CheckoutState>("shipping");
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
        validateOnBlur={false}
        validateOnChange={false}
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
                    <InputField name="zip" placeholder="Zip Code" type="text" />
                  </Box>
                  <Button
                    onClick={async () => {
                      const validationErrors = await validateForm();
                      if (!Object.keys(validationErrors).length) {
                        setView("payment");
                      }
                    }}
                    mt={10}
                  >
                    Continue to Payment
                  </Button>
                </Form>
              </Box>
            )}
            {view === "payment" && (
              <Payment shippingDetails={values} setView={setView} />
            )}
            {view === "orderSaved" && (
              //TODO: Send email to Nadine and to customer
              <Text>
                Your order has been successful and an email has been sent to
                insertEmailAddress with confirmation
              </Text>
            )}
            {view === "orderSaveFailed" && (
              //TODO: Send email to Nadine
              <Text>
                Your payment was processed, but there was an error creating your
                order
              </Text>
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
