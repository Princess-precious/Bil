/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 18/09/2026 - 10:40:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/09/2026
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

  const [savedStoryIds, setSavedStoryIds] = useState<string[]>([]);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const response = await getSavedArticles();

        console.log("SAVED ARTICLES RESPONSE:", response);

        const articlesList = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.articles)
          ? response.data.articles
          : [];

        const savedIds = articlesList
          .map(
            (article: any) =>
              article.id || article._id || article.articleId
          )
          .filter(Boolean);

        setSavedStoryIds(savedIds);
      } catch (error) {
        console.error("FAILED TO LOAD SAVED ARTICLES:", error);
      }
    };

    loadSavedArticles();
  }, []);

  const {
    data: rawStories = [],
    isLoading,
    isError,
  } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await getStories();

      return Array.isArray(res) ? res : res?.data || [];
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });

  const stories = useMemo(() => {
    return Array.isArray(rawStories) ? rawStories : [];
  }, [rawStories]);

  const getCategoryName = (story: any): string => {
    if (typeof story.category === "string") {
      return story.category;
    }

    if (story.category?.name) {
      return story.category.name;
    }

    if (typeof story.categoryId === "string") {
      return story.categoryId;
    }

    return "Uncategorized";
  };

  const getAuthorName = (story: any): string => {
    if (typeof story.author === "string") {
      return story.author;
    }

    if (story.author?.name) {
      return story.author.name;
    }

    if (story.user?.name) {
      return story.user.name;
    }

    return "Anonymous";
  };

  const filteredStories = useMemo(() => {
    if (selectedTopic === "All") {
      return stories;
    }

    return stories.filter((story) => {
      const category = getCategoryName(story).toLowerCase();
      const topic = selectedTopic.toLowerCase();

      return category.includes(topic);
    });
  }, [stories, selectedTopic]);

  const visibleStories = filteredStories.slice(0, visibleCount);

  const handleShare = async (story: Story) => {
    const storyId = story.id || (story as any)._id;

    const storyUrl = `${window.location.origin}/story/${storyId}`;

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
    const isCurrentlySaved = savedStoryIds.includes(storyId);

    console.log("SAVE BUTTON CLICKED:", storyId);

    // Optimistically update the UI
    setSavedStoryIds((current) =>
      isCurrentlySaved
        ? current.filter((id) => id !== storyId)
        : [...current, storyId]
    );

    try {
      if (isCurrentlySaved) {
        console.log("UNSAVING ARTICLE:", storyId);
        await unsaveArticle(storyId);
      } else {
        console.log("SAVING ARTICLE:", storyId);
        await saveArticle(storyId);
      }
    } catch (error) {
      console.error("FAILED TO SAVE/UNSAVE ARTICLE:", error);

      // Restore previous state if API request fails
      setSavedStoryIds((current) =>
        isCurrentlySaved
          ? [...current, storyId]
          : current.filter((id) => id !== storyId)
      );
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

          {/* MAIN FEED */}
          <section className="space-y-16 lg:col-span-8">

            {/* Active filter display */}
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

            {/* STORIES LIST */}
            {visibleStories.length > 0 ? (
              visibleStories.map((story) => {
                const storyId =
                  story.id || (story as any)._id;

                if (!storyId) {
                  return null;
                }

                const categoryName =
                  getCategoryName(story);

                const authorName =
                  getAuthorName(story);

                const isSaved =
                  savedStoryIds.includes(storyId);

                const coverImageUrl =
                  story.coverImage;

                return (
                  <article
                    id={storyId}
                    key={storyId}
                    className="border-b border-[#ECE6E0] pb-16"
                  >
                    {/* STORY CONTENT */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

                      {/* TEXT CONTENT */}
                      <div className="min-w-0 flex-1">

                        {/* Category / Author */}
                        <div className="mb-4 flex flex-wrap items-center gap-3 font-hanken text-[11px] font-medium uppercase tracking-[0.18em]">
                          <span className="text-[#B35D52]">
                            {categoryName}
                          </span>

                          <span className="text-[#8A8581]">
                            /
                          </span>

                          <span className="text-[#5C5855]">
                            {authorName}
                          </span>
                        </div>

                        {/* Title */}
                        <h2
                          onClick={() =>
                            handleOpenStory(storyId)
                          }
                          className="cursor-pointer font-playfair text-3xl font-semibold leading-tight text-[#1A1A1A] transition-colors hover:text-[#B35D52] md:text-4xl"
                        >
                          {story.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-5 max-w-xl font-hanken text-base font-light leading-7 text-[#5C5855]">
                          {story.excerpt}
                        </p>

                        {/* Date / Share / Bookmark */}
                        <div className="mt-7 flex items-center gap-5 font-hanken text-xs text-[#8A8581]">

                          {/* Date */}
                          <span>
                            {story.createdAt ||
                            (story as any).date
                              ? new Date(
                                  story.createdAt ||
                                    (story as any).date
                                ).toLocaleDateString()
                              : ""}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-[#8A8581]" />

                          {/* Share */}
                          <button
                            type="button"
                            onClick={() =>
                              handleShare(story)
                            }
                            className="uppercase tracking-[0.15em] transition-colors hover:text-[#B35D52]"
                          >
                            Share
                          </button>

                          {/* Bookmark */}
                          <button
                            type="button"
                            onClick={() =>
                              handleSaveStory(storyId)
                            }
                            aria-label={
                              isSaved
                                ? "Unsave story"
                                : "Save story"
                            }
                            className="transition-transform active:scale-95"
                          >
                            <Bookmark
                              size={20}
                              strokeWidth={1.5}
                              className={
                                isSaved
                                  ? "fill-[#B35D52] text-[#B35D52]"
                                  : "text-black hover:text-[#B35D52]"
                              }
                            />
                          </button>
                        </div>
                      </div>

                      {/* COVER IMAGE */}
                      {coverImageUrl && (
                        <div className="w-full shrink-0 md:w-[38%]">
                          <img
                            src={coverImageUrl}
                            alt={story.title}
                            className="h-64 w-full object-cover"
                            onError={(event) => {
                              console.error(
                                "FAILED TO LOAD COVER IMAGE:",
                                coverImageUrl
                              );

                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              /* EMPTY STATE */
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

            {/* LOAD MORE */}
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

          {/* SIDEBAR */}
          <aside className="space-y-12 lg:col-span-4 lg:border-l lg:border-[#ECE6E0] lg:pl-10">

            {/* FOR YOU */}
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
                {stories
                  .slice(0, 4)
                  .map((story, index) => {
                    const storyId =
                      story.id ||
                      (story as any)._id;

                    if (!storyId) {
                      return null;
                    }

                    return (
                      <button
                        key={storyId}
                        type="button"
                        onClick={() =>
                          handleOpenStory(storyId)
                        }
                        className="group block w-full text-left"
                      >
                        <div className="flex gap-4">
                          <span className="shrink-0 font-hanken text-[10px] text-[#8A8581]">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div>
                            <h4 className="font-playfair text-lg font-medium leading-snug transition-colors group-hover:text-[#B35D52]">
                              {story.title}
                            </h4>

                            <p className="mt-1 font-hanken text-xs text-[#8A8581]">
                              {getCategoryName(story)}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </section>

            {/* CATEGORIES INDEX */}
            <section>
              <div className="mb-4">
                <div className="mb-5 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/new-story")
                    }
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
                  Filter our continuous catalog through core
                  disciplines and philosophical threads:
                </p>
              </div>

              <div className="space-y-2">
                {(showAllTopics
                  ? topics
                  : topics.slice(0, 7)
                ).map((topic) => {
                  const isActive =
                    selectedTopic === topic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() =>
                        handleTopicClick(topic)
                      }
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
                onClick={() =>
                  setShowAllTopics(
                    (current) => !current
                  )
                }
                className="mt-6 font-hanken text-xs uppercase tracking-[0.15em] text-[#B35D52] transition-colors hover:text-[#9E4E44]"
              >
                {showAllTopics
                  ? "Show less ↑"
                  : "View full index →"}
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

