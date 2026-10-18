/**
 * @description : Helpers for reading API responses whose envelopes differ
 *                between endpoints.
 */

/**
 * Walks a response body and returns the first array it finds.
 *
 * Endpoints in this API do not share one envelope, so locate the array
 * instead of relying on a single fixed key.
 */
export const findFirstArray = (
  value: unknown,
  depth = 0
): unknown[] | null => {
  if (depth > 4) {
    return null;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    for (const child of Object.values(
      value as Record<string, unknown>
    )) {
      const found = findFirstArray(child, depth + 1);

      if (found) {
        return found;
      }
    }
  }

  return null;
};

/**
 * Returns the first non-empty string stored under any of `keys`.
 */
export const pickString = (
  source: unknown,
  keys: string[]
): string => {
  if (!source || typeof source !== "object") {
    return "";
  }

  const record = source as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return "";
};

/**
 * Returns the first string whose key matches `pattern`.
 *
 * Also unwraps `{ url }`-style values, which is how image fields are often
 * returned.
 */
export const pickByKeyPattern = (
  source: unknown,
  pattern: RegExp
): string => {
  if (!source || typeof source !== "object") {
    return "";
  }

  const record = source as Record<string, unknown>;

  for (const [key, value] of Object.entries(record)) {
    if (!pattern.test(key)) {
      continue;
    }

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    const nested = pickString(value, [
      "url",
      "secureUrl",
      "secure_url",
      "href",
    ]);

    if (nested) {
      return nested;
    }
  }

  return "";
};

/**
 * Returns the first of `sources` that holds a usable value, so callers can
 * search an object and its nested user/author objects without guarding each
 * one.
 */
export const pickFromSources = (
  sources: unknown[],
  keys: string[]
): string => {
  for (const source of sources) {
    const value = pickString(source, keys);

    if (value) {
      return value;
    }
  }

  return "";
};

/**
 * Looks for an explicit key first, then falls back to matching any key by
 * pattern. Keeps known field names deterministic while still catching the
 * spellings the API uses in other places.
 */
export const pickField = (
  sources: unknown[],
  keys: string[],
  pattern: RegExp
): string => {
  const byKey = pickFromSources(sources, keys);

  if (byKey) {
    return byKey;
  }

  for (const source of sources) {
    const byPattern = pickByKeyPattern(source, pattern);

    if (byPattern) {
      return byPattern;
    }
  }

  return "";
};

/**
 * Keys that may hold the commenter, e.g. `user`, `author`, `createdBy`.
 */
export const AUTHOR_KEY_PATTERN =
  /user|author|owner|creator|profile|account|commenter/i;

export const NAME_KEYS = [
  "name",
  "username",
  "fullName",
  "full_name",
  "userName",
  "user_name",
  "displayName",
  "display_name",
  "handle",
];

export const IMAGE_KEYS = [
  "profileImage",
  "profile_image",
  "profilePicture",
  "profile_picture",
  "avatar",
  "avatarUrl",
  "avatar_url",
  "image",
  "imageUrl",
  "image_url",
  "photo",
  "picture",
];

export const NAME_PATTERN = /name|username|handle/i;

export const IMAGE_PATTERN = /image|avatar|photo|picture/i;

/**
 * Keys that may hold a user id on a record that only references its author.
 */
export const ID_KEYS = [
  "userId",
  "user_id",
  "authorId",
  "author_id",
  "createdById",
  "created_by_id",
];

/**
 * Resolves a display name and image from any object that may describe a user,
 * searching nested author-ish objects and matching unknown key spellings.
 */
export const resolveAuthor = (
  source: Record<string, unknown>
): { name: string; image: string } => {
  const sources: unknown[] = [];

  for (const [key, value] of Object.entries(source)) {
    if (
      !value ||
      typeof value !== "object" ||
      !AUTHOR_KEY_PATTERN.test(key)
    ) {
      continue;
    }

    sources.push(value);

    for (const [childKey, childValue] of Object.entries(
      value as Record<string, unknown>
    )) {
      if (
        childValue &&
        typeof childValue === "object" &&
        AUTHOR_KEY_PATTERN.test(childKey)
      ) {
        sources.push(childValue);
      }
    }
  }

  sources.push(source);

  return {
    name: pickField(sources, NAME_KEYS, NAME_PATTERN),
    image: pickField(sources, IMAGE_KEYS, IMAGE_PATTERN),
  };
};
