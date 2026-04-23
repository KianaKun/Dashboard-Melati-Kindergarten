"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/atoms/button";
import InputForm from "@/app/components/molecules/input-form";
import wifi from "@/public/wifi.svg";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const backtothetoken = () => {
    router.push("/");
  };

  const loginBtnClick = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.errors?.username?.[0] ||
          data?.message ||
          "Login gagal"
        );
      }

      // simpan token
      localStorage.setItem("token", data.data.token);

      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/dashboard/");
      }, 1500);

    } catch (err) {
      toast.error(err.message || "Login gagal", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-sm">
            <Image src={wifi} alt="icon" width="25" height="25" />
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl text-center font-semibold text-black">
            Melati WiFi
          </h1>
          <h1 className="text-sm text-center text-black tracking-[.15em]">
            Network Administration
          </h1>
        </div>

        <div className="bg-white w-100 px-6 py-8 rounded-2xl text-black mt-6 shadow-md">
          <div>
            <h1 className="text-2xl font-semibold">Admin Access</h1>
            <p className="text-sm text-gray-500 mt-1">
              Please enter your credentials to manage the network.
            </p>
          </div>

          <br />

          {/* USERNAME */}
          <InputForm
            textValue="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full mt-2"
          />

          {/* PASSWORD */}
          <InputForm
            textValue="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-4"
          />

          {/* BUTTON */}
          <Button
            onClick={loginBtnClick}
            buttonStyle="blue"
            className="w-full py-3 mt-6"
            disabled={!formData.username || !formData.password || loading}
          >
            {loading ? "Signing in..." : "Sign in to Dashboard"}
          </Button>

          <p
            className="text-sm text-center mt-2 text-gray-500 hover:text-black hover:cursor-pointer"
            onClick={backtothetoken}
          >
            Or go back to the token page
          </p>

          <div className="border-t-neutral-200 border-t mt-8">
            <p className="text-xs text-gray-500 text-center mt-8">
              Authorized Personnel Only. All access is logged and monitored.
            </p>
            <p className="text-xs text-black text-center font-semibold">
              Melati Kindergarten Wifi Project v1
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          <div className="bg-green-200 rounded-full px-3 py-1">
            <h1 className="text-xs text-center text-green-800 font-semibold">
              • Network Online
            </h1>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}