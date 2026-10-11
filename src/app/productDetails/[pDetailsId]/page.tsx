import ApiShare from "@/app/baseApiShare/apiShare";
import ProductDetailsCard from "@/app/components/productDetailsCard/ProductDetailsCard";
import { TProduct } from "@/app/components/TypescriptShare";
import { notFound } from "next/navigation";

const DynamicProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ pDetailsId: string }>;
}) => {
  const { pDetailsId } = await params;

  const res = await fetch(
    `${ApiShare}/products/${pDetailsId}`
  );

  if (!res.ok) {
    notFound();
  }

  const pDetailsData: TProduct = await res.json();

  if (!pDetailsData || !pDetailsData.id) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-green-100 py-6 sm:py-8 md:py-10 lg:py-12">

      <div className="container mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8">

        <ProductDetailsCard
          data={pDetailsData}
        />

      </div>

    </main>
  );
};

export default DynamicProductDetailsPage;