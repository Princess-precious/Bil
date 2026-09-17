/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 16/09/2026 - 16:36:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { http } from "../../https";

export interface CreateArticleData {
  title: string;
  content: string;
  categoryId: string;
  excerpt?: string;
  status?: "draft" | "published";
  file?: File;
}

export const createArticle = async (data: CreateArticleData) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("categoryId", data.categoryId);

  if (data.excerpt) {
    formData.append("excerpt", data.excerpt);
  }

  if (data.status) {
    formData.append("status", data.status);
  }

  if (data.file) {
    formData.append("file", data.file);
  }
  const response = await http.publicRequest(
  "POST",
  "/api/v1/articles",
  formData
);

return response.data;

};


export const publishArticle = async (id: string) => {
  const response = await http.publicRequest(
    "PATCH",
    `/api/v1/articles/${id}/publish`
  );

  return response.data;
};

 