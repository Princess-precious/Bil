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
 */

import { http } from "../../https";

export interface CreateArticleData {
  title: string;
  content: string;
  categoryId: string;
  excerpt?: string;
  status?: "draft" | "published";
  file?: File;
}

/**
 * Upload a standalone image.
 * Backend endpoint:
 * POST /api/v1/upload/image
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await http.privateRequest(
    "POST",
    "/upload/image",
    formData
  );

  console.log("IMAGE UPLOAD RESPONSE:", response.data);

  // Expected backend response:
  // {
  //   data: {
  //     url: "https://res.cloudinary.com/..."
  //   }
  // }

  const imageUrl = response.data?.data?.url;

  if (!imageUrl) {
    throw new Error("Image upload succeeded but no image URL was returned.");
  }

  return imageUrl;
};

/**
 * Create article.
 *
 * If an image file is supplied:
 * 1. Upload image to /upload/image
 * 2. Receive Cloudinary URL
 * 3. Send URL as coverImage when creating article
 */
export const createArticle = async (data: CreateArticleData) => {
  let coverImageUrl: string | undefined;

  // Upload image first
  if (data.file) {
    coverImageUrl = await uploadImage(data.file);

    console.log("CLOUDINARY IMAGE URL:", coverImageUrl);
  }

  // Article payload
  const payload = {
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,
    ...(data.excerpt && { excerpt: data.excerpt }),
    ...(data.status && { status: data.status }),
    ...(coverImageUrl && { coverImage: coverImageUrl }),
  };

  console.log("CREATE ARTICLE PAYLOAD:", payload);

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
 * Publish an existing article
 */
export const publishArticle = async (id: string) => {
  const response = await http.privateRequest(
    "PATCH",
    `/articles/${id}/publish`
  );

  return response.data;
};

/**
 * Save article
 */
export const saveArticle = async (id: string) => {
  const response = await http.privateRequest(
    "POST",
    `/articles/${id}/save`
  );

  return response.data;
};

/**
 * Unsave article
 */
export const unsaveArticle = async (id: string) => {
  const response = await http.privateRequest(
    "DELETE",
    `/articles/${id}/unsave`
  );

  return response.data;
};

/**
 * Check if article is saved
 */
export const isArticleSaved = async (id: string) => {
  const response = await http.privateRequest(
    "GET",
    `/articles/${id}/save`
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