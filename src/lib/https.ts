import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BILLET_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export const http = {
  publicRequest: async (
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => {
 const token = localStorage.getItem("accessToken");

    const isFormData = data instanceof FormData;

    return api.request({
      method,
      url,
      data,
      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...headers,
      },
    });
  },
};