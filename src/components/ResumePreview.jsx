function ResumePreview({
  personal,
  experience,
  education,
  projects,
  skills,
  template,
}) {
  return (
    <div
      className={`resume-preview ${template || "modern"} min-h-[900px] bg-white p-8 text-black shadow-2xl sm:p-10`}
    >
      {/* HEADER */}
      <header className="border-b border-gray-300 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {personal?.fullName || "Your Name"}
        </h1>

        <p className="mt-1 text-lg font-medium text-gray-600">
          {personal?.jobTitle || "Professional Title"}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
          {personal?.email && (
            <span>{personal.email}</span>
          )}

          {personal?.phone && (
            <span>• {personal.phone}</span>
          )}

          {personal?.location && (
            <span>• {personal.location}</span>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {personal?.summary?.trim() && (
        <section className="mt-6">
          <h2 className="resume-heading">
            SUMMARY
          </h2>

          <p className="resume-text whitespace-pre-line">
            {personal.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section className="mt-6">
          <h2 className="resume-heading">
            EXPERIENCE
          </h2>

          <div className="space-y-5">
            {experience.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="mt-4"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.position || "Job Title"}
                    </h3>

                    <p className="text-sm font-medium text-gray-600">
                      {item.company || "Company"}
                    </p>
                  </div>

                  {(item.startDate || item.endDate) && (
                    <span className="text-xs text-gray-500 sm:text-right">
                      {item.startDate}

                      {item.startDate && item.endDate
                        ? " – "
                        : ""}

                      {item.endDate}
                    </span>
                  )}
                </div>

                {item.description?.trim() && (
                  <p className="resume-text whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section className="mt-6">
          <h2 className="resume-heading">
            EDUCATION
          </h2>

          <div className="space-y-5">
            {education.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="mt-4"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.degree || "Degree"}
                    </h3>

                    <p className="text-sm font-medium text-gray-600">
                      {item.institution || "Institution"}
                    </p>
                  </div>

                  {(item.startDate || item.endDate) && (
                    <span className="text-xs text-gray-500 sm:text-right">
                      {item.startDate}

                      {item.startDate && item.endDate
                        ? " – "
                        : ""}

                      {item.endDate}
                    </span>
                  )}
                </div>

                {item.description?.trim() && (
                  <p className="resume-text whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="resume-heading">
            PROJECTS
          </h2>

          <div className="space-y-5">
            {projects.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="mt-4"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-bold text-gray-900">
                    {item.name || "Project Name"}
                  </h3>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 underline print:no-underline"
                    >
                      Project Link
                    </a>
                  )}
                </div>

                {item.technologies?.trim() && (
                  <p className="mt-1 text-xs font-medium text-gray-600">
                    {item.technologies}
                  </p>
                )}

                {item.description?.trim() && (
                  <p className="resume-text whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {skills?.trim() && (
        <section className="mt-6">
          <h2 className="resume-heading">
            SKILLS
          </h2>

          <p className="resume-text">
            {skills}
          </p>
        </section>
      )}
    </div>
  );
}

export default ResumePreview;