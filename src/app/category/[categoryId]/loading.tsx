const CategoryLoading = () => {
  return (
    <div className="min-h-screen bg-green-100 py-10">
      <div className="container mx-auto px-4">

        {/* Category Header Skeleton */}
        <div className="mb-10 flex items-center gap-4 animate-pulse">

          {/* Icon */}
          <div className="h-16 w-16 rounded-xl bg-gray-200" />

          <div className="space-y-3">
            {/* Category Name */}
            <div className="h-7 w-40 rounded bg-gray-200" />

            {/* Description */}
            <div className="h-4 w-64 rounded bg-gray-200" />
          </div>

        </div>


        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6"
            >

              {/* Image */}
              <div className="h-[230px] w-full rounded-xl bg-gray-200" />


              {/* Category */}
              <div className="mt-6 h-6 w-16 rounded bg-gray-200" />


              {/* Product Name */}
              <div className="mt-5 h-6 w-3/4 rounded bg-gray-200" />


              {/* Price */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-8 w-28 rounded bg-gray-200" />
                <div className="h-5 w-20 rounded bg-gray-200" />
              </div>


              {/* Divider */}
              <div className="my-5 h-px bg-gray-200" />


              {/* Footer */}
              <div className="flex justify-between">
                <div className="h-5 w-20 rounded bg-gray-200" />
                <div className="h-5 w-28 rounded bg-gray-200" />
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default CategoryLoading;