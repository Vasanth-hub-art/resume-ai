const steps = [
  {
    number: "01",
    title: "Choose a template",
    description:
      "Start with a professional design that matches your career and personal style.",
  },
  {
    number: "02",
    title: "Add your details",
    description:
      "Enter your education, skills, experience, projects and professional information.",
  },
  {
    number: "03",
    title: "Enhance with AI",
    description:
      "Use AI-powered suggestions to improve your resume content and make it more impactful.",
  },
  {
    number: "04",
    title: "Download & share",
    description:
      "Export your completed resume as a PDF or share it online with a public link.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-24 sm:py-28"
    >

      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Simple Process
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Create your resume in{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            From choosing a template to sharing your finished resume,
            everything is designed to keep the process simple.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">

          {/* Connecting Line */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-indigo-500/10 via-cyan-400/40 to-indigo-500/10 md:block" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative"
            >

              {/* Step Card */}
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">

                {/* Top Glow */}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-400/60 to-cyan-400/0 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Background Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/10 blur-[55px] opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Number */}
                <div className="relative flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 shadow-[0_0_25px_rgba(124,92,255,0.08)]">
                    <span className="text-sm font-extrabold text-cyan-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/50 transition group-hover:bg-indigo-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                  </div>

                </div>

                {/* Content */}
                <h3 className="relative mt-6 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-gray-400">
                  {step.description}
                </p>

                {/* Bottom Accent */}
                <div className="relative mt-7 flex items-center gap-2">

                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 group-hover:w-12" />

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                    Step {index + 1}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;