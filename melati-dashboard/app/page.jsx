"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/atoms/button";
import InputForm from "@/app/components/molecules/input-form";
import shield from "@/public/shield.svg";
import speedometer from "@/public/speedometer.svg";
import family from "@/public/family.svg";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [isWrong, setIsWrong] = useState(false);
  const [wrongText, setWrongText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // reset error state ketika user mulai ketik lagi
    setIsWrong(false);
    setWrongText("");
  };

  const loginPopUp = () => {
    router.push("/login/");
  };

  const submitBtn = async () => {
    if (!formData.token.trim()) {
      setIsWrong(true);
      setWrongText("Please enter your WiFi code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.3.3:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code: formData.token.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Connected! Enjoy the WiFi 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
        // redirect ke halaman sukses atau langsung ke internet
        setTimeout(() => {
          if (response.ok && data.success) {
            toast.success("Connected! Enjoy the WiFi 🎉", {
              position: "top-right",
              autoClose: 3000,
            });

            // cukup state sukses, jangan redirect
            setTimeout(() => {
              // optional: close window kalau bukan captive popup
              if (window.navigator.userAgent.includes("Captive")) {
                window.close();
              }
            }, 1500);
          }
        }, 1500);
      } else {
        setIsWrong(true);
        setWrongText(data.message || "Token is wrong or expired");
        toast.error(data.message || "The token is wrong or expired!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      toast.error("Cannot connect to server. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // submit juga bisa pakai Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitBtn();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-tl from-[hsla(154,100%,31%,1)] from-0% via-[hsla(243,41%,63%,1)] via-52% to-[hsla(0,42%,71%,1)] to-100%">
      <div className="items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="w-50 bg-green-300 rounded-full p-1">
            <h1 className="text-sm text-center text-black">
              Melati Kindergarten
            </h1>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-4xl text-center font-bold text-white text-shadow-md">
            Melati WiFi
          </h1>
          <h1 className="text-sm text-center text-gray-200">
            Connect to our nurtured network
          </h1>
        </div>
        <div className="bg-gray-100 w-100 px-8 py-8 rounded-2xl text-black mt-6">
          <div>
            <h1 className="text-2xl text-center">Access Portal</h1>
            <p className="text-sm text-gray-500 text-center mt-2">
              Please enter your unique connection code
            </p>
          </div>
          <br />
          <InputForm
            textValue="WiFi Code"
            name="token"
            type="text"
            value={formData.token}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter Code (e.g. MEL-1234)"
            className="w-full mt-2"
            wrong={isWrong}
            wrongText={wrongText}
            inputClass={() => ({})}
          />
          <Button
            onClick={submitBtn}
            buttonStyle="blue"
            className="w-full py-1 mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect now"}
          </Button>
          <div className="border-t-neutral-200 border-t mt-8">
            <p className="text-sm text-gray-500 text-center mt-2">
              Need help? Visit the administration desk
            </p>
            <p
              className="text-sm text-blue-400 text-center hover:text-blue-600 hover:cursor-pointer"
              onClick={loginPopUp}
            >
              Login as admin?
            </p>
          </div>
        </div>

        <div className="mt-12 flex item-center justify-between">
          <div className="flex items-center justify-center">
            <Image src={shield} alt="icon" width="20" height="20" />
            <h1 className="text-sm text-center text-gray-200 ml-2">
              Secure Access
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Image src={speedometer} alt="icon" width="20" height="20" />
            <h1 className="text-sm text-center text-gray-200 ml-2">
              High Speed
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Image src={family} alt="icon" width="20" height="20" />
            <h1 className="text-sm text-center text-gray-200 ml-2">
              Family Safe
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}