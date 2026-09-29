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
      className={`resume-preview min-h-[900px] bg-white p-10 text-black shadow-2xl ${template}`}
    >
      <h1 className="text-3xl font-bold">
        {personal?.fullName || "Your Name"}
      </h1>

      <p className="mt-1 text-lg text-gray-600">
        {personal?.jobTitle || personal?.position || "Professional Title"}
      </p>

      <div className="mt-4 border-b border-gray-300 pb-4 text-sm text-gray-600">
        {personal?.email || "email@example.com"}
        {" • "}
        {personal?.phone || "Phone"}
        {" • "}
        {personal?.location || "Location"}
      </div>

      {/* SUMMARY */}
      {personal?.summary && (
        <section className="mt-6">
          <h2 className="resume-heading">
            SUMMARY
          </h2>

          <p className="resume-text">
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

          {experience.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="mt-4"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">
                    {item.position || "Job Title"}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {item.company || "Company"}
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {item.startDate}

                  {item.startDate && item.endDate
                    ? " – "
                    : ""}

                  {item.endDate}
                </span>
              </div>

              <p className="resume-text whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section className="mt-6">
          <h2 className="resume-heading">
            EDUCATION
          </h2>

          {education.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="mt-4"
            >
              <h3 className="font-bold">
                {item.degree || "Degree"}
              </h3>

              <p className="text-sm text-gray-600">
                {item.institution || "Institution"}
              </p>

              <p className="text-xs text-gray-500">
                {item.startDate}

                {item.startDate && item.endDate
                  ? " – "
                  : ""}

                {item.endDate}
              </p>

              <p className="resume-text whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="resume-heading">
            PROJECTS
          </h2>

          {projects.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="mt-4"
            >
              <h3 className="font-bold">
                {item.name || "Project Name"}
              </h3>

              <p className="text-xs font-medium text-gray-600">
                {item.technologies}
              </p>

              <p className="resume-text whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills && (
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