/**
 * @description      :
 * @author           : HP
 * @group            :
 * @created          : 15/09/2026 - 13:48:27
 *
 * MODIFICATION LOG
 * - Version         : 1.0.1
 * - Date            : 18/09/2026
 * - Author          : HP
 * - Modification    : Use Cloudinary coverImage URL instead of public ID
 */

import { http } from "../../https";
import {
  findFirstArray,
  pickString,
  resolveAuthor,
} from "../normalize";
import { getUserSummary } from "../users";

interface ApiArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;

  // Cloudinary image URL
  coverImage: string | null;

  // Cloudinary public ID, used for image management/deletion
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

export const getStories = async (
  search?: string
): Promise<Story[]> => {
  const response = await http.publicRequest(
    "GET",
    search
      ? `/articles?search=${encodeURIComponent(search)}`
      : "/articles"
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

    // Use the actual Cloudinary URL
    coverImage: article.coverImage || "",

    content: article.content || article.body || "",
  }));
};

export const getMyStories = async (): Promise<Story[]> => {
  const response = await http.privateRequest(
  "GET",
  "/articles/me/articles"
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

    // Use the actual Cloudinary URL
    coverImage: article.coverImage || "",

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

    // Use the actual Cloudinary URL
    coverImage: article.coverImage || "",

    content: article.content || article.body || "",
  };
};

export const updateStory = async (
  id: string,
  data: {
    title: string;
    content: string;
    excerpt: string;
  }
) => {
  const response = await http.privateRequest(
    "PATCH",
    `/articles/${id}`,
    data
  );

  return response.data;
};

export interface Comment {
  id: string;
  content: string;
  userId: string;
  authorName: string;
  authorImage: string;
}

/**
 * Keys that may hold the author's id on a comment that references rather than
 * embeds its user.
 */
const COMMENT_ID_KEYS = [
  "userId",
  "user_id",
  "authorId",
  "author_id",
  "createdById",
  "created_by_id",
];

const getCommentUserId = (
  comment: Record<string, unknown>
): string => {
  const direct = pickString(comment, COMMENT_ID_KEYS);

  if (direct) {
    return direct;
  }

  // `user`/`author` may themselves hold the raw id.
  for (const key of ["user", "author"]) {
    const value = comment[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return "";
};

/**
 * The comments endpoint returns the author's id but not the author, so the
 * display name and image are resolved through the users endpoint.
 */
const resolveCommentAuthor = async (
  comment: Comment
): Promise<Comment> => {
  if (!comment.userId) {
    return comment;
  }

  if (comment.authorName && comment.authorImage) {
    return comment;
  }

  const summary = await getUserSummary(comment.userId);

  return {
    ...comment,
    authorName: comment.authorName || summary.name,
    authorImage: comment.authorImage || summary.image,
  };
};

export const getComments = async (
  articleId: string
): Promise<Comment[]> => {
  const response = await http.publicRequest(
    "GET",
    `/articles/${articleId}/comments`
  );

  console.log("COMMENTS RESPONSE:", response.data);

  const list = findFirstArray(response.data) || [];

  const comments = list.map((raw) => {
    const comment = (raw || {}) as Record<string, unknown>;

    const author = resolveAuthor(comment);

    return {
      id: String(comment.id || comment._id || ""),
      content: String(
        comment.content || comment.body || comment.text || ""
      ),
      userId: getCommentUserId(comment),
      authorName: author.name,
      authorImage: author.image,
    };
  });

  return Promise.all(comments.map(resolveCommentAuthor));
};


export const createComment = async (
  articleId: string,
  content: string
) => {
  const response = await http.privateRequest(
    "POST",
    `/articles/${articleId}/comments`,
    {
      content: content.trim(),
    },
    {
      "Idempotency-Key": crypto.randomUUID(),
    }
  );

  return response.data;
};

export const deleteComment = async (
  articleId: string,
  commentId: string
) => {
  const response = await http.privateRequest(
    "DELETE",
    `/articles/${articleId}/comments/${commentId}`
  );

  return response.data;
};