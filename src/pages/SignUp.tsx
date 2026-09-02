 import { Link } from 'react-router-dom';

 export default function SignUp() {
 return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

      
      <div className="flex h-[95vh] w-[50vw] max-w-5xl overflow-hidden rounded-lg bg-white">

        {/* LEFT SIDE */}
        <div className="hidden w-1/2 bg-gray-900 md:block">
          <div className="relative h-full">

            <img
              src="image2.jpg"
              alt="image"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute left-10 top-8 z-10">
              <h1 className="text-2xl font-serif font-bold text-white">
                BIL
              </h1>
            </div>

            <div className="absolute bottom-12 left-10 z-10 text-white">
              <p className="max-w-md text-2xl font-serif">
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

            <h2 className="text-2xl font-serif  mt-8 font-semibold text-gray-900">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-900">
              Join our community of curators and design enthusiasts.
            </p>

            <form className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-900">
                   Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your  name"
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>
                
                <div>
                <label className="mb-2 block text-xs font-medium text-gray-900">
                  User Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your user name"
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-800"
              >
                Sign Up
              </button>

            </form>

            <p className="mt-2  mb-4 text-center text-sm text-gray-900">
              Already  have an account?{" "}
              <Link to ="/signin">
                <button className="font-medium text-black underline">
                  Sign in
                </button>
              </Link>
            </p>

           

          </div>
        </div>

      </div>
    </div>
  );
}