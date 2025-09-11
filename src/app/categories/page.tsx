import Categories from "@/components/sections/Categories";
import Header from "@/components/layout/Header";
import HeaderSkeleton from "@/components/layout/HeaderSkeleton";
import Footer from "@/components/layout/Footer";
import ClientOnly from "@/components/ClientOnly";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <ClientOnly fallback={<HeaderSkeleton />}>
        <Header />
      </ClientOnly>
      <main className="pt-16">
        <Categories />
      </main>
      <Footer />
    </div>
  );
}
