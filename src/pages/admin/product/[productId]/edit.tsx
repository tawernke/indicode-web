import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { InputField } from '../../../../components/InputField';
import {
  useProductQuery,
  useUpdateProductMutation,
} from '../../../../generated/graphql';
import Image from 'next/image';

const EditProduct: React.FC = () => {
  const router = useRouter();
  const uuid =
    typeof router.query.productId === 'string' ? router.query.productId : '';
  const [image, setImage] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const [updateProduct] = useUpdateProductMutation();
  const { data, loading } = useProductQuery({ variables: { uuid } });
  if (loading || !data?.product) return null;
  const { name, price, quantity, imageUrl, isPublic } = data.product;

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageUploading(true);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'flur-jewelery');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/da7dkfklm/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      const file = await res.json();
      setImage(file.eager[0].secure_url);
      setImageUploading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name,
        price,
        quantity,
        imageUrl,
        isPublic,
      }}
      onSubmit={async (values) => {
        values.imageUrl = image || imageUrl;
        const { errors } = await updateProduct({
          variables: { input: values, uuid },
        });
        if (!errors) router.push('/admin');
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <Flex flexDirection={['column', 'row']} my={[10, 20]}>
            <Box width={['50%']}>
              {values.imageUrl ? (
                <Image width="100%" 
                  height="100%"
                  layout='responsive'
                  objectFit='contain' 
                  src={imageUrl} 
                  alt={name} 
                />
              ) : (
                <label htmlFor="file">
                  <Image
                    width="100%" 
                    height="100%"
                    layout='responsive'
                    objectFit='contain'
                    src={image || '/image-placeholder.png'}
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
            <Box width={['100%', '50%']} pl={[0, 10]}>
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
                  mt={4}
                  name="isPublic"
                  isChecked={values.isPublic}
                  value={values.isPublic ? 1 : 0}
                  onChange={() => setFieldValue('isPublic', !values.isPublic)}
                >
                    Make product public
                </Checkbox>
              </Box>
              <Flex mt={4} justifyContent="space-between">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                    Update Product
                </Button>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  aria-label="Delete Product"
                  onClick={async () => {
                    await updateProduct({
                      variables: {
                        input: { ...values, deleted: true },
                        uuid,
                      },
                    });
                    router.push('/admin');
                  }}
                />
              </Flex>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default EditProduct;
