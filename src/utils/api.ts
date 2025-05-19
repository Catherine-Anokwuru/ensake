import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_API ||
    "https://core-main-lgmkhu.laravel.cloud/assessment",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const deviceId = localStorage.getItem("ensake-device-id");
  const deviceName = localStorage.getItem("ensake-device-name");
  const deviceInfo =
    deviceId && deviceName
      ? `${deviceId}/web/${deviceName}`
      : "unknown";

  config.headers["Ensake-Device"] = deviceInfo;

  const token = localStorage.getItem("ensake-token");
  const expiry = localStorage.getItem("ensake-token-expiry");

  if (token && expiry && Date.now() < Number(expiry)) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
