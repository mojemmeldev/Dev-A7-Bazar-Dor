
"use client";

import Link from "next/link";
import React from "react";

const formatPrice = (price) =>
  `${Number(price).toLocaleString("bn-BD")} টাকা`;

const ProductDetailsCard = ({ data }) => {
  if (!data) return null;

  const {
    nameBn,
    categoryNameBn,
    categoryIcon = "🍚",
    unit = "kg",
    image,
    today = 0,
    yesterday = 0,
    lastWeek = 0,
    lastMonth = 0,
    change = {},
    markets = [],
  } = data;


  const getPriceChangeText = (today, yesterday) => {
    const difference = today - yesterday;
    const amount = Math.abs(difference);

    if (difference > 0) {
      return `গতকালের তুলনায় আজ দাম বেড়েছে ${amount} টাকা`;
    }

    if (difference < 0) {
      return `গতকালের তুলনায় আজ দাম কমেছে ${amount} টাকা`;
    }

    return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
  };

  const isUp = change.dir === "up";

  const averageMin = markets.length
    ? markets.reduce((sum, market) => sum + market.min, 0) /
    markets.length
    : 0;

  const averageMax = markets.length
    ? markets.reduce((sum, market) => sum + market.max, 0) /
    markets.length
    : 0;

  const lowestMarket = markets.length
    ? markets.reduce((lowest, market) =>
      market.min < lowest.min ? market : lowest
    )
    : null;

  const highestMarket = markets.length
    ? markets.reduce((highest, market) =>
      market.max > highest.max ? market : highest
    )
    : null;

  return (
    <div className=" container  mx-auto w-full  space-y-4 text-base-content">
      {/* Product header */}

      <div className="breadcrumbs  px-1 pt-10  text-xs text-base-content/60">
        <ul>
          <li>
            <Link href="/" className="transition-colors hover:text-primary" > হোম </Link>
          </li>

          <li>
            <Link href={"/"} className="transition-colors hover:text-primary" > {categoryNameBn} </Link>
          </li>

          <li>
            <span className="font-medium text-base-content"> {nameBn} </span>
          </li>
        </ul>
      </div>


      <div className="card border border-base-200 bg-base-100 shadow-sm">
        <div className="card-body flex flex-row items-center justify-between gap-3 p-4 sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
              {image || categoryIcon}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold sm:text-2xl">
                {nameBn}
              </h2>
              <p className="mt-1 text-sm text-base-content/60">
                {categoryNameBn} · প্রতি {unit === "kg" ? "কেজি" : unit}
              </p>
              <p className="mt-1 text-xs text-base-content/50">
                বাংলাদেশের বাজারদর  {getPriceChangeText(today, yesterday)}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-base-200/70 px-3 py-3 text-right sm:px-5">
            <p className="text-xs text-base-content/60">
              আজকের দাম
            </p>
            <p className="text-2xl font-extrabold sm:text-3xl">
              {today.toLocaleString("bn-BD")}
            </p>
            <p className="text-xs text-base-content/60">টাকা / কেজি</p>

            <div
              className={`mt-1 flex items-center justify-end gap-1 text-xs font-semibold ${isUp ? "text-error" : "text-success"
                }`}
            >
              <span>{isUp ? "▲" : "▼"}</span>
              <span>{change.pct ?? 0}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price comparison */}
      <section className="card border border-base-200 bg-base-100 shadow-sm">
        <div className="card-body p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-bold sm:text-base">
            দামের সংক্ষিপ্তসার
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceCard
              title="গতকালের দাম"
              price={yesterday}
              today={today}
            />
            <PriceCard
              title="গত সপ্তাহের দাম"
              price={lastWeek}
              today={today}
            />
            <PriceCard
              title="গত মাসের দাম"
              price={lastMonth}
              today={today}
            />
          </div>
        </div>
      </section>

      {/* Market averages */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          title="বাজারের গড় সর্বনিম্ন দাম"
          value={formatPrice(Math.round(averageMin))}
          color="text-success"
        />
        <StatCard
          title="বাজারের গড় সর্বোচ্চ দাম"
          value={formatPrice(Math.round(averageMax))}
          color="text-warning"
        />
        <StatCard
          title="বাজারের সংখ্যা"
          value={`${markets.length.toLocaleString("bn-BD")} টি`}
          color="text-info"
        />
      </section>

      {/* Market price table */}
      <section className="card overflow-hidden border border-base-200 bg-base-100 shadow-sm">
        <div className="card-body p-0">
          <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-5 sm:px-5">
            <div>
              <h3 className="text-sm font-bold sm:text-base">
                বাজারভিত্তিক আজকের দাম
              </h3>
              <p className="mt-1 text-xs text-base-content/50">
                বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
              </p>
            </div>

            <span className="badge badge-outline badge-sm">
              {markets.length.toLocaleString("bn-BD")} বাজার
            </span>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra table-sm sm:table-md">
                <thead>
                  <tr className="bg-base-200/60 text-xs sm:text-sm">
                    <th className="whitespace-nowrap">বাজার</th>
                    <th className="whitespace-nowrap">বিভাগ</th>
                    <th className="whitespace-nowrap text-right">
                      সর্বনিম্ন
                    </th>
                    <th className="whitespace-nowrap text-right">
                      সর্বোচ্চ
                    </th>
                    <th className="whitespace-nowrap text-right">
                      পার্থক্য
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr key={`${market.market}-${index}`}>
                      <td className="whitespace-nowrap font-medium">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap text-base-content/70">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap text-right font-semibold text-success">
                        {formatPrice(market.min)}
                      </td>

                      <td className="whitespace-nowrap text-right font-semibold text-warning">
                        {formatPrice(market.max)}
                      </td>

                      <td className="whitespace-nowrap text-right">
                        {formatPrice(market.max - market.min)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-base-content/50">
              কোনো বাজারের তথ্য পাওয়া যায়নি।
            </div>
          )}

          {/* Lowest and highest market */}
          {markets.length > 0 && (
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
              <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                <p className="text-xs text-base-content/60">
                  সর্বনিম্ন দামের বাজার
                </p>
                <p className="mt-1 font-bold">
                  {lowestMarket.market}
                </p>
                <p className="mt-1 text-sm font-semibold text-success">
                  {formatPrice(lowestMarket.min)}
                </p>
              </div>

              <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">
                <p className="text-xs text-base-content/60">
                  সর্বোচ্চ দামের বাজার
                </p>
                <p className="mt-1 font-bold">
                  {highestMarket.market}
                </p>
                <p className="mt-1 text-sm font-semibold text-warning">
                  {formatPrice(highestMarket.max)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

function PriceCard({ title, price, today }) {
  const difference = today - price;
  const increased = difference > 0;

  return (
    <div className="rounded-xl border border-base-200 bg-base-100 p-4 transition hover:border-base-300">
      <p className="text-xs text-base-content/60">{title}</p>

      <p className="mt-2 text-xl font-bold">
        {price.toLocaleString("bn-BD")}{" "}
        <span className="text-xs font-normal text-base-content/60">
          টাকা
        </span>
      </p>

      <p
        className={`mt-1 text-xs ${difference === 0
            ? "text-base-content/50"
            : increased
              ? "text-error"
              : "text-success"
          }`}
      >
        {difference === 0
          ? "আজকের দামের সমান"
          : `${Math.abs(difference).toLocaleString("bn-BD")} টাকা ${increased ? "বেশি" : "কম"
          }`}
      </p>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="card border border-base-200 bg-base-100 shadow-sm">
      <div className="card-body gap-2 p-4">
        <p className="text-xs text-base-content/60">{title}</p>
        <p className={`text-lg font-bold sm:text-xl ${color}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
