/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 07/09/2026 - 13:24:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function NewStory() {
  // =========================
  // FORM STATES
  // =========================

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  // =========================
  // IMAGE STATES
  // =========================

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // =========================
  // MESSAGE STATE
  // =========================

  const [message, setMessage] = useState("");

  // =========================
  // AI STATES
  // =========================

  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAction, setAiAction] = useState<
    "improve" | "quote" | "rewrite" | null
  >(null);

  // =========================
  // EDITOR REF
  // =========================

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

    return () => {
      quillRef.current = null;

      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    };
  }, []);

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // =========================
  // AI ASSISTANT
  // =========================

  const handleAIRequest = async () => {
    if (!aiPrompt.trim() || aiLoading) return;

    let requestMessage = aiPrompt;

    // Only these selected quick actions require story content.
    if (aiAction !== null) {
      const storyText = quillRef.current?.getText().trim() || "";

      if (!storyText) {
        setAiResponse("Write or paste a story into the editor first.");
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
          },
          body: JSON.stringify({
            message: requestMessage,
          }),
        }
      );

      // Read raw text response first to avoid crashing on empty/non-JSON responses
      const text = await response.text();
      let result;

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          `Server returned non-JSON response (${response.status} ${response.statusText}): ${text.slice(0, 100)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.detail || result.message || `HTTP Error ${response.status}`
        );
      }

      const responseContent =
        result.data || result.response || result.message || text;

      if (!responseContent) {
        throw new Error("Backend returned an empty response.");
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

  // =========================
  // AI QUICK ACTION
  // =========================

  const handleAIQuickAction = (
    prompt: string,
    action: "improve" | "quote" | "rewrite" | null
  ) => {
    setAiPrompt(prompt);
    setAiAction(action);
  };

  // =========================
  // CLEAR AI
  // =========================

  const handleClearAI = () => {
    setAiPrompt("");
    setAiResponse("");
    setAiAction(null);
  };

  // =========================
  // SAVE DRAFT
  // =========================

  const handleSaveDraft = () => {
    const draft = {
      title,
      excerpt,
      content,
      category,
    };

    localStorage.setItem("storyDraft", JSON.stringify(draft));

    setMessage("Draft saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // =========================
  // PUBLISH
  // =========================

  const handlePublish = () => {
    if (!title.trim()) {
      setMessage("Please enter an article title.");
      return;
    }

    if (!content.trim()) {
      setMessage("Please write your story.");
      return;
    }

    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    const story = {
      title,
      excerpt,
      content,
      category,
      imageName: image?.name || "",
    };

    console.log("Published Story:", story);

    setMessage("Story published successfully.");

    // Clear form
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreview(null);

    // Clear editor
    if (quillRef.current) {
      quillRef.current.setText("");
    }

    // Clear AI
    setAiPrompt("");
    setAiResponse("");
    setShowAI(false);

    // Remove saved draft
    localStorage.removeItem("storyDraft");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <Navbar />

        {/* =========================  
            PAGE TITLE  
        ========================= */}

        <header className="mb-4 md:mb-8">
          <h1 className="text-1xl font-bold text-gray-900 md:text-5xl">
            New Story
          </h1>
        </header>

        {/* =========================  
            MESSAGE  
        ========================= */}

        {message && (
          <div className="mb-8 border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 md:grid-cols-12"
        >
          {/* =========================  
              EDITOR  
          ========================= */}

          <div className="space-y-3 md:col-span-8">
            {/* TITLE */}

            <div>
              <input
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 w-full border-b border-gray-300 pb-4 text-2xl font-bold outline-none placeholder:text-gray-400"
              />
            </div>

            {/* EXCERPT */}

            <div>
              <textarea
                placeholder="Write a brief excerpt..."
                rows={1}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full resize-none border-b border-gray-300 pb-4 text-lg outline-none placeholder:text-gray-400"
              />
            </div>

            {/* STORY CONTENT */}

            <div className="space-y-6 border-b border-t border-gray-300 py-4">
              {/* TOOLBAR*/}

              <div className="mb-4 flex items-center gap-5 text-gray-500">
                {/* AI */}

                <button
                  type="button"
                  onClick={() => setShowAI(!showAI)}
                  className={`bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800 ${
                    showAI ? "bg-gray-800" : ""
                  }`}
                  title="AI Writing Assistant"
                >
                  💬 Ask Ai
                </button>
              </div>

              {/* =========================  
                  AI WRITING ASSISTANT  
              ========================= */}

              {showAI && (
                <div className="border border-gray-200 bg-gray-50 p-5">
                  {/* AI HEADER */}

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        AI Writing Assistant
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Get help writing, improving, or finding quotes.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAI(false)}
                      className="text-gray-400 transition-colors hover:text-black"
                      title="Close AI"
                    >
                      ✕
                    </button>
                  </div>

                  {/* QUICK ACTIONS */}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleAIQuickAction(
                          "Help me improve the writing in my story",
                          "improve"
                        )
                      }
                      className="border border-gray-300 bg-white px-3 py-2 text-sm transition-colors hover:border-black"
                    >
                      Improve writing
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAIQuickAction(
                          "Suggest a relevant quote for my story",
                          "quote"
                        )
                      }
                      className="border border-gray-300 bg-white px-3 py-2 text-sm transition-colors hover:border-black"
                    >
                      Suggest quote
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAIQuickAction(
                          "Help me continue writing my story",
                          null
                        )
                      }
                      className="border border-gray-300 bg-white px-3 py-2 text-sm transition-colors hover:border-black"
                    >
                      Help me write
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAIQuickAction(
                          "Rewrite my story to make it more engaging",
                          "rewrite"
                        )
                      }
                      className="border border-gray-300 bg-white px-3 py-2 text-sm transition-colors hover:border-black"
                    >
                      Rewrite
                    </button>
                  </div>

                  {/* PROMPT */}

                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ask the AI something..."
                    rows={3}
                    className="mt-4 w-full resize-none border border-gray-300 bg-white p-3 text-sm outline-none focus:border-black"
                  />

                  {/* AI ACTIONS */}

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleAIRequest}
                      disabled={aiLoading || !aiPrompt.trim()}
                      className="bg-black px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {aiLoading ? "Thinking..." : "Ask AI"}
                    </button>

                    <button
                      type="button"
                      onClick={handleClearAI}
                      className="border border-gray-300 px-5 py-2 text-sm text-gray-700 transition-colors hover:border-black hover:text-black"
                    >
                      Clear
                    </button>
                  </div>

                  {/* AI RESPONSE */}

                  {aiResponse && (
                    <div className="mt-4 border border-gray-200 bg-white p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                        AI Response
                      </p>

                      <div className="text-sm leading-6 text-gray-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {aiResponse}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =========================  
                  RICH TEXT EDITOR  
              ========================= */}
              <div ref={editorRef} className="min-h-[400px] w-full" />
            </div>
          </div>

          {/* =========================  
              SIDEBAR  
          ========================= */}

          <aside className="space-y-12 md:col-span-4 md:col-start-9">
            {/* ACTIONS */}

            <div className="flex flex-col gap-4 border border-gray-200 bg-white p-8">
              {/* PUBLISH */}

              <button
                type="button"
                onClick={handlePublish}
                className="w-full bg-black py-4 font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
              >
                Publish
              </button>

              {/* SAVE DRAFT */}

              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full border border-black bg-transparent py-4 font-semibold uppercase tracking-widest text-black transition-colors hover:bg-gray-100"
              >
                Save Draft
              </button>
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-4 block text-sm font-semibold uppercase tracking-widest text-gray-600">
                Category
              </label>

              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-none border-b border-gray-300 bg-transparent py-3 pr-8 text-base text-gray-800 outline-none focus:border-black"
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>

                  <option value="technology">Technology</option>

                  <option value="science">Science</option>

                  <option value="art">Art</option>

                  <option value="culture">Culture</option>
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                  ▼
                </span>
              </div>
            </div>

            {/* COVER IMAGE */}

            <div>
              <label className="mb-4 block text-sm font-semibold uppercase tracking-widest text-gray-600">
                Cover Image
              </label>

              <label className="group flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-black">
                {preview ? (
                  <img
                    src={preview}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-gray-400 transition-colors group-hover:text-black">
                    add_photo_alternate
                  </span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </aside>
        </form>
      </main>

      <Footer />
    </>
  );
}