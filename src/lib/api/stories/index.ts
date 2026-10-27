/**
 * @description      :
 * @author           : HP
 * @group            :
 * @created          : 15/09/2026 - 13:48:27
 *
 * MODIFICATION LOG
 * - Version         : 1.0.2
 * - Date            : 15/10/2026
 * - Author          : HP
 * - Modification    : Added article status (draft/published), publish and delete
 */

import { http } from "../../https";
import {
  findFirstArray,
  pickString,
  resolveAuthor,
} from "../normalize";
import { getUserSummary } from "../users";

export type StoryStatus = "draft" | "published";

interface ApiArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status?: StoryStatus;
  publishedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;

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
  status: StoryStatus;
}

const mapArticle = (article: ApiArticle): Story => ({
  id: article.id,
  slug: article.slug,
  category: article.category?.name || "",
  author: article.author?.name || "",
  title: article.title,
  excerpt: article.excerpt,

  // Drafts have no publishedAt, so fall back to the last edit date
  date:
    article.publishedAt ||
    article.updatedAt ||
    article.createdAt ||
    "",

  // Use the actual Cloudinary URL
  coverImage: article.coverImage || "",

  content: article.content || article.body || "",

  status: article.status === "draft" ? "draft" : "published",
});

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

  return articles.map((article: ApiArticle) =>
    mapArticle(article)
  );
};

// Returns the user's drafts AND published stories.
// Split them by `status` in the UI.
export const getMyStories = async (): Promise<Story[]> => {
  const response = await http.privateRequest(
    "GET",
    "/articles/me/articles?page=1&limit=100"
  );

  const articles = response.data.data.articles;

  return articles.map((article: ApiArticle) =>
    mapArticle(article)
  );
};

export const getStoryBySlug = async (
  slug: string
): Promise<Story> => {
  const response = await http.publicRequest(
    "GET",
    `/articles/${slug}`
  );

  return mapArticle(response.data.data);
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

// PATCH /articles/:id/publish - turns a draft into a published story
export const publishStory = async (id: string) => {
  const response = await http.privateRequest(
    "PATCH",
    `/articles/${id}/publish`
  );

  return response.data;
};

// PATCH /articles/:id/unpublish - moves a published story back to drafts
export const unpublishStory = async (id: string) => {
  const response = await http.privateRequest(
    "PATCH",
    `/articles/${id}/unpublish`
  );

  return response.data;
};

// DELETE /articles/:id - permanently deletes a story or draft
export const deleteStory = async (id: string) => {
  const response = await http.privateRequest(
    "DELETE",
    `/articles/${id}`
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