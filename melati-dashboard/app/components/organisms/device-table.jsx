"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "../molecules/pagination";

export const DeviceTable = () => {
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDevices = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://192.168.3.3:8000/api/mikrotik/devices?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error("An error occured!", {
          position: "top-right",
          autoClose: 2000,
        });
      }

      setDevices(data.data.data);
      setTotalData(data.data.total);
      setPerPage(data.data.per_page);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 PINDAHKAN KE SINI (DI LUAR fetchDevices)
  const handleDisconnect = async (ip) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://192.168.3.3:8000/api/mikrotik/disconnect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ip }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Disconnect success!", {
        position: "top-right",
        autoClose: 2000,
      });        
      fetchDevices();
      } else {
      toast.error("An error occured!", {
        position: "top-right",
        autoClose: 2000,
      });      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [page]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
          <span className="text-blue-600 font-medium">Loading devices...</span>
        </div>
      )}

      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Connected Devices</h2>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 tracking-wider">
              <th className="py-4 px-6">MAC ADDRESS</th>
              <th className="py-4 px-6">IP ADDRESS</th>
              <th className="py-4 px-6">HOSTNAME</th>
              <th className="py-4 px-6">USERNAME</th>
              <th className="py-4 px-6">UPTIME</th>
              <th className="py-4 px-6">ACTION</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {devices.length > 0 ? (
              devices.map((device, index) => (
                <tr key={device.mac_address || index}>
                  <td className="py-4 px-6">{device.mac_address}</td>
                  <td className="py-4 px-6">{device.ip_address}</td>
                  <td className="py-4 px-6">{device.hostname}</td>
                  <td className="py-4 px-6">{device.username || "-"}</td>
                  <td className="py-4 px-6">{device.uptime || "-"}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDisconnect(device.ip_address)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Disconnect
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !isLoading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No devices connected.
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
    </div>
  );
};

export default DeviceTable;