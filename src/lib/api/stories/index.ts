/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 15/09/2026 - 13:48:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/09/2026
    * - Author          : HP
    * - Modification    : 
**/

import { http } from "../../https";

interface ApiArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImagePublicId: string | null;
  author: {
    name: string;
  } | null;
  category: {
    name: string;
  } | null;
  content?: string; 
  body?: string;
}

export interface Story {
  id: string;
  slug: string;
  category: string;
  author: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  content: string;
}

export const getStories = async (): Promise<Story[]> => {
  const response = await http.publicRequest("GET", "/articles");

  const articles = response.data.data.articles;

  return articles.map((article: ApiArticle) => ({
    id: article.id,
    slug: article.slug,
    category: article.category?.name || "",
    author: article.author?.name || "",
    title: article.title,
    excerpt: article.excerpt,
    date: article.publishedAt,
    coverImage: article.coverImagePublicId || "",
    content: article.content || article.body || "", // Added content mapping
  }));
};

export const getMyStories = async (): Promise<Story[]> => {
  const response = await http.publicRequest(
    "GET",
    "/articles/my-article"
  );

  const articles = response.data.data.articles;

  return articles.map((article: ApiArticle) => ({
    id: article.id,
    slug: article.slug,
    category: article.category?.name || "",
    author: article.author?.name || "",
    title: article.title,
    excerpt: article.excerpt,
    date: article.publishedAt,
    coverImage: article.coverImagePublicId || "",
    content: article.content || article.body || "", 
  }));
};

export const getStoryBySlug = async (
  slug: string
): Promise<Story> => {
  const response = await http.publicRequest(
    "GET",
    `/articles/${slug}`
  );

  const article = response.data.data;

  return {
    id: article.id,
    slug: article.slug,
    category: article.category?.name || "",
    author: article.author?.name || "",
    title: article.title,
    excerpt: article.excerpt,
    date: article.publishedAt,
    coverImage: article.coverImagePublicId || "",
    content: article.content || article.body || "", // Added content mapping
  };
};