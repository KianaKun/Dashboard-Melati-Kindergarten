"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../atoms/input";
import Text from "../atoms/text";
import Image from "next/image";
import eyeOpen from "@/public/eye-open.svg";
import eyeClose from "@/public/eye-closed.svg";

const InputForm = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  readOnly,
  disabled,
  textValue,
  textClass,
  inputClass,
  wrong,
  maxLength,
  isTextarea,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && !showPassword ? "password" : "text";

  return (
    <div className={className}>
      <Text className={`${textClass} text-black text-xs font-semibold mb-1`}>{textValue}</Text>
      <div className="relative">
        <Input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={`${inputClass} text-sm`}
          wrong={wrong}
          maxLength={maxLength}
          isTextarea={isTextarea}
          options={options}
        />
        {type === "password" && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <Image src={eyeOpen} alt="icon" width="20" height="20" className="mr-1"/>
            ) : (
              <Image src={eyeClose} alt="icon" width="20" height="20" className="mr-1"/>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const InputFormProps = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  textValue: PropTypes.string,
  textClass: PropTypes.string,
  inputClass: PropTypes.string,
  wrong: PropTypes.bool,
  maxLength: PropTypes.number,
  isTextarea: PropTypes.bool,
  options: PropTypes.array,
};

InputForm.propTypes = InputFormProps;

InputForm.defaultProps = {
  name: "",
  textClass: "",
  textValue: "",
  type: "text",
  readOnly: false,
  disabled: false,
  wrong: false,
  maxLength: null,
  isTextarea: false,
  options: [],
};

export default InputForm;
