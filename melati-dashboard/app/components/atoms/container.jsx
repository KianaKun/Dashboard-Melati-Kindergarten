"use client";
import React from "react";

import PropTypes from "prop-types";

const Button = ({
  onClick,
  type,
  className,
  buttonStyle,
  disabled,
  children,
}) => {
  let classStyle = null;
  if (buttonStyle == "dark-green") {
    classStyle = "bg-green-600 hover:bg-green-700 text-white";
  } else if (buttonStyle == "light-green") {
    classStyle = "bg-green-300 hover:bg-green-400 text-white";
  } else if (buttonStyle == "white") {
    classStyle = "border bg-white border-2 border-green-600 text-black hover:border-green-700 hover:bg-slate-200";
  } else if (buttonStyle == "really-green") {
    classStyle = "bg-green-700 hover:bg-green-800 text-white";
  } else if (buttonStyle == "blue") {
    classStyle = "bg-blue-600 hover:bg-blue-700 text-white";
  } else if (buttonStyle == "red") {
    classStyle = "bg-red-600 hover:bg-red-700 text-white";
  }

  if (disabled) {
    classStyle = "bg-neutral-400 text-white";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 ${className} ${classStyle} round rounded-md ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonProps = {
  children: PropTypes.element,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  buttonStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.propTypes = ButtonProps;

Button.defaultProps = {
  type: "button",
  buttonStyle: "dark-green",
  disabled: "false",
};

export default Button;
