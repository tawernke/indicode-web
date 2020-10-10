import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

declare const paypal: any;

const Checkout: React.FC = ({}) => {
  const [payPalObject, setPayPal] = useState<any>();

  useEffect(() => {
    setPayPal(paypal);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  if (!payPalObject) return null;
  const PayPalButton = payPalObject?.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  return (
    <>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </>
  );
};

export default Checkout;
