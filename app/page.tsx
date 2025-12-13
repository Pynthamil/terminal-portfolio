"use client";

import FaultyTerminal from '../components/FaultyTerminal';

export default function Page() {
  return (
    <main className="space-y-4">
      {/* Hero Section with Terminal */}
      <section 
        className="relative border-4 border-blue-200 h-[480px] lg:h-[600px] w-full overflow-hidden"
        aria-label="Hero section with terminal animation"
      >
        {/* Terminal Background */}
        <div className="absolute inset-0">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#2563eb"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </div>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          {/* Backdrop blur effect */}
          <div 
            className="absolute w-3/5 h-2/5 bg-black/40 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <h1 
            className="relative text-white text-3xl sm:text-4xl md:text-5xl text-center leading-tight font-mono"
            style={{ fontFamily: 'VT323, monospace' }}
          >
            It works on my machine,
            <br />
            please check again
          </h1>
        </div>
      </section>
    </main>
  );
}