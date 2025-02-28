import axios from "axios";

const api = axios.create({
  baseURL: "https://test-ecomerce.xn--hrt-w-ova.de/api",
  headers: {
    headers: { "User-Type": "personal" },
  },
});

export default api;
