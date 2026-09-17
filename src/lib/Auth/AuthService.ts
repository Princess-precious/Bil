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

  static login (data) {
    console.log("This is auth user data from authservice")
    const storageData = localStorage.setItem("user", JSON.stringify(data));
    return storageData;
    // if (data.accessToken){
      
    // }
    throw new Error("Could not set auth user credentials")
    
  }
  //Ensure user token is collected and stored to localstorage

  static async logout() {
    const currentUser = localStorage.getItem("user");

    if (!currentUser) {
      throw new Error("User does not exist");
    }

    const user = JSON.parse(currentUser);

    const refreshToken = user.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token does not exist");
    }

    await http.publicRequest(
      "POST",
      "/api/v1/auth/logout",
      {
        refreshToken,
      }
    );

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
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