import Link from "next/link";
import type { ReactNode } from "react";

type ProductCardProps = {
  data: {
    id: string | number;
    nameBn: string;
    categoryIcon: ReactNode;
    unit: string;
    today: string | number;
    change: {
      dir: "up" | "down" | string;
      pct: number;
    };
  };
};

const ProductCard = ({ data }: ProductCardProps) => {
  const {
    nameBn,
    categoryIcon,
    unit,
    today,
    change,
  } = data;

  const isUp = change.dir === "up";

  return (
    <Link
      href={`/productDetails/${data.id}`}
      className="block h-full"
    >
      <div className="card h-full w-full rounded-[16px] border border-[#dce5dc] bg-[#fbfdfb] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-[20px]">

        <div className="card-body gap-0 p-3 sm:p-4 md:p-5">

          {/* Product Information */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-3.5">

            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl">
              {categoryIcon}
            </div>

            {/* Name + Unit */}
            <div className="min-w-0 flex-1">

              <h2 className="break-words text-base font-bold leading-6 text-[#202b22] sm:text-lg sm:leading-7">
                {nameBn}
              </h2>

              <p className="mt-0.5 text-xs text-[#58635a] sm:text-sm">
                প্রতি {unit === "kg" ? "কেজি" : unit}
              </p>

            </div>

          </div>


          {/* Price Information */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            {/* Price */}
            <div>
              <p className="text-xs text-[#465148] sm:text-sm">
                আজকের দাম
              </p>

              <p className="mt-0.5 text-lg font-extrabold leading-7 text-[#202b22] sm:text-xl">
                {today}{" "}

                <span className="text-sm font-medium sm:text-base">
                  টাকা
                </span>
              </p>
            </div>


            {/* Price Change */}
            <div
              className={`badge badge-ghost w-fit gap-1 rounded-full border-0 px-3 py-3 text-xs font-bold sm:text-sm ${
                isUp
                  ? "bg-[#f0f5f0] text-red-600"
                  : change.dir === "down"
                    ? "bg-blue-50 text-green-600"
                    : "bg-[#f0f5f0] text-gray-600"
              }`}
            >
              <span className="text-[10px] sm:text-xs">
                {isUp
                  ? "▲"
                  : change.dir === "down"
                    ? "▼"
                    : "—"}
              </span>

              {change.pct.toLocaleString("bn-BD")}%
            </div>

          </div>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;