"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/components/templates/template";
import { TokenTable } from "../../components/organisms/token-table";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Template>
        <div className="text-black w-full border-gray-700">
          <div>
            <div className="p-6 rounded-3xl">
              <TokenTable/>
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
}
