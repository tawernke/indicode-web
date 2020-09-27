import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreateProductMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { NavBar } from "../components/Navbar";

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const [, createProduct] = useCreateProductMutation();
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const router = useRouter();

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
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
    }
  };
  return (
    <>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{
            name: "",
            price: 0,
            quantity: 1,
            imageUrl: "",
            purchaseCode: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            values.imageUrl = largeImage;
            await createProduct({ input: values });
            router.push("/all-products");
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={uploadFile}
                />
                {largeImage && (
                  <img width="200" src={largeImage} alt="Upload Preview" />
                )}
              </label>
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
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Add Product
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProduct);
