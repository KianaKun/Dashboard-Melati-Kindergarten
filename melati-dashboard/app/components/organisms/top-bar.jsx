"use client";
import logo from "@/public/image/Logo.png"
import Image from "next/image";


const Topbar = () => {
  return (
      <div className="bg-white flex justify-start w-full px-3 py-0.5 h-[8vh] sticky top-0">
        <Image src={logo} alt="icon" width="130" />
      </div>
  );
};

export default Topbar;
