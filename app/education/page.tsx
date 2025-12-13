"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =========================
   TYPES
========================= */
type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa?: string;
  status: "currently pursuing" | string;
  courses?: string[];
};

type EducationCardProps = {
  education: Education;
};

/* =========================
   EDUCATION DATA
========================= */
const educationData: Education[] = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    period: "2023 - 2027",
    cgpa: "9.25/10",
    status: "currently pursuing",
    courses: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Object-Oriented Programming",
    ],
  },
];

/* =========================
   EDUCATION CARD
========================= */
function EducationCard({ education }: EducationCardProps) {
  const progressPercent = 75;
  const progressBlocks = 30;
  const filledBlocks = Math.round((progressPercent / 100) * progressBlocks);

  return (
    <div className="border-2 border-blue-400 p-4 group">
      {/* Header Box */}
      <div className="border border-blue-500 p-3 mb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="text-blue-400 text-xs mb-1">
              ╔═══ DEGREE ═══╗
            </div>
            <h3 className="text-blue-300 text-base font-bold mb-2 uppercase tracking-wide">
              {education.degree}
            </h3>
          </div>
          <span className="text-green-400 text-xs border border-green-400 px-2 py-1">
            [{education.status.replace(" ", "_").toUpperCase()}]
          </span>
        </div>

        <div className="text-gray-300 text-sm mb-1">
          <span className="text-blue-400">►</span> {education.institution}
        </div>
        <div className="text-gray-500 text-xs">
          <span className="text-blue-400">►</span> {education.location}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3 text-sm font-mono">
        <div className="border border-gray-700 p-2">
          <div className="text-gray-500 text-xs mb-1">PERIOD:</div>
          <div className="text-white">{education.period}</div>
        </div>

        {education.cgpa && (
          <div className="border border-gray-700 p-2">
            <div className="text-gray-500 text-xs mb-1">CGPA:</div>
            <div className="text-green-400 font-bold">{education.cgpa}</div>
          </div>
        )}
      </div>

      {/* Courses Box */}
      {education.courses && (
        <div className="border border-blue-500 p-3 mb-3">
          <div className="text-blue-400 text-xs mb-2 border-b border-gray-700 pb-1">
            ┌─ RELEVANT COURSEWORK ─┐
          </div>
          <div className="space-y-1 text-xs">
            {education.courses.map((course, idx) => (
              <div
                key={idx}
                className="text-gray-300 flex items-start gap-2"
              >
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {education.status === "currently pursuing" && (
        <div className="border border-gray-700 p-3">
          <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
            <span>PROGRESS</span>
            <span>YEAR_3/4</span>
          </div>
          <div className="font-mono text-xs">
            [
            <span className="text-blue-400">
              {"█".repeat(filledBlocks)}
            </span>
            <span className="text-gray-700">
              {"░".repeat(progressBlocks - filledBlocks)}
            </span>
            ]{" "}
            <span className="text-blue-400">{progressPercent}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   MAIN PANEL
========================= */
export default function EducationPanel() {
  const [browserTab, setBrowserTab] = useState<string>("education.dev");

  const browserTabs: string[] = [
    "education.dev",
    "portfolio.dev",
    "help",
  ];

  return (
    <div className="w-full bg-black flex flex-col font-mono">
      {/* Browser Chrome */}
      <div className="bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 px-4 pt-3 pb-2 flex-shrink-0">
        {/* Browser Tabs */}
        <div className="flex gap-0.5 mb-2">
          {browserTabs.map((btab) => (
            <div key={btab} className="relative">
              <button
                onClick={() => setBrowserTab(btab)}
                className={`px-5 py-2 text-sm transition-colors relative ${
                  browserTab === btab
                    ? "bg-white text-gray-800"
                    : "bg-blue-300 text-gray-700 hover:bg-blue-250"
                }`}
                style={{
                  clipPath:
                    "polygon(12px 0%, calc(100% - 12px) 0%, 100% 100%, 0% 100%)",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                {btab}
              </button>
            </div>
          ))}
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2.5 shadow-sm">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronRight size={18} />
          </button>
          <input
            type="text"
            value="education"
            readOnly
            className="flex-1 outline-none text-gray-800 text-sm px-2"
          />
        </div>
      </div>

      {/* Education Panel */}
      <div className="border-4 border-t-0 border-blue-200 bg-black shadow-lg">
        <div className="p-5 space-y-4 h-[495px] overflow-y-auto">
          {educationData.map((education, index) => (
            <EducationCard key={index} education={education} />
          ))}
        </div>
      </div>
    </div>
  );
}
