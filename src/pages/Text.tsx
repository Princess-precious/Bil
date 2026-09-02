export default function Text() {
    return(

    <main className="w-full px-6 md:px-12 max-w-6xl mx-auto py-24 md:py-32">
      <header className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          New Story
        </h1>
      </header>

      <form className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-12">
          
          <div>
            <input
              className="w-full text-4xl font-bold border-b border-gray-300 pb-4 outline-none placeholder:text-gray-400"
              placeholder="Article Title"
              type="text"
            />
          </div>

          <div>
            <input
              className="w-full text-sm border-b border-gray-300 pb-4 outline-none placeholder:text-gray-400 font-mono"
              placeholder="/slug"
              type="text"
            />
          </div>

          <div>
            <textarea
              className="w-full text-lg border-b border-gray-300 pb-4 outline-none resize-none placeholder:text-gray-400"
              placeholder="Write a brief excerpt..."
              rows={3}
            />
          </div>

          <div className="border-t border-b border-gray-300 py-4 space-y-4">

            <div className="flex gap-4 text-gray-500 mb-4">
              <button type="button">B</button>
              <button type="button">I</button>
              <button type="button">❝</button>
              <button type="button">🔗</button>
              <button type="button">🖼</button>
            </div>

            <textarea
              className="w-full bg-transparent border-none outline-none resize-y text-lg placeholder:text-gray-400"
              placeholder="Begin writing..."
              rows={20}
            />

          </div>

        </div>
      </form>
    </main>
  );
}



 