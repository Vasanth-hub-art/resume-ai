const templates = [
  {
    name: "Modern",
    description: "Clean and professional",
  },
  {
    name: "Minimal",
    description: "Simple and elegant",
  },
  {
    name: "Developer",
    description: "Built for tech careers",
  },
];

function Templates() {
  return (
    <section id="templates" className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Templates
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Designs made to stand out
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-400">
            Choose a layout and customize fonts, spacing, colors and sections
            to make it yours.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {templates.map((template, index) => (
            <div key={template.name} className="group">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition group-hover:border-cyan-400/30">

                <div className="aspect-[3/4] rounded-xl bg-white p-6 text-gray-900">

                  <div className="border-b border-gray-200 pb-3">
                    <div className="h-4 w-32 rounded bg-gray-800" />
                    <div className="mt-2 h-2 w-20 rounded bg-gray-300" />
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="h-2 rounded bg-gray-200" />
                    <div className="h-2 w-11/12 rounded bg-gray-200" />
                    <div className="h-2 w-9/12 rounded bg-gray-200" />
                  </div>

                  <div className="mt-7">
                    <div className="h-2 w-24 rounded bg-gray-700" />

                    <div className="mt-3 space-y-2">
                      <div className="h-2 rounded bg-gray-200" />
                      <div className="h-2 w-10/12 rounded bg-gray-200" />
                      <div className="h-2 w-8/12 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="h-2 w-20 rounded bg-gray-700" />

                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="h-5 w-12 rounded bg-gray-100" />
                      <div className="h-5 w-16 rounded bg-gray-100" />
                      <div className="h-5 w-14 rounded bg-gray-100" />
                    </div>
                  </div>

                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {template.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {template.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Templates;