import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Hero() {

  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-36 pb-20">

      <div className="absolute left-1/2 top-20 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* LEFT */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            AI-POWERED RESUME BUILDER
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Build a resume
            <br />
            that gets you{" "}
            <span className="text-cyan-400">noticed.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Create a professional, ATS-friendly resume in minutes.
            Let AI improve your content while you focus on your career.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            {/* CREATE RESUME */}
            <button
              onClick={() => {
                window.location.href = "/resume-builder";
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300"
            >
              Create My Resume
              <ArrowRight size={18} />
            </button>

            {/* EXPLORE TEMPLATES */}
            <button
              onClick={() =>
                document.getElementById("templates")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-xl border border-white/10 px-7 py-4 font-semibold text-white transition hover:bg-white/5"
            >
              Explore Templates
            </button>

          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-400">

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" />
              Free to start
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" />
              ATS-friendly
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" />
              PDF export
            </span>

          </div>
        </div>

        {/* RESUME PREVIEW */}
        <div className="relative">

          <div className="absolute -inset-5 rounded-3xl bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">

            <div className="rounded-lg bg-white p-7 text-gray-900 shadow-xl">

              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold">
                  Vasanth Periyasamy
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Software Developer
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Trichy, India · Vasa@email.com
                </p>
              </div>

              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">
                  Profile
                </h3>

                <div className="mt-2 space-y-1">
                  <div className="h-2 rounded bg-gray-200" />
                  <div className="h-2 w-11/12 rounded bg-gray-200" />
                  <div className="h-2 w-4/5 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">
                  Experience
                </h3>

                <div className="mt-3">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold">
                      Software Developer
                    </span>

                    <span className="text-[10px] text-gray-400">
                      2024–Present
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="h-2 rounded bg-gray-200" />
                    <div className="h-2 w-10/12 rounded bg-gray-200" />
                    <div className="h-2 w-9/12 rounded bg-gray-200" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">
                  Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {["React", "JavaScript", "Node.js", "MongoDB"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded bg-gray-100 px-2 py-1 text-[10px]"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

            </div>

            <div className="absolute -right-5 top-10 rounded-xl border border-white/10 bg-[#111722] px-4 py-3 shadow-xl">

              <div className="text-xs text-gray-400">
                ATS Score
              </div>

              <div className="mt-1 text-xl font-bold text-cyan-400">
                92%
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
