import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Detail</h1>
      <p>Product ID: {id}</p>
      <p>Product detail page content will be implemented here.</p>
    </div>
  );
};

export default ProductDetailPage;
