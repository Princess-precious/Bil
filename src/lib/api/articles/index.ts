/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 18/09/2026 - 10:45:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/09/2026
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
}

/**
 * Create article
 */
export const createArticle = async (
  data: CreateArticleData
) => {
  const payload = {
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,

    ...(data.excerpt?.trim()
      ? { excerpt: data.excerpt.trim() }
      : {}),

    ...(data.status
      ? { status: data.status }
      : {}),
  };

  const idempotencyKey = crypto.randomUUID();

  const response = await http.privateRequest(
    "POST",
    "/articles",
    payload,
    {
      "Idempotency-Key": idempotencyKey,
    }
  );

  return response.data;
};

/**
 * Upload article cover image
 *
 * Backend:
 * POST /api/v1/articles/:id/cover-image
 *
 * Form field:
 * file
 */
export const uploadArticleCoverImage = async (
  articleId: string,
  file: File
) => {
  if (!articleId) {
    throw new Error("Article ID is missing.");
  }

  if (!file) {
    throw new Error("Cover image is missing.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Cover image must be smaller than 5 MB.");
  }

  const formData = new FormData();

  formData.append("file", file);

  console.log("Uploading cover image:", {
    articleId,
    name: file.name,
    type: file.type,
    size: file.size,
  });

  const response = await http.privateRequest(
    "POST",
    `/articles/${articleId}/cover-image`,
    formData
  );

  console.log(
    "Cover image upload response:",
    response.data
  );

  return response.data;
};

/**
 * Publish article
 */
export const publishArticle = async (
  articleId: string
) => {
  const response = await http.privateRequest(
    "PATCH",
    `/articles/${articleId}/publish`
  );

  return response.data;
};

/**
 * Save article
 */
export const saveArticle = async (
  articleId: string
) => {
  const response = await http.privateRequest(
    "POST",
    `/articles/${articleId}/save`
  );

  return response.data;
};

/**
 * Unsave article
 */
export const unsaveArticle = async (
  articleId: string
) => {
  const response = await http.privateRequest(
    "DELETE",
    `/articles/${articleId}/unsave`
  );

  return response.data;
};

/**
 * Check whether article is saved
 */
export const isArticleSaved = async (
  articleId: string
) => {
  const response = await http.privateRequest(
    "GET",
    `/articles/${articleId}/save`
  );

  return response.data;
};

/**
 * Get saved articles
 */
export const getSavedArticles = async () => {
  const response = await http.privateRequest(
    "GET",
    "/articles/me/saved"
  );

  return response.data;
};