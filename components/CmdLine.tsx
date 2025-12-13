"use client"
import { useState, useRef, useEffect } from 'react';

export default function CmdLine() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to my portfolio terminal. Type "help" for available commands.' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: () => ({
      type: 'output',
      content: `Available commands:
  help       - Show this help message
  skills     - View my technical skills
  projects   - View my projects
  about      - Learn more about me
  education  - View my education
  contact    - Get my contact information
  clear      - Clear the terminal
  socials    - View my social media links`
    }),
    skills: () => ({
      type: 'output',
      content: `Technical Skills:
  • Languages: JavaScript, TypeScript, Python, Java
  • Frontend: React, Next.js, Tailwind CSS
  • Backend: Node.js, Express
  • Tools: Git, Docker, VS Code
  • Databases: MongoDB, PostgreSQL`
    }),
    projects: () => ({
      type: 'output',
      content: `Projects:
  1. Terminal Portfolio - Interactive portfolio website
  2. Task Manager - Full-stack task management app
  3. Weather App - Real-time weather application
  
  Type "project [number]" for more details`
    }),
    about: () => ({
      type: 'output',
      content: `Hi, I'm Pynthamil!
  
I'm a 3rd year Computer Science student passionate about building
interesting (and sometimes useless) projects. I love exploring new
technologies and creating things that make people say "why though?"`
    }),
    education: () => ({
      type: 'output',
      content: `Education:
  • Bachelor of Computer Science (3rd Year)
  • Expected Graduation: 2026
  • Focus: Software Engineering & Web Development`
    }),
    contact: () => ({
      type: 'output',
      content: `Contact Information:
  • Email: pynthamil@example.com
  • Location: Sholinganallur, Tamil Nadu, IN
  
  Feel free to reach out!`
    }),
    socials: () => ({
      type: 'output',
      content: `Social Media:
  • GitHub: github.com/pynthamil
  • LinkedIn: linkedin.com/in/pynthamil
  • Twitter: @pynthamil
  
  [Status: Currently not available]`
    }),
    clear: () => {
      setHistory([]);
      return null;
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    
    if (!trimmedCmd) {
      return;
    }

    // Add to command history for up/down navigation
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result) {
        setHistory(prev => [...prev, result]);
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="border-4 border-blue-200 w-full">
      {/* Terminal Header */}
      <div className="bg-blue-200 dark-text p-0.5 font-mono text-sm">
        enter commands here..
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="bg-black border-t-4 border-blue-200 p-4 h-40 overflow-y-auto font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Command History */}
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.type === 'command' && (
              <div className="flex items-start">
                <span className="text-green-400">pyndu@pyndu</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/tech/portfolio</span>
                <span className="text-white">$ </span>
                <span className="text-white ml-1">{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="text-gray-300 whitespace-pre-wrap ml-0">
                {item.content}
              </div>
            )}
            {item.type === 'error' && (
              <div className="text-red-400 ml-0">
                {item.content}
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-green-400">pyndu@pyndu</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/tech/portfolio</span>
          <span className="text-white">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (input.trim()) {
                  handleCommand(input);
                  setInput('');
                }
              } else {
                handleKeyDown(e);
              }
            }}
            className="flex-1 bg-transparent text-white outline-none ml-1 font-mono"
            autoFocus
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}