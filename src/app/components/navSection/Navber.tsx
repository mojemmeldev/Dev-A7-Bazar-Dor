import ApiShare from "@/app/baseApiShare/apiShare";
import Link from "next/link";

type TCategory = {
  id: number;
  slug: string;
  icon: string;
  nameBn: string;
};

const getNavCatData = async (): Promise<TCategory[]> => {
  const res = await fetch(`${ApiShare}/categories`);

  const data: TCategory[] = await res.json();

  return data;
};

const Navber = async () => {
  const navCatData = await getNavCatData();

  return (
    <nav className="w-full border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= Mobile + Tablet ================= */}
        <div className="flex items-center justify-between py-3 md:hidden">

          {/* Home */}
          <Link
            href="/"
            className="text-sm font-semibold text-gray-800 transition hover:text-green-600"
          >
            হোম
          </Link>

          {/* Hamburger Menu */}
          <details className="group relative">

            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-gray-200 bg-white text-xl text-gray-700 transition hover:bg-green-50 hover:text-green-600">
              ☰
            </summary>

            {/* Dropdown */}
            <div className="absolute right-0 top-12 z-50 w-[230px] overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

              <p className="border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-400">
                ক্যাটাগরি
              </p>

              <div className="max-h-[320px] overflow-y-auto py-1">

                {navCatData.map((ncd) => (
                  <Link
                    key={ncd.id}
                    href={`/category/${ncd.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                  >
                    <span className="text-lg">
                      {ncd.icon}
                    </span>

                    <span>
                      {ncd.nameBn}
                    </span>
                  </Link>
                ))}

              </div>

            </div>

          </details>

        </div>


        {/* ================= Desktop ================= */}
        <div className="hidden items-center gap-6 py-3 md:flex lg:gap-8">

          <Link
            href="/"
            className="shrink-0 text-sm font-semibold text-gray-800 transition hover:text-green-600 lg:text-base"
          >
            হোম
          </Link>

          {navCatData.map((ncd) => (
            <Link
              key={ncd.id}
              href={`/category/${ncd.slug}`}
              className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-green-600 lg:text-base"
            >
              <span>
                {ncd.icon}
              </span>

              <span>
                {ncd.nameBn}
              </span>
            </Link>
          ))}

        </div>

      </div>
    </nav>
  );
};

export default Navber;