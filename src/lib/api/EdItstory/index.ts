import { http } from "../../https";

export interface UpdateArticleData {
  title?: string;
  content?: string;
  excerpt?: string;
}

export const updateArticle = async (
  id: string,
  data: UpdateArticleData
) => {
  const response = await http.publicRequest(
    "PATCH",
    `/api/v1/articles/${id}`,
    data
  );

  return response.data;
};

export const updateCoverImage = async (
  id: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await http.publicRequest(
    "POST",
    `/api/v1/articles/${id}/cover-image`,
    formData
  );

  return response.data;
};