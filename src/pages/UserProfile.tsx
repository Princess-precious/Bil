import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark} from "lucide-react"
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function UserProfile() {
  const navigate = useNavigate();

  // ================= PROFILE INFORMATION =================

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Elias Thorne");

  const [bio, setBio] = useState(
    "Cultural critic and architectural historian documenting the intersection of brutalism and modern urbanism. Exploring quiet luxury in concrete spaces."
  );

  const [profileImage, setProfileImage] = useState("/userprofile.jpg");

  // Temporary profile values while editing
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);
  const [editImage, setEditImage] = useState(profileImage);

  // ================= TABS =================

  const [activeTab, setActiveTab] = useState<
    "my-stories" | "saved-stories"
  >("my-stories");

  // ================= MY STORIES =================

  const stories = [
    {
      id: 1,
      title: "The Weight of Silence: Brutalism in the Modern Era",
      content:
        "An exploration of how heavy concrete forms are being reimagined to create spaces of profound tranquility and quiet contemplation in bustling metropolises.",
      image: "/profileHero.jpg",
      category: "Architecture",
    },
    {
      id: 2,
      title: "Texture & Time: Materials That Age With Grace",
      content:
        "A look at how materials change and develop character over time.",
      image: "/story.jpg",
      category: "Design Theory",
    },
    {
      id: 3,
      title: "Negative Space in City Planning",
      content:
        "Why the empty spaces between our monuments define the character of our cities more than the structures themselves.",
      image: "/profileHero.jpg",
      category: "Urbanism",
    },
  ];

  // ================= SAVED STORIES =================

  const savedStories = [
    {
      id: 4,
      title: "The Future of Sustainable Architecture",
      content:
        "Exploring how architects are using sustainable materials and innovative designs to create environmentally responsible spaces.",
      image: "/story.jpg",
      category: "Architecture",
    },
    {
      id: 5,
      title: "The Philosophy Behind Minimalism",
      content:
        "A deeper look at how minimalism influences modern design, culture, and the way we experience our surroundings.",
      image: "/profileHero.jpg",
      category: "Design",
    },
  ];

  // ================= EDIT PROFILE =================

  const handleEditProfile = () => {
    setEditName(name);
    setEditBio(bio);
    setEditImage(profileImage);

    setIsEditing(true);
  };

  // ================= PROFILE IMAGE =================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setEditImage(imageUrl);
  };

  // ================= SAVE PROFILE =================

  const handleSaveChanges = () => {
    setName(editName);
    setBio(editBio);
    setProfileImage(editImage);

    setIsEditing(false);
  };

  // ================= CANCEL PROFILE EDIT =================

  const handleCancel = () => {
    setEditName(name);
    setEditBio(bio);
    setEditImage(profileImage);

    setIsEditing(false);
  };

  // ================= SHARE PROFILE =================

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("Profile link copied!");
    } catch (error) {
      console.error("Failed to copy profile link:", error);
    }
  };

  // ================= EDIT STORY =================

  const handleEditStory = (storyId: number) => {
    navigate(`/edit-story/${storyId}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
      {/* ================= NAVBAR ================= */}

      <Navbar />

      <main className="mx-auto my-12 w-full max-w-6xl flex-grow px-6 pb-32 pt-16 md:px-12">
        {/* ================= PROFILE HEADER ================= */}

        <header className="mb-24 flex flex-col items-start gap-12 md:flex-row md:items-center">
          {/* PROFILE IMAGE */}

          <div className="mt-10 h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-gray-300 p-1 md:h-48 md:w-48">
            <img
              src={profileImage}
              alt="Author portrait"
              className="h-full w-full rounded-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

          {/* PROFILE INFORMATION */}

          <div className="mb-6 flex max-w-2xl flex-col gap-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                {name}
              </h1>

              <p className="text-lg text-gray-600">{bio}</p>
            </div>

            {/* STORY COUNT */}

            <div className="flex items-center gap-8 text-base text-gray-900">
              <div>
                <span className="font-bold text-black">142</span>{" "}
                Stories
              </div>
            </div>

            {/* PROFILE BUTTONS */}

            <div className="mt-2 flex gap-4">
              <button
                type="button"
                onClick={handleEditProfile}
                className="rounded-md bg-black px-6 py-3 font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
              >
                Edit Profile
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="rounded-md border border-black px-6 py-3 font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gray-100"
              >
                Share
              </button>
            </div>
          </div>
        </header>

        {/* ================= EDIT PROFILE ================= */}

        {isEditing && (
          <div className="mb-12 max-w-2xl rounded-md border border-gray-300 p-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Edit Profile
            </h2>

            {/* PROFILE IMAGE */}

            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold">
                Profile Image
              </label>

              <div className="flex items-center gap-5">
                <img
                  src={editImage}
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

            {/* NAME */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold">
                Name
              </label>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* BIO */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold">
                Bio
              </label>

              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* PROFILE ACTIONS */}

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
                onClick={handleCancel}
                className="rounded-md border border-black px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ================= TABS ================= */}

        <div className="mb-12 flex gap-8 border-b border-gray-300">
          {/* MY STORIES TAB */}

          <button
            type="button"
            onClick={() => setActiveTab("my-stories")}
            className={`pb-4 text-sm uppercase tracking-widest transition-colors ${
              activeTab === "my-stories"
                ? "border-b-2 border-black font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            My Stories
          </button>

          {/* SAVED STORIES TAB */}

          <button
            type="button"
            onClick={() => setActiveTab("saved-stories")}
            className={`pb-4 text-sm uppercase tracking-widest transition-colors ${
              activeTab === "saved-stories"
                ? "border-b-2 border-black font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Saved Stories
          </button>
        </div>

        {/* ================= MY STORIES ================= */}

        {activeTab === "my-stories" && (
          <section className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* ================= STORY 1 ================= */}

            <article className="md:col-span-8">
              <div className="group flex flex-col gap-6">
                {/* IMAGE */}

                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={stories[0].image}
                    alt="Brutalist concrete architecture"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* STORY INFORMATION */}

                <div className="flex flex-col gap-3">
                  <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    {stories[0].category}
                  </span>

                  <h2 className="text-3xl font-bold text-gray-900 transition-colors group-hover:text-gray-600">
                    {stories[0].title}
                  </h2>

                  <p className="line-clamp-2 text-base text-gray-600">
                    {stories[0].content}
                  </p>

                  {/* EDIT STORY */}

                  <button
                    type="button"
                    onClick={() => {
                      console.log("Edit button clicked");
                      navigate("/edit-story/1");
                    }}
                    className="w-fit bg-black px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white"
                  >
                    Edit Story
                  </button>
                </div>
              </div>
            </article>

            {/* ================= SECONDARY STORIES ================= */}

            <div className="flex flex-col gap-12 md:col-span-4">
              {/* ================= STORY 2 ================= */}

              <article className="group flex flex-col gap-4 border-b border-gray-300 pb-8">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={stories[1].image}
                    alt="Concrete and glass materials"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                  {stories[1].category}
                </span>

                <h3 className="text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-gray-600">
                  {stories[1].title}
                </h3>

                <p className="line-clamp-2 text-base text-gray-600">
                  {stories[1].content}
                </p>

                <button
                  type="button"
                  onClick={() => handleEditStory(stories[1].id)}
                  className="w-fit bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                >
                  Edit Story
                </button>
              </article>

              {/* ================= STORY 3 ================= */}

              <article className="group flex flex-col gap-4">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={stories[2].image}
                    alt="Urban architecture"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                  {stories[2].category}
                </span>

                <h3 className="text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-gray-600">
                  {stories[2].title}
                </h3>

                <p className="line-clamp-2 text-base text-gray-600">
                  {stories[2].content}
                </p>

                <button
                  type="button"
                  onClick={() => handleEditStory(stories[2].id)}
                  className="w-fit bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                >
                  Edit Story
                </button>
              </article>
            </div>
          </section>
        )}

        {/* ================= SAVED STORIES ================= */}

        {activeTab === "saved-stories" && (
          <section>
            {savedStories.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                {savedStories.map((story) => (
                  <article
                    key={story.id}
                    className="group flex flex-col gap-4 md:col-span-4"
                  >
                    {/* IMAGE */}

                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* CATEGORY */}

                    <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                      {story.category}
                    </span>

                    {/* TITLE */}

                    <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-gray-600">
                      {story.title}
                    </h3>

                    {/* CONTENT */}

                    <p className="line-clamp-2 text-base text-gray-600">
                      {story.content}
                    </p>

                    {/* READ STORY */}

                    <button
                      type="button"
                      className="w-fit border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Read Story
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  No Saved Stories
                </h2>

                <p className="mt-3 text-gray-500">
                  Stories you save will appear here.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      {/* ================= FOOTER ================= */}

      <Footer />
    </div>
  );
}