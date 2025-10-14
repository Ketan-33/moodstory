import { MagnifyingGlassIcon } from "./MagnifyingGlassIcon";
import { MoodIcon } from "./MoodIcon";
import faceScan from "../../assets/faceScan.png";
import { useEffect, useState } from "react";
const scanningSteps = [
  {
    text: "Extracting facial features",
    duration: 4000,
    icon: (
      <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
        <img
          src={faceScan}
          alt="Face Scan"
          className="w-12 h-12 object-contain"
        />
        {/* Oscillating scan line overlay */}
        <div className="absolute inset-0">
          <div className="absolute left-0 w-full h-0.5 rounded-full bg-purple-500 shadow-[0_0_8px_#9C27B0] animate-oscillate-scan-line" />
        </div>
      </div>
    ),
  },
  { text: "Analyzing biometric data", duration: 4000, icon: <MagnifyingGlassIcon /> },
  { text: "Detecting mood patterns", duration: 5000, icon: <MoodIcon /> },
];


export const ScanningAnimation = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= scanningSteps.length) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setStepIndex(prev => prev + 1);
    }, scanningSteps[stepIndex].duration);

    return () => clearTimeout(timer);
  }, [stepIndex, onComplete]);

  const currentStep = scanningSteps[stepIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-end relative text-white bg-black/60 pb-20 pointer-events-none">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/70 rounded-full animate-dot-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {currentStep && (
        <div key={stepIndex} className="relative z-10 flex items-center justify-center space-x-4 bg-black/20 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10 animate-fade-in-long">
          <div className="w-12 h-12 flex items-center justify-center">
            {currentStep.icon}
          </div>
          <p className="text-xl font-semibold tracking-wider text-left w-64">{currentStep.text}</p>
        </div>
      )}
    </div>
  );
};

