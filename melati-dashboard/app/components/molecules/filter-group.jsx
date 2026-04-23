import React from "react";
import { FilterPill } from "../atoms/filter-pill";

export const FilterGroup = ({ currentFilter, setFilter }) => {
  return (
    <div className="flex items-center space-x-2">
      <FilterPill label="All Tokens" isActive={currentFilter === "ALL"} onClick={() => setFilter("ALL")} />
      <FilterPill label="Custom" isActive={currentFilter === "CUSTOM"} onClick={() => setFilter("CUSTOM")} />
      <FilterPill label="Used" isActive={currentFilter === "USED"} onClick={() => setFilter("USED")} />
      <FilterPill label="Unused" isActive={currentFilter === "UNUSED"} onClick={() => setFilter("UNUSED")} />
    </div>
  );
};