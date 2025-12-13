
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

import img1 from "../public/Group 61.svg";
import img2 from "../public/image 9.svg";
import Folder from '../components/Folder';

import CmdLine from "@/components/CmdLine";
import CommitHistory from "../components/CommitHistory";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Terminal-style developer portfolio",
};


const SOCIAL_LINKS = [
  { icon: Folder, label: 'Medium Blogs', href: '/blogs' },
  { icon: Folder, label: 'YouTube Channel', href: '/youtube' },
  { icon: Folder, label: 'Instagram', href: '/instagram' },
] as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <div className="portfolio-scaled border-4 border-blue-200 p-4 max-w-7xl mx-auto my-8">
          
          {/* Header */}
          <div className="border border-blue-200 bg-blue-200 dark-text font-mono p-2 mb-4">
            My portfolio
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              <div
                className="border-t-4 border-blue-200 p-4 text-xl font-mono"
                style={{ fontFamily: "VT323, monospace" }}
              >
                <p className="mb-2">&gt; Hi, I'm Pynthamil</p>
                <p className="mb-2">&gt; I'm a 3rd year computer science student</p>
                <p className="mb-2">
                  &gt; I'm someone who is very interested in building useless shi..
                </p>
              </div>

              <div className="flex-grow">{children}</div>

              {/* Social Links Section */}
              <nav 
                className="border-4 border-blue-200 p-5"
                aria-label="Social media links"
              >
                <ul className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {SOCIAL_LINKS.map(({ icon, label, href }) => (
                    <li key={label} className="m-3">
                      <a 
                        href={href}
                        className="flex flex-col items-center gap-2 transition-opacity focus:outline-none focus:ring-2 rounded p-2"
                        aria-label={`Visit ${label}`}
                      >
                        <div style={{ height: '80px', position: 'relative' }}>
                          <Folder size={1} color="#93c5fd" className="custom-folder" />
                          <span className="text-center text-sm sm:text-base">
                            {label}
                          </span>
                        </div>
                      
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <CmdLine />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">

              {/* Status */}
              <div className="border-4 border-blue-200 font-mono">
                <div className="inline-block bg-blue-200 dark-text px-2 py-1">
                  connected
                </div>
              </div>

              {/* Navigation */}
              <div className="border-4 border-blue-200 p-2 font-mono text-sm">

                <Link
                  href="/skills"
                  className="text-blue-200 flex items-center justify-between p-1.5 w-full hover:bg-blue-400 hover:text-black transition-colors"
                >
                  <span>available</span>
                  <span>view skills</span>
                </Link>

                <Link
                  href="/projects"
                  className="text-blue-200 flex items-center justify-between p-1.5 w-full hover:bg-blue-400 hover:text-black transition-colors"
                >
                  <span>available</span>
                  <span>view projects</span>
                </Link>

                <Link
                  href="/contact"
                  className="text-blue-200 flex items-center justify-between p-1.5 w-full hover:bg-blue-400 hover:text-black transition-colors"
                >
                  <span>available</span>
                  <span>view socials</span>
                </Link>

                <Link
                  href="/about"
                  className="flex items-center justify-between p-1.5 w-full dark-text bg-blue-200"
                >
                  <span>available</span>
                  <span>view about</span>
                </Link>

                <Link
                  href="/education"
                  className="text-blue-200 flex items-center justify-between p-1.5 w-full hover:bg-blue-400 hover:text-black transition-colors"
                >
                  <span>available</span>
                  <span>view education</span>
                </Link>

              </div>

              <CommitHistory />

              {/* Footer status */}
              <div className="border-4 border-blue-200 px-2 py-1 flex items-center justify-between">
                <Image
                  src={img1}
                  width={200}
                  height={40}
                  alt="Status indicator"
                  className="h-auto w-auto max-w-[200px]"
                />
                <div className="font-mono text-sm">searching</div>
              </div>

              <div className="border-4 border-blue-200 overflow-hidden">
                <Image
                  src={img2}
                  alt="Portfolio graphic"
                  className="w-full h-auto"
                />
              </div>

            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
