"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/components/templates/template";
import InputForm from "@/app/components/molecules/input-form";
import Button from "@/app/components/atoms/button";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tokenCount: "",
    tokenDuration: "",
    downloadSpeed: "",
    uploadSpeed: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Data disimpan:", formData);
    setIsEdit(false);
  };

  return (
    <Template>
      <div className="text-black w-full border-gray-700">
        <div className="m-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Setting</h2>

          <InputForm
            textValue="Token count"
            name="tokenCount"
            type="number"
            value={formData.tokenCount}
            onChange={handleChange}
            placeholder="Total token"
            className="mt-3 w-full"
            inputClass=""
            readOnly={true}
          />

          <InputForm
            textValue="Token duration"
            name="tokenDuration"
            type="number"
            value={formData.tokenDuration}
            onChange={handleChange}
            placeholder="Set the token duration here"
            className="mt-3 w-full"
            inputClass=""
          />

          <InputForm
            textValue="Upload speed"
            name="uploadSpeed"
            type="number"
            value={formData.uploadSpeed}
            onChange={handleChange}
            placeholder="Set the upload speed here"
            className="mt-3 w-full"
            inputClass=""
          />

          <InputForm
            textValue="Download speed"
            name="downloadSpeed"
            type="number"
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
          >
            Save
          </Button>
        </div>
      </div>
    </Template>
  );
}
