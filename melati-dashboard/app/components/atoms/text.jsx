"use client";
import React from "react";

import PropTypes from "prop-types";

const Text = ({ children, size, className, weight, isDate, isTime }) => {
  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    xl2: "text-2xl",
    xl3: "text-3xl",
    xl4: "text-4xl",
    xl5: "text-5xl",
  };

  const weightMap = {
    thin: "font-thin",
    normal: "font-normal",
    medium: "font-medium",
    sbold: "font-semibold",
    bold: "font-bold",
    xBold: "font-extrabold",
  };

  const formatDate = (dateString, isTime) => {
    const date = new Date(dateString);

    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", optionsDate);

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

    if (isTime == true) {
      return `${formattedDate}`;
    } else {
      return `${formattedDate} || ${formattedTime}`;
    }
  };

  return (
    <p
      className={`${sizeMap[size]} ${weightMap[weight]} ${className} text-black`}
    >
      {isDate ? formatDate(children, isTime) : children}
    </p>
  );
};

export const TextProps = {
  children: PropTypes.node,
  size: PropTypes.string,
  weight: PropTypes.string,
  className: PropTypes.string,
  isDate: PropTypes.bool,
  isTime: PropTypes.bool,
};

Text.propTypes = TextProps;

Text.defaultProps = {
  size: "md",
  weight: "normal",
  isDate: false,
  isTime: false,
};

export default Text;
