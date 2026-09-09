
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();

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

    // Start loading
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

      // Clear form
      setEmail("");
      setPassword("");

      // Navigate after login simulation
      navigate("/new-story");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      {/* MAIN MODAL */}
      <div className="flex h-[90vh] w-[95vw] max-w-5xl  md:w-[50vw] overflow-hidden rounded-lg bg-white">

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
        <div className="flex w-full items-center justify-center bg-white px-8 py-5 md:w-1/2 font-fira-sans">

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

              {/* EMAIL */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
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
                <label className="mb-1 block text-sm font-medium text-gray-900">
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

                <label className="flex items-center gap-2 text-xs text-gray-600">
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
