import React from "react";

const CheckoutCancelledPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Cancelled</h1>
      <p>
        Your order has been cancelled. You can try again or continue shopping.
      </p>
    </div>
  );
};

export default CheckoutCancelledPage;
