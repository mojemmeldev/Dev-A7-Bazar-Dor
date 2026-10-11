import Link from "next/link";

const NotFound = () => {
    return (
        <section className="min-h-[70vh] bg-[#f4f8f3] flex items-center justify-center px-4">

            <div className="text-center">

                <h1 className="text-[90px] font-bold leading-none text-green-600">
                    404
                </h1>

                <h2 className="mt-5 text-3xl font-bold text-gray-800">
                    পেজটি খুঁজে পাওয়া যায়নি
                </h2>

                <p className="mt-3 text-gray-500">
                    আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা লিংকটি সঠিক নয়।
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>

            </div>

        </section>
    );
};

export default NotFound;