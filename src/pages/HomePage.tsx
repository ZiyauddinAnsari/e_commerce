import React from "react";
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Categories from "@/components/sections/Categories";
import Newsletter from "@/components/sections/Newsletter";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
};

export default HomePage;
