
const ProductCard = ({ data }) => {
  const {
    nameBn,
    categoryIcon,
    unit,
    today,
    change,
  } = data;

  const isUp = change.dir === "up";

  return (
    <div className="card w-full max-w-[430px] rounded-[20px] border border-[#dce5dc] bg-[#fbfdfb] shadow-sm">
      <div className="card-body gap-0 p-4">

        {/* Product information */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h2 className="text-lg font-bold leading-7 text-[#202b22]">
              {nameBn}
            </h2>

            <p className="text-sm text-[#58635a]">
              প্রতি {unit === "kg" ? "কেজি" : unit}
            </p>
          </div>
        </div>

        {/* Price information */}
        <div className="mt-3.5 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-[#465148]">
              আজকের দাম
            </p>

            <p className="text-xl font-extrabold leading-7 text-[#202b22]">
              {today}{" "}
              <span className="text-base font-medium">
                টাকা
              </span>
            </p>
          </div>

          <div
            className={`badge badge-ghost mb-1 gap-1 rounded-full border-0 px-3 py-3 font-bold ${
              isUp
                ? "bg-[#f0f5f0] text-red-600"
                : change.dir === "down"
                  ? "bg-blue-50 text-green-600"
                  : "bg-[#f0f5f0] text-gray-600"
            }`}
          >
            <span className="text-xs">
              {isUp ? "▲" : change.dir === "down" ? "▼" : "—"}
            </span>

            {change.pct.toLocaleString("bn-BD")}%
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
