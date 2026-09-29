import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                const response = await fetch(
                    `${API_URL}/api/resumes/public/${publicId}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Resume not found");
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
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">Loading resume...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-2">
                        Resume Not Found
                    </h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div
                id="public-resume"
                className="max-w-[794px] mx-auto"
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

            <p className="text-center text-sm text-gray-500 mt-5">
                Created with ResuMe AI
            </p>
        </div>
    );
}