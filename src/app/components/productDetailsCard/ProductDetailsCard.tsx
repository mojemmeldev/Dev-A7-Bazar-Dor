"use client";

import Link from "next/link";
import { TProduct } from "../TypescriptShare";

const formatPrice = (price: number | string) =>
  `${Number(price).toLocaleString("bn-BD")} টাকা`;

type PriceCardProps = {
  title: string;
  price: number;
  today: number;
};

type StatCardProps = {
  title: string;
  value: string;
  color: string;
};

const ProductDetailsCard = ({ data }: { data: TProduct }) => {
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
    change,
    markets = [],
  } = data;

  const getPriceChangeText = (
    today: number,
    yesterday: number
  ) => {
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

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const averageMin = markets.length
    ? markets.reduce(
        (sum, market) => sum + market.min,
        0
      ) / markets.length
    : 0;

  const averageMax = markets.length
    ? markets.reduce(
        (sum, market) => sum + market.max,
        0
      ) / markets.length
    : 0;

  const lowestMarket = markets.length
    ? markets.reduce((lowest, market) =>
        market.min < lowest.min
          ? market
          : lowest
      )
    : null;

  const highestMarket = markets.length
    ? markets.reduce((highest, market) =>
        market.max > highest.max
          ? market
          : highest
      )
    : null;

  return (
    <div className="container mx-auto w-full space-y-4 px-3 pb-8 text-base-content sm:px-4 sm:pb-10 md:px-6 lg:px-8">

      {/* Breadcrumbs */}
      <div className="breadcrumbs overflow-x-auto px-1 pt-5 text-[11px] text-base-content/60 sm:pt-8 sm:text-xs md:pt-10">
        <ul className="whitespace-nowrap">

          <li>
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              হোম
            </Link>
          </li>

          <li>
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              {categoryNameBn}
            </Link>
          </li>

          <li>
            <span className="font-medium text-base-content">
              {nameBn}
            </span>
          </li>

        </ul>
      </div>


      {/* Product Header */}
      <div className="card rounded-xl border border-base-200 bg-base-100 shadow-sm sm:rounded-2xl">

        <div className="card-body flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:gap-5 lg:p-6">

          {/* Product Info */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
              {image || categoryIcon}
            </div>

            <div className="min-w-0 flex-1">

              <h2 className="break-words text-lg font-bold leading-6 sm:text-xl md:text-2xl">
                {nameBn}
              </h2>

              <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
                {categoryNameBn} · প্রতি{" "}
                {unit === "kg" ? "কেজি" : unit}
              </p>

              <p className="mt-1 text-[11px] leading-5 text-base-content/50 sm:text-xs">
                বাংলাদেশের বাজারদর{" "}
                {getPriceChangeText(
                  today,
                  yesterday
                )}
              </p>

            </div>

          </div>


          {/* Today's Price */}
          <div className="w-full rounded-xl bg-base-200/70 px-4 py-3 text-left md:w-auto md:shrink-0 md:px-5 md:text-right">

            <p className="text-[11px] text-base-content/60 sm:text-xs">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-extrabold sm:text-3xl">
              {today.toLocaleString("bn-BD")}
            </p>

            <p className="text-[11px] text-base-content/60 sm:text-xs">
              টাকা / কেজি
            </p>

            <div
              className={`mt-1 flex items-center gap-1 text-xs font-semibold md:justify-end ${
                isUp
                  ? "text-error"
                  : isDown
                    ? "text-success"
                    : "text-base-content/60"
              }`}
            >
              <span>
                {isUp
                  ? "▲"
                  : isDown
                    ? "▼"
                    : "—"}
              </span>

              <span>
                {change?.pct ?? 0}%
              </span>

            </div>

          </div>

        </div>
      </div>


      {/* Price Comparison */}
      <section className="card rounded-xl border border-base-200 bg-base-100 shadow-sm sm:rounded-2xl">

        <div className="card-body p-4 sm:p-5">

          <h3 className="mb-3 text-sm font-bold sm:text-base">
            দামের সংক্ষিপ্তসার
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

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


      {/* Market Averages */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="বাজারের গড় সর্বনিম্ন দাম"
          value={formatPrice(
            Math.round(averageMin)
          )}
          color="text-success"
        />

        <StatCard
          title="বাজারের গড় সর্বোচ্চ দাম"
          value={formatPrice(
            Math.round(averageMax)
          )}
          color="text-warning"
        />

        <StatCard
          title="বাজারের সংখ্যা"
          value={`${markets.length.toLocaleString(
            "bn-BD"
          )} টি`}
          color="text-info"
        />

      </section>


      {/* Market Price Table */}
      <section className="card overflow-hidden rounded-xl border border-base-200 bg-base-100 shadow-sm sm:rounded-2xl">

        <div className="card-body p-0">

          {/* Table Header */}
          <div className="flex flex-col gap-3 px-4 pb-3 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:pt-5">

            <div>
              <h3 className="text-sm font-bold sm:text-base">
                বাজারভিত্তিক আজকের দাম
              </h3>

              <p className="mt-1 text-[11px] text-base-content/50 sm:text-xs">
                বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
              </p>
            </div>

            <span className="badge badge-outline badge-sm w-fit">
              {markets.length.toLocaleString(
                "bn-BD"
              )}{" "}
              বাজার
            </span>

          </div>


          {markets.length > 0 ? (
            <div className="w-full overflow-x-auto">

              <table className="table table-zebra table-sm min-w-[650px] sm:table-md">

                <thead>
                  <tr className="bg-base-200/60 text-[11px] sm:text-sm">

                    <th className="whitespace-nowrap">
                      বাজার
                    </th>

                    <th className="whitespace-nowrap">
                      বিভাগ
                    </th>

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

                  {markets.map(
                    (market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                      >

                        <td className="whitespace-nowrap font-medium">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap text-base-content/70">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap text-right font-semibold text-success">
                          {formatPrice(
                            market.min
                          )}
                        </td>

                        <td className="whitespace-nowrap text-right font-semibold text-warning">
                          {formatPrice(
                            market.max
                          )}
                        </td>

                        <td className="whitespace-nowrap text-right">
                          {formatPrice(
                            market.max -
                              market.min
                          )}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          ) : (
            <div className="p-6 text-center text-xs text-base-content/50 sm:p-8 sm:text-sm">
              কোনো বাজারের তথ্য পাওয়া যায়নি।
            </div>
          )}


          {/* Lowest & Highest Market */}
          {markets.length > 0 &&
            lowestMarket &&
            highestMarket && (
              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">

                <div className="rounded-xl border border-success/20 bg-success/5 p-4">

                  <p className="text-xs text-base-content/60">
                    সর্বনিম্ন দামের বাজার
                  </p>

                  <p className="mt-1 break-words font-bold">
                    {lowestMarket.market}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-success">
                    {formatPrice(
                      lowestMarket.min
                    )}
                  </p>

                </div>


                <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">

                  <p className="text-xs text-base-content/60">
                    সর্বোচ্চ দামের বাজার
                  </p>

                  <p className="mt-1 break-words font-bold">
                    {highestMarket.market}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-warning">
                    {formatPrice(
                      highestMarket.max
                    )}
                  </p>

                </div>

              </div>
            )}

        </div>
      </section>

    </div>
  );
};


function PriceCard({
  title,
  price,
  today,
}: PriceCardProps) {
  const difference = today - price;
  const increased = difference > 0;

  return (
    <div className="rounded-xl border border-base-200 bg-base-100 p-3 transition hover:border-base-300 sm:p-4">

      <p className="text-[11px] text-base-content/60 sm:text-xs">
        {title}
      </p>

      <p className="mt-2 text-lg font-bold sm:text-xl">
        {price.toLocaleString("bn-BD")}{" "}

        <span className="text-xs font-normal text-base-content/60">
          টাকা
        </span>
      </p>

      <p
        className={`mt-1 text-[11px] sm:text-xs ${
          difference === 0
            ? "text-base-content/50"
            : increased
              ? "text-error"
              : "text-success"
        }`}
      >
        {difference === 0
          ? "আজকের দামের সমান"
          : `${Math.abs(
              difference
            ).toLocaleString(
              "bn-BD"
            )} টাকা ${
              increased
                ? "বেশি"
                : "কম"
            }`}
      </p>

    </div>
  );
}


function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="card rounded-xl border border-base-200 bg-base-100 shadow-sm">

      <div className="card-body gap-2 p-3 sm:p-4">

        <p className="text-[11px] text-base-content/60 sm:text-xs">
          {title}
        </p>

        <p
          className={`text-base font-bold sm:text-lg lg:text-xl ${color}`}
        >
          {value}
        </p>

      </div>

    </div>
  );
}

export default ProductDetailsCard;