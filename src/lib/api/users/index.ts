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