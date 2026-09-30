import {
  Brain,
  FileCheck2,
  LayoutTemplate,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Writing Assistant",
    description:
      "Improve your summary, experience, projects and achievements with AI-powered suggestions.",
    accent: "from-indigo-500 to-violet-400",
    glow: "group-hover:shadow-[0_0_45px_rgba(124,92,255,0.16)]",
  },
  {
    icon: FileCheck2,
    title: "ATS-Friendly",
    description:
      "Build resumes designed to be easily readable by modern Applicant Tracking Systems.",
    accent: "from-cyan-400 to-blue-400",
    glow: "group-hover:shadow-[0_0_45px_rgba(85,230,255,0.14)]",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description:
      "Choose from clean, modern and professional resume templates for different careers.",
    accent: "from-violet-500 to-indigo-400",
    glow: "group-hover:shadow-[0_0_45px_rgba(124,92,255,0.16)]",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "See your resume update instantly while you edit your information.",
    accent: "from-blue-400 to-cyan-400",
    glow: "group-hover:shadow-[0_0_45px_rgba(85,230,255,0.14)]",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-64 w-64 rounded-full bg-cyan-400/5 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Powerful Features
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Everything you need to build a{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
              better resume
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            From writing assistance to ATS-friendly formatting, ResuMe AI
            gives you the tools to create a professional resume with
            confidence.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06] ${feature.glow}`}
              >

                {/* Top Gradient Line */}
                <div
                  className={`absolute left-0 right-0 top-0 h-px bg-gradient-to-r ${feature.accent} opacity-40 transition duration-300 group-hover:opacity-100`}
                />

                {/* Card Glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br ${feature.accent} opacity-0 blur-[55px] transition duration-500 group-hover:opacity-20`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-13 w-13 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${feature.accent} p-px shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition duration-300 group-hover:scale-105`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-[#101628]">
                    <Icon
                      size={22}
                      className="text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:text-white"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">

                  <div className="mt-6 flex items-start justify-between gap-3">

                    <h3 className="text-lg font-bold text-white">
                      {feature.title}
                    </h3>

                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-gray-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                    />

                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {feature.description}
                  </p>

                </div>

                {/* Bottom Indicator */}
                <div className="mt-7 flex items-center gap-2">

                  <div
                    className={`h-1 w-8 rounded-full bg-gradient-to-r ${feature.accent} transition-all duration-300 group-hover:w-12`}
                  />

                  <div className="h-1 w-1 rounded-full bg-white/20" />

                  <div className="h-1 w-1 rounded-full bg-white/10" />

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;