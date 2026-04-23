import React from "react";

export const FilterPill = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
        isActive
          ? "bg-gray-200 text-gray-800"
          : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
};