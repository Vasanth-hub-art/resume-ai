import {
  Sparkles,
  WandSparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AISection() {
  const navigate = useNavigate();

  const handleTryAI = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/resume-builder");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Main AI Card */}
        <div className="relative overflow-hidden rounded-[30px] border border-indigo-400/15 bg-gradient-to-br from-indigo-500/[0.12] via-white/[0.035] to-cyan-400/[0.06] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-10 lg:p-12">

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              {/* Badge Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(124,92,255,0.12)]">
                <Sparkles size={25} />
              </div>

              {/* Eyebrow */}
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                AI Career Assistant
              </p>

              {/* Heading */}
              <h2 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Turn your ideas into{" "}
                <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  better resume content
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                Don't know how to describe your experience?
                ResuMe AI is designed to transform simple notes into
                clear, professional and resume-ready content.
              </p>

              {/* Benefits */}
              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-cyan-400"
                  />
                  Improve experience and project descriptions
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-cyan-400"
                  />
                  Create clearer professional summaries
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-cyan-400"
                  />
                  Write stronger, more impactful content
                </div>

              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleTryAI}
                className="group relative mt-9 flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3.5 text-sm font-bold text-black shadow-[0_10px_30px_rgba(124,92,255,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(124,92,255,0.38)]"
              >

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                <WandSparkles
                  size={17}
                  className="relative"
                />

                <span className="relative">
                  Try AI Assistant
                </span>

                <ArrowRight
                  size={17}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

            </div>

            {/* RIGHT — AI DEMO */}
            <div className="relative">

              {/* Outer Glow */}
              <div className="pointer-events-none absolute -inset-5 rounded-[28px] bg-gradient-to-r from-indigo-500/10 to-cyan-400/10 blur-2xl" />

              <div className="relative rounded-2xl border border-white/10 bg-[#0a0f1b]/90 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">

                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 text-cyan-300">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        ResuMe AI
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-500">
                        Writing Assistant
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/60" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
                    <span className="h-2 w-2 rounded-full bg-green-400/60" />
                  </div>

                </div>

                {/* User Input */}
                <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.035] p-4">

                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Your input
                    </p>

                    <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-gray-500">
                      Simple notes
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    "I made a website using React and Node."
                  </p>

                </div>

                {/* AI Processing */}
                <div className="flex items-center gap-3 py-4">

                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

                  <div className="flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5">
                    <WandSparkles
                      size={11}
                      className="text-cyan-300"
                    />

                    <span className="text-[9px] font-semibold uppercase tracking-wider text-cyan-300">
                      AI Enhancement
                    </span>
                  </div>

                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

                </div>

                {/* AI Result */}
                <div className="relative overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.07] via-indigo-500/[0.04] to-transparent p-4">

                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="relative">

                    <div className="flex items-center justify-between">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                        AI suggestion
                      </p>

                      <Sparkles
                        size={13}
                        className="text-cyan-400"
                      />

                    </div>

                    <p className="mt-3 text-sm leading-7 text-gray-200">
                      Developed a responsive full-stack web application
                      using React and Node.js, applying modern
                      component-based architecture to create an improved
                      user experience.
                    </p>

                  </div>

                </div>

                {/* Fake AI Status */}
                <div className="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.025] px-3 py-2.5">

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(85,230,255,0.7)]" />

                    <span className="text-[10px] text-gray-500">
                      Content enhancement
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-cyan-300">
                    Ready
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AISection;