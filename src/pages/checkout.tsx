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
  useEffect(() => {
    if (!loadState.loading && !loadState.loaded) {
      setLoadState({ loading: true, loaded: false });
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=ARucAD_k8ocIac9GMnGoq3Gq0js0gEW1Mi3ivFADN3nUIc_EGFadleyANkFgk--AVwf-8r7FE_-G_rQG`;
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
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {}}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box mt={10} width={1 / 2}>
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
                <DynamicCheckoutWithNoSSR />
              </Form>
            </Box>
          </Flex>
        )}
      </Formik>
    </PageLayout>
  );
};

export default Checkout;
