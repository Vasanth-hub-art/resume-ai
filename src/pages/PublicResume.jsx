import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    FileText,
    ArrowLeft,
    Sparkles,
} from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import API_URL from "../config/api";

export default function PublicResume() {
    const { publicId } = useParams();

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadResume = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/resumes/public/${publicId}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Resume not found"
                    );
                }

                setResume(data);
            } catch (err) {
                console.error("Public resume error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadResume();
    }, [publicId]);

    if (loading) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050711] px-4">

                <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

                <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-400/5 blur-[100px]" />

                <div className="relative w-full max-w-[794px]">

                    <div className="mb-5 flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_25px_rgba(124,92,255,0.16)]">
                            <FileText size={19} />
                        </div>

                        <span className="text-lg font-extrabold text-white">
                            Resu
                            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                                Me
                            </span>{" "}
                            AI
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl backdrop-blur-xl">

                        <div className="animate-pulse rounded-xl bg-white p-8">

                            <div className="border-b border-gray-200 pb-5">
                                <div className="h-7 w-48 rounded bg-gray-200" />
                                <div className="mt-3 h-4 w-32 rounded bg-gray-100" />
                                <div className="mt-3 h-3 w-64 rounded bg-gray-100" />
                            </div>

                            <div className="mt-8">
                                <div className="h-3 w-20 rounded bg-gray-200" />

                                <div className="mt-4 space-y-2">
                                    <div className="h-2 rounded bg-gray-100" />
                                    <div className="h-2 w-11/12 rounded bg-gray-100" />
                                    <div className="h-2 w-9/12 rounded bg-gray-100" />
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="h-3 w-24 rounded bg-gray-200" />

                                <div className="mt-4 space-y-3">
                                    <div className="h-12 rounded bg-gray-100" />
                                    <div className="h-12 rounded bg-gray-100" />
                                </div>
                            </div>

                        </div>

                    </div>

                    <p className="mt-5 text-center text-xs text-gray-600">
                        Loading public resume...
                    </p>

                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050711] px-4">

                <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

                <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-400/5 blur-[110px]" />

                <div className="relative w-full max-w-md">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-10">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
                            <FileText
                                size={28}
                                className="text-red-400"
                            />
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                            Public Resume
                        </p>

                        <h1 className="mt-3 text-2xl font-extrabold text-white">
                            Resume Not Found
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {error}
                        </p>

                        <Link
                            to="/"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(124,92,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(124,92,255,0.32)]"
                        >
                            <ArrowLeft size={17} />
                            Back to ResuMe AI
                        </Link>

                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#050711] px-4 py-8 sm:px-6 sm:py-10">

            {/* Background Glow */}
            <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/8 blur-[140px]" />

            <div className="pointer-events-none fixed right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-400/5 blur-[120px]" />

            <div className="pointer-events-none fixed bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-[120px]" />

            {/* Top Bar */}
            <div className="mx-auto mb-6 flex max-w-[900px] items-center justify-between">

                <Link
                    to="/"
                    className="group flex items-center gap-2.5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_22px_rgba(124,92,255,0.14)] transition duration-300 group-hover:shadow-[0_0_30px_rgba(124,92,255,0.24)]">
                        <FileText size={17} />
                    </div>

                    <span className="text-sm font-extrabold tracking-tight text-white sm:text-base">
                        Resu
                        <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                            Me
                        </span>{" "}
                        AI
                    </span>
                </Link>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold text-gray-500 backdrop-blur-xl">
                    <Sparkles
                        size={12}
                        className="text-cyan-400"
                    />
                    Public Resume
                </div>

            </div>

            {/* Resume */}
            <div
                id="public-resume"
                className="mx-auto max-w-[794px] overflow-hidden rounded-2xl shadow-[0_35px_90px_rgba(0,0,0,0.45)]"
            >
                <ResumePreview
                    personal={resume.personal}
                    experience={resume.experience}
                    education={resume.education}
                    projects={resume.projects}
                    skills={resume.skills}
                    template={resume.template}
                />
            </div>

            {/* Footer */}
            <div className="mx-auto mt-7 flex max-w-[794px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

                <p className="text-xs text-gray-600">
                    Created with{" "}
                    <span className="font-semibold text-gray-500">
                        ResuMe AI
                    </span>
                </p>

                <Link
                    to="/"
                    className="text-xs font-medium text-gray-600 transition hover:text-cyan-400"
                >
                    Create your own resume →
                </Link>

            </div>

        </div>
    );
}