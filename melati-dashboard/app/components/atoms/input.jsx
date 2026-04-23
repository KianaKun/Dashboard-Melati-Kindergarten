"use client";
import React from "react";
import PropTypes from "prop-types";


const Input = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  readOnly,
  disabled,
  wrong,
  maxLength,
  isTextarea,
  options, // Menambahkan opsi dropdown
}) => {
  // Menangani input text biasa
  if (disabled) {
    return (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`border border-gray-300 text-gray-600 px-3 py-2 rounded-lg w-full ${className} focus:outline-none focus:border-gray-300`}
      />
    );
  } else if (options && options.length > 0) {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`border text-black px-3 py-2 rounded-lg w-full ${className} ${wrong ? 'border-red-600' : 'border-gray-300'}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    return isTextarea ? (
      <div className={`border text-black px-3 py-2 rounded-lg w-full ${className} ${wrong ? 'border-red-600' : 'border-gray-300'}`}>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          className="h-40 resize-none border-0 w-full focus:outline-none focus:border-none"
        />
        {maxLength && (
          <div className="text-right text-sm text-gray-600">
            {value.length} / {maxLength} characters
          </div>
        )}
      </div>
    ) : (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`border text-black px-3 py-2 bg-white rounded-lg w-full ${className} ${wrong ? 'border-red-600' : 'border-gray-300'}`}
      />
    );
  }
};

export const InputProps = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  wrong: PropTypes.bool,
  maxLength: PropTypes.number,
  isTextarea: PropTypes.bool,
  options: PropTypes.array,
};

Input.propTypes = InputProps;

Input.defaultProps = {
  name: "",
  type: "text",
  readOnly: false,
  disabled: false,
  wrong: false,
  maxLength: null,
  isTextarea: false,
  options: [],
};

export default Input;
