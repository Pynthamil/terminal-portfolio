"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =========================
   SKILLS DATA
========================= */
const skillsData = {
  all: [
    { name: "python", level: 95 },
    { name: "javascript", level: 90 },
    { name: "react.js", level: 90 },
    { name: "node.js", level: 85 },
    { name: "express.js", level: 80 },
    { name: "mongodb", level: 80 },
    { name: "pandas", level: 85 },
    { name: "numpy", level: 85 },
    { name: "matplotlib", level: 80 },
    { name: "sql", level: 80 },
    { name: "bash scripting", level: 85 },
    { name: "git & github", level: 90 },
    { name: "figma", level: 70 },
    { name: "nmap", level: 65 },
    { name: "react native", level: 70 },
    { name: "dart", level: 65 },
    { name: "java", level: 75 },
    { name: "c", level: 70 },
    { name: "html", level: 95 },
    { name: "css", level: 95 },
    { name: "tkinter", level: 70 },
  ],

  industry: [
    { name: "web development", level: 90 },
    { name: "backend systems", level: 85 },
    { name: "data analysis", level: 85 },
    { name: "machine learning", level: 80 },
    { name: "cli tooling", level: 90 },
    { name: "vulnerability scanning", level: 65 },
  ],

  tools: [
    { name: "react.js", level: 90 },
    { name: "node.js", level: 85 },
    { name: "express.js", level: 80 },
    { name: "mongodb", level: 80 },
    { name: "git & github", level: 90 },
    { name: "figma", level: 70 },
    { name: "nmap", level: 65 },
    { name: "react native", level: 70 },
    { name: "dart", level: 65 },
    { name: "tkinter", level: 70 },
  ],
};

/* =========================
   SKILL BAR
========================= */
function SkillBar({ name, level }) {
  const totalBlocks = 30;
  const filled = Math.round((level / 100) * totalBlocks);

  return (
    <div className="flex items-center gap-4 text-sm group hover:bg-gray-900 px-2 py-1.5 rounded transition-colors">
      {/* Skill name */}
      <span className="w-40 text-blue-400 lowercase group-hover:text-blue-300 transition-colors">
        {name}
      </span>

      {/* ASCII bar */}
      <span className="flex-1 text-white whitespace-nowrap font-bold">
        [
        <span className="text-blue-500 group-hover:text-blue-400 transition-colors">
          {"█".repeat(filled)}
        </span>
        <span className="text-gray-700">
          {"░".repeat(totalBlocks - filled)}
        </span>
        ]
      </span>

      {/* Percentage */}
      <span className="w-12 text-right text-blue-300 font-bold group-hover:text-blue-200 transition-colors">
        {level}%
      </span>
    </div>
  );
}

/* =========================
   MAIN PANEL
========================= */
export default function SkillsPanel() {
  const [tab, setTab] = useState("all");
  const [browserTab, setBrowserTab] = useState("skills.dev");

  const browserTabs = ['skills.dev', 'portfolio.dev', 'help'];

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
                    ? 'bg-white text-gray-800'
                    : 'bg-blue-300 text-gray-700 hover:bg-blue-250'
                }`}
                style={{
                  clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 100%, 0% 100%)',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
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
            value="skills"
            readOnly
            className="flex-1 outline-none text-gray-800 text-sm px-2"
          />
        </div>
      </div>

      {/* Skills Panel */}
      <div className="border-4 border-blue-200 bg-black shadow-lg">
        {/* Content */}
        <div className="p-5 space-y-1 h-[500px] overflow-y-auto">
          {skillsData[tab].map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
            />
          ))}
        </div>
      </div>
    </div>
  );
}