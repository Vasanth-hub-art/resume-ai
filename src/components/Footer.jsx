import { FileText, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050711]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-52 w-52 rounded-full bg-indigo-500/5 blur-[100px]" />

      <div className="pointer-events-none absolute right-1/4 top-0 h-52 w-52 rounded-full bg-cyan-400/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">

        {/* Main Footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="group flex w-fit items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_25px_rgba(124,92,255,0.15)] transition duration-300 group-hover:shadow-[0_0_32px_rgba(124,92,255,0.28)]">
                <FileText size={19} />
              </div>

              <span className="text-xl font-extrabold tracking-tight text-white">
                Resu
                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  Me
                </span>{" "}
                AI
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              Create professional resumes, showcase your skills,
              and prepare for your next career opportunity.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-2">

            <a
              href="#features"
              className="rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:bg-white/5 hover:text-white"
            >
              Features
            </a>

            <a
              href="#templates"
              className="rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:bg-white/5 hover:text-white"
            >
              Templates
            </a>

            <a
              href="#how-it-works"
              className="rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:bg-white/5 hover:text-white"
            >
              How It Works
            </a>

          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">

            <a
              href="https://github.com/Vasanth-hub-art/resume-ai"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold text-gray-400 transition duration-300 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
            >
              GH
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold text-gray-400 transition duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              in
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition duration-300 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
            >
              <ArrowUp size={17} />
            </button>

          </div>

        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 ResuMe AI. All rights reserved.
          </p>

          <p className="text-gray-700">
            Build better. Apply smarter. Grow faster.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;