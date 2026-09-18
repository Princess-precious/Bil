/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 16/09/2026 - 05:57:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Trash2 } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/api/users";
import { getMyStories } from "../lib/api/stories";
import { getSavedArticles, unsaveArticle } from "../lib/api/articles";
//import { AuthService } from "../lib/Auth/AuthService";

type Draft = {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  image?: string;
};

export default function UserProfile() {
  const { data, isLoading, error} = useQuery({
  queryKey: ["userProfile"],
  queryFn: getUserProfile,
  enabled: !!localStorage.getItem("user")
});
  const {
    data: stories = [],
    isLoading: storiesLoading,
    error: storiesError,
  } = useQuery({
    queryKey: ["my-stories"],
    queryFn: getMyStories,
  });
  const navigate = useNavigate();

//PROFILE INFO
  const defaultProfileImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='18' fill='%23f5f5f5'/%3E%3Cpath d='M18 90c3-22 16-34 32-34s29 12 32 34' fill='%23f5f5f5'/%3E%3C/svg%3E`;

  

  const [activeTab, setActiveTab] = useState<
    "my-stories" | "saved-stories" | "saved-drafts"
  >("my-stories");

  
  
  

  const [draft, setDraft] = useState<Draft | null>(null);

  

 
   
  
  

  
  useEffect(() => {
    const savedDraft = localStorage.getItem("storyDraft");

    if (savedDraft) {
      try {
        setDraft(JSON.parse(savedDraft));
      } catch (error) {
        console.error("Failed to load draft:", error);
        setDraft(null);
      }
    }
  }, []);

  



  

   const {
      data: savedStories = [],
      refetch: refetchSavedStories,
    } = useQuery({
      queryKey: ["saved-stories"],
      queryFn: async () => {
        const response = await getSavedArticles();
        return response.data;
      },
    });

  

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Profile link copied!");
    } catch (error) {
      console.error(
        "Failed to copy profile link:",
        error
      );
    }
  };

  const handleEditStory = (story: (typeof stories)[number]) => {
  navigate(`/edit-story/${story.id}`, {
    state: { story },
  });
};

  
  const handleRemoveSavedStory = async (storyId: string) => {
    try {
      await unsaveArticle(storyId);

      await refetchSavedStories();
    } catch (error) {
      console.error("Failed to remove saved story:", error);
    }
  };


  const handleDeleteDraft = () => {
    localStorage.removeItem("storyDraft");
    setDraft(null);
  };

  

  const handleContinueDraft = () => {
    navigate("/new-story");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">

      
      <Navbar />

      <main className="mx-auto my-12 w-full max-w-6xl flex-grow px-6 pb-32 pt-16 md:px-12">

        
        <header className="mb-24 flex flex-col items-start gap-12 md:flex-row md:items-center">

          {/* PROFILE IMAGE */}

          <div className="mt-10 h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-gray-300 p-1 md:h-48 md:w-48">
            <img
              src={data?.profileImage || defaultProfileImage}
              alt="Author portrait"
              className="h-full w-full rounded-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

          {/* PROFILE INFORMATION */}

          <div className="mb-6 flex max-w-2xl flex-col gap-6">

            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                {data?.name}
              </h1>

              <p className="text-lg text-gray-600">
                {data?.bio || "No bio available"}
              </p>
            </div>

            {/* STORY COUNT */}

            <div className="flex items-center gap-8 text-base text-gray-900">
              <div>
               <span className="font-bold text-black">
                  {stories.length}
                   </span>{" "}
                     Stories
              </div>
            </div>

            {/* PROFILE BUTTONS */}

            <div className="mt-2 flex gap-4">

              {/* EDIT PROFILE */}

              <button
                type="button"
                onClick={() => navigate("/edit-profile")}
                className="rounded-md bg-black px-6 py-3 font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
              >
                Edit Profile
              </button>

              {/* SHARE */}

              <button
                type="button"
                onClick={handleShare}
                className="rounded-md border border-black px-6 py-3 font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gray-100"
              >
                Share
              </button>

              {/* SETTINGS */}

              <button
                type="button"
                onClick={() => navigate("/settings")}
                aria-label="Settings"
                className="flex items-center justify-center rounded-md border border-black px-4 py-3 text-black transition-colors hover:bg-gray-100"
              >
                <Settings
                  size={20}
                  strokeWidth={1.5}
                />
              </button>

            </div>

          </div>

        </header>

       

        <div className="mb-12 flex gap-8 overflow-x-auto border-b border-gray-300">

          {/* MY STORIES */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("my-stories")
            }
            className={`whitespace-nowrap border-b-2 pb-4 text-sm font-semibold uppercase tracking-widest transition-colors ${
              activeTab === "my-stories"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            My Stories
          </button>

          {/* SAVED STORIES */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("saved-stories")
            }
            className={`whitespace-nowrap border-b-2 pb-4 text-sm font-semibold uppercase tracking-widest transition-colors ${
              activeTab === "saved-stories"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            Saved Stories
          </button>

          {/*  DRAFTS */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("saved-drafts")
            }
            className={`whitespace-nowrap border-b-2 pb-4 text-sm font-semibold uppercase tracking-widest transition-colors ${
              activeTab === "saved-drafts"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            Drafts
          </button>

        </div>

       {activeTab === "my-stories" && (
  <section className="flex flex-col gap-16">

    {storiesLoading ? (
      <div className="py-20 text-center">
        <p className="text-gray-500">
          Loading your stories...
        </p>
      </div>
    ) : storiesError ? (
      <div className="border-y border-gray-300 py-20 text-center">
        <h2 className="text-2xl font-bold">
          Failed to load stories
        </h2>

        <p className="mt-3 text-gray-500">
          Please try again later.
        </p>
      </div>
    ) : stories.length === 0 ? (
      <div className="border-y border-gray-300 py-20 text-center">
        <h2 className="text-3xl font-bold">
          No stories yet
        </h2>

        <p className="mx-auto mt-4 max-w-md text-gray-500">
          Your published stories will appear here.
        </p>

        <button
          type="button"
          onClick={() => navigate("/new-story")}
          className="mt-8 bg-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
        >
          Create a Story
        </button>
      </div>
    ) : (
      stories.map((story) => (
        <article
          key={story.id}
          className="border-b border-gray-300 pb-16"
        >
          <div className="group flex flex-col gap-6">

            <div className="aspect-video w-full overflow-hidden">
              <img
                src={story.coverImage || "/profileHero.jpg"}
                alt={story.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-3">

              <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                {typeof story.category === "string"
                ? story.category
                : "Uncategorized"}  
              </span>

              <h2 className="text-3xl font-bold text-gray-900 transition-colors group-hover:text-gray-600 md:text-4xl">
                {story.title}
              </h2>

              <p className="line-clamp-2 text-base text-gray-600">
                {story.excerpt}
              </p>

              <button
                type="button"
                onClick={() => handleEditStory(story)}
                className="w-fit bg-black px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
              >
                Edit Story
              </button>

            </div>
          </div>
        </article>
      ))
    )}

  </section>
)}
        
                  
          
               
                  

               
       
        {activeTab === "saved-stories" && (
          <section>

            {savedStories.length > 0 ? (

              <div className="space-y-12">

                {savedStories.map((story) => (

                  <article
                    key={story.id}
                    className="grid grid-cols-1 gap-8 border-b border-gray-300 pb-12 md:grid-cols-12 md:gap-10"
                  >

                    {/* IMAGE */}

                    <div className="md:col-span-5">

                      <div className="aspect-[4/3] w-full overflow-hidden">

                        <img
                          src={story.coverImage || "/profileHero.jpg"}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                        />

                      </div>

                    </div>

                    {/* STORY INFORMATION */}

                    <div className="flex flex-col justify-center md:col-span-7">

                      <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                        {typeof story.category === "string"
                          ? story.category
                          : story.category?.name || "Uncategorized"}
                      </span>

                      <h2 className="mt-3 text-3xl font-bold text-gray-900">
                        {story.title}
                      </h2>

                      <p className="mt-4 text-base leading-7 text-gray-600">
                        {story.excerpt}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-5">

                        <span className="text-sm text-gray-500">
                          {story.author?.name || story.author?.username || "Unknown author"}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-gray-400" />

                        <span className="text-sm text-gray-500">
                          {story.date}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveSavedStory(
                              story.id
                            )
                          }
                          className="text-sm font-semibold uppercase tracking-widest text-red-600 transition-colors hover:text-red-800"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            ) : (

              <div className="border-y border-gray-300 py-20 text-center">

                <h2 className="text-3xl font-bold">
                  No saved stories
                </h2>

                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  Stories you save from the feed will
                  appear here.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/feed")}
                  className="mt-8 bg-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                >
                  Browse Stories
                </button>

              </div>

            )}

          </section>
        )}

       
        {activeTab === "saved-drafts" && (
          <section>

            {draft ? (

              <article className="border-b border-gray-300 pb-16">

                <div className="group flex flex-col gap-6">

                  {/* DRAFT IMAGE */}

                  <div className="aspect-video w-full overflow-hidden bg-gray-100">

                    {draft.image ? (

                      <img
                        src={draft.image}
                        alt={draft.title || "Draft"}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-gray-400">
                        No image added
                      </div>

                    )}

                  </div>

                  {/* DRAFT INFORMATION */}

                  <div className="flex flex-col gap-3">

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Draft
                      </span>

                      {draft.category && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-gray-400" />

                          <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                            {draft.category}
                          </span>
                        </>
                      )}

                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 transition-colors group-hover:text-gray-600 md:text-4xl">
                      {draft.title || "Untitled Draft"}
                    </h2>

                    {draft.excerpt && (
                      <p className="max-w-3xl text-base leading-7 text-gray-600">
                        {draft.excerpt}
                      </p>
                    )}

                    {/* DRAFT ACTIONS */}

                    <div className="mt-4 flex flex-wrap items-center gap-4">

                      <button
                        type="button"
                        onClick={handleContinueDraft}
                        className="bg-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                      >
                        Continue Editing
                      </button>

                      <button
                        type="button"
                        onClick={handleDeleteDraft}
                        className="flex items-center gap-2 border border-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2
                          size={16}
                          strokeWidth={1.5}
                        />

                        Delete Draft
                      </button>

                    </div>

                  </div>

                </div>

              </article>

            ) : (

              /* EMPTY DRAFT STATE */

              <div className="border-y border-gray-300 py-20 text-center">

                <h2 className="text-3xl font-bold">
                  No saved drafts
                </h2>

                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  Your unfinished stories will appear
                  here when you save them as drafts.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/new-story")}
                  className="mt-8 bg-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                >
                  Create a Story
                </button>

              </div>

            )}

          </section>
        )}

        

        <button
          type="button"
          onClick={() => navigate("/feed")}
          aria-label="Back to feed"
          className="fixed left-6 top-24 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white shadow-lg hover:bg-gray-800"
        >
          ←
        </button>

      </main>

      

      <Footer />

    </div>
  );
}