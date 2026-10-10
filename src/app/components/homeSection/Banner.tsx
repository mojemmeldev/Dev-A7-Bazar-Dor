import Link from 'next/link';
import React from 'react';
import Blogo from '../../../../public/bazar-hero.png'
import Image from 'next/image';



const Banner = () => {

    const date = new Date().toLocaleDateString("bn-DB", {
        dateStyle: "full"
    })

    return (
        <section className="mx-auto mt-6 w-full max-w-7xl px-3">
            <div className="card overflow-hidden rounded-2xl border border-[#e2e9e2] bg-[#fbfdfb] shadow-sm">
                <div className="card-body flex flex-row items-center justify-between gap-3 p-4 sm:p-6">

                    {/* Left content */}
                    <div className="flex-1">
                        <span className="badge badge-sm border-0 bg-[#e5f5e9] text-xs text-[#23834b]">
                            {date}
                        </span>

                        <h1 className="mt-2 text-xl font-extrabold leading-snug text-[#202b22] sm:text-2xl">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলমূলের দাম —
                            বাজারদরের নির্ভরযোগ্য তথ্য, প্রতিদিনের
                            সর্বশেষ বাজারদর এক জায়গায় সহজেই জেনে নিন।
                        </p>

                        <Link
                            href={"/AllProduct"}
                            className="btn btn-success btn-sm mt-4 min-h-0 border-0 px-4 text-white shadow-sm"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>

                    {/* Right illustration */}
                    <div className="flex w-24 shrink-0 items-center justify-center sm:w-40 md:w-48">
                        <Image src={Blogo} alt='logo' width={300} height={300} ></Image>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;