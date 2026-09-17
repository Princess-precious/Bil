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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile, updateProfileImage } from "../lib/api/users";



export default function EditProfile() {
  const navigate = useNavigate();

  const { data, isLoading} = useQuery({
  queryKey: ["userProfile"],
  queryFn: getUserProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,

    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: updateProfileImage,

    onError: (error) => {
      console.error("Failed to update profile image:", error);
    },
  });


  // PROFILE INFORMATION

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!data) return;

    setName(data.name);
    setUsername(data.username);
    setBio(data.bio || "");
    setProfileImage(data.profileImage || "");
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }

 

  


  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;
    
    setImageFile(file);

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  

  const handleSaveChanges = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        name,
        username,
        bio,
      });

      if (imageFile) {
        await updateImageMutation.mutateAsync(imageFile);
      }

      navigate("/user-profile");
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

   
  return (
    <div className="flex min-h-screen flex-col  text-gray-900 antialiased">


      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-grow px-6 pb-32 pt-24 md:px-12">


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


        <div className="rounded-md bg-[#f5f5f5] p-6 md:p-15">

          
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

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold">
              Username
            </label>

            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          
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

          

          
          <button
            type="button"
            onClick={() => navigate("/change-password")}
            className="mb-8 text-sm font-medium text-black underline hover:text-gray-600"
          >
            Change Password
          </button>

          
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