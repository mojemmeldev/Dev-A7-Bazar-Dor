import Link from "next/link";
import React from "react";
import Blogo from "../../../../public/bazar-hero.png";
import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="container mx-auto mt-4 w-full px-4 sm:mt-6 sm:px-6 lg:px-8">
      <div className="card overflow-hidden rounded-2xl border border-[#e2e9e2] bg-[#fbfdfb] shadow-sm">

        <div className="card-body flex flex-col items-center gap-6 p-4 sm:p-6 md:flex-row md:justify-between md:gap-8 lg:p-8">

          {/* Left Content */}
          <div className="w-full flex-1 text-center md:text-left">

            <span className="badge badge-sm border-0 bg-[#e5f5e9] text-[11px] text-[#23834b] sm:text-xs">
              {date}
            </span>

            <h1 className="mt-3 text-2xl font-extrabold leading-snug text-[#202b22] sm:text-3xl md:text-3xl lg:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-gray-500 sm:text-sm md:mx-0 md:text-[15px] lg:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলমূলের দাম —
              বাজারদরের নির্ভরযোগ্য তথ্য, প্রতিদিনের সর্বশেষ বাজারদর
              এক জায়গায় সহজেই জেনে নিন।
            </p>

            <Link
              href="/AllProduct"
              className="btn btn-success btn-sm mt-4 min-h-0 border-0 px-4 text-white shadow-sm sm:px-5 md:mt-5"
            >
              সব পণ্য দেখুন
            </Link>

          </div>

          {/* Right Illustration */}
          <div className="flex w-full shrink-0 items-center justify-center md:w-[220px] lg:w-[280px] xl:w-[320px]">

            <Image
              src={Blogo}
              alt="বাজার দর"
              width={320}
              height={320}
              priority
              className="h-auto w-[180px] object-contain sm:w-[220px] md:w-full"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Banner;