import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Text,
  Flex,
  Image,
} from "@chakra-ui/core";
import Link from "next/link";
import React, { MutableRefObject, useRef } from "react";
import { Product } from "../types/types";

interface AddToCartProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  product: Product;
  quantity: number;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  isOpen,
  onClose,
  product,
  quantity,
}) => {
  const initialRef = useRef() as MutableRefObject<HTMLInputElement>;
  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ADDED TO YOUR CART</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>
          <Flex justifyContent="space-between">
            <Image width={1 / 4} src={product.imageUrl} />
            <Flex width={1 / 3} flexDirection="column">
              <Text pb={1} fontWeight="bold">
                {product.name}
              </Text>
              <Flex pb={1} justifyContent="space-between">
                <Text fontSize="sm" fontWeight="semibold">
                  Quantity
                </Text>
                <Text fontSize="sm">{quantity}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="sm" fontWeight="semibold">
                  Price
                </Text>
                <Text fontSize="sm">£{product.price}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt={6} alignItems="center">
            <Flex pr={10} flexDirection="column" width={2 / 3}>
              <Flex
                pb={3}
                justifyContent="space-between"
                borderBottom="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm">Your cart contains</Text>
                <Text fontSize="sm">2 Items</Text>
              </Flex>
              <Flex
                pt={3}
                justifyContent="space-between"
                borderColor="gray.200"
              >
                <Text fontSize="sm" fontWeight="bold">
                  Subtotal
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  £339.98
                </Text>
              </Flex>
            </Flex>
            <Flex width={1 / 3} flexDirection="column">
              <Link href="/cart">
                <Button variant="outline" mb={4} onClick={onClose}>
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout">
                <Button ref={initialRef} variantColor="blue">
                  Checkout
                </Button>
              </Link>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};