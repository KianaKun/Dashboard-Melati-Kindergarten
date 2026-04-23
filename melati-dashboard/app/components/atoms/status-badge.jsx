import React from "react";

export const StatusBadge = ({ isUsed }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        !isUsed
          ? "bg-green-100 text-green-800"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          !isUsed ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
      {!isUsed ? "Active" : "Used"}
    </span>
  );
};