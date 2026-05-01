"use client";
import { useEffect, useState } from "react";
import Template from "@/app/components/templates/template";
import InputForm from "@/app/components/molecules/input-form";
import Button from "@/app/components/atoms/button";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://192.168.3.3:8000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        name: data.data.name,
        username: data.data.username,
      }));
    } catch (err) {
      toast.error("An error occured!", {
        position: "top-right",
        autoClose: 2000,
      }); console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.password && formData.password !== formData.password_confirmation) {
      toast.error("Password is not match!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");

      const body = {
        name: formData.name,
        username: formData.username,
      };

      // Hanya kirim password kalau diisi
      if (formData.password) {
        body.password = formData.password;
        body.password_confirmation = formData.password_confirmation;
      }

      const res = await fetch("http://192.168.3.3:8000/api/admin/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Gagal menyimpan profil");

      toast.success("Profile updated!", {
        position: "top-right",
        autoClose: 2000,
      });
      setIsEdit(false);

      // Reset password field
      setFormData((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
      }));
    } catch (err) {
      toast.error("Gagal menyimpan profil.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setFormData((prev) => ({
      ...prev,
      password: "",
      password_confirmation: "",
    }));
  };

  return (
    <Template>
      <div className="text-black w-full border-gray-700">
        <div className="m-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>

          {isLoading ? (
            <p className="text-gray-500">Loading profile...</p>
          ) : (
            <>
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
                textValue="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-3 w-full"
                inputClass=""
                readOnly={!isEdit}
              />

              {isEdit && (
                <div>
                  <InputForm
                    textValue="Password baru (opsional)"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Kosongkan jika tidak ingin ganti password"
                    className="mt-3 w-full"
                    inputClass=""
                  />
                  <InputForm
                    textValue="Re-type password"
                    name="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
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
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      buttonStyle="red"
                      className="w-150 py-3"
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </Template>
  );
}