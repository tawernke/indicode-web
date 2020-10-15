import { Box, Flex, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { PageLayout } from "../components/PageLayout";

const DynamicCheckoutWithNoSSR = dynamic(
  () => import("../components/Checkout"),
  { ssr: false }
);

const Checkout: React.FC = ({}) => {
  const [loadState, setLoadState] = useState({ loading: false, loaded: false });

  //Ensure paypal script is only loaded once
  useEffect(() => {
    if (!loadState.loading && !loadState.loaded) {
      setLoadState({ loading: true, loaded: false });
      const script = document.createElement("script");
      script.src = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;
      script.addEventListener("load", () =>
        setLoadState({ loading: false, loaded: true })
      );
      document.body.appendChild(script);
    }
  }, [loadState]);

  if (!loadState.loaded) return null;

  return (
    <PageLayout variant="regular">
      <Formik
        initialValues={{
          emails: "",
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          country: "",
          zipCode: "",
        }}
        onSubmit={async () => {}}
      >
        {({ values }) => (
          <Flex>
            <Box mt={10} pr={5} width={3 / 5}>
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
                  <InputField
                    name="country"
                    placeholder="Country"
                    type="text"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="zipCode"
                    placeholder="Zip Code"
                    type="text"
                  />
                </Box>
              </Form>
            </Box>
            <DynamicCheckoutWithNoSSR shippingDetails={values} />
          </Flex>
        )}
      </Formik>
    </PageLayout>
  );
};

export default Checkout;
