import { FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#080b12]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <a href="#" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-black">
                        <FileText size={20} />
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        Resu<span className="text-cyan-400">Me</span> AI
                    </span>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    <a href="#features" className="text-sm text-gray-400 transition hover:text-white">
                        Features
                    </a>
                    <a href="#templates" className="text-sm text-gray-400 transition hover:text-white">
                        Templates
                    </a>
                    <a href="#how-it-works" className="text-sm text-gray-400 transition hover:text-white">
                        How It Works
                    </a>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        to="/login"
                        className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:text-white"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/signup"
                        className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-300"
                    >
                        Get Started
                    </Link>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="text-gray-300 md:hidden"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-[#080b12] px-6 py-5 md:hidden">
                    <div className="flex flex-col gap-5">
                        <a href="#features" className="text-gray-300">
                            Features
                        </a>
                        <a href="#templates" className="text-gray-300">
                            Templates
                        </a>
                        <a href="#how-it-works" className="text-gray-300">
                            How It Works
                        </a>

                        <button className="rounded-lg bg-cyan-400 py-3 font-semibold text-black">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;