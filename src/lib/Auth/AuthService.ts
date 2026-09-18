/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 16/09/2026 - 12:56:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/09/2026
    * - Author          : HP
    * - Modification    : 
**/


// interface ILoginUser {
//   accessToken: string;
//   bearerToken: string;
//   name: string;
// }

import { http } from "../https";

export class AuthService {

    static login(data) {
    console.log("LOGIN DATA RECEIVED BY AUTHSERVICE:", data);

    localStorage.setItem("user", JSON.stringify(data));

    if (data.accessToken) {
      console.log("ACCESS TOKEN FOUND");
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      console.log("NO ACCESS TOKEN FOUND");
    }

    if (data.refreshToken) {
      console.log("REFRESH TOKEN FOUND");
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      console.log("NO REFRESH TOKEN FOUND");
    }
}



  //Ensure user token is collected and stored to localstorage




  static async refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token does not exist");
  }

  const response = await http.publicRequest(
    "POST",
    "/auth/refresh",
    {
      refreshToken,
    }
  );

  const newAccessToken = response.data.data.accessToken;

  localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken;
}

  static async logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token does not exist");
    }

    await http.publicRequest(
      "POST",
      "/auth/logout",
      {
        refreshToken,
      }
    );
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static  getCurrentUser(){
    const currentUser = localStorage.getItem("user");
    if (currentUser){
      return JSON.parse(currentUser);
    }else{
      throw Error ("User does not exist")
    }
    //Fetch and return the user:IloginUser from local storage
  }

  static async isAuthenticated(){
    if( AuthService.getCurrentUser()){
      return true
    }
    return false;
    //Return true or false depending on if the user is authenticated or not
  }
}