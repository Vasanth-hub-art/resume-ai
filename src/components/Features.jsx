import {
  Brain,
  FileCheck2,
  LayoutTemplate,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Writing Assistant",
    description:
      "Improve your summary, experience, projects and achievements with AI-powered suggestions.",
  },
  {
    icon: FileCheck2,
    title: "ATS-Friendly",
    description:
      "Build resumes designed to be easily readable by modern Applicant Tracking Systems.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description:
      "Choose from clean, modern and professional resume templates for different careers.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "See your resume update instantly while you edit your information.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Powerful Features
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Everything you need to build a better resume
          </h2>

          <p className="mt-4 text-gray-400">
            From writing assistance to ATS analysis, ResuMe AI helps
            you create a resume ready for the real world.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;