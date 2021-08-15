import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

interface Values {
  newPassword: string;
}

const ChangePassword = () => {
  const [changePassowrd] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  const submitHandler = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const token = router.query.token;
    const response = await changePassowrd({
      variables: {
        newPassword: values.newPassword,
        token: typeof token === "string" ? token : "",
      },
    });
    if (response.data?.changePassword.errors) {
      const errorMap = toErrorMap(response.data.changePassword.errors);
      if ("token" in errorMap) {
        setTokenError(errorMap.token);
      }
      setErrors(errorMap);
    } else if (response.data?.changePassword.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={(values, actions) => submitHandler(values, actions)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newpassword"
                placeholder="New Password"
                label="New Password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}{" "}
                </Box>
                <NextLink href="forgot-password">
                  <Link>Go to forgot password again</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;
