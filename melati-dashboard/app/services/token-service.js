export const fetchTokensFromAPI = async ({ page = 1, filter = "ALL" }) => {
  try {
    const token = localStorage.getItem("token");

    let status = "";
    if (filter === "ACTIVE") status = "active";
    if (filter === "USED") status = "used";
    if (filter === "EXPIRED") status = "expired";

    const url = `http://192.168.3.3:8000/api/tokens?page=${page}${status ? `&status=${status}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { success: false };
    }

    const json = await res.json();

    return {
      success: true,
      data: json.data,
    };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};