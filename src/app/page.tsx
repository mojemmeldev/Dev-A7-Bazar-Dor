import Image from "next/image";
import Header from "./components/navSection/Header";
import TodayUp from "./components/homeSection/TodayUp";
import TodayDown from "./components/homeSection/TodayDown";
import All from "./components/homeSection/All";
import Banner from "./components/homeSection/Banner";





export default function Home() {
  return (
    <div className=" bg-green-100 ">
      <div className=" container mx-auto bg-amber-400 ">

        <div>
          <Banner></Banner>
        </div>

        <div >
          <TodayUp></TodayUp>
        </div>

        <div>
          <TodayDown></TodayDown>
        </div>
        <div>
          <All></All>
        </div>

      </div>
    </div>
  );
}
