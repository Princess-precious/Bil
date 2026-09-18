/**
 * @description      : New Story creation component
 * @author           : HP
 * @group            :
 * @created          : 07/09/2026 - 13:24:32
 *
 * MODIFICATION LOG
 * - Version         : 1.0.3
 * - Date            : 18/09/2026
 * - Author          : HP
 * - Modification    : Integrated standalone cover image upload flow
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ReactMarkdown from "react-markdown";

import { getCategories } from "../lib/api/category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import remarkGfm from "remark-gfm";
import {
  createArticle,
  publishArticle,
} from "../lib/api/articles";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import axios from "axios";

type Draft = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
};

export default function NewStory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Actual selected image file
  const [image, setImage] = useState<File | null>(null);

  // Local preview
  const [preview, setPreview] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI States
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAction, setAiAction] = useState<
    "improve" | "quote" | "rewrite" | null
  >(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Begin writing...",
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["blockquote"],
          ["link", "image"],
        ],
      },
    });

    quillRef.current = quill;

    quill.on("text-change", () => {
      setContent(quill.root.innerHTML);
    });

    const savedDraft = localStorage.getItem("storyDraft");

    if (savedDraft) {
      try {
        const draft: Draft = JSON.parse(savedDraft);

        setTitle(draft.title || "");
        setExcerpt(draft.excerpt || "");
        setCategory(draft.category || "");
        setPreview(draft.image || null);

        if (draft.content) {
          quill.root.innerHTML = draft.content;
          setContent(draft.content);
        }
      } catch (error) {
        console.error("Failed to load saved draft:", error);
      }
    }

    return () => {
      quillRef.current = null;

      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    };
  }, []);

  /**
   * Handle cover image selection
   */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Store actual File.
    // This File will later be sent to /upload/image.
    setImage(file);

    // Create local preview only.
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  /**
   * AI Request
   */
  const handleAIRequest = async () => {
    if (!aiPrompt.trim() || aiLoading) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setAiResponse(
        "You must be logged in to use the AI assistant."
      );
      return;
    }

    let requestMessage = "";

    if (aiAction !== null) {
      const storyText =
        quillRef.current?.getText().trim() || "";

      if (!storyText) {
        setAiResponse(
          "Write or paste a story into the editor first."
        );
        return;
      }

      const instructions = {
        improve:
          "Improve the clarity, flow, grammar, and engagement of this story. Return only the improved story.",
        quote:
          "Suggest one relevant quote that fits this story. Briefly explain why it fits and where it could be placed.",
        rewrite:
          "Rewrite this story to be more engaging while preserving its meaning. Return only the rewritten story.",
      };

      requestMessage = `
${instructions[aiAction]}

Story title: ${title || "Untitled"}

Story:
${storyText}
      `.trim();
    } else {
      const storyText =
        quillRef.current?.getText().trim() || "";

      requestMessage = `
User instruction:
${aiPrompt}

Story title: ${title || "Untitled"}

Story:
${storyText}
      `.trim();
    }

    setAiLoading(true);
    setAiResponse("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: requestMessage,
          }),
        }
      );

      const text = await response.text();

      let result;

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          `Server returned non-JSON response (${response.status} ${response.statusText}): ${text.slice(
            0,
            100
          )}`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.detail ||
            result.message ||
            `HTTP Error ${response.status}`
        );
      }

      const responseContent =
        result.data ||
        result.response ||
        result.message ||
        text;

      if (!responseContent) {
        throw new Error(
          "Backend returned an empty response."
        );
      }

      setAiResponse(responseContent);
    } catch (error) {
      setAiResponse(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleAIQuickAction = (
    prompt: string,
    action: "improve" | "quote" | "rewrite" | null
  ) => {
    setAiPrompt(prompt);
    setAiAction(action);
  };

  const handleInsertToEditor = () => {
    if (quillRef.current && aiResponse) {
      const range = quillRef.current.getSelection(true);

      quillRef.current.insertText(
        range.index,
        `\n${aiResponse}\n`
      );
    }
  };

  const handleClearAI = () => {
    setAiPrompt("");
    setAiResponse("");
    setAiAction(null);
  };

  /**
   * SAVE DRAFT
   */
  const handleSaveDraft = async () => {
    if (isSubmitting) return;

    if (!title.trim()) {
      return setMessage("Please enter an article title.");
    }

    if (!content.trim()) {
      return setMessage("Please write your story.");
    }

    if (!category) {
      return setMessage("Please select a category.");
    }

    try {
      setIsSubmitting(true);
      setMessage(
        image
          ? "Uploading cover image and saving draft..."
          : "Saving draft..."
      );

      await createArticle({
        title: title.trim(),
        content,
        categoryId: category,
        excerpt: excerpt.trim(),
        status: "draft",
        file: image ?? undefined,
      });

      setMessage("Draft saved successfully.");

      const draft: Draft = {
        title,
        excerpt,
        content,
        category,
        image: preview,
      };

      localStorage.setItem(
        "storyDraft",
        JSON.stringify(draft)
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("FAILED TO SAVE DRAFT:", error);

      if (axios.isAxiosError(error)) {
        console.error(
          "STATUS:",
          error.response?.status
        );
        console.error(
          "RESPONSE:",
          error.response?.data
        );
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to save draft."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * PUBLISH STORY
   *
   * Flow:
   * 1. Upload image through /upload/image
   * 2. Create article as draft with returned coverImage URL
   * 3. Publish article through /articles/:id/publish
   */
  const handlePublish = async () => {
    if (isSubmitting) return;

    if (!title.trim()) {
      return setMessage("Please enter an article title.");
    }

    if (!content.trim()) {
      return setMessage("Please write your story.");
    }

    if (!category) {
      return setMessage("Please select a category.");
    }

    try {
      setIsSubmitting(true);

      setMessage(
        image
          ? "Uploading cover image..."
          : "Creating article..."
      );

      /**
       * createArticle() handles the image upload.
       *
       * If image exists:
       * POST /upload/image
       *        ↓
       * Cloudinary URL
       *        ↓
       * POST /articles
       */
      const article = await createArticle({
        title: title.trim(),
        content,
        categoryId: category,
        excerpt: excerpt.trim(),
        status: "draft",
        file: image ?? undefined,
      });

      console.log("ARTICLE CREATED:", article);

      /**
       * Support the possible response structures.
       */
      const articleId =
        article?.data?.id ??
        article?.id ??
        article?.data?.article?.id ??
        article?.data?.articleId;

      if (!articleId) {
        throw new Error(
          "Article was created, but no article ID was returned by the backend."
        );
      }

      /**
       * Publish the draft.
       */
      setMessage("Publishing article...");

      await publishArticle(articleId);

      console.log(
        "ARTICLE PUBLISHED:",
        articleId
      );

      /**
       * Refresh feed data.
       */
      await queryClient.invalidateQueries({
        queryKey: ["stories"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["my-stories"],
      });

      setMessage("Story published successfully.");

      /**
       * Reset form.
       */
      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory("");
      setImage(null);
      setPreview(null);

      if (quillRef.current) {
        quillRef.current.setText("");
      }

      handleClearAI();
      setShowAI(false);

      localStorage.removeItem("storyDraft");

      setTimeout(() => {
        setMessage("");
        navigate("/feed");
      }, 1500);
    } catch (error) {
      console.error(
        "FAILED TO PUBLISH ARTICLE:",
        error
      );

      if (axios.isAxiosError(error)) {
        console.error(
          "STATUS:",
          error.response?.status
        );

        console.error(
          "RESPONSE:",
          error.response?.data
        );
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to publish article. Please check the console."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <Navbar />

        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 md:text-5xl">
            New Story
          </h1>

          <button
            type="button"
            onClick={() => setShowAI(!showAI)}
            className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            <span>✨</span>
            <span>
              {showAI ? "Close Assistant" : "Ask AI"}
            </span>
          </button>
        </header>

        {message && (
          <div className="mb-8 border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            {message}
          </div>
        )}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 gap-8 md:grid-cols-12"
        >
          {/* EDITOR */}
          <div className="space-y-4 md:col-span-8">
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b border-gray-200 pb-3 text-3xl font-bold outline-none focus:border-black placeholder:text-gray-300"
            />

            <textarea
              placeholder="Write a brief excerpt..."
              rows={1}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full resize-none border-b border-gray-200 pb-3 text-lg text-gray-600 outline-none focus:border-black placeholder:text-gray-300"
            />

            <div className="min-h-[450px] border-y border-gray-200 py-4">
              <div
                ref={editorRef}
                className="min-h-[400px] w-full"
              />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8 md:col-span-4">
            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-sm text-gray-800 outline-none focus:border-black"
              >
                <option value="" disabled hidden>
                  Select Category
                </option>

                {categories.map((item: any) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* COVER IMAGE */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cover Image
              </label>

              <label className="group flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-gray-300 bg-gray-50 transition hover:border-black">
                {preview ? (
                  <img
                    src={preview}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400 group-hover:text-black">
                    + Upload Cover Image
                  </span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {image && (
                <p className="mt-2 truncate text-xs text-gray-500">
                  Selected: {image.name}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 border border-gray-200 bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting}
                className="w-full bg-black py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Publishing..."
                  : "Publish"}
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="w-full border border-gray-300 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Processing..."
                  : "Save Draft"}
              </button>
            </div>
          </aside>
        </form>

        <button
          onClick={() => navigate("/feed")}
          className="fixed left-6 top-24 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white shadow-lg hover:bg-gray-800"
        >
          ←
        </button>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white shadow-lg hover:bg-gray-800"
        >
          ↑
        </button>

        {/* AI ASSISTANT */}
        {showAI && (
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>

                <h3 className="font-semibold text-gray-900">
                  AI Writing Assistant
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowAI(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* QUICK ACTIONS */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Quick Actions
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      label: "Improve writing",
                      prompt:
                        "Help me improve the writing in my story",
                      action: "improve",
                    },
                    {
                      label: "Suggest quote",
                      prompt:
                        "Suggest a relevant quote for my story",
                      action: "quote",
                    },
                    {
                      label: "Continue writing",
                      prompt:
                        "Help me continue writing my story",
                      action: null,
                    },
                    {
                      label: "Rewrite",
                      prompt:
                        "Rewrite my story to make it more engaging",
                      action: "rewrite",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        handleAIQuickAction(
                          item.prompt,
                          item.action as
                            | "improve"
                            | "quote"
                            | "rewrite"
                            | null
                        )
                      }
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 transition hover:border-black hover:bg-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PROMPT */}
              <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-2 focus-within:border-black focus-within:bg-white">
                <textarea
                  value={aiPrompt}
                  onChange={(e) =>
                    setAiPrompt(e.target.value)
                  }
                  placeholder="Ask AI for suggestions, rewrites, or quotes..."
                  rows={3}
                  className="w-full resize-none bg-transparent p-2 text-sm outline-none placeholder:text-gray-400"
                />

                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <button
                    type="button"
                    onClick={handleClearAI}
                    className="px-2 text-xs text-gray-400 hover:text-black"
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={handleAIRequest}
                    disabled={
                      aiLoading || !aiPrompt.trim()
                    }
                    className="rounded-md bg-black px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40"
                  >
                    {aiLoading
                      ? "Thinking..."
                      : "Generate"}
                  </button>
                </div>
              </div>

              {/* AI RESPONSE */}
              {aiResponse && (
                <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Response
                    </span>

                    <button
                      type="button"
                      onClick={handleInsertToEditor}
                      className="text-xs font-medium text-black hover:underline"
                    >
                      + Insert into Story
                    </button>
                  </div>

                  <div className="prose prose-sm text-sm leading-relaxed text-gray-700">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                    >
                      {aiResponse}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}