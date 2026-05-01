"use client";
import React, { useState } from "react";
import Sidemenu from "@/app/components/molecules/side-menu";
import dashboard from "@/public/dashboard.svg";
import ticket from "@/public/ticket.svg";
import setting from "@/public/setting.svg";
import people from "@/public/people.svg";
import laptop from "@/public/laptop.svg";
import user from "@/public/user.svg";
import Image from "next/image";
import rArrow from "@/public/r-arrow.svg";
import lArrow from "@/public/l-arrow.svg";
import logoutIcon from "@/public/log-out.svg";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const Sidebar = ({ clickLogout }) => {
  const router = useRouter();
  const [isClosed, SetIsClosed] = useState(false);

  const clickSide = () => {
    SetIsClosed((prev) => !prev);
  };

  const clickTheNav = (path) => {
    router.push(path);
  };

  return (
    <div
      className={`sticky top-[8vh] py-4 bg-gray-200 px-3 h-[92vh] flex flex-col transition-all duration-300 ease-in-out ${isClosed ? "w-20" : "w-64"
        }`}
    >
      <div
        className={`flex items-center w-full transition-all duration-300 ${isClosed ? "justify-center" : "justify-end"
          }`}
      >
        <button
          className={`shadow-black hover:shadow-sm bg-white border rounded-full w-fit cursor-pointer px-2 py-2 transition-colors duration-300 ${isClosed ? "hover:bg-blue-200" : "hover:bg-green-200"
            }`}
          onClick={clickSide}
        >
          <Image
            src={isClosed ? rArrow : lArrow}
            alt="icon"
            width="30"
            height="30"
          />
        </button>
      </div>
      <Sidemenu
        label="Dashboard"
        imageSrc={dashboard}
        isClosed={isClosed}
        className="mt-4"
        onClick={() => clickTheNav("/dashboard")}
      />
      <Sidemenu
        label="Token"
        imageSrc={ticket}
        isClosed={isClosed}
        className="mt-2"
        onClick={() => clickTheNav("/dashboard/token")}
      />
      <Sidemenu
        label="Device"
        imageSrc={laptop}
        isClosed={isClosed}
        className="mt-2"
        onClick={() => clickTheNav("/dashboard/device")}
      />
      <Sidemenu
        label="Setting"
        imageSrc={setting}
        isClosed={isClosed}
        className="mt-2"
        onClick={() => clickTheNav("/dashboard/setting")}
      />
      <Sidemenu
        label="Account"
        imageSrc={user}
        isClosed={isClosed}
        className="mt-2"
        onClick={() => clickTheNav("/dashboard/profile")}
      />
      <Sidemenu
        label="Logout"
        imageSrc={logoutIcon}
        isClosed={isClosed}
        className="mt-2"
        onClick={clickLogout}
      />
    </div>
  );
};

export const SidebarProps = {
  clickLogout: PropTypes.func
};

Sidebar.propTypes = SidebarProps;

export default Sidebar;