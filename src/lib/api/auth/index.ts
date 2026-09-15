import { data } from "react-router-dom";
import { http } from "../../https";

/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 14/09/2026 - 16:03:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/09/2026
    * - Author          : HP
    * - Modification    : 
**/
export interface loginData{

email:string;
password:string;

}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}


export interface GoogleLoginData {
  credential: string;
}

export interface signupData{
    name:string;
    username:string;
    email:string;
    password:string;
}


export interface changePasswordData{
    oldPassword:string;
    newPassword:string;
    confirmPassword:string;
}


export interface forgetPasswordData{
    email:string;
}


export async function signinUser( data:loginData):Promise<LoginResponse>{ 
  const response = await http.publicRequest(
    "POST",
    "/auth/login",
    data
  );

  return response.data;


} 


export async function googlelogin( data:GoogleLoginData){ 
      
  const response = await http.publicRequest(
    "POST",
    "/auth/login",
    data
  );

  return response.data;

    
}

export async function signupUser( data:signupData){ 
const idempotencyKey = crypto.randomUUID();

  const response = await http.publicRequest(
    "POST",
    "auth/register",
    data,
    {
       "Idempotency-Key": idempotencyKey,
    }
  );

  return response.data;


}

export async function changepassword( data:changePasswordData){ 

    
}

export async function forgetpassword( data:forgetPasswordData){ 

  
    
}