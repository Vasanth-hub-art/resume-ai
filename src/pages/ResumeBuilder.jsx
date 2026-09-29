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
} from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import API_URL from "../config/api";
function ResumeBuilder() {
    const navigate = useNavigate();
    const location = useLocation();

    const editingResume = location.state?.resume;

    // --------------------------------------------------
    // PERSONAL INFORMATION
    // --------------------------------------------------

    const [personal, setPersonal] = useState({
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
    });

    // --------------------------------------------------
    // OTHER RESUME DATA
    // --------------------------------------------------

    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState("");
    const [template, setTemplate] = useState("modern");
    const [resumeName, setResumeName] = useState("My Resume");

    // --------------------------------------------------
    // HELPER
    // --------------------------------------------------

    const getItemId = (item) => {
        return item.id || item._id;
    };

    const normalizeItems = (items = []) => {
        return items.map((item) => ({
            ...item,
            id: item.id || item._id,
        }));
    };

    // --------------------------------------------------
    // PERSONAL INFORMATION
    // --------------------------------------------------

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;

        setPersonal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // --------------------------------------------------
    // EXPERIENCE
    // --------------------------------------------------

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
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    // --------------------------------------------------
    // EDUCATION
    // --------------------------------------------------

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
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    // --------------------------------------------------
    // PROJECTS
    // --------------------------------------------------

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
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    // --------------------------------------------------
    // LOAD EXISTING RESUME
    // --------------------------------------------------

    useEffect(() => {
        if (!editingResume) return;

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

    // --------------------------------------------------
    // SAVE RESUME
    // --------------------------------------------------

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

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-[#080b12] text-white">

            {/* ==========================================
                HEADER
            ========================================== */}

            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080b12]/90 backdrop-blur-xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        Dashboard
                    </button>

                    <button
                        onClick={saveResume}
                        className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-cyan-300 sm:px-5 sm:py-3"
                    >
                        <Save size={18} />
                        Save Resume
                    </button>

                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:bg-cyan-300"
                    >
                        Download PDF
                    </button>

                </div>

            </header>

            {/* ==========================================
                MAIN
            ========================================== */}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">

                {/* PAGE TITLE */}

                <div className="mb-8">

                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>

                        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                            Resume Builder
                        </p>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Build your professional resume
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                        Add your information and see your resume update instantly.
                    </p>

                </div>

                {/* ==========================================
                    BUILDER GRID
                ========================================== */}

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">

                    {/* ======================================
                        LEFT SIDE
                    ====================================== */}

                    <div className="space-y-6">

                        {/* ==================================
                            RESUME NAME + PERSONAL
                        ================================== */}

                        <section className="builder-card">

                            <div className="mb-6">

                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Resume Name
                                </label>

                                <input
                                    type="text"
                                    value={resumeName}
                                    onChange={(e) =>
                                        setResumeName(e.target.value)
                                    }
                                    placeholder="e.g. Software Developer Resume"
                                    className="input"
                                />

                            </div>

                            <div className="section-title">
                                <User size={20} />
                                <h2>Personal Information</h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                <input
                                    name="fullName"
                                    value={personal.fullName}
                                    onChange={handlePersonalChange}
                                    placeholder="Full Name"
                                    className="input"
                                />

                                <input
                                    name="jobTitle"
                                    value={personal.jobTitle}
                                    onChange={handlePersonalChange}
                                    placeholder="Professional Title"
                                    className="input"
                                />

                                <input
                                    name="email"
                                    type="email"
                                    value={personal.email}
                                    onChange={handlePersonalChange}
                                    placeholder="Email"
                                    className="input"
                                />

                                <input
                                    name="phone"
                                    value={personal.phone}
                                    onChange={handlePersonalChange}
                                    placeholder="Phone"
                                    className="input"
                                />

                                <input
                                    name="location"
                                    value={personal.location}
                                    onChange={handlePersonalChange}
                                    placeholder="Location"
                                    className="input sm:col-span-2"
                                />

                            </div>

                            <textarea
                                name="summary"
                                value={personal.summary}
                                onChange={handlePersonalChange}
                                placeholder="Professional Summary"
                                rows="5"
                                className="input mt-4 resize-none"
                            />

                        </section>

                        {/* ==================================
                            EXPERIENCE
                        ================================== */}

                        <section className="builder-card">

                            <div className="flex items-center justify-between">

                                <div className="section-title mb-0">
                                    <Briefcase size={20} />
                                    <h2>Experience</h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="add-button"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>

                            </div>

                            <div className="mt-5 space-y-5">

                                {experience.map((item, index) => {

                                    const itemId = getItemId(item);

                                    return (
                                        <div
                                            key={itemId}
                                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20"
                                        >

                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm font-semibold text-gray-400">
                                                    Experience {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeExperience(itemId)
                                                    }
                                                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">

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
                                                className="input mt-4 resize-none"
                                            />

                                        </div>
                                    );
                                })}

                                {experience.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-white/10 py-8 text-center">
                                        <Briefcase
                                            size={25}
                                            className="mx-auto mb-3 text-gray-600"
                                        />

                                        <p className="text-sm text-gray-500">
                                            No experience added yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={addExperience}
                                            className="mt-3 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                                        >
                                            + Add your first experience
                                        </button>
                                    </div>
                                )}

                            </div>

                        </section>

                        {/* ==================================
                            EDUCATION
                        ================================== */}

                        <section className="builder-card">

                            <div className="flex items-center justify-between">

                                <div className="section-title mb-0">
                                    <GraduationCap size={20} />
                                    <h2>Education</h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={addEducation}
                                    className="add-button"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>

                            </div>

                            <div className="mt-5 space-y-5">

                                {education.map((item, index) => {

                                    const itemId = getItemId(item);

                                    return (
                                        <div
                                            key={itemId}
                                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20"
                                        >

                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm font-semibold text-gray-400">
                                                    Education {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeEducation(itemId)
                                                    }
                                                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">

                                                <input
                                                    value={item.degree || ""}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            itemId,
                                                            "degree",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Degree"
                                                    className="input"
                                                />

                                                <input
                                                    value={item.institution || ""}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            itemId,
                                                            "institution",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Institution"
                                                    className="input"
                                                />

                                                <input
                                                    value={item.startDate || ""}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            itemId,
                                                            "startDate",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Start Year"
                                                    className="input"
                                                />

                                                <input
                                                    value={item.endDate || ""}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            itemId,
                                                            "endDate",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="End Year"
                                                    className="input"
                                                />

                                            </div>

                                            <textarea
                                                value={item.description || ""}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        itemId,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Additional details..."
                                                rows="3"
                                                className="input mt-4 resize-none"
                                            />

                                        </div>
                                    );
                                })}

                                {education.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-white/10 py-8 text-center">

                                        <GraduationCap
                                            size={25}
                                            className="mx-auto mb-3 text-gray-600"
                                        />

                                        <p className="text-sm text-gray-500">
                                            No education added yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={addEducation}
                                            className="mt-3 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                                        >
                                            + Add your education
                                        </button>

                                    </div>
                                )}

                            </div>

                        </section>

                        {/* ==================================
                            PROJECTS
                        ================================== */}

                        <section className="builder-card">

                            <div className="flex items-center justify-between">

                                <div className="section-title mb-0">
                                    <FolderGit2 size={20} />
                                    <h2>Projects</h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={addProject}
                                    className="add-button"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>

                            </div>

                            <div className="mt-5 space-y-5">

                                {projects.map((item, index) => {

                                    const itemId = getItemId(item);

                                    return (
                                        <div
                                            key={itemId}
                                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20"
                                        >

                                            <div className="mb-4 flex items-center justify-between">

                                                <span className="text-sm font-semibold text-gray-400">
                                                    Project {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeProject(itemId)
                                                    }
                                                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>

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

                                            <input
                                                value={item.technologies || ""}
                                                onChange={(e) =>
                                                    updateProject(
                                                        itemId,
                                                        "technologies",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Technologies used"
                                                className="input mt-4"
                                            />

                                            <textarea
                                                value={item.description || ""}
                                                onChange={(e) =>
                                                    updateProject(
                                                        itemId,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Project description..."
                                                rows="4"
                                                className="input mt-4 resize-none"
                                            />

                                            <input
                                                value={item.link || ""}
                                                onChange={(e) =>
                                                    updateProject(
                                                        itemId,
                                                        "link",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Project URL (optional)"
                                                className="input mt-4"
                                            />

                                        </div>
                                    );
                                })}

                                {projects.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-white/10 py-8 text-center">

                                        <FolderGit2
                                            size={25}
                                            className="mx-auto mb-3 text-gray-600"
                                        />

                                        <p className="text-sm text-gray-500">
                                            No projects added yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={addProject}
                                            className="mt-3 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                                        >
                                            + Add your first project
                                        </button>

                                    </div>
                                )}

                            </div>

                        </section>

                        {/* ==================================
                            SKILLS
                        ================================== */}

                        <section className="builder-card">

                            <div className="section-title">
                                <Code size={20} />
                                <h2>Skills</h2>
                            </div>

                            <textarea
                                value={skills}
                                onChange={(e) =>
                                    setSkills(e.target.value)
                                }
                                placeholder="Java, Python, React, Node.js, MongoDB..."
                                rows="4"
                                className="input resize-none"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Separate skills using commas.
                            </p>

                        </section>

                        {/* ==================================
                            TEMPLATE SELECTOR
                        ================================== */}

                        <section id="templates" className="builder-card">

                            <div className="section-title">
                                <LayoutTemplate size={20} />
                                <h2>Resume Template</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                {/* MODERN */}

                                <button
                                    type="button"
                                    onClick={() => setTemplate("modern")}
                                    className={`template-card ${template === "modern"
                                        ? "template-card-active"
                                        : ""
                                        }`}
                                >
                                    <div className="template-mini modern-mini">

                                        <div className="mini-title"></div>

                                        <div className="mini-line"></div>

                                        <div className="mini-line short"></div>

                                        <div className="mini-section"></div>

                                        <div className="mini-line"></div>

                                        <div className="mini-line short"></div>

                                    </div>

                                    <span>Modern</span>

                                </button>

                                {/* CLASSIC */}

                                <button
                                    type="button"
                                    onClick={() => setTemplate("classic")}
                                    className={`template-card ${template === "classic"
                                        ? "template-card-active"
                                        : ""
                                        }`}
                                >
                                    <div className="template-mini classic-mini">

                                        <div className="mini-title center"></div>

                                        <div className="mini-line center"></div>

                                        <div className="mini-section center"></div>

                                        <div className="mini-line"></div>

                                        <div className="mini-line short"></div>

                                    </div>

                                    <span>Classic</span>

                                </button>

                                {/* MINIMAL */}

                                <button
                                    type="button"
                                    onClick={() => setTemplate("minimal")}
                                    className={`template-card ${template === "minimal"
                                        ? "template-card-active"
                                        : ""
                                        }`}
                                >
                                    <div className="template-mini minimal-mini">

                                        <div className="mini-title"></div>

                                        <div className="mini-line"></div>

                                        <div className="mini-section"></div>

                                        <div className="mini-line"></div>

                                        <div className="mini-line short"></div>

                                    </div>

                                    <span>Minimal</span>

                                </button>

                                {/* PROFESSIONAL */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setTemplate("professional")
                                    }
                                    className={`template-card ${template === "professional"
                                        ? "template-card-active"
                                        : ""
                                        }`}
                                >
                                    <div className="template-mini professional-mini">

                                        <div className="mini-title"></div>

                                        <div className="mini-section"></div>

                                        <div className="mini-line"></div>

                                        <div className="mini-line short"></div>

                                    </div>

                                    <span>Professional</span>

                                </button>

                            </div>

                        </section>

                    </div>

                    {/* ======================================
                        RIGHT SIDE — LIVE PREVIEW
                    ====================================== */}

                    <div className="lg:sticky lg:top-24 lg:h-fit print-container">

                        <div className="mb-4 flex items-center justify-between">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Live Preview
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Your resume updates automatically
                                </p>
                            </div>

                            <span className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-400">

                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>

                                Live

                            </span>

                        </div>

                        {/* RESUME PAPER */}

                        <div id="resume-print">
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

                </div>

            </main >

        </div >
    );
}

export default ResumeBuilder;