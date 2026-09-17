/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 17/09/2026 - 15:05:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Plus } from "lucide-react";

import { getStories, type Story } from "../../lib/api/stories";

import {
  saveArticle,
  unsaveArticle,
  getSavedArticles,
} from "../../lib/api/articles";

const topics = [
  "Architecture",
  "Design",
  "Economics",
  "Philosophy",
  "Artificial Intelligence",
  "Cinema",
  "Visual Culture",
  "Literature",
  "Photography",
  "Technology",
  "Fashion",
  "Music",
  "Politics",
  "Science",
  "Culture",
];



export default function Feed() {
  const navigate = useNavigate();

  // Saved story IDs
  const [SavedStoryIDs, setSavedStoryIds] = useState<string[]>([]);

  useEffect(() => {
  const loadSavedArticles = async () => {
    try {
      const response = await getSavedArticles();

      console.log("SAVED ARTICLES RESPONSE:", response);

      const savedIds = response.data.map((article: Story) => article.id);

      setSavedStoryIds(savedIds);
    } catch (error) {
      console.error("FAILED TO LOAD SAVED ARTICLES:", error);
    }
  };

  loadSavedArticles();
}, []);

  const [showAllTopics, setShowAllTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  const {
    data: stories = [],
    isLoading,
    isError,
  } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: () => getStories(),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });

  const filteredStories = useMemo(() => {
    if (selectedTopic === "All") {
      return stories;
    }

    return stories.filter((story) => {
      const category = story.category?.toLowerCase() ?? "";
      const topic = selectedTopic.toLowerCase();

      return category.includes(topic);
    });
  }, [stories, selectedTopic]);

  const visibleStories = filteredStories.slice(0, visibleCount);

  const handleShare = async (story: Story) => {
    const storyUrl =
      window.location.origin +
      window.location.pathname +
      `#${story.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: story.title,
          text: story.excerpt,
          url: storyUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(storyUrl);
        alert("Story link copied to clipboard!");
      } else {
        alert("Unable to share this story.");
      }
    } catch (error) {
      console.log("Share cancelled:", error);
    }
  };

  const handleSaveStory = async (storyId: string) => {
  console.log("SAVE BUTTON CLICKED:", storyId);

  try {
    if (SavedStoryIDs.includes(storyId)) {
      console.log("UNSAVING ARTICLE:", storyId);

      await unsaveArticle(storyId);

      setSavedStoryIds((current) =>
        current.filter((id) => id !== storyId)
      );
    } else {
      console.log("SAVING ARTICLE:", storyId);

      await saveArticle(storyId);

      setSavedStoryIds((current) => [
        ...current,
        storyId,
      ]);
    }
  } catch (error) {
    console.error("FAILED TO SAVE/UNSAVE:", error);
  }
};

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setVisibleCount(3);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenStory = (storyId: string) => {
    navigate(`/story/${storyId}`);
  };

  const showAllStories = () => {
    setSelectedTopic("All");
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) => current + 3);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF9F8]">
        <p className="font-hanken text-sm text-[#8A8581]">
          Loading stories...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBF9F8]">
        <h2 className="font-playfair text-2xl">
          Unable to load stories
        </h2>

        <p className="mt-3 font-hanken text-sm text-[#8A8581]">
          Something went wrong while fetching stories.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F8] text-[#1A1A1A]">
      <main className="mx-auto mt-14 w-full max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <section className="space-y-16 lg:col-span-8">
            {selectedTopic !== "All" && (
              <div className="flex items-center justify-between border-b border-[#ECE6E0] pb-4">
                <div className="font-hanken text-xs uppercase tracking-[0.2em] text-[#8A8581]">
                  Filtered by{" "}
                  <span className="text-[#B35D52]">
                    {selectedTopic}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={showAllStories}
                  className="font-hanken text-xs uppercase tracking-[0.15em] text-[#5C5855] transition-colors hover:text-[#B35D52]"
                >
                  View all
                </button>
              </div>
            )}

            {visibleStories.length > 0 ? (
              visibleStories.map((story) => {
                // Safely extract cover image property candidates
                const rawImage =
                  story.coverImage ||
                  (story as any).imageUrl ||
                  (story as any).image;

                // Check that the image URL is a non-empty string with non-whitespace content
                const imageSrc =
                  typeof rawImage === "string" && rawImage.trim() !== ""
                    ? rawImage
                    : null;

                return (
                  <article
                    id={story.id}
                    key={story.id}
                    className="grid grid-cols-1 gap-8 border-b border-[#ECE6E0] pb-16 md:grid-cols-12 md:gap-10"
                  >
                    <div className="order-last flex flex-col justify-center md:order-first md:col-span-7">
                      <div className="mb-4 flex flex-wrap items-center gap-3 font-hanken text-[11px] font-medium uppercase tracking-[0.18em]">
                        <span className="text-[#B35D52]">
                          {story.category}
                        </span>

                        <span className="text-[#8A8581]">
                          /
                        </span>

                        <span className="text-[#5C5855]">
                          {story.author}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleShare(story)}
                        className="uppercase tracking-[0.15em] transition-colors hover:text-[#B35D52]"
                      >
                        Share
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveStory(story.id)}
                        aria-label={
                          SavedStoryIDs.includes(story.id)
                            ? "Unsave story"
                            : "Save story"
                        }
                      >
                        <Bookmark
                          size={20}
                          strokeWidth={1.5}
                          className={
                            SavedStoryIDs.includes(story.id)
                              ? "fill-black text-black"
                              : "text-black"
                      <h2
                        onClick={() => handleOpenStory(story.id)}
                        className="cursor-pointer font-playfair text-3xl font-semibold leading-tight text-[#1A1A1A] transition-colors hover:text-[#B35D52] md:text-4xl"
                      >
                        {story.title}
                      </h2>

                      <p className="mt-5 max-w-xl font-hanken text-base font-light leading-7 text-[#5C5855]">
                        {story.excerpt}
                      </p>

                      <div className="mt-7 flex items-center gap-5 font-hanken text-xs text-[#8A8581]">
                        <span>
                          {story.date
                            ? new Date(story.date).toLocaleDateString()
                            : ""}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#8A8581]" />

                        <button
                          type="button"
                          onClick={() => handleShare(story)}
                          className="uppercase tracking-[0.15em] transition-colors hover:text-[#B35D52]"
                        >
                          Share
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSaveStory(story.id)}
                          aria-label={
                            savedStoryIds.includes(story.id)
                              ? "Unsave story"
                              : "Save story"
                          }
                        >
                          <Bookmark
                            size={20}
                            strokeWidth={1.5}
                            className={
                              savedStoryIds.includes(story.id)
                                ? "fill-black text-black"
                                : "text-black"
                            }
                          />
                        </button>
                      </div>
                    </div>

                    {/* Clickable Cover Image */}
                    <div className="order-first md:order-last md:col-span-5">
                      <figure>
                        <div
                          onClick={() => handleOpenStory(story.id)}
                          className="group/img relative aspect-[4/3] cursor-pointer overflow-hidden bg-[#F4F0EB]"
                        >
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={story.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-hanken text-xs text-[#8A8581]">
                              No Cover Image
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-0 bg-[#1A1A1A]/5" />
                        </div>
                      </figure>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="border-y border-[#ECE6E0] py-20 text-center">
                <h2 className="font-playfair text-2xl">
                  No stories found
                </h2>

                <p className="mt-3 font-hanken text-sm text-[#8A8581]">
                  There are no stories available for this topic yet.
                </p>

                <button
                  type="button"
                  onClick={showAllStories}
                  className="mt-6 border border-[#1A1A1A] px-6 py-3 font-hanken text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#1A1A1A] hover:text-white"
                >
                  View all stories
                </button>
              </div>
            )}

            {visibleCount < filteredStories.length && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="border border-[#1A1A1A] px-6 py-3 font-hanken text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#1A1A1A] hover:text-white"
                >
                  Load more
                </button>
              </div>
            )}
          </section>

          <aside className="space-y-12 lg:col-span-4 lg:border-l lg:border-[#ECE6E0] lg:pl-10">
            <section>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-playfair text-2xl font-semibold">
                  <span className="text-[#B35D52]">
                    For You
                  </span>
                </h3>

                <span className="font-hanken text-[10px] uppercase tracking-[0.18em] text-[#8A8581]">
                  Latest
                </span>
              </div>

              <div className="space-y-6">
                {stories.slice(0, 4).map((story, index) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => handleOpenStory(story.id)}
                    className="group block w-full text-left"
                  >
                    <div className="flex gap-4">
                      <span className="shrink-0 font-hanken text-[10px] text-[#8A8581]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h4 className="font-playfair text-lg font-medium leading-snug transition-colors group-hover:text-[#B35D52]">
                          {story.title}
                        </h4>

                        <p className="mt-1 font-hanken text-xs text-[#8A8581]">
                          {story.category}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4">
                <div className="mb-5 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/new-story")}
                    aria-label="Add Story"
                    className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 font-hanken text-xs font-medium uppercase tracking-[0.15em] text-black"
                  >
                    <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:max-w-20 group-hover:opacity-100">
                      Add Story
                    </span>

                    <Plus
                      size={40}
                      strokeWidth={1.5}
                      className="text-black"
                    />
                  </button>
                </div>

                <h3 className="font-playfair text-2xl font-semibold">
                  Categories
                </h3>

                <p className="mt-3 font-hanken text-sm leading-6 text-[#8A8581]">
                  Filter our continuous catalog through core disciplines and philosophical threads:
                </p>
              </div>

              <div className="space-y-2">
                {(showAllTopics ? topics : topics.slice(0, 7)).map((topic) => {
                  const isActive = selectedTopic === topic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleTopicClick(topic)}
                      className={`flex w-full items-center justify-between border-b border-[#ECE6E0] py-3 text-left font-hanken text-sm transition-colors ${
                        isActive
                          ? "text-[#B35D52]"
                          : "text-[#5C5855] hover:text-[#B35D52]"
                      }`}
                    >
                      <span>{topic}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowAllTopics((current) => !current)}
                className="mt-6 font-hanken text-xs uppercase tracking-[0.15em] text-[#B35D52] transition-colors hover:text-[#9E4E44]"
              >
                {showAllTopics ? "Show less ↑" : "View full index →"}
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}