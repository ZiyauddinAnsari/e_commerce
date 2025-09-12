import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HeaderSkeleton from "./components/layout/HeaderSkeleton";
import Footer from "./components/layout/Footer";
import ClientOnly from "./components/ClientOnly";
import CartDrawer from "./components/cart/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import CategoriesPage from "./pages/CategoriesPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelledPage from "./pages/CheckoutCancelledPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <ScrollToTop />
      <ClientOnly fallback={<HeaderSkeleton />}>
        <Header />
      </ClientOnly>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route
            path="/checkout/cancelled"
            element={<CheckoutCancelledPage />}
          />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      <Footer />

      <ClientOnly>
        <CartDrawer />
      </ClientOnly>
    </div>
  );
}

export default App;
