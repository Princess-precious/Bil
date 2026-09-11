/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 09/09/2026 - 14:29:55
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/09/2026
    * - Author          : HP
    * - Modification    : 
**/

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Story = {
  id: string;
  category: string;
  author: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  caption: string;
};

type ForYouStory = {
  id: string;
  type: string;
  title: string;
  category: string;
};

const initialStories: Story[] = [
  {
    id: "article-1",
    category: "ARCHITECTURE",
    author: "ELENA ROSTOVA",
    title:
      "The Brutalist Revival: Concrete Poetics in the Modern City",
    excerpt:
      "A meditation on the enduring language of brutalism, where raw concrete becomes a canvas for light, shadow, and human scale.",
    date: "Oct 12",
    coverImage: "/feedarchitecture.png",
    caption: "Barbican Estate, London — Monochrome Study",
  },
  {
    id: "article-2",
    category: "TECHNOLOGY & MIND",
    author: "MARCUS THRONE",
    title: "Silicon Sentience: The Philosophy of Code",
    excerpt:
      "As machines begin to mirror the complexity of human cognition, we ask what it means for code to understand.",
    date: "Oct 10",
    coverImage: "/feedtechnology.png",
    caption: "Synthesized Neural Topology — Vector Render",
  },
  {
    id: "article-3",
    category: "CULTURE & CINEMA",
    author: "JULIAN MORAND",
    title:
      "The Aesthetics of Silence: Why Modern Cinema Craves Stillness",
    excerpt:
      "In an age of constant noise, filmmakers are rediscovering the power of negative space, stillness, and silence.",
    date: "Oct 08",
    coverImage: "/feedcinema.png",
    caption: "Still from Tarkovsky Retrospective",
  },
  {
    id: "article-4",
    category: "DESIGN",
    author: "SOFIA RENARD",
    title: "The Quiet Geometry of Contemporary Design",
    excerpt:
      "Exploring how restraint, proportion, and negative space are shaping a new visual language in modern design.",
    date: "Oct 06",
    coverImage: "/feedarchitecture.png",
    caption: "Study in Contemporary Form",
  },
  {
    id: "article-5",
    category: "PHILOSOPHY",
    author: "ADRIAN VALE",
    title: "The Architecture of Solitude",
    excerpt:
      "Why certain spaces make us feel alone, reflective, and strangely connected to ourselves.",
    date: "Oct 04",
    coverImage: "/feedcinema.png",
    caption: "Interior Study — Quiet Spaces",
  },
  {
    id: "article-6",
    category: "ARTIFICIAL INTELLIGENCE",
    author: "NORA KLEIN",
    title: "When Machines Become Creative Partners",
    excerpt:
      "The relationship between human imagination and artificial intelligence is changing the way we create.",
    date: "Oct 02",
    coverImage: "/feedtechnology.png",
    caption: "Synthetic Intelligence — Visual Study",
  },
];

const forYouStories: ForYouStory[] = [
  {
    id: "article-3",
    type: "ESSAY",
    title: "The Aesthetics of Silence in Cinema",
    category: "Film",
  },
  {
    id: "article-4",
    type: "CRITIQUE",
    title: "Sustainable Haute Couture: A Paradox?",
    category: "Fashion",
  },
  {
    id: "article-5",
    type: "DISPATCH",
    title: "Gastronomy as Geopolitics",
    category: "Culture",
  },
  {
    id: "article-5",
    type: "DIALOGUE",
    title: "The Architecture of Solitude",
    category: "Philosophy",
  },
];

const topics = [
  { name: "Architecture", count: 18 },
  { name: "Design", count: 24 },
  { name: "Economics", count: 12 },
  { name: "Philosophy", count: 31 },
  { name: "Artificial Intelligence", count: 16 },
  { name: "Cinema", count: 9 },
  { name: "Visual Culture", count: 22 },
  { name: "Literature", count: 15 },
  { name: "Photography", count: 19 },
  { name: "Technology", count: 27 },
  { name: "Fashion", count: 14 },
  { name: "Music", count: 11 },
  { name: "Politics", count: 20 },
  { name: "Science", count: 17 },
  { name: "Culture", count: 25 },
];

export default function Feed() {


  const navigate = useNavigate();

  const [stories, ] = useState<Story[]>(initialStories);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState("All");

  const [visibleCount, setVisibleCount] = useState(3);

  // --------------------------------------------------
  // FILTER STORIES BY TOPIC
  // --------------------------------------------------

  const filteredStories = useMemo(() => {
    if (selectedTopic === "All") {
      return stories;
    }

    return stories.filter((story) => {
      const category = story.category.toLowerCase();
      const topic = selectedTopic.toLowerCase();

      if (topic === "cinema") {
        return category.includes("cinema");
      }

      if (topic === "artificial intelligence") {
        return category.includes("artificial intelligence");
      }

      return category.includes(topic);
    });
  }, [stories, selectedTopic]);

  const visibleStories = filteredStories.slice(0, visibleCount);

  // --------------------------------------------------
  // SHARE FUNCTION
  // --------------------------------------------------

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
      // User cancelled the share menu.
      console.log("Share cancelled:", error);
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

  // --------------------------------------------------
  // FOR YOU CLICK
  // --------------------------------------------------

  const handleForYouClick = (storyId: string) => {
    const element = document.getElementById(storyId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // --------------------------------------------------
  // RESET TOPIC
  // --------------------------------------------------

  const showAllStories = () => {
    setSelectedTopic("All");
    setVisibleCount(3);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F8] text-[#1A1A1A]">
      <main className="mx-auto mt-14 w-full max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* =========================================
              MAIN FEED
          ========================================= */}

          <section className="space-y-16 lg:col-span-8">
            {/* ALL STORIES BUTTON */}

            {selectedTopic !== "All" && (
              <div className="flex items-center justify-between border-b border-[#ECE6E0] pb-4">
                <div className="font-hanken text-xs uppercase tracking-[0.2em] text-[#8A8581]">
                  Filtered by:{" "}
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

            {/* =====================================
                STORIES
            ===================================== */}

            {visibleStories.length > 0 ? (
              visibleStories.map((story) => (
                <article
                  id={story.id}
                  key={story.id}
                  className="grid grid-cols-1 gap-8 border-b border-[#ECE6E0] pb-16 md:grid-cols-12 md:gap-10"
                >
                  {/* TEXT */}

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

                    <h2 className="font-playfair text-3xl font-semibold leading-tight text-[#1A1A1A] md:text-4xl">
                      {story.title}
                    </h2>

                    <p className="mt-5 max-w-xl font-hanken text-base font-light leading-7 text-[#5C5855]">
                      {story.excerpt}
                    </p>

                    <div className="mt-7 flex items-center gap-5 font-hanken text-xs text-[#8A8581]">
                      <span>{story.date}</span>

                      <span className="h-1 w-1 rounded-full bg-[#8A8581]" />

                      <button
                        type="button"
                        onClick={() => handleShare(story)}
                        className="uppercase tracking-[0.15em] transition-colors hover:text-[#B35D52]"
                      >
                        Share
                      </button>
                    </div>
                  </div>

                  {/* IMAGE */}

                  <div className="order-first md:order-last md:col-span-5">
                    <figure>
                      <div className="group/img relative aspect-[4/3] overflow-hidden bg-[#F4F0EB]">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[#1A1A1A]/5" />
                      </div>

                      <figcaption className="mt-2 text-right font-playfair text-[11px] italic text-[#8A8581]">
                        {story.caption}
                      </figcaption>
                    </figure>
                  </div>
                </article>
              ))
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
          </section>

           
                 
          {/* =========================================
              SIDEBAR
          ========================================= */}

          <aside className="space-y-12 lg:col-span-4 lg:border-l lg:border-[#ECE6E0] lg:pl-10">
            {/* =====================================
                FOR YOU
            ===================================== */}

            <section>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-playfair text-2xl font-semibold">
                  <span className="text-[#B35D52]">
                    For You
                  </span>
                </h3>

                <span className="font-hanken text-[10px] uppercase tracking-[0.18em] text-[#8A8581]">
                  Curated
                </span>
              </div>

              <div className="space-y-6">
                {forYouStories.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    type="button"
                    onClick={() => handleForYouClick(item.id)}
                    className="group block w-full text-left"
                  >
                    <div className="flex gap-4">
                      <span className="shrink-0 font-hanken text-[10px] text-[#8A8581]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        

                        <h4 className="font-playfair text-lg font-medium leading-snug transition-colors group-hover:text-[#B35D52]">
                          {item.title}
                        </h4>

                        <p className="mt-1 font-hanken text-xs text-[#8A8581]">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>



           {/* =====================================
                      EXPLORE TOPICS
                ===================================== */}

             <section>
                 <div className="mb-4">

                  <div className="mb-5 flex items-center justify-end">
               <button
                  type="button"
                   onClick={() => navigate("/new-story")}
                   className="group flex  fixed items-center gap-2 font-hanken text-xs font-medium uppercase tracking-[0.15em] text-[#B35D52] transition-colors hover:text-[#9E4E44]"
                    aria-label="Add Story"
                    >
               <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-20 group-hover:opacity-100">
                    Add Story
                </span>

               <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                 →
                 </span>
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
                    {(showAllTopics ? topics : topics.slice(0, 7)).map((topic) => {
                     const isActive = selectedTopic === topic.name;

                     return (
                        <button
                           key={topic.name}
                             type="button"
                               onClick={() => handleTopicClick(topic.name)}
                               className={`flex w-full items-center justify-between border-b border-[#ECE6E0] py-3 text-left font-hanken text-sm transition-colors ${
                               isActive
                              ? "text-[#B35D52]"
                            : "text-[#5C5855] hover:text-[#B35D52]"
                      }`}
                     >
                    <span>{topic.name}</span>

                      <span className="text-xs text-[#8A8581]">
                         {topic.count}
                      </span>
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