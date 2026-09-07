import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function NewStory() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

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
        toolbar: [["bold", "italic"], ["blockquote"], ["link", "image"]],
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAIRequest = async () => {
    if (!aiPrompt.trim() || aiLoading) return;

    let requestMessage = aiPrompt;

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: requestMessage }),
        }
      );

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
      quillRef.current.insertText(range.index, `\n${aiResponse}\n`);
    }
  };

  const handleClearAI = () => {
    setAiPrompt("");
    setAiResponse("");
    setAiAction(null);
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      "storyDraft",
      JSON.stringify({ title, excerpt, content, category })
    );
    setMessage("Draft saved successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePublish = () => {
    if (!title.trim()) return setMessage("Please enter an article title.");
    if (!content.trim()) return setMessage("Please write your story.");
    if (!category) return setMessage("Please select a category.");

    setMessage("Story published successfully.");
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreview(null);
    if (quillRef.current) quillRef.current.setText("");
    handleClearAI();
    setShowAI(false);
    localStorage.removeItem("storyDraft");

    setTimeout(() => setMessage(""), 3000);
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
            <span>{showAI ? "Close Assistant" : "Ask AI"}</span>
          </button>
        </header>

        {message && (
          <div className="mb-8 border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            {message}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* EDITOR AREA */}
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
              <div ref={editorRef} className="min-h-[400px] w-full" />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8 md:col-span-4">
            <div className="flex flex-col gap-3 border border-gray-200 bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={handlePublish}
                className="w-full bg-black py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-gray-800"
              >
                Publish
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full border border-gray-300 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-gray-50"
              >
                Save Draft
              </button>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-2.5 text-sm text-gray-800 outline-none focus:border-black"
              >
                <option value="" disabled hidden>Select Category</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="art">Art</option>
                <option value="culture">Culture</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cover Image
              </label>
              <label className="group flex h-40 w-full cursor-pointer flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 transition hover:border-black">
                {preview ? (
                  <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm text-gray-400 group-hover:text-black">
                    + Upload Cover Image
                  </span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </aside>
        </form>

        {/* MODERN SLIDE-OVER AI ASSISTANT PANEL */}
        {showAI && (
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <h3 className="font-semibold text-gray-900">AI Writing Assistant</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAI(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Prompt Pills */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Improve writing", prompt: "Help me improve the writing in my story", action: "improve" },
                    { label: "Suggest quote", prompt: "Suggest a relevant quote for my story", action: "quote" },
                    { label: "Continue writing", prompt: "Help me continue writing my story", action: null },
                    { label: "Rewrite", prompt: "Rewrite my story to make it more engaging", action: "rewrite" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleAIQuickAction(item.prompt, item.action as any)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 transition hover:border-black hover:bg-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input Box */}
              <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-2 focus-within:border-black focus-within:bg-white">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
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
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="rounded-md bg-black px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40"
                  >
                    {aiLoading ? "Thinking..." : "Generate"}
                  </button>
                </div>
              </div>

              {/* Response Display Box */}
              {aiResponse && (
                <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 space-y-3">
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
                  <div className="prose prose-sm text-sm text-gray-700 leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
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