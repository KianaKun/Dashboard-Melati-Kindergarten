"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/components/templates/template";

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/"); // penting: replace, bukan push
    } else {
      setReady(true);
    }
  }, []);

  // jangan render apa-apa sebelum cek token
  if (!ready) return null;

  return (
    <div>
      <Template>
        <div className="bg-gray-50 text-black w-full min-h-[92vh] h-full border-gray-700 flex items-center justify-center">
          <h1>Welcome, admin!</h1>
        </div>
      </Template>
    </div>
  );
}