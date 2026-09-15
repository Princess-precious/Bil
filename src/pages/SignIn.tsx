/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 14/09/2026 - 13:28:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {signinUser}  from "../lib/api/auth";
import {useMutation}  from  "@tanstack/react-query";



export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check empty fields
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Check email
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check password
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

         setIsLoading(true);

           try {
        const result = await signinUser({
           email,
           password,
          });

        console.log("Login successful:", result);
      
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);



       setSuccess("Signed in successfully!");

     if (rememberMe) {
    localStorage.setItem("rememberMe", "true");
     }

      setEmail("");
      setPassword("");

       navigate("/feed");
      } catch (error) {
        console.error("Login failed:", error);

        setError(
         error instanceof Error
      ? error.message
      : "Login failed. Please try again."
      );
       } finally {
         setIsLoading(false);
      }   

      
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("Password reset instructions have been sent to your email.");
    navigate("/forget-password")
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      {/* MAIN MODAL */}
      <div className="flex h-[90vh] w-[95vw] max-w-5xl  md:w-[60vw] overflow-hidden rounded-lg bg-white">

        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-gray-900 md:block">
          <div className="relative h-full overflow-hidden">

            <img
              src="signin.jpg"
              alt="Editorial"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            {/* LOGO */}
            <div className="absolute left-10 top-8 z-10">
              <h1 className="text-2xl font-bold text-white">
                BIL
              </h1>
            </div>

            {/* QUOTE */}
            <div className="absolute bottom-12 left-10 z-10 text-white">
              <p className="max-w-md text-2xl text-italic px-4">
                "Return to your sanctuary of thought."
              </p>

              <p className="mt-3 text-xs uppercase px-4 tracking-widest">
                Editorial / Culture
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center bg-white px-16 py-5 md:w-1/2 font-fira-sans">

          <div className="w-full max-w-md">

            {/* HEADING */}
            <h2 className="text-2xl font-semibold  text-center text-gray-900">
              Login!
            </h2>

            {/* <p className="mt-1 text-sm leading-5 text-gray-900">
              Enter your credentials to access your curated dashboard.
            </p> */}

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="mt-2 rounded-md bg-green-50 px-3 py-2 text-xs text-green-600">
                {success}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-3"
            >


              <button
            type="button"
             onClick={() => {
             console.log("Continue with Google clicked");
              }}
              className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white px-5 py-3 font-fira-sans text-sm transition hover:bg-gray-50"
              >
           <svg
           width="20"
           height="20"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"
            >
              <path
            fill="#4285F4"
             d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"
               />

             <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.76-2.11-6.71-4.95H1.29v3.09A12 12 0 0 0 12 24Z"
               />

              <path
                fill="#FBBC05"
               d="M5.29 14.29A7.2 7.2 0 0 1 4.92 12c0-.79.14-1.56.37-2.29V6.62H1.29A12 12 0 0 0 0 12c0 1.93.46 3.76 1.29 5.38l4-3.09Z"
               />

             <path
             fill="#EA4335"
               d="M12 4.76c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.11 15.24 0 12 0A12 12 0 0 0 1.29 6.62l4 3.09C6.24 6.87 8.88 4.76 12 4.76Z"
               />
             </svg>

                  Continue with Google
              </button>
              {/* EMAIL */}
              <div>
                <label className="mb-1 block text-[11px] font-medium text-gray-900">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-700 bg-white px-4 py-2.5 text-sm rounded-3xl outline-none focus:border-black placeholder:text-gray-800  hover:placeholder:text-white"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-1 block text-[11px] font-medium text-gray-900">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-700 bg-white px-4 py-2.5 pr-20 text-sm rounded-3xl outline-none focus:border-black placeholder:text-gray-800  hover:placeholder:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME + FORGOT PASSWORD */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-[11px] text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-black"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-black underline"
                >
                  Forgot password?
                </button>

              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-widest  rounded-3xl text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            {/* SIGN UP LINK */}
            <p className="mt-2 text-center text-sm text-gray-900">
              Don't have an account?{" "}

              <Link
                to="/SignUp"
                className="font-medium text-black underline"
              >
                Sign up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}