import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import img1 from '../public/Group 61.svg';
import img2 from '../public/image 9.svg';
import CmdLine from "@/components/CmdLine";
import CommitHistory from '../components/CommitHistory';

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Terminal-style developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased bg-white`}>
        <div className="border-4 border-blue-200 p-4 max-w-7xl mx-auto my-8">
           <div className="border border-blue-200 bg-blue-200 dark-text font-mono p-2 mb-4">
              My portfolio
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <div className="border-t-4 border-blue-200 p-4 text-xl font-mono" style={{ fontFamily: 'VT323, monospace' }}>
                <p className="mb-2">&gt; Hi, I'm Pynthamil</p>
                <p className="mb-2">&gt; I'm a 3rd year computer science student</p>
                <p className="mb-2">&gt; I'm someone who is very interested in building useless shi..</p>
              </div>
              
              <div className="flex-grow">
                {children}
              </div>
              
              <CmdLine />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <div className="border-4 border-blue-200 font-mono">
                <div className="inline-block bg-blue-200 dark-text px-2 py-1">connected</div>
              </div>
              
              <div className="border-4 border-blue-200 p-2 font-mono text-sm">
                <button className="text-blue-200 flex items-center p-1.5 justify-between py-1 w-full hover:bg-blue-200 hover:text-black transition-colors">
                  <span>available</span>
                  <span>view skills</span>
                </button>
                <button className="text-blue-200 flex items-center p-1.5 justify-between py-1 w-full hover:bg-blue-200 hover:text-black transition-colors">
                  <span>available</span>
                  <span>view projects</span>
                </button>
                <button className="text-blue-200 flex items-center p-1.5 justify-between py-1 w-full hover:bg-blue-200 hover:text-black transition-colors">
                  <span>not available</span>
                  <span>view socials</span>
                </button>
                <button className="flex items-center justify-between p-1.5 w-full dark-text bg-blue-200">
                  <span>available</span>
                  <span>view about</span>
                </button>
                <button className="text-blue-200 flex items-center p-1.5 justify-between py-1 w-full hover:bg-blue-200 hover:text-black transition-colors">
                  <span>available</span>
                  <span>view education</span>
                </button>
              </div>
              
              <CommitHistory username="Pynthamil" />

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