import { Suspense } from "react";
import ProductDetailPage from "./ProductDetailPage";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailPage productId={params.id} />
    </Suspense>
  );
}
