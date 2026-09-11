import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [oldPassword, setoldPassword]=useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showoldPassword, setshowoldPassword]= useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Password successfully changed
    navigate("/signin");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      {/* MAIN MODAL */}
      <div className="flex h-[90vh] w-[95vw] max-w-5xl overflow-hidden rounded-lg bg-white md:w-[50vw]">

        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-gray-900 md:block">
          <div className="relative h-full overflow-hidden">

            <img
              src="changepassword.png"
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
              <p className="max-w-md px-4 text-2xl">
                "Return to your sanctuary of thought."
              </p>

              <p className="mt-3 px-4 text-xs uppercase tracking-widest">
                Editorial / Culture
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center bg-white px-10 py-8 font-fira-sans md:w-1/2">

          {/* MOBILE LOGO */}
          <div className="absolute left-12 top-20 md:hidden">
            <h1 className="text-2xl font-bold text-black">
              BIL
            </h1>
          </div>

          <div className="w-full max-w-md">

            {/* TITLE */}
            <h2 className="text-center text-2xl font-semibold text-gray-900">
              Change Password
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password below.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              {/* ERROR */}
              {error && (
                <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </div>
              )}

              {/* Old PASSWORD */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Old Password
                </label>

                <div className="relative">
                      <input
                      type={showoldPassword ? "text" : "password"}
                        placeholder="Enter old password"
                       value={oldPassword}
                        onChange={(e) => setoldPassword(e.target.value)}
                        className="w-full rounded-3xl border border-gray-700 bg-white px-4 py-2.5
                         pr-12 text-sm outline-none placeholder:text-gray-800 focus:border-black"
                         required
                         />

                         <button
                  type="button"
                  onClick={() => setshowoldPassword(!showPassword)}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  New Password
                </label>

                <div className="relative">
                      <input
                      type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                       value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-3xl border border-gray-700 bg-white px-4 py-2.5
                         pr-12 text-sm outline-none placeholder:text-gray-800 focus:border-black"
                         required
                         />

               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900">
                  Confirm Password
                </label>

                
                 <div className="relative">
                      <input
                         type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                         className="w-full rounded-3xl border border-gray-700 bg-white px-4 py-2.5 pr-12 text-sm outline-none placeholder:text-gray-800 focus:border-black"
                       required
                 />

                <button
                    type="button"
                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                     aria-label={
                      showConfirmPassword
                    ? "Hide confirm password"
                   : "Show confirm password"
                 }
              >
               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
           </button>
        </div>
   
   

              </div>

              {/* BUTTON */}
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