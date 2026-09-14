/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 14/09/2026 - 13:13:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function EditProfile() {
  const navigate = useNavigate();

  // ================= PROFILE INFORMATION =================

  const [name, setName] = useState("Elias Thorne");

  const [bio, setBio] = useState(
    "Cultural critic and architectural historian documenting the intersection of brutalism and modern urbanism. Exploring quiet luxury in concrete spaces."
  );

  const [profileImage, setProfileImage] = useState(
    "/userprofile.jpg"
  );

  // ================= IMAGE CHANGE =================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  // ================= SAVE CHANGES =================

  const handleSaveChanges = () => {
    // For now, just return to profile.
    // Later, this is where you will send the data to your backend.

    navigate("/user-profile");
  };

  return (
    <div className="flex min-h-screen flex-col  text-gray-900 antialiased">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-grow px-6 pb-32 pt-24 md:px-12">

        {/* ================= HEADER ================= */}

        <div className="mb-12">

          <button
            type="button"
            onClick={() => navigate("/user-profile")}
            className="mb-8 text-sm font-medium text-gray-500 hover:text-black"
          >
            ← Back to Profile
          </button>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Edit Profile
          </h1>

          <p className="mt-3 text-gray-500">
            Update your profile information.
          </p>

        </div>

        {/* ================= EDIT PROFILE FORM ================= */}

        <div className="rounded-md bg-[#f5f5f5] p-6 md:p-15">

          {/* ================= PROFILE IMAGE ================= */}

          <div className="mb-8">

            

            <div className="flex items-center gap-5">

              <img
                src={profileImage}
                alt="Profile preview"
                className="h-24 w-24 rounded-full border border-gray-300 object-cover"
              />

              <label className="cursor-pointer rounded-md border border-black px-5 py-3 text-sm font-semibold transition-colors hover:bg-gray-100">

                Change Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>

            </div>

          </div>

          {/* ================= NAME ================= */}

          <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* ================= BIO ================= */}

          <div className="mb-8">

            <label className="mb-2 block text-sm font-semibold">
              Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>

          {/* ================= CHANGE PASSWORD ================= */}

          <button
            type="button"
            onClick={() => navigate("/change-password")}
            className="mb-8 text-sm font-medium text-black underline hover:text-gray-600"
          >
            Change Password
          </button>

          {/* ================= ACTIONS ================= */}

          <div className="flex gap-4">

            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-md bg-black px-6 py-3 font-semibold text-white transition-opacity hover:opacity-80"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/user-profile")}
              className="rounded-md border border-black px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}