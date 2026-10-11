import ApiShare from "@/app/baseApiShare/apiShare";
import ProductList from "@/app/components/productCardShare/ProductList";
import { notFound } from "next/navigation";

type TCategory = {
  slug: string;
  icon?: string;
  nameBn?: string;
};

const get = async (): Promise<TCategory[]> => {
  const res = await fetch(`${ApiShare}/categories`);

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data;
};

const DynamicCategoryIdPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `${ApiShare}/products?category=${categoryId}`
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  if (!data || data.length === 0) {
    notFound();
  }

  const getData = await get();

  const currentCat = getData.find(
    (category) => category.slug === categoryId
  );

  if (!currentCat) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-green-100 py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Category Icon */}
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
              {currentCat.icon}
            </span>

            {/* Category Info */}
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                {currentCat.nameBn}
              </h2>

              <p className="mt-1 text-[13px] leading-5 text-gray-500 sm:text-sm md:text-base">
                {data.length} টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>

          </div>
        </div>

        {/* Product List */}
        <div className="w-full">
          <ProductList products={data} />
        </div>

      </div>
    </div>
  );
};

export default DynamicCategoryIdPage;