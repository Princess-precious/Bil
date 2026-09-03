import { useRef, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function NewStory() {
  // =========================
  // FORM STATES
  // =========================

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
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
  // EDITOR REF
  // =========================

  const editorRef = useRef<HTMLDivElement>(null);

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // =========================
  // FORMAT TEXT
  // =========================

  const formatText = (command: string, value?: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    document.execCommand(command, false, value);

    setContent(editorRef.current.innerHTML);
  };

  // =========================
  // BOLD
  // =========================

  const handleBold = () => {
    formatText("bold");
  };

  // =========================
  // ITALIC
  // =========================

  const handleItalic = () => {
    formatText("italic");
  };

  // =========================
  // BLOCKQUOTE
  // =========================

  const handleQuote = () => {
    formatText("formatBlock", "blockquote");
  };

  // =========================
  // LINK
  // =========================

  const handleLink = () => {
    const url = window.prompt("Enter the URL:");

    if (!url) return;

    formatText("createLink", url);
  };

  // =========================
  // INSERT IMAGE INTO STORY
  // =========================

  const handleStoryImage = () => {
    const url = window.prompt("Enter image URL:");

    if (!url) return;

    formatText("insertImage", url);
  };

  // =========================
  // EDITOR INPUT
  // =========================

  const handleContentChange = (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    setContent(e.currentTarget.innerHTML);
  };

  // =========================
  // SAVE DRAFT
  // =========================

  const handleSaveDraft = () => {
    const draft = {
      title,
      slug,
      excerpt,
      content,
      category,
    };

    localStorage.setItem(
      "storyDraft",
      JSON.stringify(draft)
    );

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
      slug,
      excerpt,
      content,
      category,
      imageName: image?.name || "",
    };

    console.log("Published Story:", story);

    setMessage("Story published successfully.");

    // Clear form
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreview(null);

    // Clear editor
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    // Remove saved draft
    localStorage.removeItem("storyDraft");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="w-full px-6 md:px-12 max-w-6xl mx-auto py-24 md:py-32">

        <Navbar />

        {/* PAGE TITLE */}
        <header className="mb-4 md:mb-8">
          <h1 className="text-1xl md:text-5xl font-bold text-gray-900">
            New Story
          </h1>
        </header>

        {/* MESSAGE */}
        {message && (
          <div className="mb-8 border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >

          {/* =========================
              EDITOR
          ========================= */}

          <div className="md:col-span-8 space-y-3">

            {/* TITLE */}
            <div>
              <input
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full text-2xl font-bold border-b border-gray-300 pb-4  mb-4 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* SLUG */}
            
            {/* EXCERPT */}
            <div>
              <textarea
                placeholder="Write a brief excerpt..."
                rows={1}
                value={excerpt}
                onChange={(e) =>
                  setExcerpt(e.target.value)
                }
                className="w-full text-lg border-b border-gray-300 pb-4 outline-none resize-none placeholder:text-gray-400"
              />
            </div>

            {/* =========================
                STORY CONTENT
            ========================= */}

            <div className="border-t border-b border-gray-300 py-4 space-y-8">

              {/* TOOLBAR */}
              <div className="flex gap-5 text-gray-500 mb-4">

                {/* BOLD */}
                <button
                  type="button"
                  onClick={handleBold}
                  className="font-bold hover:text-black transition-colors"
                  title="Bold"
                >
                  B
                </button>

                {/* ITALIC */}
                <button
                  type="button"
                  onClick={handleItalic}
                  className="italic hover:text-black transition-colors"
                  title="Italic"
                >
                  I
                </button>

                {/* QUOTE */}
                <button
                  type="button"
                  onClick={handleQuote}
                  className="hover:text-black transition-colors text-lg"
                  title="Quote"
                >
                  ❝
                </button>

                {/* LINK */}
                <button
                  type="button"
                  onClick={handleLink}
                  className="hover:text-black transition-colors"
                  title="Add link"
                >
                  🔗
                </button>

                {/* IMAGE */}
                <button
                  type="button"
                  onClick={handleStoryImage}
                  className="hover:text-black transition-colors"
                  title="Insert image"
                >
                  🖼
                </button>

              </div>

              {/* RICH TEXT EDITOR */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleContentChange}
                data-placeholder="Begin writing..."
                className="w-full min-h-[400px] bg-transparent border-none outline-none resize-y text-4xl text-gray-900 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
              />

            </div>
          </div>

          {/* =========================
              SIDEBAR
          ========================= */}

          <aside className="md:col-span-4 md:col-start-9 space-y-12">

            {/* ACTIONS */}
            <div className="bg-white border border-gray-200 p-8 flex flex-col gap-4">

              {/* PUBLISH */}
              <button
                type="button"
                onClick={handlePublish}
                className="w-full bg-black text-white py-4 uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors"
              >
                Publish
              </button>

              {/* SAVE DRAFT */}
              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full bg-transparent text-black border border-black py-4 uppercase tracking-widest font-semibold hover:bg-gray-100 transition-colors"
              >
                Save Draft
              </button>

            </div>

            {/* CATEGORY */}
            <div>

              <label className="block mb-4 text-sm font-semibold uppercase tracking-widest text-gray-600">
                Category
              </label>

              <div className="relative">

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full appearance-none bg-transparent border-b border-gray-300 py-3 pr-8 text-base text-gray-800 cursor-pointer outline-none rounded-none focus:border-black"
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>

                  <option value="technology">
                    Technology
                  </option>

                  <option value="science">
                    Science
                  </option>

                  <option value="art">
                    Art
                  </option>

                  <option value="culture">
                    Culture
                  </option>
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  ▼
                </span>

              </div>
            </div>

            {/* COVER IMAGE */}
            <div>

              <label className="block mb-4 text-sm font-semibold uppercase tracking-widest text-gray-600">
                Cover Image
              </label>

              <label className="w-full h-48 border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors group overflow-hidden">

                {preview ? (
                  <img
                    src={preview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-black transition-colors">
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