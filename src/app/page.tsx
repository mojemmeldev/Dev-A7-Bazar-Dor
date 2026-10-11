import Image from "next/image";
import Header from "./components/navSection/Header";
import TodayUp from "./components/homeSection/TodayUp";
import TodayDown from "./components/homeSection/TodayDown";
import All from "./components/homeSection/All";
import Banner from "./components/homeSection/Banner";





export default function Home() {
  return (
    <div className="bg-green-100 py-10">
  <div className="container mx-auto">

    <div className="mb-10">
      <Banner />
    </div>

    <div className="space-y-20">
      <TodayUp />
      <TodayDown />
      <All />
    </div>

  </div>
</div>
  );
}
