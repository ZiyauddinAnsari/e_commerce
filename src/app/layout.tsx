import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/wishlist/WishlistDrawer";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern E-Commerce | Premium Shopping Experience",
  description:
    "Discover amazing products with our modern, fast, and secure e-commerce platform. Built with cutting-edge technology for the best shopping experience.",
  keywords: "ecommerce, shopping, online store, products, fashion, electronics",
  authors: [{ name: "E-Commerce Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Modern E-Commerce | Premium Shopping Experience",
    description:
      "Discover amazing products with our modern, fast, and secure e-commerce platform.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <ClientOnly>
            <CartDrawer />
            <WishlistDrawer />
          </ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
