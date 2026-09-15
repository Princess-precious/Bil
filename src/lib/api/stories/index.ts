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
}

export interface Story {
  id: string;
  category: string;
  author: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  caption: string;
}

export const getStories = async (): Promise<Story[]> => {
  const response = await http.publicRequest("GET", "/articles");

  const articles = response.data.data.articles;
  console.log("response data is here", articles)

  
    
  return articles.map((article: ApiArticle) => ({
    id: article.id,
    category: article.category?.name || "",
    author: article.author?.name ||"",
    title: article.title,
    excerpt: article.excerpt,
    date: article.publishedAt,
    coverImage: article.coverImagePublicId || "",
  }));
};

