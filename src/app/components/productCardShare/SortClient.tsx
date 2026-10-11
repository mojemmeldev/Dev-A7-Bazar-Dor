"use client";

import { useState } from "react";
import { TProduct } from "../TypescriptShare";

export default function ProductList({
  products = [],
}: {
  products?: TProduct[];
}) {
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
    <section className="w-full space-y-4">

      {/* Sort Dropdown */}
      <div className="flex flex-col gap-2 rounded-2xl border border-base-200 bg-base-100 p-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:p-4">

        <label
          htmlFor="price-sort"
          className="text-[13px] font-medium text-base-content/60 sm:text-sm"
        >
          সাজানো
        </label>

        <select
          id="price-sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered select-sm w-full rounded-lg text-[13px] sm:w-[190px] sm:text-sm"
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

      {/* Product Count */}
      <p className="text-[11px] text-base-content/60 sm:text-xs">
        মোট{" "}
        {sortedProducts.length.toLocaleString("bn-BD")}{" "}
        টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">

        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="card h-full w-full rounded-xl border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl"
          >

            <div className="card-body p-3 sm:p-4 md:p-5">

              {/* Product Info */}
              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-200 text-xl sm:h-11 sm:w-11 sm:text-2xl">
                  {product.image || "🍚"}
                </div>

                <div className="min-w-0 flex-1">

                  <h3 className="break-words text-sm font-bold leading-5 sm:text-base">
                    {product.nameBn}
                  </h3>

                  <p className="mt-0.5 text-[11px] text-base-content/60 sm:text-xs">
                    প্রতি কেজি
                  </p>

                </div>

              </div>

              {/* Price Info */}
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <p className="text-[11px] text-base-content/60 sm:text-xs">
                    আজকের দাম
                  </p>

                  <p className="mt-1 text-base font-bold sm:text-lg">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                <span
                  className={`badge badge-sm w-fit shrink-0 ${
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