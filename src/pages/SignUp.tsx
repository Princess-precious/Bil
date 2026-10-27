import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser, googleLogin } from "../lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { validate } from "class-validator";
import { SignUpValidator } from "../Validation/signUpvalidator";

// Shared classes so every field matches the sign-in page
const labelClass = "mb-0.5 block text-xs font-semibold text-gray-900";
const inputClass =
  "w-full rounded-full border border-gray-700 bg-white px-4 py-2 text-sm outline-none placeholder:text-gray-700 focus:border-black";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signupMutation = useMutation({
    mutationFn: signupUser,

    onSuccess: (result) => {
      console.log("Signup successful:", result);

      console.log("Access token:", result.data?.accessToken);
      console.log("Refresh token:", result.data?.refreshToken);

      if (result.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
      }

      if (result.data?.refreshToken) {
        localStorage.setItem("refreshToken", result.data.refreshToken);
      }

      setSuccess("Account created successfully!");

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/feed");
    },

    onError: (error) => {
      console.error("Signup failed:", error);

      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;

        console.log("Status:", error.response?.status);
        console.log("Backend response:", error.response?.data);

        if (backendMessage) {
          setError(
            Array.isArray(backendMessage)
              ? backendMessage.join(", ")
              : backendMessage
          );
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const signupData = new SignUpValidator();

    signupData.name = name.trim();
    signupData.username = username.trim();
    signupData.email = email.trim();
    signupData.password = password;

    const errors = await validate(signupData);

    if (errors.length > 0) {
      const firstError = errors[0];

      if (firstError.constraints) {
        setError(Object.values(firstError.constraints)[0]);
      }

      return;
    }

    signupMutation.mutate({
      name,
      username,
      email,
      password,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      {/* MAIN MODAL */}
      <div className="flex h-[90vh] max-h-[95vh] w-[95vw] max-w-5xl overflow-hidden rounded-lg bg-white md:w-[60vw]">
        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-gray-900 md:block">
          <div className="relative h-full overflow-hidden">
            <img
              src="signup.jpg"
              alt="Editorial"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            {/* LOGO */}
            <div className="absolute left-10 top-8 z-10">
              <h1 className="text-2xl font-bold text-white">BIL</h1>
            </div>

            {/* QUOTE */}
            <div className="absolute bottom-12 left-10 z-10 text-white">
              <p className="max-w-md px-4 text-2xl">
                "Every story begins with a single thought."
              </p>

              <p className="mt-3 px-4 text-xs uppercase tracking-widest">
                Editorial / Culture
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (scrolls if the form is taller than the card) */}
        <div className="flex w-full overflow-y-auto bg-white px-6 py-4 font-fira-sans md:w-1/2 md:px-10">
          {/* MOBILE LOGO */}
          <div className="absolute left-10 top-18 md:hidden">
            <h1 className="text-xl font-bold text-black">BIL</h1>
          </div>

          {/* m-auto centers vertically without clipping the top when content overflows */}
          <div className="m-auto w-full max-w-[280px]">
            {/* HEADING */}
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
              Create your account
            </h2>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="mb-3 rounded-md bg-green-50 px-3 py-2 text-xs text-green-600">
                {success}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* GOOGLE BUTTON */}
              <button
                type="button"
                onClick={googleLogin}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                <svg
                  width="18"
                  height="18"
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
                    d="M12 4.76c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.11 15.24 0 12 0A12 12 0 0 0 1.29 6.62l4 3.09 4 3.09C6.24 6.87 8.88 4.76 12 4.76Z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span className="text-xs text-gray-700">or</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>

              {/* NAME */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* USERNAME */}
              <div>
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={signupMutation.isPending}
                className="w-full rounded-full bg-black py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {signupMutation.isPending ? "Creating account..." : "Sign up"}
              </button>
            </form>

            {/* SIGN IN LINK */}
            <p className="mt-3 text-center text-sm text-gray-900">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold text-black underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}