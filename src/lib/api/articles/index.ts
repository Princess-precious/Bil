/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 17/09/2026 - 14:48:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2026
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
    // Matched key to backend 'coverImage'
    formData.append("coverImage", data.file);
  }

  const idempotencyKey = crypto.randomUUID();

  const response = await http.privateRequest(
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
    `/articles/${id}/publish`
  );

  return response.data;
};

export const saveArticle = async (id: string) => {
  const response = await http.privateRequest(
    "POST",
    `/articles/${id}/save`
  );

  return response.data;
};

export const unsaveArticle = async (id: string) => {
  const response = await http.privateRequest(
    "DELETE",
    `/articles/${id}/unsave`
  );

  return response.data;
};

export const isArticleSaved = async (id: string) => {
  const response = await http.privateRequest(
    "GET",
    `/articles/${id}/save`
  );

  return response.data;
};

export const getSavedArticles = async () => {
  const response = await http.privateRequest(
    "GET",
    "/articles/me/saved"
  );

  return response.data;
};


export const uploadCoverImage = async (articleId: string, file: File) => {
  const formData = new FormData();
  
  formData.append("coverImage", file);

  const response = await http.privateRequest(
    "POST",
    `/articles/${articleId}/coverimage`,
    formData
  );

  return response.data;
};
