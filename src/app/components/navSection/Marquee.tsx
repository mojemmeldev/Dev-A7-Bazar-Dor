import ApiShare from "@/app/baseApiShare/apiShare";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface TMar {
  nameBn: string;
  id: string;
  today: number;
  unit: string;
}

const marqueeDataFetch = async (): Promise<TMar[]> => {
  const res = await fetch(`${ApiShare}/products/`);

  const data = await res.json();

  return data;
};

const Marquee = async () => {
  const headlines = await marqueeDataFetch();

  return (
    <div className="mt-3 w-full bg-amber-200 sm:mt-4 md:mt-5">
      <div className="container mx-auto flex items-center overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8">

        {/* Latest Label */}
        <div className="shrink-0 bg-red-900 px-2 py-1 text-[11px] font-medium text-white sm:px-3 sm:text-xs md:text-sm">
          সর্বশেষ
        </div>

        {/* Marquee */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            className="py-1 text-[11px] text-gray-800 sm:text-xs md:text-sm"
            direction="right"
            duration={10}
            pauseOnHover={true}
          >
            {headlines.map((h) => (
              <Link
                key={h.id}
                href={`/productDetails/${h.id}`}
                className="whitespace-nowrap hover:text-green-700"
              >
                <span>
                  {h.nameBn} {h.today} টাকা/{h.unit}
                  <span className="mx-3 sm:mx-4 md:mx-5">•</span>
                </span>
              </Link>
            ))}
          </MarqueeText>
        </div>

      </div>
    </div>
  );
};

export default Marquee;