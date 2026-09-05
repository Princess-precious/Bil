import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // ================= PROFILE INFORMATION =================
  const [name, setName] = useState("Elias Thorne");

  const [bio, setBio] = useState(
    "Cultural critic and architectural historian documenting the intersection of brutalism and modern urbanism. Exploring quiet luxury in concrete spaces."
  );

  const [profileImage, setProfileImage] = useState("/userprofile.jpg");

  // Temporary values used while editing profile
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);
  const [editImage, setEditImage] = useState(profileImage);

  // ================= STORY EDITING =================
  const [editingStory, setEditingStory] = useState<number | null>(null);

  // ================= STORY 1 =================
  const [storyTitle, setStoryTitle] = useState(
    "The Weight of Silence: Brutalism in the Modern Era"
  );

  const [storyContent, setStoryContent] = useState(
    "An exploration of how heavy concrete forms are being reimagined to create spaces of profound tranquility and quiet contemplation in bustling metropolises."
  );

  const [story1Image, setStory1Image] = useState("/profileHero.jpg");
  const [editStory1Image, setEditStory1Image] =
    useState("/profileHero.jpg");

  // ================= STORY 2 =================
  const [story2Title, setStory2Title] = useState(
    "Texture & Time: Materials That Age With Grace"
  );

  const [story2Image, setStory2Image] = useState("/story.jpg");
  const [editStory2Image, setEditStory2Image] =
    useState("/story.jpg");

  // ================= STORY 3 =================
  const [story3Title, setStory3Title] = useState(
    "Negative Space in City Planning"
  );

  const [story3Content, setStory3Content] = useState(
    "Why the empty spaces between our monuments define the character of our cities more than the structures themselves."
  );

  const [story3Image, setStory3Image] = useState("/profileHero.jpg");
  const [editStory3Image, setEditStory3Image] =
    useState("/profileHero.jpg");

  // ================= EDIT PROFILE =================

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

  // Cancel profile editing
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

  // ================= STORY EDITING =================

  const handleEditStory = (storyId: number) => {
    // Reset temporary image to the currently saved image
    if (storyId === 1) {
      setEditStory1Image(story1Image);
    }

    if (storyId === 2) {
      setEditStory2Image(story2Image);
    }

    if (storyId === 3) {
      setEditStory3Image(story3Image);
    }

    setEditingStory(storyId);
  };

  // Change story cover image
  const handleStoryImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    storyId: number
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (storyId === 1) {
      setEditStory1Image(imageUrl);
    }

    if (storyId === 2) {
      setEditStory2Image(imageUrl);
    }

    if (storyId === 3) {
      setEditStory3Image(imageUrl);
    }
  };

  // Save story changes
  const handleSaveStory = () => {
    if (editingStory === 1) {
      setStory1Image(editStory1Image);
    }

    if (editingStory === 2) {
      setStory2Image(editStory2Image);
    }

    if (editingStory === 3) {
      setStory3Image(editStory3Image);
    }

    setEditingStory(null);
  };

  // Cancel story editing
  const handleCancelStory = () => {
    if (editingStory === 1) {
      setEditStory1Image(story1Image);
    }

    if (editingStory === 2) {
      setEditStory2Image(story2Image);
    }

    if (editingStory === 3) {
      setEditStory3Image(story3Image);
    }

    setEditingStory(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-grow px-6 pt-16 pb-32 md:px-12">

        {/* ================= PROFILE HEADER ================= */}

        <header className="mb-24 flex flex-col items-start gap-12 md:flex-row md:items-center">

          <div className="mt-10 h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-gray-300 p-1 md:h-48 md:w-48">
            <img
              src={profileImage}
              alt="Author portrait"
              className="h-full w-full rounded-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

          <div className="flex max-w-2xl flex-col gap-6">

            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                {name}
              </h1>

              <p className="text-lg text-gray-600">
                {bio}
              </p>
            </div>

            <div className="flex items-center gap-8 text-base text-gray-900">
              <div>
                <span className="font-bold text-black">142</span>{" "}
                Stories
              </div>
            </div>

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

          <button
            type="button"
            className="border-b-2 border-black pb-4 text-sm font-semibold uppercase tracking-widest text-black"
          >
            My Stories
          </button>

          <button
            type="button"
            className="pb-4 text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-black"
          >
            Saved Stories
          </button>

        </div>

        {/* ================= STORIES ================= */}

        <section className="grid grid-cols-1 gap-8 md:grid-cols-12">

          {/* ================= STORY 1 ================= */}

          <article className="md:col-span-8">

            {editingStory === 1 ? (

              <div className="flex flex-col gap-5 rounded-md border border-gray-300 p-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Story
                </h2>

                {/* COVER IMAGE */}

                <div>

                  <label className="mb-3 block text-sm font-semibold">
                    Story Cover Image
                  </label>

                  <div className="flex flex-col gap-4">

                    <img
                      src={editStory1Image}
                      alt="Story cover preview"
                      className="aspect-video w-full rounded-md object-cover"
                    />

                    <label className="w-fit cursor-pointer rounded-md border border-black px-5 py-3 text-sm font-semibold hover:bg-gray-100">

                      Change Cover Image

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleStoryImageChange(e, 1)
                        }
                        className="hidden"
                      />

                    </label>

                  </div>
                </div>

                {/* TITLE */}

                <label className="text-sm font-semibold">
                  Story Title
                </label>

                <input
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                {/* CONTENT */}

                <label className="text-sm font-semibold">
                  Story Content
                </label>

                <textarea
                  value={storyContent}
                  onChange={(e) => setStoryContent(e.target.value)}
                  rows={8}
                  className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <div className="flex gap-4">

                  <button
                    type="button"
                    onClick={handleSaveStory}
                    className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelStory}
                    className="rounded-md border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                </div>
              </div>

            ) : (

              <div className="group flex cursor-pointer flex-col gap-6">

                <div className="aspect-video w-full overflow-hidden">

                  <img
                    src={story1Image}
                    alt="Brutalist concrete architecture"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                </div>

                <div className="flex flex-col gap-3">

                  <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Architecture
                  </span>

                  <h2 className="text-3xl font-bold text-gray-900 transition-colors group-hover:text-gray-600">
                    {storyTitle}
                  </h2>

                  <p className="line-clamp-2 text-base text-gray-600">
                    {storyContent}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleEditStory(1)}
                    className="w-fit bg-black px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                  >
                    Edit Story
                  </button>

                </div>
              </div>
            )}

          </article>

          {/* ================= SECONDARY STORIES ================= */}

          <div className="flex flex-col gap-12 md:col-span-4">

            {/* ================= STORY 2 ================= */}

            <article className="group flex flex-col gap-4 border-b border-gray-300 pb-8">

              {editingStory === 2 ? (

                <div className="flex flex-col gap-4">

                  <h3 className="text-xl font-bold">
                    Edit Story
                  </h3>

                  {/* COVER IMAGE */}

                  <label className="text-sm font-semibold">
                    Story Cover Image
                  </label>

                  <img
                    src={editStory2Image}
                    alt="Story cover preview"
                    className="aspect-[4/3] w-full rounded-md object-cover"
                  />

                  <label className="w-fit cursor-pointer rounded-md border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-gray-100">

                    Change Cover Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleStoryImageChange(e, 2)
                      }
                      className="hidden"
                    />

                  </label>

                  {/* TITLE */}

                  <input
                    type="text"
                    value={story2Title}
                    onChange={(e) =>
                      setStory2Title(e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={handleSaveStory}
                      className="bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-800"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelStory}
                      className="border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                  </div>
                </div>

              ) : (

                <>
                  <div className="aspect-[4/3] w-full overflow-hidden">

                    <img
                      src={story2Image}
                      alt="Concrete and glass materials"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                  </div>

                  <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Design Theory
                  </span>

                  <h3 className="text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-gray-600">
                    {story2Title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleEditStory(2)}
                    className="w-fit bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                  >
                    Edit Story
                  </button>
                </>
              )}

            </article>

            {/* ================= STORY 3 ================= */}

            <article className="group flex flex-col gap-4">

              {editingStory === 3 ? (

                <div className="flex flex-col gap-4">

                  <h3 className="text-xl font-bold">
                    Edit Story
                  </h3>

                  {/* COVER IMAGE */}

                  <label className="text-sm font-semibold">
                    Story Cover Image
                  </label>

                  <img
                    src={editStory3Image}
                    alt="Story cover preview"
                    className="aspect-[4/3] w-full rounded-md object-cover"
                  />

                  <label className="w-fit cursor-pointer rounded-md border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-gray-100">

                    Change Cover Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleStoryImageChange(e, 3)
                      }
                      className="hidden"
                    />

                  </label>

                  {/* TITLE */}

                  <input
                    type="text"
                    value={story3Title}
                    onChange={(e) =>
                      setStory3Title(e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  {/* CONTENT */}

                  <textarea
                    value={story3Content}
                    onChange={(e) =>
                      setStory3Content(e.target.value)
                    }
                    rows={5}
                    className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={handleSaveStory}
                      className="bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-800"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelStory}
                      className="border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                <>
                  <div className="aspect-[4/3] w-full overflow-hidden">

                    <img
                      src={story3Image}
                      alt="Urban architecture"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                  </div>

                  <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Urbanism
                  </span>

                  <h3 className="text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-gray-600">
                    {story3Title}
                  </h3>

                  <p className="line-clamp-2 text-base text-gray-600">
                    {story3Content}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleEditStory(3)}
                    className="w-fit bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                  >
                    Edit Story
                  </button>
                </>
              )}

            </article>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}