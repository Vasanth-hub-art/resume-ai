import { FileText } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-black">
            <FileText size={17} />
          </div>

          <span className="font-bold">
            Resu<span className="text-cyan-400">Me</span> AI
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Build better. Apply smarter. Grow faster.
        </p>

      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 px-6 pt-6 text-center text-xs text-gray-600">
        © 2026 ResuMe AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;