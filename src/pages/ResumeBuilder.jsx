import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    User,
    Briefcase,
    GraduationCap,
    Code,
    FolderGit2,
    LayoutTemplate,
    Download,
    Sparkles,
} from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import API_URL from "../config/api";

function ResumeBuilder() {
    const navigate = useNavigate();
    const location = useLocation();

    const editingResume = location.state?.resume;

    // ======================================================
    // PERSONAL INFORMATION
    // ======================================================

    const [personal, setPersonal] = useState({
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
    });

    // ======================================================
    // RESUME DATA
    // ======================================================

    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState("");
    const [template, setTemplate] = useState("modern");
    const [resumeName, setResumeName] = useState("My Resume");

    // ======================================================
    // AUTH GUARD
    // ======================================================

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    // ======================================================
    // HELPER
    // ======================================================

    const getItemId = (item) => {
        return item.id || item._id;
    };

    const normalizeItems = (items = []) => {
        return items.map((item) => ({
            ...item,
            id: item.id || item._id,
        }));
    };

    // ======================================================
    // PROFILE COMPLETENESS
    // ======================================================

    const completionChecks = [
        Boolean(resumeName.trim()),
        Boolean(personal.fullName.trim()),
        Boolean(personal.jobTitle.trim()),
        Boolean(personal.email.trim()),
        Boolean(personal.phone.trim()),
        Boolean(personal.location.trim()),
        Boolean(personal.summary.trim()),
        experience.length > 0,
        education.length > 0,
        projects.length > 0,
        Boolean(skills.trim()),
    ];

    const completedItems = completionChecks.filter(Boolean).length;

    const completionPercentage = Math.round(
        (completedItems / completionChecks.length) * 100
    );

    // ======================================================
    // PERSONAL INFORMATION
    // ======================================================

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;

        setPersonal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // EXPERIENCE
    // ======================================================

    const addExperience = () => {
        setExperience((prev) => [
            ...prev,
            {
                id: Date.now(),
                position: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    };

    const removeExperience = (id) => {
        setExperience((prev) =>
            prev.filter((item) => getItemId(item) !== id)
        );
    };

    const updateExperience = (id, field, value) => {
        setExperience((prev) =>
            prev.map((item) =>
                getItemId(item) === id
                    ? {
                          ...item,
                          [field]: value,
                      }
                    : item
            )
        );
    };

    // ======================================================
    // EDUCATION
    // ======================================================

    const addEducation = () => {
        setEducation((prev) => [
            ...prev,
            {
                id: Date.now(),
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    };

    const removeEducation = (id) => {
        setEducation((prev) =>
            prev.filter((item) => getItemId(item) !== id)
        );
    };

    const updateEducation = (id, field, value) => {
        setEducation((prev) =>
            prev.map((item) =>
                getItemId(item) === id
                    ? {
                          ...item,
                          [field]: value,
                      }
                    : item
            )
        );
    };

    // ======================================================
    // PROJECTS
    // ======================================================

    const addProject = () => {
        setProjects((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: "",
                technologies: "",
                description: "",
                link: "",
            },
        ]);
    };

    const removeProject = (id) => {
        setProjects((prev) =>
            prev.filter((item) => getItemId(item) !== id)
        );
    };

    const updateProject = (id, field, value) => {
        setProjects((prev) =>
            prev.map((item) =>
                getItemId(item) === id
                    ? {
                          ...item,
                          [field]: value,
                      }
                    : item
            )
        );
    };

    // ======================================================
    // LOAD EXISTING RESUME
    // ======================================================

    useEffect(() => {
        if (!editingResume) {
            return;
        }

        setResumeName(editingResume.name || "My Resume");

        setPersonal({
            fullName: editingResume.personal?.fullName || "",
            jobTitle: editingResume.personal?.jobTitle || "",
            email: editingResume.personal?.email || "",
            phone: editingResume.personal?.phone || "",
            location: editingResume.personal?.location || "",
            summary: editingResume.personal?.summary || "",
        });

        setExperience(
            normalizeItems(editingResume.experience || [])
        );

        setEducation(
            normalizeItems(editingResume.education || [])
        );

        setProjects(
            normalizeItems(editingResume.projects || [])
        );

        setSkills(editingResume.skills || "");
        setTemplate(editingResume.template || "modern");
    }, [editingResume]);

    // ======================================================
    // SAVE RESUME
    // ======================================================

    const saveResume = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const resumeData = {
            name: resumeName || "My Resume",
            personal,
            experience,
            education,
            projects,
            skills,
            template,
        };

        try {
            let response;

            if (editingResume?._id) {
                response = await fetch(
                    `${API_URL}/api/resumes/${editingResume._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(resumeData),
                    }
                );
            } else {
                response = await fetch(
                    `${API_URL}/api/resumes`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(resumeData),
                    }
                );
            }

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                    return;
                }

                throw new Error(
                    data.message || "Failed to save resume"
                );
            }

            console.log("Resume saved:", data);

            navigate("/dashboard");
        } catch (error) {
            console.error("Save resume error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#050711] text-white">

            {/* ==================================================
                BACKGROUND EFFECTS
            ================================================== */}

            <div className="pointer-events-none fixed inset-0 -z-10">

                <div className="absolute left-[5%] top-0 h-80 w-80 rounded-full bg-indigo-500/8 blur-[130px]" />

                <div className="absolute right-[5%] top-[30%] h-72 w-72 rounded-full bg-cyan-400/5 blur-[120px]" />

                <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/5 blur-[130px]" />

            </div>

            <div className="pointer-events-none fixed inset-0 -z-20 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:42px_42px]" />

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050711]/85 backdrop-blur-2xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">

                    {/* BACK */}
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm font-semibold text-gray-400 transition duration-300 hover:border-indigo-400/25 hover:bg-indigo-500/5 hover:text-white sm:px-4"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition group-hover:-translate-x-0.5"
                        />

                        <span className="hidden sm:inline">
                            Dashboard
                        </span>

                        <span className="sm:hidden">
                            Back
                        </span>
                    </button>

                    {/* BRAND */}
                    <div className="hidden items-center gap-2 sm:flex">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_20px_rgba(124,92,255,0.15)]">
                            <Sparkles size={15} />
                        </div>

                        <span className="text-sm font-extrabold tracking-tight">
                            Resu
                            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                                Me
                            </span>{" "}
                            AI
                        </span>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 text-sm font-semibold text-gray-400 transition duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/5 hover:text-white sm:px-4"
                        >
                            <Download
                                size={16}
                                className="transition group-hover:-translate-y-0.5"
                            />

                            <span className="hidden sm:inline">
                                Download PDF
                            </span>

                            <span className="sm:hidden">
                                PDF
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={saveResume}
                            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-2.5 text-sm font-bold text-black shadow-[0_8px_24px_rgba(124,92,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(124,92,255,0.32)] sm:px-4"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                            <Save
                                size={16}
                                className="relative"
                            />

                            <span className="relative hidden sm:inline">
                                Save Resume
                            </span>

                            <span className="relative sm:hidden">
                                Save
                            </span>
                        </button>

                    </div>

                </div>

            </header>

            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">

                {/* ==================================================
                    INTRO
                ================================================== */}

                <section className="mb-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <div className="mb-3 flex items-center gap-2">

                                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(85,230,255,0.75)]" />

                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                                    Resume Builder
                                </p>

                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Build your{" "}
                                <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                                    professional resume
                                </span>
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                                Add your information, choose a professional
                                template and watch your resume update
                                instantly.
                            </p>

                        </div>

                        {/* COMPLETION */}
                        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">

                            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl" />

                            <div className="relative flex items-center justify-between">

                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Profile Completeness
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-white">
                                        {completionPercentage}% complete
                                    </p>
                                </div>

                                <span className="text-sm font-extrabold text-cyan-300">
                                    {completedItems}/{completionChecks.length}
                                </span>

                            </div>

                            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white/10">

                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_14px_rgba(85,230,255,0.25)] transition-all duration-500"
                                    style={{
                                        width: `${completionPercentage}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </section>

                {/* ==================================================
                    WORKSPACE
                ================================================== */}

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">

                    {/* ==================================================
                        LEFT EDITOR
                    ================================================== */}

                    <div className="space-y-6">

                        {/* PERSONAL */}
                        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7">

                            {/* Resume Name */}
                            <div className="mb-7 rounded-2xl border border-indigo-400/10 bg-indigo-500/[0.035] p-4">

                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    Resume Name
                                </label>

                                <input
                                    type="text"
                                    value={resumeName}
                                    onChange={(e) =>
                                        setResumeName(e.target.value)
                                    }
                                    placeholder="e.g. Software Developer Resume"
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/15 focus:border-indigo-400/40 focus:bg-white/[0.045] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.08)]"
                                />

                                <p className="mt-2 text-xs text-gray-600">
                                    Use a name that helps you identify this
                                    resume in your dashboard.
                                </p>

                            </div>

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                                    <User size={18} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-white">
                                        Personal Information
                                    </h2>

                                    <p className="text-xs text-gray-600">
                                        Your contact and professional details
                                    </p>
                                </div>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                        Full Name
                                    </label>

                                    <input
                                        name="fullName"
                                        value={personal.fullName}
                                        onChange={handlePersonalChange}
                                        placeholder="Your full name"
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                        Professional Title
                                    </label>

                                    <input
                                        name="jobTitle"
                                        value={personal.jobTitle}
                                        onChange={handlePersonalChange}
                                        placeholder="e.g. Full Stack Developer"
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                        Email
                                    </label>

                                    <input
                                        name="email"
                                        type="email"
                                        value={personal.email}
                                        onChange={handlePersonalChange}
                                        placeholder="you@example.com"
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                        Phone
                                    </label>

                                    <input
                                        name="phone"
                                        value={personal.phone}
                                        onChange={handlePersonalChange}
                                        placeholder="+91 XXXXX XXXXX"
                                        className="input"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                        Location
                                    </label>

                                    <input
                                        name="location"
                                        value={personal.location}
                                        onChange={handlePersonalChange}
                                        placeholder="City, State, Country"
                                        className="input"
                                    />
                                </div>

                                <div className="sm:col-span-2">

                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                        Professional Summary
                                    </label>

                                    <textarea
                                        name="summary"
                                        value={personal.summary}
                                        onChange={handlePersonalChange}
                                        placeholder="Write a concise professional summary..."
                                        rows="5"
                                        className="input resize-none"
                                    />

                                </div>

                            </div>

                        </section>

                        {/* EXPERIENCE */}
                        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                                        <Briefcase size={18} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Experience
                                            {experience.length > 0 && (
                                                <span className="ml-2 text-xs font-medium text-gray-600">
                                                    ({experience.length})
                                                </span>
                                            )}
                                        </h2>

                                        <p className="hidden text-xs text-gray-600 sm:block">
                                            Add your professional experience
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="flex shrink-0 items-center gap-1.5 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-300 transition duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/10 hover:text-cyan-300 sm:px-4"
                                >
                                    <Plus size={15} />
                                    Add
                                </button>

                            </div>

                            <div className="mt-6 space-y-5">

                                {experience.map((item, index) => {

                                    const itemId = getItemId(item);

                                    return (
                                        <div
                                            key={itemId}
                                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:border-indigo-400/20 hover:bg-white/[0.035]"
                                        >

                                            <div className="mb-5 flex items-center justify-between">

                                                <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-gray-500">
                                                    Experience {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeExperience(itemId)
                                                    }
                                                    className="rounded-lg p-2 text-gray-600 transition hover:bg-red-400/10 hover:text-red-400"
                                                    title="Remove experience"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Job Position
                                                    </label>

                                                    <input
                                                        value={item.position || ""}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                itemId,
                                                                "position",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Job Position"
                                                        className="input"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Company
                                                    </label>

                                                    <input
                                                        value={item.company || ""}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                itemId,
                                                                "company",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Company"
                                                        className="input"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Start Date
                                                    </label>

                                                    <input
                                                        value={item.startDate || ""}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                itemId,
                                                                "startDate",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Start Date"
                                                        className="input"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        End Date
                                                    </label>

                                                    <input
                                                        value={item.endDate || ""}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                itemId,
                                                                "endDate",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="End Date"
                                                        className="input"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">

                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Responsibilities & Achievements
                                                    </label>

                                                    <textarea
                                                        value={item.description || ""}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                itemId,
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Describe your responsibilities and achievements..."
                                                        rows="4"
                                                        className="input resize-none"
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}

                                {experience.length === 0 && (
                                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] py-10 text-center">

                                        <Briefcase
                                            size={25}
                                            className="mx-auto mb-3 text-gray-700"
                                        />

                                        <p className="text-sm text-gray-500">
                                            No experience added yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={addExperience}
                                            className="mt-3 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                                        >
                                            + Add your first experience
                                        </button>

                                    </div>
                                )}

                            </div>

                        </section>

                        {/* EDUCATION */}
                        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                        <GraduationCap size={18} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Education
                                            {education.length > 0 && (
                                                <span className="ml-2 text-xs font-medium text-gray-600">
                                                    ({education.length})
                                                </span>
                                            )}
                                        </h2>

                                        <p className="hidden text-xs text-gray-600 sm:block">
                                            Add your academic background
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={addEducation}
                                    className="flex shrink-0 items-center gap-1.5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-300 transition duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/15 sm:px-4"
                                >
                                    <Plus size={15} />
                                    Add
                                </button>

                            </div>

                            <div className="mt-6 space-y-5">

                                {education.map((item, index) => {

                                    const itemId = getItemId(item);

                                    return (
                                        <div
                                            key={itemId}
                                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.035]"
                                        >

                                            <div className="mb-5 flex items-center justify-between">

                                                <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-gray-500">
                                                    Education {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeEducation(itemId)
                                                    }
                                                    className="rounded-lg p-2 text-gray-600 transition hover:bg-red-400/10 hover:text-red-400"
                                                    title="Remove education"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Degree
                                                    </label>

                                                    <input
                                                        value={item.degree || ""}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                itemId,
                                                                "degree",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Degree / Qualification"
                                                        className="input"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Institution
                                                    </label>

                                                    <input
                                                        value={item.institution || ""}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                itemId,
                                                                "institution",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="College / University"
                                                        className="input"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Start Year
                                                    </label>

                                                    <input
                                                        value={item.startDate || ""}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                itemId,
                                                                "startDate",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="2024"
                                                        className="input"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        End Year
                                                    </label>

                                                    <input
                                                        value={item.endDate || ""}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                itemId,
                                                                "endDate",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="2027"
                                                        className="input"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">

                                                    <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                        Additional Details
                                                    </label>

                                                    <textarea
                                                        value={item.description || ""}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                itemId,
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Add relevant academic details..."
                                                        rows="3"
                                                        className="input resize-none"
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}

                                {education.length === 0 && (
                                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] py-10 text-center">

                                        <GraduationCap
                                            size={25}
                                            className="mx-auto mb-3 text-gray-700"
                                        />

                                        <p className="text-sm text-gray-500">
                                            No education added yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={addEducation}
                                            className="mt-3 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                                        >
                                            + Add your education
                                        </button>

                                    </div>
                                )}

                            </div>

                        </section>

                        {/* PROJECTS */}
                        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                                        <FolderGit2 size={18} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Projects
                                            {projects.length > 0 && (
                                                <span className="ml-2 text-xs font-medium text-gray-600">
                                                    ({projects.length})
                                                </span>
                                            )}
                                        </h2>

                                        <p className="hidden text-xs text-gray-600 sm:block">
                                            Showcase your work and projects
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={addProject}
                                    className="flex shrink-0 items-center gap-1.5 rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-bold text-violet-300 transition duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/10 hover:text-cyan-300 sm:px-4"
                                >
                                    <Plus size={15} />
                                    Add
                                </button>

                            </div>

                            <div className="mt-6 space-y-5">

                                {projects.map((item, index) => {

                                    const itemId = getItemId(item);

                                    return (
                                        <div
                                            key={itemId}
                                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:border-violet-400/20 hover:bg-white/[0.035]"
                                        >

                                            <div className="mb-5 flex items-center justify-between">

                                                <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-gray-500">
                                                    Project {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeProject(itemId)
                                                    }
                                                    className="rounded-lg p-2 text-gray-600 transition hover:bg-red-400/10 hover:text-red-400"
                                                    title="Remove project"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                            <div>

                                                <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                    Project Name
                                                </label>

                                                <input
                                                    value={item.name || ""}
                                                    onChange={(e) =>
                                                        updateProject(
                                                            itemId,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Project Name"
                                                    className="input"
                                                />

                                            </div>

                                            <div className="mt-4">

                                                <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                    Technologies
                                                </label>

                                                <input
                                                    value={item.technologies || ""}
                                                    onChange={(e) =>
                                                        updateProject(
                                                            itemId,
                                                            "technologies",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="React, Node.js, MongoDB..."
                                                    className="input"
                                                />

                                            </div>

                                            <div className="mt-4">

                                                <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                    Description
                                                </label>

                                                <textarea
                                                    value={item.description || ""}
                                                    onChange={(e) =>
                                                        updateProject(
                                                            itemId,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Explain what you built and what problem it solves..."
                                                    rows="4"
                                                    className="input resize-none"
                                                />

                                            </div>

                                            <div className="mt-4">

                                                <label className="mb-2 block text-xs font-semibold text-gray-500">
                                                    Project URL
                                                    <span className="ml-1 font-normal text-gray-700">
                                                        (Optional)
                                                    </span>
                                                </label>

                                                <input
                                                    type="url"
                                                    value={item.link || ""}
                                                    onChange={(e) =>
                                                        updateProject(
                                                            itemId,
                                                            "link",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="https://github.com/..."
                                                    className="input"
                                                />

                                            </div>

                                        </div>
                                    );
                                })}

                                {projects.length === 0 && (
                                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] py-10 text-center">

                                        <FolderGit2
                                            size={25}
                                            className="mx-auto mb-3 text-gray-700"
                                        />

                                        <p className="text-sm text-gray-500">
                                            No projects added yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={addProject}
                                            className="mt-3 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                                        >
                                            + Add your first project
                                        </button>

                                    </div>
                                )}

                            </div>

                        </section>

                        {/* SKILLS */}
                        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                    <Code size={18} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">
                                        Skills
                                    </h2>

                                    <p className="text-xs text-gray-600">
                                        Add your technical and professional skills
                                    </p>
                                </div>

                            </div>

                            <label className="mb-2 block text-xs font-semibold text-gray-500">
                                Technical & Professional Skills
                            </label>

                            <textarea
                                value={skills}
                                onChange={(e) =>
                                    setSkills(e.target.value)
                                }
                                placeholder="Java, Python, C++, React, Node.js, MongoDB..."
                                rows="4"
                                className="input resize-none"
                            />

                            <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-xs text-gray-600">
                                    Separate skills using commas.
                                </p>

                                <p className="text-xs font-semibold text-cyan-400">
                                    {skills
                                        ? skills
                                              .split(",")
                                              .filter(
                                                  (item) =>
                                                      item.trim()
                                              ).length
                                        : 0}{" "}
                                    skills added
                                </p>

                            </div>

                        </section>

                        {/* TEMPLATE SELECTOR */}
                        <section
                            id="templates"
                            className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7"
                        >

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                                    <LayoutTemplate size={18} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">
                                        Resume Template
                                    </h2>

                                    <p className="text-xs text-gray-600">
                                        Choose the design of your resume
                                    </p>
                                </div>

                            </div>

                            <p className="mb-5 text-sm leading-6 text-gray-500">
                                Select a visual style that matches your
                                professional profile.
                            </p>

                            <div className="grid grid-cols-2 gap-4">

                                {/* MODERN */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTemplate("modern")
                                    }
                                    className={`group rounded-2xl border p-3 text-left transition duration-300 ${
                                        template === "modern"
                                            ? "border-indigo-400/40 bg-indigo-500/10 shadow-[0_0_30px_rgba(124,92,255,0.1)]"
                                            : "border-white/10 bg-white/[0.02] hover:border-indigo-400/20 hover:bg-white/[0.04]"
                                    }`}
                                >

                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white p-4 shadow-xl">

                                        <div className="border-t-4 border-indigo-500 pt-3">
                                            <div className="h-2.5 w-24 rounded bg-gray-800" />
                                            <div className="mt-2 h-1.5 w-16 rounded bg-gray-300" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-14 rounded bg-gray-700" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-11/12 rounded bg-gray-200" />
                                            <div className="h-1 w-4/5 rounded bg-gray-200" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-16 rounded bg-gray-700" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-9/12 rounded bg-gray-200" />
                                        </div>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-sm font-bold text-white">
                                            Modern
                                        </span>

                                        {template === "modern" && (
                                            <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-[9px] font-bold text-indigo-300">
                                                Selected
                                            </span>
                                        )}

                                    </div>

                                </button>

                                {/* CLASSIC */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTemplate("classic")
                                    }
                                    className={`group rounded-2xl border p-3 text-left transition duration-300 ${
                                        template === "classic"
                                            ? "border-indigo-400/40 bg-indigo-500/10 shadow-[0_0_30px_rgba(124,92,255,0.1)]"
                                            : "border-white/10 bg-white/[0.02] hover:border-indigo-400/20 hover:bg-white/[0.04]"
                                    }`}
                                >

                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white p-4 text-center shadow-xl">

                                        <div className="border-b-2 border-gray-800 pb-3">
                                            <div className="mx-auto h-2.5 w-28 rounded bg-gray-800" />
                                            <div className="mx-auto mt-2 h-1.5 w-20 rounded bg-gray-300" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-16 rounded bg-gray-700 mx-auto" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-10/12 mx-auto rounded bg-gray-200" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-20 rounded bg-gray-700 mx-auto" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-9/12 mx-auto rounded bg-gray-200" />
                                        </div>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-sm font-bold text-white">
                                            Classic
                                        </span>

                                        {template === "classic" && (
                                            <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-[9px] font-bold text-indigo-300">
                                                Selected
                                            </span>
                                        )}

                                    </div>

                                </button>

                                {/* MINIMAL */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTemplate("minimal")
                                    }
                                    className={`group rounded-2xl border p-3 text-left transition duration-300 ${
                                        template === "minimal"
                                            ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_30px_rgba(85,230,255,0.08)]"
                                            : "border-white/10 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04]"
                                    }`}
                                >

                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white p-5 shadow-xl">

                                        <div className="border-b border-gray-300 pb-4">
                                            <div className="h-2.5 w-28 rounded bg-gray-800" />
                                            <div className="mt-2 h-1.5 w-16 rounded bg-gray-300" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-12 rounded bg-gray-700" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-10/12 rounded bg-gray-200" />
                                            <div className="h-1 w-8/12 rounded bg-gray-200" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-16 rounded bg-gray-700" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-8/12 rounded bg-gray-200" />
                                        </div>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-sm font-bold text-white">
                                            Minimal
                                        </span>

                                        {template === "minimal" && (
                                            <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-300">
                                                Selected
                                            </span>
                                        )}

                                    </div>

                                </button>

                                {/* PROFESSIONAL */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTemplate("professional")
                                    }
                                    className={`group rounded-2xl border p-3 text-left transition duration-300 ${
                                        template === "professional"
                                            ? "border-violet-400/40 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                                            : "border-white/10 bg-white/[0.02] hover:border-violet-400/20 hover:bg-white/[0.04]"
                                    }`}
                                >

                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white p-4 shadow-xl">

                                        <div className="border-l-4 border-gray-700 pl-3">
                                            <div className="h-2.5 w-24 rounded bg-gray-800" />
                                            <div className="mt-2 h-1.5 w-16 rounded bg-gray-300" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-16 rounded bg-gray-700" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-11/12 rounded bg-gray-200" />
                                            <div className="h-1 w-8/12 rounded bg-gray-200" />
                                        </div>

                                        <div className="mt-5 h-1.5 w-20 rounded bg-gray-700" />

                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 rounded bg-gray-200" />
                                            <div className="h-1 w-9/12 rounded bg-gray-200" />
                                        </div>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-sm font-bold text-white">
                                            Professional
                                        </span>

                                        {template === "professional" && (
                                            <span className="rounded-full bg-violet-500/15 px-2 py-1 text-[9px] font-bold text-violet-300">
                                                Selected
                                            </span>
                                        )}

                                    </div>

                                </button>

                            </div>

                        </section>

                    </div>

                    {/* ==================================================
                        RIGHT — LIVE PREVIEW
                    ================================================== */}

                    <div className="lg:sticky lg:top-24 lg:h-fit print-container">

                        {/* PREVIEW HEADING */}
                        <div className="mb-4 flex items-center justify-between gap-4">

                            <div>

                                <div className="flex items-center gap-2">

                                    <h2 className="text-xl font-extrabold">
                                        Live Preview
                                    </h2>

                                    <span className="hidden rounded-md border border-indigo-400/10 bg-indigo-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-300 sm:inline">
                                        Real-time
                                    </span>

                                </div>

                                <p className="mt-1 text-xs text-gray-600">
                                    Your resume updates automatically.
                                </p>

                            </div>

                            <span className="flex shrink-0 items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-300 shadow-[0_0_20px_rgba(85,230,255,0.06)]">

                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_9px_rgba(85,230,255,0.8)]" />

                                Live

                            </span>

                        </div>

                        {/* PREVIEW CONTAINER */}
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-4">

                            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-500/5 blur-[80px]" />

                            <div
                                id="resume-print"
                                className="relative"
                            >
                                <ResumePreview
                                    personal={personal}
                                    experience={experience}
                                    education={education}
                                    projects={projects}
                                    skills={skills}
                                    template={template}
                                />
                            </div>

                        </div>

                        {/* PREVIEW FOOTER */}
                        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-700">

                            <span>
                                Template:{" "}
                                <span className="font-semibold capitalize text-gray-500">
                                    {template}
                                </span>
                            </span>

                            <span>
                                {completionPercentage}% complete
                            </span>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ResumeBuilder;