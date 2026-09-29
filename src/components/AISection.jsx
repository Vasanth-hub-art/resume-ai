import { Sparkles, WandSparkles } from "lucide-react";

function AISection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.02] to-transparent p-8 md:p-12">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <Sparkles />
              </div>

              <h2 className="mt-6 text-4xl font-bold">
                Your AI career assistant
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-gray-400">
                Don't know how to describe your experience?
                ResuMe AI can turn simple notes into professional,
                resume-ready content.
              </p>

              <button className="mt-8 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black hover:bg-cyan-300">
                Try AI Assistant
                <WandSparkles size={18} />
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1018] p-5 shadow-2xl">

              <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  <Sparkles size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">ResuMe AI</p>
                  <p className="text-xs text-gray-500">
                    Writing Assistant
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-500">
                  Your input
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  "I made a website using React and Node."
                </p>
              </div>

              <div className="my-4 text-center text-xs text-gray-600">
                ↓ AI improvement
              </div>

              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p className="text-xs text-cyan-400">
                  AI suggestion
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-200">
                  Developed a responsive full-stack web application
                  using React and Node.js, improving user experience
                  through modern component-based architecture.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AISection;