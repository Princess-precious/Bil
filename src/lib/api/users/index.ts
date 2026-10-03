/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 16/09/2026 - 05:42:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { http } from "../../https";
import { resolveAuthor } from "../normalize";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await http.privateRequest(
    "GET",
    "/users/user"
  );

  console.log("PROFILE RESPONSE FROM API:", response.data);
  console.log("PROFILE DATA RETURNED:", response.data.data);

  return response.data.data;
}

export interface UpdateProfileData {
  name: string;
  username: string;
  bio: string;
}

export async function updateUserProfile(
  data: UpdateProfileData
) {
  const response = await http.privateRequest(
    "PATCH",
    "/users/update-profile",
    data
  );

  return response.data;
}

export async function updateProfileImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  const response = await http.privateRequest(
  "POST",
  "/users/user/profile-image",
  formData,
  {
    "Content-Type": "multipart/form-data",
  }
);
  

  return response.data;
}

export async function deleteAccount() {
  const response = await http.privateRequest(
    "DELETE",
    "/users/delete-account"
  );

  return response.data;
}

export interface UserSummary {
  name: string;
  image: string;
}

/**
 * Endpoint that returns a single user by id.
 *
 * The comments endpoint only returns author ids, so commenters are resolved
 * through here. Change this path if the API names it differently.
 */
const USER_BY_ID_PATH = (userId: string) => `/users/${userId}`;

/** Cache and in-flight de-duping, so N comments cost one request per author. */
const userSummaryCache = new Map<string, UserSummary>();

const userSummaryRequests = new Map<
  string,
  Promise<UserSummary>
>();

/**
 * Returns a user's display name and profile image.
 *
 * Never throws: an unresolvable author yields empty fields so the caller can
 * fall back to a placeholder rather than failing the whole comment list.
 */
export const getUserSummary = async (
  userId: string
): Promise<UserSummary> => {
  const cached = userSummaryCache.get(userId);

  if (cached) {
    return cached;
  }

  const pending = userSummaryRequests.get(userId);

  if (pending) {
    return pending;
  }

  const request = (async (): Promise<UserSummary> => {
    try {
      // Send the token when there is one, so this works whether the endpoint
      // is public or authenticated. Logged-out readers just get the
      // placeholder instead of an error.
      const hasToken = Boolean(
        localStorage.getItem("accessToken")
      );

      const response = hasToken
        ? await http.privateRequest(
            "GET",
            USER_BY_ID_PATH(userId)
          )
        : await http.publicRequest(
            "GET",
            USER_BY_ID_PATH(userId)
          );

      const body = response.data as Record<string, unknown>;
      const user = (body?.data || body) as Record<string, unknown>;

      return resolveAuthor(user);
    } catch (error) {
      console.error(
        "FAILED TO LOAD COMMENT AUTHOR:",
        userId,
        error
      );

      return { name: "", image: "" };
    } finally {
      userSummaryRequests.delete(userId);
    }
  })();

  userSummaryRequests.set(userId, request);

  const summary = await request;

  userSummaryCache.set(userId, summary);

  return summary;
};