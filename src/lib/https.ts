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
});

export const http = {
  publicRequest: async (
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    data?: unknown,
    headers?: Record<string, string>
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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token does not exist");
    }

    return api.request({
      method,
      url,
      data,
      headers: {
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};