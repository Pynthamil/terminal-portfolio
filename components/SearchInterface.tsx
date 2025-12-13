"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState('hobbies');
  const [activeTab, setActiveTab] = useState('www.google.com');

  const tabs = ['www.google.com', 'www.naver.com', 'help menu'];

  const allSearchResults = {
    'hobbies': [
      {
        site: 'goodreads.com',
        title: 'Reading',
        description: 'I\'ve always loved reading fantasy novels. Exploring fictional worlds, following complex characters, and getting lost in imaginative stories is something I truly enjoy during my free time …'
      },
      {
        site: 'netflix.com',
        title: 'Binge Watching',
        description: 'I love binge watching movies and series in my free time. Discovering new stories, characters, and genres helps me relax and unwind …'
      },
      {
        site: 'spotify.com',
        title: 'Music',
        description: 'Listening to music is one of my favorite ways to relax. I enjoy exploring different genres and letting music set the mood while I work or rest …'
      },
      {
        site: 'medium.com',
        title: 'Writing',
        description: 'I enjoy writing as a way to express my thoughts and ideas. Whether it\'s journaling or creative writing, it helps me think clearly and creatively …'
      },
      {
        site: 'github.com',
        title: 'Coding',
        description: 'Coding is both my passion and hobby. I enjoy building projects, learning new technologies, and experimenting with ideas through code …'
      }
    ],
    'goals': [
      {
        site: 'linkedin.com',
        title: 'Career Goals',
        description: 'Building a successful career in tech, continuously learning new skills, and making meaningful contributions to innovative projects …'
      },
      {
        site: 'goals.com',
        title: 'Personal Development',
        description: 'Focusing on personal growth, maintaining work-life balance, and achieving both professional and personal milestones …'
      }
    ],
    'my fav tech stack': [
      {
        site: 'react.dev',
        title: 'React',
        description: 'My go-to frontend library for building modern, interactive user interfaces with component-based architecture …'
      },
      {
        site: 'nextjs.org',
        title: 'Next.js',
        description: 'The React framework I prefer for full-stack applications, offering server-side rendering and excellent developer experience …'
      },
      {
        site: 'tailwindcss.com',
        title: 'Tailwind CSS',
        description: 'My favorite utility-first CSS framework for rapidly building custom designs with clean, maintainable code …'
      },
      {
        site: 'nodejs.org',
        title: 'Node.js',
        description: 'The runtime I use for backend development, enabling JavaScript everywhere and great ecosystem support …'
      }
    ],
    'fav cartoons': [
      {
        site: 'imdb.com',
        title: 'Avatar: The Last Airbender',
        description: 'An incredible animated series with amazing world-building, character development, and storytelling …'
      },
      {
        site: 'cartoon.com',
        title: 'Classic Cartoons',
        description: 'Growing up with timeless animated shows that shaped childhood memories and continue to bring joy …'
      }
    ],
    'fav movies': [
      {
        site: 'imdb.com',
        title: 'The Shawshank Redemption',
        description: 'A powerful story about hope, friendship, and perseverance that never gets old …'
      },
      {
        site: 'rottentomatoes.com',
        title: 'Inception',
        description: 'A mind-bending thriller that keeps you thinking long after the credits roll …'
      },
      {
        site: 'letterboxd.com',
        title: 'Interstellar',
        description: 'An epic space adventure exploring time, love, and the survival of humanity …'
      }
    ],
    'fav books': [
      {
        site: 'goodreads.com',
        title: 'The Lord of the Rings',
        description: 'An epic fantasy trilogy that set the standard for the genre with its rich world and unforgettable characters …'
      },
      {
        site: 'amazon.com',
        title: 'Harry Potter Series',
        description: 'A magical journey through Hogwarts that captivated millions and redefined young adult literature …'
      },
      {
        site: 'bookshop.org',
        title: 'Fiction Favorites',
        description: 'A collection of novels that have left lasting impressions through their storytelling and themes …'
      }
    ],
    'other things': [
      {
        site: 'medium.com',
        title: 'Photography',
        description: 'Capturing moments and exploring creative perspectives through the lens …'
      },
      {
        site: 'youtube.com',
        title: 'Learning New Skills',
        description: 'Always curious and eager to explore new hobbies, technologies, and creative pursuits …'
      },
      {
        site: 'travel.com',
        title: 'Travel & Exploration',
        description: 'Discovering new places, cultures, and experiences that broaden perspectives …'
      }
    ]
  };

  const getSearchResults = () => {
    const query = searchQuery.toLowerCase().trim();
    
    // Show help menu content when help menu tab is active
    if (activeTab === 'help menu') {
      return [
        {
          site: 'help.search.com',
          title: 'Available Search Queries',
          description: 'Type any of these keywords in the search bar to explore different topics: hobbies, goals, my fav tech stack, fav cartoons, fav movies, fav books, other things'
        },
        {
          site: 'guide.search.com',
          title: 'How to Use',
          description: 'Simply type one of the search queries above and press Enter or just type to see the results instantly. Each query reveals different aspects of my interests and activities.'
        },
        {
          site: 'tips.search.com',
          title: 'Quick Tips',
          description: 'Search queries are case-insensitive and you can explore different tabs to see various search engines. Try searching for "hobbies" to see what I enjoy doing in my free time!'
        }
      ];
    }
    
    return allSearchResults[query] || [];
  };

  const currentResults = getSearchResults();

  return (
    <div className="w-full bg-black flex flex-col">
      {/* Browser Chrome */}
      <div className="bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 px-4 pt-3 pb-2 flex-shrink-0">
        {/* Tabs */}
        <div className="flex gap-0.5 mb-2">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="relative"
            >
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm transition-colors relative ${
                  activeTab === tab
                    ? 'bg-white text-gray-800'
                    : 'bg-blue-300 text-gray-700 hover:bg-blue-250'
                }`}
                style={{
                  clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 100%, 0% 100%)',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              >
                {tab}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-800 text-sm px-2"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 min-h-[490px] max-h-[490px] overflow-y-auto bg-black border-4 border-blue-200 px-6 py-8">
        <div className="max-w-3xl">
          {/* Google Logo */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-400">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </h1>
          </div>

          {/* Results */}
          {currentResults.length > 0 ? (
            <div className="space-y-8">
              {currentResults.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-gray-400 text-sm">{result.site}</div>
                  <h2 className="text-xl text-blue-400 hover:underline cursor-pointer font-normal">
                    {result.title}
                  </h2>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              No results found for "{searchQuery}". Try searching for: hobbies, goals, my fav tech stack, fav cartoons, fav movies, fav books, or other things.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}