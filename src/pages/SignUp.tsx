import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check empty fields
    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Check username length
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Check email
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Start loading
    setIsLoading(true);

    // Simulate signup
    setTimeout(() => {
      console.log("New User:", {
        name,
        username,
        email,
        password,
      });

      setIsLoading(false);
      setSuccess("Account created successfully!");


       
      // Clear form
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/new-story");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      {/* MAIN MODAL */}
      <div className="flex h-[90vh] w-[95vw] max-w-5xl md:w-1/2 overflow-hidden rounded-lg bg-white">

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
              <h1 className="text-2xl font-bold text-white">
                BIL
              </h1>
            </div>

            {/* QUOTE */}
            <div className="absolute bottom-12 left-10 z-10 text-white">
              <p className="max-w-md text-2xl text-italic px-2">
                "Every story begins <br></br> with a single thought."
              </p>

              <p className="mt-3 text-xs  px-2 uppercase tracking-widest">  
                Editorial / Culture
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full px-10 items-center justify-center bg-white  py-8 md:w-1/2 font-fira-sans">
               
               <div className="absolute left-12 top-20 md:hidden ">
               <h1 className="text-2xl font-bold text-black">
                 BIL
                </h1>
               </div>

          <div className="w-full max-w-md">

            {/* HEADING */}
            <h2 className="text-xl font-semibold font-fira-sans text-gray-900">
              Create your account
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-900">
              Join our community of curators and design enthusiasts.
            </p>

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

              {/* NAME */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-700 bg-white px-4 py-2.5 text-sm rounded-3xl outline-none focus:border-black placeholder:text-gray-800 hover:placeholder:text-white"
                />
              </div>

              {/* USERNAME */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  User Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-700 bg-white px-4 py-2.5 text-sm rounded-3xl outline-none focus:border-black placeholder:text-gray-800 hover:placeholder:text-white"
                />
              </div>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-700 bg-gray-50 px-4 py-2.5 pr-20 text-sm rounded-3xl outline-none focus:border-black placeholder:text-gray-800  hover:placeholder:text-white"
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

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black py-3 text-xs font-semibold uppercase  rounded-3xl tracking-widest text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>

            </form>

            {/* SIGN IN LINK */}
            <p className="mt-2 text-center text-sm text-gray-900">
              Already have an account?{" "}

              <Link
                to="/signin"
                className="font-medium text-black underline "
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
