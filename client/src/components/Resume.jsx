import React from "react";

const Resume = () => {
  // Sample skills and certifications - replace with actual data
  const skills = [
    { name: "Software Developer", color: "bg-zinc-600" },
    { name: "Project Management", color: "bg-zinc-600" },
    { name: "Tech Skills", color: "bg-zinc-600" },
    { name: "Soft Skills", color: "bg-zinc-600" },
    { name: "Backend Development", color: "bg-zinc-600" },
  ];

  const certifications = [
    { name: "Google Certificate", color: "bg-zinc-600" },
    { name: "Facebook Certificate", color: "bg-zinc-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Left Section - About, Job Love, Interests */}
      <div className="border border-zinc-700 rounded-lg p-6 space-y-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* What I Love About My Job Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">What I love about my job</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* My Interests and Hobbies Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">My interests and hobbies</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>

      {/* Right Section - Skills & Certifications */}
      <div className="space-y-6">
        {/* Skills Section */}
        <div className="border border-zinc-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">Skills</h3>
          <div className="space-y-4 min-h-[150px]">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`${skill.color} text-white px-3 py-1 rounded text-sm font-medium`}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
          <button className="text-sm text-zinc-400 hover:text-white transition mt-4">
            + Add Skills
          </button>
        </div>

        {/* Certification Section */}
        <div className="border border-zinc-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">Certification</h3>
          <div className="space-y-4 min-h-[150px]">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`${cert.color} text-white px-3 py-1 rounded text-sm font-medium`}
                >
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
          <button className="text-sm text-zinc-400 hover:text-white transition mt-4">
            + Add Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;