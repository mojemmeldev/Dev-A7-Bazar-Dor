
"use client";

import { useState } from "react";

export default function ProductList({ products = [] }) {
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
    <section className="space-y-4">
      {/* Sort dropdown */}
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-200 bg-base-100 p-4">
        <label
          htmlFor="price-sort"
          className="text-sm text-base-content/60"
        >
          সাজানো
        </label>

        <select
          id="price-sort"
          className="select select-bordered select-sm w-36"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম কম থেকে বেশি</option>
          <option value="high-to-low">দাম বেশি থেকে কম</option>
        </select>
      </div>

      {/* Product count */}
      <p className="text-xs text-base-content/60">
        মোট {sortedProducts.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="card border border-base-200 bg-base-100 shadow-sm transition hover:shadow-md"
          >
            <div className="card-body p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-base-200 text-2xl">
                  {product.image || "🍚"}
                </div>

                <div>
                  <h3 className="font-bold">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-base-content/60">
                    প্রতি কেজি
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-base-content/60">
                    আজকের দাম
                  </p>
                  <p className="text-lg font-bold">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                <span
                  className={`badge badge-sm ${
                    product.change?.dir === "up"
                      ? "badge-error"
                      : product.change?.dir === "down"
                        ? "badge-success"
                        : "badge-ghost"
                  }`}
                >
                  {product.change?.dir === "up"
                    ? `▲ ${product.change.pct}%`
                    : product.change?.dir === "down"
                      ? `▼ ${product.change.pct}%`
                      : "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
