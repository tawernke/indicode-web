import { Box, Button, Checkbox, Flex, Spinner } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../../../components/InputField";
import { PageLayout } from "../../../../components/PageLayout";
import {
  useProductQuery,
  useUpdateProductMutation,
} from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { useAdminAuth } from "../../../../utils/useAuth";

const EditProduct: React.FC = ({}) => {
  useAdminAuth();
  const router = useRouter();
  const uuid =
    typeof router.query.productId === "string" ? router.query.productId : "";
  const [image, setImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [, updateProduct] = useUpdateProductMutation();
  const [{ data, fetching }] = useProductQuery({ variables: { uuid } });
  if (fetching || !data?.product) return null;
  const {
    name,
    price,
    quantity,
    imageUrl,
    purchaseCode,
    isPublic,
  } = data.product;

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageUploading(true);
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "flur-jewelery");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/da7dkfklm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImage(file.eager[0].secure_url);
      setImageUploading(false);
    }
  };

  return (
    <PageLayout>
      <Formik
        initialValues={{
          name,
          price,
          quantity,
          imageUrl,
          purchaseCode,
          isPublic,
        }}
        onSubmit={async (values) => {
          values.imageUrl = image || imageUrl;
          const { error } = await updateProduct({ input: values, uuid });
          if (!error) router.push("/admin");
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Flex mt={20}>
              <Box width={1 / 3}>
                {values.imageUrl ? (
                  <img src={imageUrl} />
                ) : (
                  <label htmlFor="file">
                    Image
                    <img
                      width="200"
                      src={image || "/image-placeholder.png"}
                      alt="Upload Preview"
                    />
                    {imageUploading && (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    )}
                    <input
                      type="file"
                      id="file"
                      name="file"
                      placeholder="Upload an image"
                      required
                      onChange={uploadFile}
                    />
                  </label>
                )}
              </Box>
              <Box width={1 / 2} pl={10}>
                <Box mt={4}>
                  <InputField
                    name="name"
                    placeholder="Product Name"
                    label="Product name"
                    type="text"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="price"
                    placeholder="Price"
                    label="Price"
                    type="number"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="purchaseCode"
                    placeholder="Unique purchase code"
                    label="Unique purchase code"
                    type="text"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="quantity"
                    placeholder="Quantity"
                    label="Quantity"
                    type="number"
                    value={values.quantity}
                  />
                </Box>
                <Box>
                  <Checkbox
                    name="isPublic"
                    isChecked={values.isPublic}
                    value={values.isPublic ? 1 : 0}
                    onChange={() => setFieldValue("isPublic", !values.isPublic)}
                  >
                    Make product public
                  </Checkbox>
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="teal"
                >
                  Update Product
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default withUrqlClient(createUrqlClient)(EditProduct);
