import ApiShare from "@/app/baseApiShare/apiShare";
import ProductCard from "../productCardShare/ProductCard";
import { TProduct } from "../TypescriptShare";

const TodayUp = async () => {
  const TodayUpData = await fetch(`${ApiShare}/products`);

  const data: TProduct[] = await TodayUpData.json();

  const upData = data.filter(
    (product) => product.change.dir === "up"
  );

  return (
    <div className="container mx-auto mt-8 px-4 sm:mt-10 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="mb-6 flex items-center gap-2 sm:mb-8">
        <span className="text-lg font-bold text-red-600 sm:text-xl">
          ▲
        </span>

        <span className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
          আজ দাম বেড়েছে
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {upData.map((tud) => (
          <div key={tud.id} className="w-full">
            <ProductCard data={tud} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default TodayUp;