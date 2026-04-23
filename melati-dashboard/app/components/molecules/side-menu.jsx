"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const Sidemenu = ({ label, className, imageSrc, isClosed, onClick }) => {
  return (
    <div
      className={`h-fit py-2 px-2 flex items-center justify-start ${className} hover:bg-green-300 rounded-full shadow-black hover:shadow-sm bg-white cursor-pointer overflow-hidden transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      <div className="min-w-max flex items-center justify-center pl-1">
        <Image src={imageSrc} alt="icon" width="30" height="30" />
      </div>
      
      <h1
        className={`text-black whitespace-nowrap transition-all duration-300 ease-in-out ${
          isClosed ? "w-0 opacity-0 ml-0" : "w-40 opacity-100 ml-3"
        }`}
      >
        {label}
      </h1>
    </div>
  );
};

Sidemenu.propTypes = {
  imageSrc: PropTypes.any, 
  className: PropTypes.string,
  isClosed: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Sidemenu.defaultProps = {
  className: "",
  isClosed: false,
};

export default Sidemenu;