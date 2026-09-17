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

  const idempotencyKey = crypto.randomUUID();

  const response = await http.publicRequest(
  "POST",
  "/articles",
  formData,
  {
      "Idempotency-Key": idempotencyKey,
    }

);

return response.data;

};


export const publishArticle = async (id: string) => {
  const response = await http.publicRequest(
    "PATCH",
    `articles/${id}/publish`
  );

  return response.data;
};

 