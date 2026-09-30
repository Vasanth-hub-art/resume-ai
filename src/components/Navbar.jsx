import { FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#060812]/85 backdrop-blur-xl">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_22px_rgba(124,92,255,0.22)] transition duration-200 group-hover:shadow-[0_0_30px_rgba(124,92,255,0.32)]">
                        <FileText size={20} />
                    </div>

                    <span className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                        Resu
                        <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                            Me
                        </span>{" "}
                        AI
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 md:flex">

                    <a
                        href="#features"
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition duration-200 hover:bg-white/5 hover:text-white"
                    >
                        Features
                    </a>

                    <a
                        href="#templates"
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition duration-200 hover:bg-white/5 hover:text-white"
                    >
                        Templates
                    </a>

                    <a
                        href="#how-it-works"
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition duration-200 hover:bg-white/5 hover:text-white"
                    >
                        How It Works
                    </a>

                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2 md:flex">

                    <Link
                        to="/login"
                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-300 transition duration-200 hover:bg-white/5 hover:text-white"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/signup"
                        className="rounded-lg border border-indigo-300/20 bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 text-sm font-bold text-black shadow-[0_8px_24px_rgba(124,92,255,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(124,92,255,0.34)]"
                    >
                        Get Started
                    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition duration-200 hover:border-indigo-400/30 hover:bg-white/10 hover:text-white md:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? (
                        <X size={21} />
                    ) : (
                        <Menu size={21} />
                    )}
                </button>

            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="border-t border-white/10 bg-[#080b14]/98 px-4 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] md:hidden">

                    <div className="mx-auto max-w-7xl">

                        <div className="flex flex-col gap-1">

                            <a
                                href="#features"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                            >
                                Features
                            </a>

                            <a
                                href="#templates"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                            >
                                Templates
                            </a>

                            <a
                                href="#how-it-works"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                            >
                                How It Works
                            </a>

                        </div>

                        <div className="my-4 h-px bg-white/10" />

                        <div className="flex flex-col gap-2">

                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/signup"
                                onClick={closeMenu}
                                className="rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-center text-sm font-bold text-black shadow-[0_8px_24px_rgba(124,92,255,0.2)] transition hover:brightness-110"
                            >
                                Get Started
                            </Link>

                        </div>

                    </div>

                </div>
            )}

        </nav>
    );
}

export default Navbar;