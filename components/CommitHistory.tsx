"use client"

import { useState, useEffect } from 'react';

export default function CommitHistory({ username = "Pynthamil" }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);

  useEffect(() => {
    fetchGitHubContributions();
  }, [username]);

  const fetchGitHubContributions = async () => {
    try {
      setLoading(true);
      
      // GitHub API to fetch user events (last 90 days of public activity)
      const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
      }

      const events = await response.json();
      
      // Process events to count commits per day
      const commitsByDate = {};
      
      events.forEach(event => {
        if (event.type === 'PushEvent') {
          const date = new Date(event.created_at).toLocaleDateString();
          commitsByDate[date] = (commitsByDate[date] || 0) + event.payload.commits.length;
        }
      });

      // Generate 365 days of data
      const commitsArray = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toLocaleDateString();
        
        commitsArray.push({
          date: dateString,
          count: commitsByDate[dateString] || 0,
          dayOfWeek: date.getDay(),
          weekIndex: Math.floor((364 - i) / 7)
        });
      }

      setCommits(commitsArray);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      setCommits(generateMockCommits());
      setLoading(false);
    }
  };

  // Fallback mock data generator
  const generateMockCommits = () => {
    const commits = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 11);
      
      commits.push({
        date: date.toLocaleDateString(),
        count,
        dayOfWeek: date.getDay(),
        weekIndex: Math.floor((364 - i) / 7)
      });
    }
    return commits;
  };

  // Calculate total commits
  const totalCommits = commits.reduce((sum, commit) => sum + commit.count, 0);

  // Get color based on commit count
  const getColor = (count) => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 2) return 'bg-blue-900';
    if (count <= 5) return 'bg-blue-600';
    if (count <= 8) return 'bg-blue-400';
    return 'bg-blue-200';
  };

  // Group commits by week
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    weeks.push(commits.filter(c => c.weekIndex === i));
  }

  if (loading) {
    return (
      <div className="border-4 border-blue-200 w-full">
        <div className="flex items-center justify-between bg-blue-200 p-2 font-mono text-sm">
          <span>commit history</span>
          <span>loading...</span>
        </div>
        <div className="bg-black p-4 h-32 flex items-center justify-center">
          <div className="text-blue-400 font-mono text-sm">Fetching GitHub data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-blue-200 w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-200 dark-text p-2 font-mono text-sm">
        <span>commit history</span>
        <span>{totalCommits} commits</span>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-black border-b-2 border-blue-200 p-2 text-yellow-400 font-mono text-xs">
          ⚠ API limit reached, showing mock data
        </div>
      )}

      {/* Commit Grid */}
      <div className="bg-black p-4 relative overflow-x-auto">
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((commit, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 ${getColor(commit.count)} hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer flex-shrink-0`}
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
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-2 rounded text-xs font-mono whitespace-nowrap border border-blue-400 z-10">
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