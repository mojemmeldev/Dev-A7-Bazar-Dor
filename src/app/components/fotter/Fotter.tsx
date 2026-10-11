import React from "react";

const Fotter = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="flex flex-col gap-3 text-center text-[13px] text-gray-600 sm:text-[14px] md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">

          <div>
            <p>
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <div>
            <p>
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Fotter;