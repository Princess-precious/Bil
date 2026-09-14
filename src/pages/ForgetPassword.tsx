
import { useState } from "react";

export default function ForgetPassword() {
  

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [ success,setSuccess]=useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!email.trim()) {
    setError("Please enter your email address.");
    return;
  }

  if (!email.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  setSuccess(
    "Password reset link sent successfully! Please check your email."
  );
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      {/* MAIN MODAL */}
      <div className="flex h-[90vh] w-[95vw] max-w-5xl overflow-hidden rounded-lg bg-white md:w-[60vw] s">

        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-gray-900 md:block">
          <div className="relative h-full overflow-hidden">

            <img
              src="forgetpassword.png"
              alt="Editorial"
              className="h-full w-full object-cover bg-black/80 transition-transform duration-700 hover:scale-105"
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
              <p className="max-w-md px-4 text-2xl ">
                "Return to your sanctuary of thought."
              </p>

              <p className="mt-3 px-4 text-xs uppercase tracking-widest">
                Editorial / Culture
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center bg-white px-16 py-5 font-fira sans md:w-1/2">

          {/* MOBILE LOGO */}
          <div className="absolute left-12 top-20 md:hidden">
            <h1 className="text-2xl font-bold text-black">
              BIL
            </h1>
          </div>

          <div className="w-full max-w-md">

            {/* HEADING */}
            <h2 className="text-center text-2xl font-semibold text-gray-900">
              Forgot Password?
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address to reset your password.
            </p>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            {/*SUCCESS MASSAGE*/}

            {success && (
           <div className="mt-4 rounded-md bg-green-50 px-3 py-2 text-xs text-green-600">
            {success}
             </div>
             )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
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
                  className="w-full rounded-3xl border border-gray-700 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-gray-800 focus:border-black"
                  required
                />
              </div>

              {/* NEXT BUTTON */}
              <button
                type="submit"
                className="w-full rounded-3xl bg-black py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-800"
              >
                Next
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}