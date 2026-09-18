/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 17/09/2026 - 09:16:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2026
    * - Author          : HP
    * - Modification    : 
**/
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
    headers?:Record<string, string>
    
  ) => {
    return api.request({
      method,
      url,
      data,
      headers,
    });
  },

 privateRequest: async (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: unknown,
  headers?: Record<string, string>
) => {
  let token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token does not exist");
  }

  const isFormData = data instanceof FormData;

  try {
    return await api.request({
      method,
      url,
      data,
      headers: {
        ...(isFormData
          ? {}
          : { "Content-Type": "application/json" }),

        Authorization: `Bearer ${token}`,

        ...headers,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw error;
      }

      const refreshResponse = await api.request({
        method: "POST",
        url: "/auth/refresh",
        data: {
          refreshToken,
        },
      });

      const newAccessToken = refreshResponse.data.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      token = newAccessToken;

      return await api.request({
        method,
        url,
        data,
        headers: {
          ...(isFormData
            ? {}
            : { "Content-Type": "application/json" }),

          Authorization: `Bearer ${token}`,

          ...headers,
        },
      });
    }

    throw error;
  }
},
};