"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/organisms/side-bar";
import Topbar from "@/app/components/organisms/top-bar";
import PropTypes from "prop-types";
import Button from "@/app/components/atoms/button";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Template = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const clickLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex justify-start items-start">
        <Sidebar clickLogout={() => setIsOpen(true)} />
        <div className="w-full">{children}</div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white w-120 p-6 rounded-lg shadow-lg z-10">
            <div>
              <p className="text-black text-center">Are you sure you want to logout?</p>
              <div className="flex justify-between">
                <Button
                  onClick={clickLogout}
                  buttonStyle="light-green"
                  className="w-50 py-3 mt-8"
                >
                  Log out
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  buttonStyle="white"
                  className="w-50 py-3 mt-8"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
