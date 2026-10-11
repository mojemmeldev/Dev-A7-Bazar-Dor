"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "../TypescriptShare";

const ProductList = ({
  products = [],
}: {
  products?: TProduct[];
}) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today;
    }

    if (sortOrder === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <section className="w-full">

      {/* Sort Section */}
      <div className="mb-4 flex flex-col gap-2 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] px-3 py-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-4">

        <label
          htmlFor="price-sort"
          className="text-[13px] font-medium text-[#58635a] sm:text-sm"
        >
          সাজানো
        </label>

        <select
          id="price-sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered select-sm w-full rounded-lg border-[#dce5dc] bg-[#fbfdfb] text-[13px] sm:w-auto sm:min-w-[180px] sm:text-sm"
        >
          <option value="default">
            ডিফল্ট
          </option>

          <option value="low-to-high">
            দাম কম থেকে বেশি
          </option>

          <option value="high-to-low">
            দাম বেশি থেকে কম
          </option>
        </select>

      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">

        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            data={product}
          />
        ))}

      </div>

    </section>
  );
};

export default ProductList;