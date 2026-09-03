import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check if fields are empty
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

    // Temporary login simulation
    setTimeout(() => {
      console.log("Login details:", {
        email,
        password,
        rememberMe,
      });

      setIsLoading(false);
      setSuccess("Signed in successfully!");

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      setEmail("");
      setPassword("");
    }, 1500);
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
  };

  return (
    // OUTER OVERLAY
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      <div className="flex h-[90vh] w-[50vw] max-w-5xl overflow-hidden rounded-lg bg-white">

        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-gray-900 md:block">

          <div className="relative h-full">

            <img
              src="login.jpg"
              alt="Editorial"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute left-10 top-8 z-10">
              <h1 className="text-2xl  font-bold text-white">
                BIL
              </h1>
            </div>

            <div className="absolute bottom-12 left-10 z-10 text-white">

              <p className="max-w-md text-2xl ">
                "Quiet luxury defined by rigorous minimalism."
              </p>

              <p className="mt-4 text-xs uppercase tracking-widest">
                Editorial / Culture
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex w-full items-center justify-center bg-white px-8 py-12 md:w-1/2">

          <div className="w-full max-w-md">

            <h2 className="mt-8 text-3xl  font-semibold text-gray-900">
              Welcome back!
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-900">
              Enter your credentials to access your curated dashboard
            </p>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 pr-16 text-sm outline-none focus:border-black"
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

                <label className="flex items-center gap-2 text-sm text-gray-600">

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
                  className="text-sm font-medium text-black underline"
                >
                  Forgot password?
                </button>

              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            {/* SIGN UP */}
            <p className="mt-4 mb-4 text-center text-sm text-gray-900">

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