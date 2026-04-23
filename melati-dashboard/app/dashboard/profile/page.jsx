"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/app/components/templates/template";
import InputForm from "@/app/components/molecules/input-form";
import Button from "@/app/components/atoms/button";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk menyimpan data
  const handleSave = () => {
    // Validasi repassword di sini jika perlu
    if (formData.password !== formData.repassword) {
      alert("Password tidak cocok!");
      return;
    }
    
    console.log("Data disimpan:", formData);
    setIsEdit(false); // Keluar dari mode edit setelah simpan
  };

  return (
    <Template>
      <div className="text-black w-full border-gray-700">
        <div className="m-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>

          <InputForm
            textValue="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-3 w-full"
            inputClass=""
            readOnly={!isEdit}
          />

          <InputForm
            textValue="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-3 w-full"
            inputClass=""
            readOnly={!isEdit}
          />
          
          {isEdit && (
            <div>
              <InputForm
                textValue="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-3 w-full"
                inputClass=""
              />
              <InputForm
                textValue="Re-type password"
                name="repassword"
                type="password" // Diperbaiki: Tipe diubah ke password valid
                value={formData.repassword}
                onChange={handleChange}
                placeholder="Re-type your password"
                className="mt-3 w-full"
                inputClass=""
              />
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {!isEdit ? (
              <Button
                onClick={() => setIsEdit(true)}
                buttonStyle="blue"
                className="w-150 py-3"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  buttonStyle="white"
                  className="w-150 py-3"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEdit(false)}
                  buttonStyle="red"
                  className="w-150 py-3"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Template>
  );
}