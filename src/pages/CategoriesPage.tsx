import React from "react";
import Categories from "../components/sections/Categories";

const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <main className="pt-16">
        <Categories />
      </main>
    </div>
  );
};

export default CategoriesPage;
