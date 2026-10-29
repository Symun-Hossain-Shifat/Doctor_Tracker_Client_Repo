import Image from "next/image";
import Navbar from "./Components/Navbar";
import HeroBanner from "./Components/Banner";
import Footer from "./Components/Footer";


export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <HeroBanner></HeroBanner>
      <Footer></Footer>

    </div>
  );
}
