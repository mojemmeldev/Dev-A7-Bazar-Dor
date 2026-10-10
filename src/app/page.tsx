import Image from "next/image";
import Header from "./components/navSection/Header";
import TodayUp from "./components/homeSection/TodayUp";
import TodayDown from "./components/homeSection/TodayDown";
import All from "./components/homeSection/All";
import Banner from "./components/homeSection/Banner";





export default function Home() {
  return (
    <div className="container mx-auto">

     <div>banner
      <Banner></Banner>
     </div>

     <div>aj dam barse
      <TodayUp></TodayUp>
     </div>

     <div>dam komse
      <TodayDown></TodayDown>
     </div>
     <div>sob
      <All></All>
     </div>
      
    </div>
  );
}
