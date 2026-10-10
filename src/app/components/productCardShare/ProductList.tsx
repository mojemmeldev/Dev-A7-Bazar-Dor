
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [] }) => {
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
    <section>
      {/* Sort section */}
      <div className="mb-3 flex items-center justify-end gap-2 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] px-4 py-3">
        <label
          htmlFor="price-sort"
          className="text-sm text-[#58635a]"
        >
          সাজানো
        </label>

        <select
          id="price-sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered select-sm rounded-lg border-[#dce5dc] bg-[#fbfdfb] text-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম কম থেকে বেশি</option>
          <option value="high-to-low">দাম বেশি থেকে কম</option>
        </select>
      </div>

      
      {/* Product cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
