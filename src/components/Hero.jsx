import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  WandSparkles,
  FileCheck2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/resume-builder");
    } else {
      navigate("/login");
    }
  };

  const handleExploreTemplates = () => {
    document.getElementById("templates")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-40">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Subtle Grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 shadow-[0_0_24px_rgba(124,92,255,0.08)]">
            <Sparkles size={15} />
            AI-Powered Resume Builder
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

            Build a resume

            <br />

            that gets you{" "}

            <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
              noticed.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
            Create a professional, ATS-friendly resume in minutes.
            Build with modern templates, keep your information organized,
            and prepare your resume for your next opportunity.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            {/* Create Resume */}
            <button
              type="button"
              onClick={handleCreateResume}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-500 to-cyan-400 px-7 py-4 text-sm font-bold text-black shadow-[0_10px_30px_rgba(124,92,255,0.28),0_0_24px_rgba(85,230,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(124,92,255,0.38),0_0_30px_rgba(85,230,255,0.12)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

              <span className="relative">
                Create My Resume
              </span>

              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Explore Templates */}
            <button
              type="button"
              onClick={handleExploreTemplates}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-gray-200 backdrop-blur-xl transition duration-300 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:text-white"
            >
              Explore Templates
            </button>

          </div>

          {/* Trust Points */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-cyan-400"
              />
              Free to start
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-cyan-400"
              />
              ATS-friendly
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-cyan-400"
              />
              PDF export
            </span>

          </div>

        </div>

        {/* RIGHT PREVIEW */}
        <div className="relative mx-auto w-full max-w-xl">

          {/* Main Glow */}
          <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-gradient-to-r from-indigo-500/10 via-cyan-400/10 to-indigo-500/10 blur-3xl" />

          {/* Resume Container */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.045] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-4">

            {/* Top Window Bar */}
            <div className="mb-3 flex items-center justify-between px-2">

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                <span className="h-2 w-2 rounded-full bg-green-400/70" />
              </div>

              <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
                <FileCheck2 size={12} />
                Resume Preview
              </div>

            </div>

            {/* Resume Paper */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 text-gray-900 shadow-2xl sm:p-8">

              {/* Resume Header */}
              <div className="border-b border-gray-200 pb-5">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      Alex Johnson
                    </h2>

                    <p className="mt-1 text-sm font-medium text-indigo-600">
                      Software Developer
                    </p>

                    <p className="mt-2 text-[10px] text-gray-400">
                      Chennai, India · alex@email.com
                    </p>
                  </div>

                  <div className="hidden h-11 w-11 rounded-xl bg-gray-100 sm:block" />

                </div>

              </div>

              {/* Profile */}
              <div className="mt-5">

                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-800">
                  Profile
                </h3>

                <div className="mt-3 space-y-1.5">
                  <div className="h-1.5 rounded bg-gray-200" />
                  <div className="h-1.5 w-11/12 rounded bg-gray-200" />
                  <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                </div>

              </div>

              {/* Experience */}
              <div className="mt-6">

                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-800">
                  Experience
                </h3>

                <div className="mt-3">

                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-bold">
                      Software Developer
                    </span>

                    <span className="text-[9px] text-gray-400">
                      2024–Present
                    </span>
                  </div>

                  <p className="mt-1 text-[9px] text-indigo-600">
                    Tech Company
                  </p>

                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 rounded bg-gray-200" />
                    <div className="h-1.5 w-10/12 rounded bg-gray-200" />
                    <div className="h-1.5 w-9/12 rounded bg-gray-200" />
                  </div>

                </div>

              </div>

              {/* Projects */}
              <div className="mt-6">

                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-800">
                  Projects
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-3">

                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="h-1.5 w-16 rounded bg-gray-800" />
                    <div className="mt-2 h-1.5 w-full rounded bg-gray-200" />
                    <div className="mt-1.5 h-1.5 w-8/12 rounded bg-gray-200" />
                  </div>

                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="h-1.5 w-20 rounded bg-gray-800" />
                    <div className="mt-2 h-1.5 w-full rounded bg-gray-200" />
                    <div className="mt-1.5 h-1.5 w-7/12 rounded bg-gray-200" />
                  </div>

                </div>

              </div>

              {/* Skills */}
              <div className="mt-6">

                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-800">
                  Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {[
                    "React",
                    "JavaScript",
                    "Node.js",
                    "MongoDB",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-indigo-50 px-2 py-1 text-[9px] font-medium text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

            </div>

            {/* ATS Card */}
            <div className="absolute -right-3 top-20 hidden w-40 rounded-2xl border border-indigo-300/10 bg-[#101628]/95 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:block">

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-gray-400">
                  ATS Score
                </span>

                <FileCheck2
                  size={14}
                  className="text-cyan-400"
                />
              </div>

              <div className="mt-1 bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
                92%
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>

              <p className="mt-2 text-[9px] text-gray-500">
                Resume optimization
              </p>

            </div>

            {/* AI Floating Card */}
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-cyan-400/10 bg-[#101628]/95 px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:block">

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_20px_rgba(85,230,255,0.15)]">
                  <WandSparkles size={15} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-white">
                    Smart Resume Tools
                  </p>

                  <p className="mt-0.5 text-[9px] text-gray-500">
                    Build faster. Apply smarter.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;