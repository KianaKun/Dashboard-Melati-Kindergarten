"use client";
import React from "react";
import Sidebar from "@/app/components/organisms/side-bar";
import Topbar from "@/app/components/organisms/top-bar";
import PropTypes from "prop-types";

const Template = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar/>
      <div className="flex justify-start items-start">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
