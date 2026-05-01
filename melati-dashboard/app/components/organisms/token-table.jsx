"use client";

import React, { useState, useEffect } from "react";
import { FilterGroup } from "../molecules/filter-group";
import { StatusBadge } from "../atoms/status-badge";
import { Pagination } from "../molecules/pagination";
import { fetchTokensFromAPI } from "../../services/token-service";
import { FilterPill } from "../atoms/filter-pill";
import { ToastContainer, toast } from "react-toastify";


export const TokenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerate, setIsGenerate] = useState(true);

  const loadData = async () => {
    setIsLoading(true);

    const response = await fetchTokensFromAPI({
      page: page,
      filter: filter,
    });

    if (!response || !response.success) {
      setTokens([]);
      setIsLoading(false);
      return;
    }

    setTokens(response.data.data || []);
    setTotalData(response.data.total || 0);
    setPerPage(response.data.per_page || 10);
    setIsGenerate(response.data.is_generate ?? true);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [page, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const GenerateTokenClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://192.168.3.3:8000/api/tokens/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Token generated!", {
          position: "top-right",
          autoClose: 2000,
        });
        loadData();
      }
    } catch {
      toast.error("An error occured!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const GenerateCustomToken = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://192.168.3.3:8000/api/tokens/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          note: "",
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Custom token generated!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("An error occured!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const GeneratePrintToken = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://192.168.3.3:8000/api/tokens/export/pdf", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
    } catch {
      toast.error("An error occured!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
          <span className="text-blue-600 font-medium">Loading data...</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-200 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <h2 className="text-2xl font-bold text-gray-900">Token</h2>
          <FilterGroup currentFilter={filter} setFilter={handleFilterChange} />

          <FilterPill
            label="Generate Token (Daily)"
            isActive={isGenerate === false}
            onClick={GenerateTokenClick}
          />

          <FilterPill
            label="Generate Custom Token"
            onClick={GenerateCustomToken}
          />

          <FilterPill
            label="Print Token Into PDF"
            onClick={GeneratePrintToken}
          />
        </div>
      </div>

      <div className="overflow-x-auto min-h-100">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 tracking-wider">
              <th className="py-4 px-6">TOKEN ID</th>
              <th className="py-4 px-6">TYPE</th>
              <th className="py-4 px-6">STATUS</th>
              <th className="py-4 px-6">CREATION DATE</th>
              <th className="py-4 px-6">VALID UNTIL</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tokens.length > 0 ? (
              tokens.map((token) => (
                <tr key={token.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-800 text-md">
                    {token.code}
                  </td>

                  <td className="py-4 px-6 text-gray-600 font-medium flex items-center space-x-2">
                    <span className="text-blue-500 text-lg">
                      {token.is_custom ? "⚙️" : "📦"}
                    </span>
                    <span>{token.is_custom ? "Custom" : "System"}</span>
                  </td>

                  <td className="py-4 px-6">
                    <StatusBadge isUsed={token.is_used} />
                  </td>

                  <td className="py-4 px-6 text-gray-500">
                    {formatDate(token.created_at)}
                  </td>

                  <td className="py-4 px-6 text-gray-500">
                    {formatDate(token.valid_until)}
                  </td>
                </tr>
              ))
            ) : (
              !isLoading && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No tokens found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalItems={totalData}
        perPage={perPage}
        onPageChange={setPage}
      />
      <ToastContainer />
    </div>
  );
};

export default TokenTable;