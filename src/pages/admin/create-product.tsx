import { Box, Button, Checkbox, Flex, Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../../components/InputField";
import { PageLayout } from "../../components/PageLayout";
import { useCreateProductMutation } from "../../generated/graphql";
import { useAdminAuth } from "../../utils/useAuth";

const cloudinaryId = process.env.NEXT_PUBLIC_CLOUDINARY_ID;

const CreateProduct: React.FC = ({}) => {
  useAdminAuth();
  const [createProduct] = useCreateProductMutation();
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
        `https://api.cloudinary.com/v1_1/${cloudinaryId}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
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
        validationSchema={CreateProductSchema}
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
            <Flex my={[10, 20]} flexDirection={["column", "row"]}>
              <Box width={["100%", "50%"]}>
                <label htmlFor="file">
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
                  <Box mt={4}>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      placeholder="Upload an image"
                      onChange={uploadFile}
                    />
                  </Box>
                </label>
              </Box>
              <Box width={["100%", "50%"]}>
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
                <Box mt={4}>
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
                  colorScheme="teal"
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
  price: Yup.number().moreThan(0).required(),
  quantity: Yup.number().required(),
  isPublic: Yup.boolean().required(),
});

export default CreateProduct;
