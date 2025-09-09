import { Suspense } from "react";
import ProductsPage from "./ProductsPage";
import ProductsPageSkeleton from "@/components/product/ProductsPageSkeleton";
import ClientOnly from "@/components/ClientOnly";

export default function Products() {
  return (
    <ClientOnly fallback={<ProductsPageSkeleton />}>
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsPage />
      </Suspense>
    </ClientOnly>
  );
}
