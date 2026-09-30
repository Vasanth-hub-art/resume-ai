const templates = [
  {
    name: "Modern",
    description: "Clean and professional",
    tag: "Popular",
    accent: "from-indigo-500 to-cyan-400",
    layout: "modern",
  },
  {
    name: "Minimal",
    description: "Simple and elegant",
    tag: "Minimal",
    accent: "from-cyan-400 to-blue-400",
    layout: "minimal",
  },
  {
    name: "Developer",
    description: "Built for tech careers",
    tag: "Tech",
    accent: "from-violet-500 to-indigo-400",
    layout: "developer",
  },
];

function ModernPreview() {
  return (
    <div className="h-full rounded-lg bg-white p-5 text-gray-900 shadow-xl">
      <div className="flex items-start justify-between border-b border-gray-200 pb-4">
        <div>
          <div className="h-4 w-28 rounded bg-gray-900" />
          <div className="mt-2 h-2 w-20 rounded bg-gray-300" />
        </div>

        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>

      <div className="mt-5">
        <div className="h-2 w-20 rounded bg-indigo-500" />

        <div className="mt-3 space-y-2">
          <div className="h-2 rounded bg-gray-200" />
          <div className="h-2 w-11/12 rounded bg-gray-200" />
          <div className="h-2 w-9/12 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <div className="h-2 w-16 rounded bg-gray-800" />

          <div className="mt-3 space-y-2">
            <div className="h-2 rounded bg-gray-200" />
            <div className="h-2 w-10/12 rounded bg-gray-200" />
            <div className="h-2 w-8/12 rounded bg-gray-200" />
          </div>
        </div>

        <div>
          <div className="h-2 w-16 rounded bg-gray-800" />

          <div className="mt-3 space-y-2">
            <div className="h-2 rounded bg-gray-200" />
            <div className="h-2 w-9/12 rounded bg-gray-200" />
            <div className="h-2 w-7/12 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 w-20 rounded bg-gray-800" />

        <div className="mt-3 flex flex-wrap gap-2">
          <div className="h-5 w-12 rounded bg-indigo-50" />
          <div className="h-5 w-16 rounded bg-indigo-50" />
          <div className="h-5 w-14 rounded bg-indigo-50" />
        </div>
      </div>
    </div>
  );
}

function MinimalPreview() {
  return (
    <div className="h-full rounded-lg bg-white px-7 py-6 text-gray-900 shadow-xl">
      <div className="text-center">
        <div className="mx-auto h-4 w-36 rounded bg-gray-900" />
        <div className="mx-auto mt-2 h-2 w-24 rounded bg-gray-300" />
      </div>

      <div className="mx-auto mt-5 h-px w-full bg-gray-200" />

      <div className="mt-6">
        <div className="h-2 w-20 rounded bg-gray-800" />

        <div className="mt-3 space-y-2">
          <div className="h-2 rounded bg-gray-200" />
          <div className="h-2 w-11/12 rounded bg-gray-200" />
          <div className="h-2 w-9/12 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-7">
        <div className="h-2 w-24 rounded bg-gray-800" />

        <div className="mt-3 space-y-2">
          <div className="h-2 rounded bg-gray-200" />
          <div className="h-2 w-10/12 rounded bg-gray-200" />
          <div className="h-2 w-8/12 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-7">
        <div className="h-2 w-16 rounded bg-gray-800" />

        <div className="mt-3 flex gap-2">
          <div className="h-5 w-14 rounded bg-gray-100" />
          <div className="h-5 w-16 rounded bg-gray-100" />
          <div className="h-5 w-12 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function DeveloperPreview() {
  return (
    <div className="h-full rounded-lg bg-[#111827] p-5 text-white shadow-xl">
      <div className="border-b border-gray-700 pb-4">
        <div className="font-mono text-sm font-bold text-cyan-400">
          &lt; developer /&gt;
        </div>

        <div className="mt-2 h-2 w-28 rounded bg-gray-500" />
      </div>

      <div className="mt-5">
        <div className="font-mono text-[9px] text-cyan-400">
          // about
        </div>

        <div className="mt-2 space-y-2">
          <div className="h-2 rounded bg-gray-700" />
          <div className="h-2 w-11/12 rounded bg-gray-700" />
          <div className="h-2 w-8/12 rounded bg-gray-700" />
        </div>
      </div>

      <div className="mt-6">
        <div className="font-mono text-[9px] text-cyan-400">
          // experience
        </div>

        <div className="mt-3 space-y-3">
          <div className="rounded border border-gray-700 p-2">
            <div className="h-2 w-24 rounded bg-gray-500" />
            <div className="mt-2 h-2 w-10/12 rounded bg-gray-700" />
          </div>

          <div className="rounded border border-gray-700 p-2">
            <div className="h-2 w-20 rounded bg-gray-500" />
            <div className="mt-2 h-2 w-8/12 rounded bg-gray-700" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="font-mono text-[9px] text-cyan-400">
          // skills
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <div className="h-5 w-12 rounded border border-cyan-400/30 bg-cyan-400/10" />
          <div className="h-5 w-16 rounded border border-cyan-400/30 bg-cyan-400/10" />
          <div className="h-5 w-14 rounded border border-cyan-400/30 bg-cyan-400/10" />
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({ layout }) {
  if (layout === "minimal") {
    return <MinimalPreview />;
  }

  if (layout === "developer") {
    return <DeveloperPreview />;
  }

  return <ModernPreview />;
}

function Templates() {
  return (
    <section id="templates" className="relative overflow-hidden py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Resume Templates
            </div>

            <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Designs made to{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                stand out
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-400">
            Choose a professional layout and customize your resume to match
            your career, experience, and personal style.
          </p>

        </div>

        {/* Template Cards */}
        <div className="mt-14 grid gap-7 md:grid-cols-3">

          {templates.map((template) => (
            <div
              key={template.name}
              className="group relative"
            >
              {/* Glow */}
              <div
                className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r ${template.accent} opacity-0 blur-lg transition duration-500 group-hover:opacity-25`}
              />

              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition duration-300 group-hover:-translate-y-2 group-hover:border-white/20 group-hover:bg-white/[0.06]">

                {/* Preview */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 bg-white">

                  <TemplatePreview layout={template.layout} />

                  {/* Preview overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

                  {/* Tag */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      {template.tag}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex items-end justify-between px-1 pb-1 pt-5">

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {template.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {template.description}
                    </p>
                  </div>

                  <div
                    className={`h-9 w-9 rounded-xl bg-gradient-to-br ${template.accent} opacity-80 shadow-lg transition duration-300 group-hover:scale-110 group-hover:opacity-100`}
                  />

                </div>

                {/* Hover CTA */}
                <div className="mt-4">
                  <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-gray-300 transition group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10 group-hover:text-white">
                    Use this template
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Templates;