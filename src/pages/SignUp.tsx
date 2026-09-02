export default function SignUp() {
  return (
    <div className=" flex w-full h-full min-h-screen flex-col md:flex-row"> 
      //left side
      <div className="hidden md:flex md:w-1/2 relative bg-surface-container overflow-hidden"> 
        <img src="image2.jpg" alt="image" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute left-10 top-8 z-10" >
          <h1 className="text-2xl font-serif font-bold text-white" >
            BIL
          </h1>
        </div>

      <div  className="absolute bottom-12 left-10 z-10 text-white" >
          <p className="max-w-md text-2xl font-serif">
            "Quiet luxury defined by rigorous minimalism."
          </p>

           <p className="mt-4 text-xs uppercase tracking-widest">
              Editorial / Culture
            </p>
      </div>

      </div>

      //right side

      <div className="bg-white px-8 py-12 justify-center relative flex">
        <h1 className="text-3xl text-gray-900">Create Account</h1>
        <p>Join our community or curators and design enthusiast </p>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
          <br/>
          <p>Already have an account? <a href="/login">sign in</a></p>
        </form>
      </div>
    </div>
  );
}