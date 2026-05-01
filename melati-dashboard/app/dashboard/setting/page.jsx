"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/components/templates/template";
import InputForm from "@/app/components/molecules/input-form";
import Button from "@/app/components/atoms/button";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tokenCount: "",
    tokenDuration: "",
    downloadSpeed: "",
    uploadSpeed: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://192.168.3.3:8000/api/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      setFormData({
        tokenCount: data.data.token_count,
        tokenDuration: data.data.token_duration_hours,
        downloadSpeed: data.data.wifi_download_speed,
        uploadSpeed: data.data.wifi_upload_speed,
      });
    } catch (err) {
      toast.error("Get setting data failed!", {
        position: "top-right",
        autoClose: 2000,
      }); console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://192.168.3.3:8000/api/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token_count: formData.tokenCount,
          token_duration_hours: formData.tokenDuration,
          wifi_download_speed: formData.downloadSpeed,
          wifi_upload_speed: formData.uploadSpeed,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Gagal menyimpan settings");

      toast.success("Setting saved successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Setting saved failed!", {
        position: "top-right",
        autoClose: 2000,
      });
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Template>
      <div className="text-black w-full border-gray-700">
        <div className="m-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Setting</h2>

          {isLoading ? (
            <p className="text-gray-500">Loading settings...</p>
          ) : (
            <>
              <InputForm
                textValue="Token count"
                name="tokenCount"
                type="number"
                value={formData.tokenCount}
                onChange={handleChange}
                placeholder="Total token"
                className="mt-3 w-full"
                inputClass=""
              />

              <InputForm
                textValue="Token duration (hours)"
                name="tokenDuration"
                type="number"
                value={formData.tokenDuration}
                onChange={handleChange}
                placeholder="Set the token duration here"
                className="mt-3 w-full"
                inputClass=""
              />

              <InputForm
                textValue="Upload speed (e.g. 5M)"
                name="uploadSpeed"
                type="text"
                value={formData.uploadSpeed}
                onChange={handleChange}
                placeholder="Set the upload speed here"
                className="mt-3 w-full"
                inputClass=""
              />

              <InputForm
                textValue="Download speed (e.g. 10M)"
                name="downloadSpeed"
                type="text"
                value={formData.downloadSpeed}
                onChange={handleChange}
                placeholder="Set the download speed here"
                className="mt-3 w-full"
                inputClass=""
              />

              <Button
                onClick={handleSave}
                buttonStyle="white"
                className="w-150 py-3 mt-8"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </Template>
  );
}