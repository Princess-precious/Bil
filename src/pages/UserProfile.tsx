import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";  

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Current profile information
  const [name, setName] = useState("Elias Thorne");

  const [bio, setBio] = useState(
    "Cultural critic and architectural historian documenting the intersection of brutalism and modern urbanism. Exploring quiet luxury in concrete spaces."
  );

  const [profileImage, setProfileImage] = useState("/userprofile.jpg");

  // Temporary values used while editing
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);
  const [editImage, setEditImage] = useState(profileImage);

  // Open edit profile
  const handleEditProfile = () => {
    setEditName(name);
    setEditBio(bio);
    setEditImage(profileImage);
    setIsEditing(true);
  };

  // Change profile image
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setEditImage(imageUrl);
  };

  // Save profile
  const handleSaveChanges = () => {
    setName(editName);
    setBio(editBio);
    setProfileImage(editImage);

    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditName(name);
    setEditBio(bio);
    setEditImage(profileImage);

    setIsEditing(false);
  };

  // Share profile
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied!");
    } catch (error) {
      console.error("Failed to copy profile link:", error);
    }
  };

  return (
    <div className="bg-white text-gray-900 antialiased min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow w-full px-6 md:px-12 max-w-6xl mx-auto pt-16 pb-32">

        {/* ================= PROFILE HEADER ================= */}
        <header className="flex flex-col md:flex-row gap-12 items-start md:items-center mb-24">

          {/* Profile Image */}
          <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-full mt-10 overflow-hidden 
          border-2 border-gray-300 p-1">
            <img
              src={profileImage}
              alt="Author portrait"
              className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Profile Information */}
          <div className="flex flex-col gap-6 max-w-2xl">

            {/* Name and Bio */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {name}
              </h1>

              <p className="text-lg text-gray-600">
                {bio}
              </p>
            </div>

            {/* Stories */}
            <div className="flex items-center gap-8 text-base text-gray-900">
              <div>
                <span className="font-bold text-black">
                  142
                </span>{" "}
                Stories
              </div>
            </div>

            {/*   profile button*/}
            <div className="flex gap-4 mt-2">

              {/* Edit Profile */}
              <button
                type="button"
                onClick={handleEditProfile}
                className="bg-black text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity 
                uppercase tracking-widest font-semibold"
              >
                Edit Profile
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="border border-black text-black px-6 py-3 rounded-md hover:bg-gray-100 
                transition-colors uppercase tracking-widest font-semibold"
              >
                Share
              </button>

            </div>

          </div>

        </header>

        {/* ================= EDIT PROFILE ================= */}
        {isEditing && (
          <div className="mb-12 max-w-2xl border border-gray-300 rounded-md p-6">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Edit Profile
            </h2>

            {/* Profile Image */}
            <div className="mb-6">

              <label className="block text-sm font-semibold mb-3">
                Profile Image
              </label>

              <div className="flex items-center gap-5">

                <img
                  src={editImage}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />

                <label className="cursor-pointer border border-black px-5 py-3 rounded-md text-sm
                 font-semibold hover:bg-gray-100 transition-colors">
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

            {/* Name */}
            <div className="mb-5">

              <label className="block text-sm font-semibold mb-2">
                Name
              </label>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
              />

            </div>

            {/* Bio */}
            <div className="mb-6">

              <label className="block text-sm font-semibold mb-2">
                Bio
              </label>

              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none 
                focus:border-black resize-none"
              />

            </div>

            {/* Save / Cancel */}
            <div className="flex gap-4">

              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-black text-white px-6 py-3 rounded-md hover:opacity-80
                 transition-opacity font-semibold"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="border border-black text-black px-6 py-3  rounded-md hover:bg-gray-100 transition-colors font-semibold"
              >
                Cancel
              </button>

            </div>

          </div>
        )}

        {/* ================= TABS ================= */}
        <div className="flex gap-8 border-b border-gray-300 mb-12">

          <button
            type="button"
            className="text-sm font-semibold text-black border-b-2 border-black pb-4 uppercase tracking-widest"
          >
            My Stories
          </button>

          <button
            type="button"
            className="text-sm text-gray-500 hover:text-black transition-colors pb-4 uppercase tracking-widest"
          >
            Saved Stories
          </button>

        </div>

        {/* ================= STORIES ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Featured Story */}
          <article className="md:col-span-8 flex flex-col gap-6 group cursor-pointer">

            <div className="w-full aspect-video overflow-hidden">

              <img
                src="/profileHero.jpg"
                alt="Brutalist concrete architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

            </div>

            <div className="flex flex-col gap-3">

              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                Architecture
              </span>

              <h2 className="text-3xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                The Weight of Silence: Brutalism in the Modern Era
              </h2>

              <p className="text-base text-gray-600 line-clamp-2">
                An exploration of how heavy concrete forms are being
                reimagined to create spaces of profound tranquility and
                quiet contemplation in bustling metropolises.
              </p>

            </div>

          </article>

          {/* Secondary Stories */}
          <div className="md:col-span-4 flex flex-col gap-12">

            {/* Story 2 */}
            <article className="flex flex-col gap-4 group cursor-pointer border-b border-gray-300 pb-8">

              <div className="w-full aspect-[4/3] overflow-hidden">

                <img
                  src="/story.jpg"
                  alt="Concrete and glass materials"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

              </div>

              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                Design Theory
              </span>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">
                Texture &amp; Time: Materials That Age With Grace
              </h3>

            </article>

            {/* Story 3 */}
            <article className="flex flex-col gap-4 group cursor-pointer">

              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                Urbanism
              </span>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">
                Negative Space in City Planning
              </h3>

              <p className="text-base text-gray-600 line-clamp-2">
                Why the empty spaces between our monuments define the
                character of our cities more than the structures
                themselves.
              </p>

            </article>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}