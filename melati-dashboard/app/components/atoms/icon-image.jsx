"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from 'next/image';

const Icon = ({ iconSrc, className }) => {
  return (
    <div>
      <Image
        src={iconSrc}
        alt="icon"
        className={className}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};

Icon.propTypes = {
  iconSrc: PropTypes.bool.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: "",
};

export default Icon;
