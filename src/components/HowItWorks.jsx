const steps = [
  {
    number: "01",
    title: "Choose a template",
    description: "Start with a professional design that matches your career.",
  },
  {
    number: "02",
    title: "Add your details",
    description: "Enter your education, skills, experience and projects.",
  },
  {
    number: "03",
    title: "Enhance with AI",
    description: "Let AI improve your content and make it more impactful.",
  },
  {
    number: "04",
    title: "Download & share",
    description: "Export your finished resume as a PDF or share it online.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-white/5 bg-white/[0.015] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Simple Process
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Create your resume in four steps
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-white/10 bg-[#0c111a] p-7"
            >
              <span className="text-4xl font-bold text-cyan-400/30">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;