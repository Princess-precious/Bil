
import { http } from "../../https";
import { AuthService } from "../../Auth/AuthService";

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


export interface resetPasswordData {
  token: string;
  password: string;
}






export async function signinUser(data: loginData) {
  const response = await http.publicRequest(
    "POST",
    "/auth/login",
    data
  );

  console.log(
    "This is the expected response from the api call",
    response.data.data
  );

  AuthService.login(response.data.data);

  return response.data.data;
}


export async function googleLogin(){ 
      
  window.location.href = `${import.meta.env.VITE_BILLET_API_URL}/auth/google`;

    
}

export async function signupUser(data: signupData) { 
  const idempotencyKey = crypto.randomUUID();

  const response = await http.publicRequest(
    "POST",
    "/auth/register",
    data,
    {
      "Idempotency-Key": idempotencyKey,
    }
  );

  return response.data;
}

export async function changepassword(data: changePasswordData) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await http.publicRequest(
    "PATCH",
    "/auth/change-password",
    data,
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  return response.data;
}

export async function forgetPassword( data:forgetPasswordData){ 

   const response = await http.publicRequest(
    "POST",
    "/auth/forgot-password",
    data,
  );
   return response.data;
}
    



export async function resetpassword(data: resetPasswordData) {
  const response = await http.publicRequest(
    "PATCH",
    "/auth/reset-password",
    data
  );

  return response.data;
}
