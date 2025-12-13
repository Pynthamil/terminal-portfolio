"use client"

import { useState, useMemo, useEffect } from 'react';

export default function CommitHistory() {
  const [commits, setCommits] = useState([]);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Generate random commit data only on client
  useEffect(() => {
    const generateCommits = () => {
      const commits = [];
      const weeks = 52;
      const daysPerWeek = 7;
      
      for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < daysPerWeek; day++) {
          const count = Math.floor(Math.random() * 11);
          commits.push({
            week,
            day,
            count,
            date: new Date(2024, 0, 1 + week * 7 + day).toLocaleDateString()
          });
        }
      }
      return commits;
    };

    setCommits(generateCommits());
    setMounted(true);
  }, []);

  // Calculate total commits
  const totalCommits = commits.reduce((sum, commit) => sum + commit.count, 0);

  // Get color based on commit count
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 2) return 'bg-blue-900';
    if (count <= 5) return 'bg-blue-600';
    if (count <= 8) return 'bg-blue-400';
    return 'bg-blue-200';
  };

  // Group commits by week
  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < 52; i++) {
      result.push(commits.filter(c => c.week === i));
    }
    return result;
  }, [commits]);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="border-4 border-blue-200 w-full overflow-visible">
        <div className="flex items-center justify-between bg-blue-200 p-2 font-mono text-sm">
          <span>commit history</span>
          <span>Loading...</span>
        </div>
        <div className="bg-black p-4 h-32 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading commit history...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-blue-200 w-full overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-200 p-2 dark-text font-mono text-sm">
        <span>commit history</span>
        <span>{totalCommits} commits</span>
      </div>

      {/* Commit Grid */}
      <div className="bg-black p-4 relative overflow-x-auto overflow-y-visible">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((commit, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 ${getColor(commit.count)} hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer`}
                  onMouseEnter={() => setHoveredSquare(commit)}
                  onMouseLeave={() => setHoveredSquare(null)}
                  title={`${commit.date}: ${commit.count} commits`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredSquare && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-2 rounded text-xs font-mono whitespace-nowrap border border-blue-400">
            {hoveredSquare.date}: {hoveredSquare.count} commits
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-black border-t-2 border-blue-200 p-2 flex items-center justify-end gap-2 font-mono text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-800" />
          <div className="w-3 h-3 bg-blue-900" />
          <div className="w-3 h-3 bg-blue-600" />
          <div className="w-3 h-3 bg-blue-400" />
          <div className="w-3 h-3 bg-blue-200" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}