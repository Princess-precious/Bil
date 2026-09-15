/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 15/09/2026 - 10:14:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/09/2026
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
    data?: unknown
  ) => {
    return api.request({
      method,
      url,
      data,
    });
  },
};