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


interface ILoginUser {
  accessToken: string;
  bearerToken: string;
  name: string;
}

export class AuthService {

  static async login (data: ILoginUser) {
    if (data.accessToken){
      localStorage.setItem("user", data.toString());
    }
    throw new Error("Could not set auth user credentials")
    //Ensure user token is collected and stored to localstorage
  }

  static async logout(){
    localStorage.removeItem("user")
    // Delete the user:ILoginUser from local storage
  }

  static async getCurrentUser(){
    const currentUser = localStorage.getItem("user");
    if (currentUser){
      return JSON.parse(currentUser);
    }
    throw Error ("User does not exist")
    //Fetch and return the user:IloginUser from local storage
  }

  static async isAuthenticated(){
    if(await AuthService.getCurrentUser()){
      return true
    }
    return false;
    //Return true or false depending on if the user is authenticated or not
  }
}