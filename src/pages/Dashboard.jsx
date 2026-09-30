import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    Plus,
    LogOut,
    Edit3,
    Trash2,
    Copy,
    LayoutDashboard,
    Share2,
    ExternalLink,
    Search,
    Sparkles,
} from "lucide-react";
import API_URL from "../config/api";

function Dashboard() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("user");
            }
        }

        const loadResumes = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/resumes`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/login");
                        return;
                    }

                    throw new Error("Failed to load resumes");
                }

                const data = await response.json();
                setResumes(data);
            } catch (error) {
                console.error("Load resumes error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResumes();
    }, [navigate]);

    const createResume = () => {
        navigate("/resume-builder");
    };

    const editResume = (resume) => {
        navigate("/resume-builder", {
            state: {
                resume,
            },
        });
    };

    const deleteResume = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${API_URL}/api/resumes/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete resume");
            }

            setResumes((current) =>
                current.filter((resume) => resume._id !== id)
            );
        } catch (error) {
            console.error("Delete resume error:", error);
            alert("Failed to delete resume");
        }
    };

    const duplicateResume = async (resume) => {
        const token = localStorage.getItem("token");

        try {
            const duplicate = {
                name: `${resume.name || "My Resume"} Copy`,
                personal: resume.personal,
                experience: resume.experience,
                education: resume.education,
                projects: resume.projects,
                skills: resume.skills,
                template: resume.template,
            };

            const response = await fetch(
                `${API_URL}/api/resumes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(duplicate),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to duplicate resume");
            }

            const newResume = await response.json();

            setResumes((current) => [
                newResume,
                ...current,
            ]);
        } catch (error) {
            console.error("Duplicate resume error:", error);
            alert("Failed to duplicate resume");
        }
    };

    const shareResume = async (resumeId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/resumes/${resumeId}/share`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to share resume"
                );
            }

            setResumes((current) =>
                current.map((resume) =>
                    resume._id === resumeId
                        ? {
                            ...resume,
                            isPublic: true,
                            publicId: data.publicId,
                        }
                        : resume
                )
            );

            const publicUrl =
                `${window.location.origin}/resume/${data.publicId}`;

            await navigator.clipboard.writeText(publicUrl);

            alert("Public resume link copied!");
        } catch (error) {
            console.error("Share error:", error);
            alert(error.message);
        }
    };

    const unshareResume = async (resumeId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/resumes/${resumeId}/share`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to disable sharing"
                );
            }

            setResumes((current) =>
                current.map((resume) =>
                    resume._id === resumeId
                        ? {
                            ...resume,
                            isPublic: false,
                            publicId: undefined,
                        }
                        : resume
                )
            );

            alert("Public sharing disabled!");
        } catch (error) {
            console.error("Unshare error:", error);
            alert(error.message);
        }
    };

    const copyPublicLink = async (publicId) => {
        try {
            const publicUrl =
                `${window.location.origin}/resume/${publicId}`;

            await navigator.clipboard.writeText(publicUrl);

            alert("Public resume link copied!");
        } catch (error) {
            console.error("Copy link error:", error);
            alert("Failed to copy link");
        }
    };

    const openPublicResume = (publicId) => {
        window.open(
            `${window.location.origin}/resume/${publicId}`,
            "_blank"
        );
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const publicResumeCount = resumes.filter(
        (resume) => resume.isPublic
    ).length;

    const privateResumeCount =
        resumes.length - publicResumeCount;

    const filteredResumes = resumes.filter((resume) => {
        const search = searchTerm.trim().toLowerCase();

        const name =
            resume.name?.toLowerCase() || "";

        const fullName =
            resume.personal?.fullName?.toLowerCase() || "";

        const jobTitle =
            resume.personal?.jobTitle?.toLowerCase() || "";

        const matchesSearch =
            !search ||
            name.includes(search) ||
            fullName.includes(search) ||
            jobTitle.includes(search);

        const matchesFilter =
            filter === "all" ||
            (filter === "public" && resume.isPublic) ||
            (filter === "private" && !resume.isPublic);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen overflow-hidden bg-[#050711] text-white">

            {/* BACKGROUND EFFECTS */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute left-[10%] top-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[130px]" />
                <div className="absolute right-[5%] top-[35%] h-72 w-72 rounded-full bg-cyan-400/5 blur-[120px]" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>

            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050711]/85 backdrop-blur-2xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_25px_rgba(124,92,255,0.16)] transition duration-300 group-hover:shadow-[0_0_32px_rgba(124,92,255,0.28)]">
                            <FileText size={19} />
                        </div>

                        <div className="text-left">
                            <h1 className="text-lg font-extrabold tracking-tight text-white">
                                Resu
                                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                                    Me
                                </span>{" "}
                                AI
                            </h1>

                            <p className="hidden text-xs text-gray-500 sm:block">
                                Resume Workspace
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={logout}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-gray-400 transition duration-300 hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>

                </div>

            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">

                {/* PAGE HEADER */}
                <section className="relative mb-7 overflow-hidden rounded-3xl border border-indigo-400/10 bg-gradient-to-br from-indigo-500/[0.10] via-white/[0.035] to-cyan-400/[0.04] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">

                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-[80px]" />

                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <div className="mb-3 flex items-center gap-2 text-cyan-300">
                                <LayoutDashboard size={18} />

                                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                                    Dashboard
                                </span>
                            </div>

                            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                Welcome, {user?.name || "User"} 👋
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                                Create, manage and share your professional
                                resumes from one workspace.
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={createResume}
                            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(124,92,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(124,92,255,0.34)] md:w-auto"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                            <Plus size={18} className="relative" />

                            <span className="relative">
                                Create Resume
                            </span>
                        </button>

                    </div>

                </section>

                {/* STATISTICS */}
                <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* TOTAL */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-white/[0.055]">

                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                        <div className="relative flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Resumes
                                </p>

                                <p className="mt-2 text-3xl font-extrabold text-white">
                                    {resumes.length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-indigo-400/10 bg-indigo-500/10 p-3">
                                <FileText
                                    size={20}
                                    className="text-indigo-300"
                                />
                            </div>

                        </div>

                        <p className="relative mt-3 text-xs text-gray-600">
                            Saved resumes
                        </p>

                    </div>

                    {/* PUBLIC */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.055]">

                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                        <div className="relative flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Public
                                </p>

                                <p className="mt-2 text-3xl font-extrabold text-white">
                                    {publicResumeCount}
                                </p>
                            </div>

                            <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/10 p-3">
                                <Share2
                                    size={20}
                                    className="text-cyan-300"
                                />
                            </div>

                        </div>

                        <p className="relative mt-3 text-xs text-gray-600">
                            Shared online
                        </p>

                    </div>

                    {/* PRIVATE */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-400/20 hover:bg-white/[0.055]">

                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                        <div className="relative flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Private
                                </p>

                                <p className="mt-2 text-3xl font-extrabold text-white">
                                    {privateResumeCount}
                                </p>
                            </div>

                            <div className="rounded-xl border border-amber-400/10 bg-amber-400/10 p-3">
                                <FileText
                                    size={20}
                                    className="text-amber-300"
                                />
                            </div>

                        </div>

                        <p className="relative mt-3 text-xs text-gray-600">
                            Only visible to you
                        </p>

                    </div>

                    {/* TEMPLATES */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/[0.055]">

                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                        <div className="relative flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Templates
                                </p>

                                <p className="mt-2 text-3xl font-extrabold text-white">
                                    4
                                </p>
                            </div>

                            <div className="rounded-xl border border-violet-400/10 bg-violet-500/10 p-3">
                                <LayoutDashboard
                                    size={20}
                                    className="text-violet-300"
                                />
                            </div>

                        </div>

                        <p className="relative mt-3 text-xs text-gray-600">
                            Available designs
                        </p>

                    </div>

                </section>

                {/* RESUME SECTION */}
                <section>

                    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-extrabold tracking-tight">
                                    My Resumes
                                </h3>

                                <Sparkles
                                    size={18}
                                    className="text-cyan-400"
                                />
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your saved resumes.
                            </p>
                        </div>

                        {resumes.length > 0 && (
                            <p className="text-xs text-gray-600">
                                {filteredResumes.length} of {resumes.length} resumes
                            </p>
                        )}

                    </div>

                    {/* SEARCH AND FILTER */}
                    {!loading && resumes.length > 0 && (
                        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl">

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div className="relative lg:max-w-md lg:flex-1">

                                    <Search
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                                    />

                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Search your resumes..."
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.025] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-400/30 focus:bg-white/[0.04]"
                                    />

                                </div>

                                <div className="grid grid-cols-3 gap-2 lg:flex">

                                    <button
                                        type="button"
                                        onClick={() => setFilter("all")}
                                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                            filter === "all"
                                                ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-black shadow-[0_8px_20px_rgba(124,92,255,0.18)]"
                                                : "border border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
                                        }`}
                                    >
                                        All
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFilter("public")}
                                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                            filter === "public"
                                                ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-black shadow-[0_8px_20px_rgba(124,92,255,0.18)]"
                                                : "border border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
                                        }`}
                                    >
                                        Public
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFilter("private")}
                                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                            filter === "private"
                                                ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-black shadow-[0_8px_20px_rgba(124,92,255,0.18)]"
                                                : "border border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
                                        }`}
                                    >
                                        Private
                                    </button>

                                </div>

                            </div>

                        </div>
                    )}

                    {/* LOADING */}
                    {loading ? (

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                                >

                                    <div className="h-52 animate-pulse bg-white/[0.05]" />

                                    <div className="space-y-3 p-5">

                                        <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.08]" />

                                        <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.05]" />

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="h-10 animate-pulse rounded-xl bg-white/[0.06]" />
                                            <div className="h-10 animate-pulse rounded-xl bg-white/[0.06]" />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    ) : resumes.length === 0 ? (

                        /* EMPTY STATE */
                        <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-5 py-20 text-center backdrop-blur-xl">

                            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />

                            <div className="relative">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/15 to-cyan-400/10 shadow-[0_0_35px_rgba(124,92,255,0.1)]">

                                    <FileText
                                        size={34}
                                        className="text-cyan-300"
                                    />

                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                                    Your workspace is ready
                                </p>

                                <h3 className="mt-3 text-2xl font-extrabold">
                                    Create your first resume
                                </h3>

                                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                                    Build your professional resume using
                                    one of your available templates.
                                </p>

                                <button
                                    type="button"
                                    onClick={createResume}
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(124,92,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(124,92,255,0.34)]"
                                >
                                    <Plus size={18} />
                                    Create Your First Resume
                                </button>

                            </div>

                        </div>

                    ) : filteredResumes.length === 0 ? (

                        /* NO RESULTS */
                        <div className="rounded-3xl border border-white/10 bg-white/[0.025] px-5 py-16 text-center backdrop-blur-xl">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">

                                <Search
                                    size={28}
                                    className="text-gray-500"
                                />

                            </div>

                            <h3 className="mt-5 text-xl font-extrabold">
                                No matching resumes
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                                Try a different search term or filter.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilter("all");
                                }}
                                className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-gray-400 transition hover:border-indigo-400/25 hover:bg-white/[0.06] hover:text-white"
                            >
                                Clear Filters
                            </button>

                        </div>

                    ) : (

                        /* RESUME CARDS */
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredResumes.map((resume) => (

                                <article
                                    key={resume._id}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-indigo-400/25 hover:bg-white/[0.055]"
                                >

                                    {/* CARD GLOW */}
                                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-[70px] opacity-0 transition duration-500 group-hover:opacity-100" />

                                    {/* PREVIEW */}
                                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#151a25] to-[#0d111b] p-5">

                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.08),transparent_55%)]" />

                                        <div
                                            className={`relative w-full max-w-[190px] rounded-md bg-white p-4 text-black shadow-2xl transition duration-300 group-hover:scale-[1.025] ${
                                                resume.template === "modern"
                                                    ? "border-t-4 border-indigo-500"
                                                    : resume.template === "classic"
                                                    ? "border-t-2 border-gray-800"
                                                    : resume.template === "professional"
                                                    ? "border-l-4 border-gray-700"
                                                    : resume.template === "minimal"
                                                    ? "border-t border-gray-300"
                                                    : resume.template === "developer"
                                                    ? "border-l-4 border-cyan-400"
                                                    : ""
                                            }`}
                                        >

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="min-w-0">

                                                    <div className="h-2 w-20 rounded bg-gray-800" />

                                                    <div className="mt-2 h-1.5 w-14 rounded bg-gray-400" />

                                                </div>

                                                <div className="h-7 w-7 shrink-0 rounded-full bg-gray-100" />

                                            </div>

                                            <div className="mt-4 h-px bg-gray-200" />

                                            <div className="mt-4 h-2 w-14 rounded bg-gray-700" />

                                            <div className="mt-2 h-1 w-full rounded bg-gray-200" />
                                            <div className="mt-1 h-1 w-11/12 rounded bg-gray-200" />
                                            <div className="mt-1 h-1 w-4/5 rounded bg-gray-200" />

                                            <div className="mt-4 h-2 w-12 rounded bg-gray-700" />

                                            <div className="mt-2 h-1 w-full rounded bg-gray-200" />
                                            <div className="mt-1 h-1 w-5/6 rounded bg-gray-200" />

                                        </div>

                                        {/* STATUS */}
                                        {resume.isPublic ? (

                                            <span className="absolute right-3 top-3 rounded-full border border-green-300/20 bg-green-400/15 px-3 py-1 text-[10px] font-bold text-green-300 backdrop-blur-md">
                                                Public
                                            </span>

                                        ) : (

                                            <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold text-gray-300 backdrop-blur-md">
                                                Private
                                            </span>

                                        )}

                                    </div>

                                    {/* INFORMATION */}
                                    <div className="relative p-5">

                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0">

                                                <h4 className="truncate font-bold text-white">
                                                    {resume.name || "Untitled Resume"}
                                                </h4>

                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                    {resume.personal?.jobTitle ||
                                                        "Professional Resume"}
                                                </p>

                                                <p className="mt-1 text-[11px] text-gray-600">
                                                    Updated{" "}
                                                    {resume.updatedAt
                                                        ? new Date(
                                                            resume.updatedAt
                                                        ).toLocaleDateString()
                                                        : "Recently"}
                                                </p>

                                            </div>

                                            <span className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] capitalize text-gray-500">
                                                {resume.template || "modern"}
                                            </span>

                                        </div>

                                        {/* EDIT / DUPLICATE */}
                                        <div className="mt-5 grid grid-cols-2 gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    editResume(resume)
                                                }
                                                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] py-2.5 text-sm font-semibold text-gray-400 transition duration-200 hover:border-indigo-400/25 hover:bg-indigo-500/10 hover:text-white"
                                            >
                                                <Edit3 size={15} />
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    duplicateResume(resume)
                                                }
                                                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] py-2.5 text-sm font-semibold text-gray-400 transition duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/5 hover:text-cyan-300"
                                            >
                                                <Copy size={15} />
                                                Duplicate
                                            </button>

                                        </div>

                                        {/* SHARING */}
                                        <div className="mt-2">

                                            {resume.isPublic ? (

                                                <div className="grid grid-cols-2 gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            copyPublicLink(
                                                                resume.publicId
                                                            )
                                                        }
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] py-2.5 text-sm font-semibold text-cyan-300 transition duration-200 hover:border-cyan-400/35 hover:bg-cyan-400/10"
                                                    >
                                                        <Copy size={14} />
                                                        Copy Link
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openPublicResume(
                                                                resume.publicId
                                                            )
                                                        }
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] py-2.5 text-sm font-semibold text-gray-400 transition duration-200 hover:border-indigo-400/25 hover:bg-indigo-500/10 hover:text-white"
                                                    >
                                                        <ExternalLink size={14} />
                                                        View
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            unshareResume(
                                                                resume._id
                                                            )
                                                        }
                                                        className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.04] py-2.5 text-sm font-semibold text-red-400 transition duration-200 hover:border-red-400/30 hover:bg-red-400/[0.08]"
                                                    >
                                                        <Share2 size={14} />
                                                        Unshare Resume
                                                    </button>

                                                </div>

                                            ) : (

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        shareResume(resume._id)
                                                    }
                                                    className="group/share relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-2.5 text-sm font-bold text-black shadow-[0_8px_22px_rgba(124,92,255,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(124,92,255,0.28)]"
                                                >
                                                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover/share:translate-x-full" />

                                                    <Share2
                                                        size={15}
                                                        className="relative"
                                                    />

                                                    <span className="relative">
                                                        Share Resume
                                                    </span>
                                                </button>

                                            )}

                                        </div>

                                        {/* DELETE */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteResume(resume._id)
                                            }
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 py-2 text-xs font-medium text-gray-600 transition duration-200 hover:border-red-400/20 hover:bg-red-400/[0.04] hover:text-red-400"
                                        >
                                            <Trash2 size={14} />
                                            Delete Resume
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Dashboard;