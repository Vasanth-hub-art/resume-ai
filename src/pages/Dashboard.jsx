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
} from "lucide-react";
import { Share2 } from "lucide-react";
import API_URL from "../config/api";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);

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

  const deleteResume = async (id) => {
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
        throw new Error(data.message || "Failed to share resume");
      }

      const publicUrl = `${window.location.origin}/resume/${data.publicId}`;

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

      alert("Public sharing disabled!");

      // Refresh dashboard data
      const resumesResponse = await fetch(
        `${API_URL}/api/resumes`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resumesData = await resumesResponse.json();
      setResumes(resumesData);

    } catch (error) {
      console.error("Unshare error:", error);
      alert(error.message);
    }
  };


  const copyPublicLink = async (publicId) => {
    try {
      const publicUrl = `${window.location.origin}/resume/${publicId}`;

      await navigator.clipboard.writeText(publicUrl);

      alert("Public resume link copied!");
    } catch (error) {
      console.error("Copy link error:", error);
      alert("Failed to copy link");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };



  return (
    <div className="min-h-screen bg-[#080b12] text-white">

      {/* Navbar */}
      <header className="border-b border-white/10 bg-[#0b0f17]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/10 p-2">
              <FileText
                className="text-cyan-400"
                size={22}
              />
            </div>

            <div>
              <h1 className="text-lg font-bold">
                ResuMe AI
              </h1>

              <p className="text-xs text-gray-500">
                Resume Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-red-400/40 hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <div className="mb-2 flex items-center gap-2 text-cyan-400">
              <LayoutDashboard size={18} />

              <span className="text-sm font-medium">
                Dashboard
              </span>
            </div>

            <h2 className="text-3xl font-bold">
              Welcome, {user?.name || "User"} 👋
            </h2>

            <p className="mt-2 text-gray-400">
              Create and manage your professional resumes.
            </p>
          </div>

          <button
            onClick={createResume}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            <Plus size={19} />
            Create Resume
          </button>

        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              Total Resumes
            </p>

            <p className="mt-2 text-3xl font-bold">
              {resumes.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              Templates
            </p>

            <p className="mt-2 text-3xl font-bold">
              4
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              AI Tools
            </p>

            <p className="mt-2 text-3xl font-bold">
              Coming
            </p>
          </div>

        </div>

        {/* Resumes */}
        <section>

          <div className="mb-5">
            <h3 className="text-xl font-bold">
              My Resumes
            </h3>



            <p className="mt-1 text-sm text-gray-500">
              Manage your saved resumes.
            </p>
          </div>

          {loading ? (

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-gray-400">
                Loading your resumes...
              </p>
            </div>

          ) : resumes.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                <FileText
                  size={30}
                  className="text-cyan-400"
                />
              </div>

              <h3 className="text-xl font-semibold">
                No resumes yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Create your first professional resume and
                start building your career profile.
              </p>

              <button
                onClick={createResume}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:bg-cyan-300"
              >
                <Plus size={18} />
                Create Your First Resume
              </button>

            </div>

          ) : (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {resumes.map((resume) => (

                <div
                  key={resume._id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-cyan-400/30"
                >

                  {/* Preview */}
                  <div className="flex h-44 items-center justify-center bg-white p-6">

                    <div className="w-full max-w-[180px] rounded-sm bg-gray-100 p-3 text-black shadow-lg">

                      <div className="mb-3 h-2 w-24 bg-gray-800" />

                      <div className="mb-1 h-1 w-full bg-gray-300" />

                      <div className="mb-1 h-1 w-4/5 bg-gray-300" />

                      <div className="mt-4 h-2 w-16 bg-gray-700" />

                      <div className="mt-2 h-1 w-full bg-gray-300" />

                      <div className="mt-1 h-1 w-5/6 bg-gray-300" />

                    </div>

                  </div>

                  {/* Info */}
                  <div className="p-5">

                    <h4 className="font-semibold">
                      {resume.name || "Untitled Resume"}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Updated{" "}
                      {resume.updatedAt
                        ? new Date(
                          resume.updatedAt
                        ).toLocaleString()
                        : "Recently"}
                    </p>

                    <div className="mt-5 flex items-center gap-2">

                      <button
                        onClick={() =>
                          navigate("/resume-builder", {
                            state: {
                              resume,
                            },
                          })
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-sm text-gray-300 hover:bg-white/10"
                      >
                        <Edit3 size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          duplicateResume(resume)
                        }
                        className="rounded-lg bg-white/5 p-2 text-gray-400 hover:text-cyan-400"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>

                      <button
                        onClick={() =>
                          deleteResume(resume._id)
                        }
                        className="rounded-lg bg-white/5 p-2 text-gray-400 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>



                      {resume.isPublic ? (
                        <button
                          type="button"
                          onClick={() => unshareResume(resume._id)}
                          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                        >
                          Unshare
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => shareResume(resume._id)}
                          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-black transition hover:bg-cyan-600"
                        >
                          <Share2 size={18} />
                          Share
                        </button>
                      )}

                      {resume.isPublic && (
                        <button
                          type="button"
                          onClick={() => copyPublicLink(resume.publicId)}
                          className="flex items-center gap-2 rounded-lg border border-cyan-400 px-4 py-2 text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
                        >
                          Copy Link
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;