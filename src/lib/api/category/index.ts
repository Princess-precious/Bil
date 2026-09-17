import { http } from "../../https";

export interface Category {
  id: string;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await http.publicRequest(
    "GET",
    "/categories"
  );

  return response.data.data;
};