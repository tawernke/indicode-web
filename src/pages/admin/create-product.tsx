import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { PageLayout } from "../../components/PageLayout";
import { useCreateProductMutation } from "../../generated/graphql";
import { useAdminAuth } from "../../utils/useAuth";
import * as Yup from "yup";

const CreateProduct: React.FC = ({}) => {
  useAdminAuth();
  const [createProduct] = useCreateProductMutation();
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();

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
      setImage(file.secure_url);
      setLargeImage(file.eager[0].secure_url);
      setImageUploading(false);
    }
  };
  return (
    <PageLayout>
      <Formik
        initialValues={{
          name: "",
          price: 0,
          quantity: 1,
          imageUrl: "",
          isPublic: false,
        }}
        // validationSchema={CreateProductSchema}
        onSubmit={async (values) => {
          values.imageUrl = largeImage;
          const { errors } = await createProduct({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "publicProducts:{}" });
            },
          });
          if (!errors) router.push("/admin");
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Flex mt={20} flexDirection={["column", "row"]}>
              <Box width={["100%", 1 / 2]}>
                <label htmlFor="file">
                  Image
                  <img
                    width="200"
                    src={largeImage || "/image-placeholder.png"}
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
                    onChange={uploadFile}
                  />
                </label>
              </Box>
              <Box width={["100%", 1 / 2]}>
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
                  Add Product
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

const CreateProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  quantity: Yup.number().required(),
  imageUrl: Yup.string().required(),
  isPublic: Yup.boolean().required(),
});

export default CreateProduct;