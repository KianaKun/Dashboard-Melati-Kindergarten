"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/components/templates/template";
import { DeviceTable } from "../../components/organisms/device-table";

export default function Home() {
  const router = useRouter();

  return (  
    <div>
      <Template>
        <div className="text-black w-full border-gray-700">
          <div>
            <div className="p-6 rounded-3xl">
              <DeviceTable/>
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
}
