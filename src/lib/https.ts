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
import { AuthService } from "./Auth/AuthService";

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
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token does not exist");
    }

    const isFormData = data instanceof FormData;

    return api.request({
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
  },
};