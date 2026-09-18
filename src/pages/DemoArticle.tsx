/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 17/09/2026 - 23:52:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import firstcomment from "../images/firstcomment.jpg";
import feedtechnology from "../../public/feedtechnology.png";
import {
  getStories,
  getComments,
  createComment,
  deleteComment,
  type Story,
} from "../lib/api/stories";


export default function DemoArticle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");

  // Fetch all stories and locate the current story matching the route param
  const { data: stories = [], isLoading, isError } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: () => getStories(),
  });

  const {
    data: comments = [],
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id!),
    enabled: !!id,
  });

  const createCommentMutation = useMutation({
  mutationFn: () => createComment(id!, comment),
  onSuccess: () => {
    setComment("");

    queryClient.invalidateQueries({
      queryKey: ["comments", id],
    });
  },
  onError: (error) => {
    console.error("COMMENT ERROR:", error);
    alert("Failed to post comment");
  },
});
const deleteCommentMutation = useMutation({
  mutationFn: (commentId: string) => deleteComment(id!, commentId),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["comments", id],
    });
  },
  onError: (error) => {
    console.error("DELETE COMMENT ERROR:", error);
    alert("Failed to delete comment");
  },
});
  const story = stories.find((item) => String(item.id) === String(id));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf9f8] font-hanken">
        <p className="text-sm text-[#8A8581]">Loading story...</p>
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbf9f8] font-hanken">
        <h2 className="font-playfair text-2xl">Story not found</h2>
        <button
          onClick={() => navigate("/feed")}
          className="mt-4 border border-black px-4 py-2 text-xs uppercase"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center font-hanken">
        <div className="flex flex-col items-center w-full">
          {/* SECTION 1: HEADER & TITLE */}
          <section className="flex w-full items-center justify-center bg-[#fbf9f8] mt-[80px] py-8 px-14 md:px-90">
            <div className="flex flex-col flex-wrap items-center text-center gap-4 max-w-4xl">
              <p className="text-xs uppercase tracking-widest text-[#b35d52]">
                {story.category} {story.author ? `/ ${story.author}` : ""}
              </p>
              <h1 className="font-bold text-2xl md:text-5xl font-playfair leading-tight">
                {story.title}
              </h1>
              {story.excerpt && (
                <p className="text-sm md:text-base text-[#5C5855]">
                  {story.excerpt}
                </p>
              )}
            </div>
          </section>

          {/* SECTION 2: COVER IMAGE */}
          {story.coverImage && (
            <section className="flex w-full bg-[#fbf9f8] items-center justify-center py-4">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full max-h-[500px] md:w-[1000px] object-cover"
              />
            </section>
          )}

          {/* SECTION 3: DYNAMIC DRAFT / QUILL CONTENT */}
          <section className="flex flex-col w-full max-w-4xl bg-[#fbf9f8] px-6 md:px-12 mt-10">
            <div
              className="prose prose-lg max-w-none text-xs md:text-base leading-relaxed text-[#1A1A1A]"
              dangerouslySetInnerHTML={{ __html: typeof story.content === "string" ? story.content : "" }}
            />

            <div className="flex flex-row mt-10 gap-2 mb-10">
              <span className="bg-[#f5f3f3] text-[10px] p-1">Design Theory</span>
              <span className="bg-[#f5f3f3] text-[10px] p-1">UI Architecture</span>
              <span className="bg-[#f5f3f3] text-[10px] p-1">Web Trends</span>
            </div>
          </section>

          {/* SECTION 4: DISCUSSION */}
          
          <section className="flex flex-col w-full max-w-4xl px-6 md:px-12 border-t border-[#dbdad9]">
            <h1 className="text-xl font-bold py-6">
              Discussion ({comments.length})
            </h1>

            <div className="flex flex-col gap-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your perspective..."
                className="bg-white p-4 text-sm border border-[#dbdad9]"
              />

              <button
                type="button"
                onClick={() => createCommentMutation.mutate()}
                disabled={!comment.trim() || createCommentMutation.isPending}
                className="flex self-start text-sm px-4 py-2 bg-black text-white disabled:opacity-50"
              >
                {createCommentMutation.isPending
                  ? "POSTING..."
                  : "POST COMMENT"}
              </button>
            </div>

            <div className="flex flex-col mt-14 gap-4">
              {commentsLoading ? (
                <p className="text-sm text-[#8A8581]">
                  Loading comments...
                </p>
              ) : comments.length === 0 ? (
                <p className="text-sm text-[#8A8581]">
                  No comments yet. Be the first to share your perspective.
                </p>
              ) : (
                comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="flex flex-row gap-2 border-b border-[#dbdad9]"
                  >
                    <div className="flex rounded-full overflow-hidden flex-shrink-0">
                      <img
                      src={
                        comment.user?.profileImage ||
                        comment.user?.avatar ||
                        comment.author?.profileImage ||
                        comment.author?.avatar ||
                        comment.profileImage ||
                        comment.avatar ||
                        firstcomment
                      }
                      className="object-cover rounded-full w-10 h-10"
                      alt="Commenter avatar"
                    />
                        
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1 className="text-xs font-bold">
                        {comment.user?.name ||
                          comment.author?.name ||
                          comment.user?.username ||
                          comment.author?.username ||
                          comment.name ||
                          comment.username ||
                          "Anonymous"}
                      </h1>

                      <p className="text-xs">
                        {comment.content}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Delete this comment?")) {
                            deleteCommentMutation.mutate(comment.id);
                          }
                        }}
                        disabled={deleteCommentMutation.isPending}
                        className="self-start text-[10px] text-red-600 pb-5 hover:underline disabled:opacity-50"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* SUGGESTIONS */}
          <section className="flex flex-col w-full max-w-6xl p-6 md:p-14">
            <h1 className="text-2xl md:text-4xl font-bold text-[#b35d52] p-4 md:p-8">
              Suggestions
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stories
                .filter((item) => String(item.id) !== String(id))
                .slice(0, 3)
                .map((suggested) => (
                  <div
                    key={suggested.id}
                    onClick={() => {
                      navigate(`/story/${suggested.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex flex-col gap-2 p-4 cursor-pointer group"
                  >
                    <img
                      src={suggested.coverImage || feedtechnology}
                      alt={suggested.title}
                      className="h-48 w-[80%] object-cover"
                    />
                    <h1 className="text-sm">
                      <span className="text-[#b35d52]">
                        {suggested.category}
                      </span>{" "}
                      / {suggested.author || "ANONYMOUS"}
                    </h1>
                    <h1 className="text-xl font-bold group-hover:text-[#b35d52] transition-colors">
                      {suggested.title}
                    </h1>
                    <p className="text-xs text-[#5C5855]">
                      {suggested.excerpt}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Navigation Controls */}
          <button
            onClick={() => navigate("/feed")}
            className="fixed top-24 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white shadow-lg hover:bg-gray-800"
          >
            ←
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white shadow-lg hover:bg-gray-800"
          >
            ↑
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}