import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Share2 } from "lucide-react"

import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import Loader from "../components/Loader"

// Replace these API imports with your actual API functions
import { getUserProfileById } from "../lib/api/users"
import { getUserStoriesById } from "../lib/api/stories"

export default function PublicProfile() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  // 1. Fetch target user profile
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["publicProfile", userId],
    queryFn: () => getUserProfileById(userId!),
    enabled: !!userId,
  })

  // 2. Fetch target user's public stories
  const {
    data: stories = [],
    isLoading: storiesLoading,
    error: storiesError,
  } = useQuery({
    queryKey: ["user-stories", userId],
    queryFn: () => getUserStoriesById(userId!),
    enabled: !!userId,
  })

  // Filter for published stories only (defensive check)
  const publishedStories = stories.filter(
    (story:any) => story.status !== "draft"
  )

  const defaultProfileImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='18' fill='%23f5f5f5'/%3E%3Cpath d='M18 90c3-22 16-34 32-34s29 12 32 34' fill='%23f5f5f5'/%3E%3C/svg%3E`

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert("Profile link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleReadStory = (storyId: string) => {
    navigate(`/story/${storyId}`)
  }

  if (userLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <Loader />
        </div>
        <Footer />
      </div>
    )
  }

  if (userError || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="mx-auto my-12 w-full max-w-6xl flex-grow px-6 pt-16 text-center">
          <h1 className="text-3xl font-bold">User Not Found</h1>
          <p className="mt-4 text-gray-500">
            The profile you are looking for doesn't exist or has been removed.
          </p>
          <button
            type="button"
            onClick={() => navigate("/feed")}
            className="mt-8 rounded-md bg-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
          >
            Back to Feed
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
      <Navbar />

      <main className="mx-auto my-12 w-full max-w-6xl flex-grow px-6 pb-32 pt-16 md:px-12">
        {/* PROFILE HEADER */}
        <header className="mb-16 flex flex-col items-start gap-12 md:flex-row md:items-center">
          {/* PROFILE IMAGE */}
          <div className="mt-10 h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-gray-300 p-1 md:h-48 md:w-48">
            <img
              src={user?.profileImage || defaultProfileImage}
              alt={`${user?.name || "User"}'s portrait`}
              className="h-full w-full rounded-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

          {/* PROFILE INFORMATION */}
          <div className="mb-6 flex max-w-2xl flex-col gap-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                {user?.name}
              </h1>
              <p className="text-lg text-gray-600">
                {user?.bio || "No bio available"}
              </p>
            </div>

            {/* STATS & ACTIONS */}
            <div className="flex items-center gap-8 text-base text-gray-900">
              <div>
                <span className="font-bold text-black">
                  {publishedStories.length}
                </span>{" "}
                {publishedStories.length === 1 ? "Story" : "Stories"}
              </div>
            </div>

            <div className="mt-2 flex gap-4">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-md border border-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gray-100"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </header>

        {/* SECTION HEADER */}
        <div className="mb-8 border-b border-gray-300 pb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-900">
            Published Stories
          </h2>
        </div>

        {/* STORIES LIST */}
        <section>
          {storiesLoading ? (
            <Loader />
          ) : storiesError ? (
            <div className="border-y border-gray-300 py-20 text-center">
              <h2 className="text-2xl font-bold">Failed to load stories</h2>
              <p className="mt-3 text-gray-500">Please try again later.</p>
            </div>
          ) : publishedStories.length === 0 ? (
            <div className="border-y border-gray-300 py-20 text-center">
              <h2 className="text-3xl font-bold">No published stories yet</h2>
              <p className="mx-auto mt-4 max-w-md text-gray-500">
                {user.name} hasn't published any stories yet.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {publishedStories.map((story:any) => (
                <article
                  key={story.id}
                  className="grid grid-cols-1 gap-8 border-b border-gray-300 pb-12 md:grid-cols-12 md:gap-10"
                >
                  {/* COVER IMAGE */}
                  <div
                    className="cursor-pointer md:col-span-5"
                    onClick={() => handleReadStory(story.id)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={story.coverImage || "/profileHero.jpg"}
                        alt={story.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* STORY DETAILS */}
                  <div className="flex flex-col justify-center md:col-span-7">
                    <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                      {story.category || "Uncategorized"}
                    </span>

                    <h2
                      onClick={() => handleReadStory(story.id)}
                      className="mt-3 cursor-pointer text-3xl font-bold text-gray-900 hover:underline"
                    >
                      {story.title}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-gray-600">
                      {story.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-5">
                      <span className="text-sm text-gray-500">
                        {story.date}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleReadStory(story.id)}
                        className="text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:text-gray-600"
                      >
                        Read Story →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="fixed left-6 top-24 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
      </main>

      <Footer />
    </div>
  )
}