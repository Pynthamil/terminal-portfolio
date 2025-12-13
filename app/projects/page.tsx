import file from "../../public/file.svg";
import Image from "next/image";

const projects = [
  { name: "Gemini Terminal", command: "$ gemini run" },
  { name: "Web-Sheet Logger", command: "$ logger sync --sheet" },
  { name: "Hermes", command: "$ hermes send" },
  { name: "TUI Browser", command: "$ tui-browser open" },
  { name: "Sentiment Analysis", command: "$ node sentiment.js" },
  { name: "Pomodoro Timer", command: "$ npm start timer" },
  { name: "Heart Disease Prediction", command: "$ python predict.py" },
  { name: "Breast Cancer Prediction", command: "$ python predict.py" },
  { name: "Iris Flower Classification", command: "$ python classify.py" },
  { name: "Fraud Detection", command: "$ jupyter notebook" },
  { name: "Luma", command: "$ npm start luma" },
  { name: "Pyni Helpdesk", command: "$ npm run helpdesk" },
];

export default function ProjectsPage() {
  return (
    <div className="font-mono">
      {/* Header */}
      <div className="border-4 border-b-0 border-blue-200">
        <div className="inline-block bg-blue-200 px-3 py-1 text-sm tracking-wide text-black">
          my projects
        </div>
      </div>

      {/* Scrollable Projects Grid */}
      <div className="border-4 border-blue-200 p-6 max-h-[560px] overflow-y-auto scroll-terminal">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="
                group flex flex-col items-center border-2 border-blue-200 p-4
                cursor-pointer transition-all duration-150
                hover:bg-blue-200 hover:border-blue-400
              "
            >
              {/* Icon */}
              <Image
                src={file}
                alt={project.name}
                width={70}
                height={70}
                className="group-hover:brightness-0 transition"
              />

              {/* Title */}
              <p className="text-center mt-3 text-sm text-white group-hover:text-black transition">
                {project.name}
              </p>

              {/* Command */}
              <p className="text-xs mt-1 text-blue-400 group-hover:text-blue-700 transition">
                {project.command}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
