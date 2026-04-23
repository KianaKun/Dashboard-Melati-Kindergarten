export const adminLogin = async (username, password) => {
  const res = await fetch("http://192.168.3.3:8000/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const json = await res.json();

  if (res.ok && json.success) {
    localStorage.setItem("token", json.data.token);
    return { success: true };
  }

  return { success: false, message: json.message };
};