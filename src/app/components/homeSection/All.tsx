import ApiShare from "@/app/baseApiShare/apiShare";
import ProductCard from "../productCardShare/ProductCard";
import { TProduct } from "../TypescriptShare";

const All = async () => {
  const TodayUpData = await fetch(`${ApiShare}/products/`);

  const data: TProduct[] = await TodayUpData.json();

  return (
    <div className="container mx-auto mt-8 px-4 sm:mt-10 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="mb-6">
        <span
          id="All-Products"
          className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl"
        >
          সব পণ্য
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {data.map((all) => (
          <div key={all.id} className="w-full">
            <ProductCard data={all} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default All;