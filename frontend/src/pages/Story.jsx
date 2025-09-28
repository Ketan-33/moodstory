import React, { useEffect, useState, useRef } from "react";
import { Mic, MicOff, Video, Smile, Frown, Meh, Laugh, Search } from "lucide-react";
import faceScan from "../assets/faceScan.png";

const genres = ["Adventure", "Fantasy", "Mystery", "Sci-Fi", "Comedy"];

const FaceScanIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <svg className="w-11 h-11 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ clipPath: 'url(#faceClipPath)' }}>
      <defs>
        <clipPath id="faceClipPath">
          <path d="M12 2a10 10 0 0 0-9.8 11.2c.2.6.4 1.2.7 1.8.3.6.7 1.2 1.1 1.7.5.6 1 1.1 1.6 1.5a10 10 0 1 0 12.8 0c.6-.4 1.1-.9 1.6-1.5.4-.5.8-1.1 1.1-1.7.3-.6.5-1.2.7-1.8A10 10 0 0 0 12 2Z" />
        </clipPath>
      </defs>
      <path d="M12 2a10 10 0 0 0-9.8 11.2c.2.6.4 1.2.7 1.8.3.6.7 1.2 1.1 1.7.5.6 1 1.1 1.6 1.5a10 10 0 1 0 12.8 0c.6-.4 1.1-.9 1.6-1.5.4-.5.8-1.1 1.1-1.7.3-.6.5-1.2.7-1.8A10 10 0 0 0 12 2Z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
      <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-300/70 shadow-[0_0_8px_#0ff] animate-oscillate-scan-line" />
    </svg>
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute w-full h-0.5 bg-cyan-300/70 shadow-[0_0_8px_#0ff] animate-oscillate-scan-line" style={{ clipPath: 'url(#faceClipPath)' }} />
    </div>
  </div>
);

const MagnifyingGlassIcon = () => (
  <div className="w-12 h-12 flex items-center justify-center">
    <div className="relative w-10 h-10 animate-magnify-search">
      <Search className="w-full h-full text-cyan-300" strokeWidth={1.5} />
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
        <div className="w-8 h-2 bg-white/50 rotate-45 animate-magnify-glint"></div>
      </div>
    </div>
  </div>
);

const MoodIcon = () => {
  const moods = [
    <Smile key="smile" className="w-10 h-10 text-cyan-300 absolute" strokeWidth={1.5} />,
    <Frown key="frown" className="w-10 h-10 text-cyan-300 absolute" strokeWidth={1.5} />,
    <Meh key="meh" className="w-10 h-10 text-cyan-300 absolute" strokeWidth={1.5} />,
    <Laugh key="laugh" className="w-10 h-10 text-cyan-300 absolute" strokeWidth={1.5} />,
  ];
  const [moodIndex, setMoodIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoodIndex(prev => (prev + 1) % moods.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [moods.length]);

  return (
    <div className="relative w-10 h-10">
      {moods.map((mood, index) => (
        <div
          key={index}
          className={`transition-opacity duration-500 absolute ${index === moodIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          {mood}
        </div>
      ))}
    </div>
  );
};

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




const ScanningAnimation = ({ onComplete }) => {
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


const App = () => {
  const [pageState, setPageState] = useState('GENRE_SELECTION');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [story, setStory] = useState({ title: "", text: "" });
  const [displayedText, setDisplayedText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const [stream, setStream] = useState(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => setStream(mediaStream))
      .catch(console.error);
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPageState('SCANNING');
  };

  useEffect(() => {
    if (pageState === 'STORY_GENERATION') {
      setTimeout(() => {
        setStory({
          title: `The ${selectedGenre} Chronicle`,
          text: `In a realm woven from threads of ${selectedGenre.toLowerCase()}, a new tale begins. It speaks of ancient prophecies and forgotten kingdoms, where heroes are forged in the crucible of fate. Our story centers on a lone wanderer, whose destiny is intertwined with the very fabric of this world...`
        });
        setPageState('STORY_DISPLAY');
      }, 2000);
    }
  }, [pageState, selectedGenre]);

  useEffect(() => {
    if (pageState !== 'STORY_DISPLAY' || !story.text) return;
    if (typewriterIndex < story.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + story.text[typewriterIndex]);
        setTypewriterIndex(typewriterIndex + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [typewriterIndex, story.text, pageState]);

  const toggleMic = () => {
    if (stream) stream.getAudioTracks().forEach(track => (track.enabled = !micEnabled));
    setMicEnabled(!micEnabled);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black font-sans">

      {pageState === 'GENRE_SELECTION' && (
        <div className="bg-gradient-to-br from-purple-900 to-black w-full h-full flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl md:text-5xl mb-8 font-bold tracking-wider">Choose a Story Genre</h1>
          <div className="flex gap-4 flex-wrap justify-center">
            {genres.map((g) => (
              <button key={g} className="px-6 py-3 bg-pink-500 rounded-full hover:bg-pink-600 transition-all duration-300 text-lg font-semibold" onClick={() => handleGenreSelect(g)}>
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {pageState === 'SCANNING' && (
        <div className="w-full h-full flex items-center justify-center relative">
          <video autoPlay playsInline muted className="w-full h-full object-cover" ref={(videoEl) => { videoRef.current = videoEl; if (videoEl && stream) videoEl.srcObject = stream; }} />
          <div className="absolute inset-0">
            <ScanningAnimation onComplete={() => setPageState('STORY_GENERATION')} />
          </div>
        </div>
      )}

      {pageState === 'STORY_GENERATION' && (
        <div className="bg-gradient-to-br from-pink-900 to-purple-700 w-full h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl mb-12 animate-pulse">Generating your {selectedGenre} story...</h2>
          <div className="flex items-center justify-center h-24 w-64 space-x-2">
            <div className="siri-wave-bar" style={{ animationDelay: '-0.4s' }}></div>
            <div className="siri-wave-bar" style={{ animationDelay: '-0.2s' }}></div>
            <div className="siri-wave-bar" style={{ animationDelay: '-0.6s' }}></div>
            <div className="siri-wave-bar" style={{ animationDelay: '0s' }}></div>
            <div className="siri-wave-bar" style={{ animationDelay: '-0.7s' }}></div>
            <div className="siri-wave-bar" style={{ animationDelay: '-0.3s' }}></div>
            <div className="siri-wave-bar" style={{ animationDelay: '-0.5s' }}></div>
          </div>
        </div>
      )}

      {pageState === 'STORY_DISPLAY' && (
        <div className="bg-gradient-to-br from-black to-purple-900 w-full h-full text-white flex flex-col items-center relative p-6 pt-24 overflow-y-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">{story.title}</h1>
          <p className="max-w-4xl text-lg text-left md:text-center leading-relaxed whitespace-pre-wrap">{displayedText}</p>
          {previewVisible && stream && (
            <video autoPlay playsInline muted className="absolute bottom-24 right-6 w-48 h-32 rounded-lg border-2 border-pink-500 shadow-lg object-cover" ref={(videoEl) => { if (videoEl) videoEl.srcObject = stream; }} />
          )}
          <div className="absolute bottom-6 right-6 flex gap-4">
            <button onClick={toggleMic} className="p-3 rounded-full bg-black/40 hover:bg-black/60 transition">
              {micEnabled ? <Mic className="w-6 h-6 text-green-400" /> : <MicOff className="w-6 h-6 text-red-500" />}
            </button>
            <button onClick={() => setPreviewVisible(!previewVisible)} className="p-3 rounded-full bg-black/40 hover:bg-black/60 transition">
              <Video className="w-6 h-6 text-pink-500 animate-slow-glow" />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in-long { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-long { animation: fade-in-long 1s ease-in-out forwards; }
        
        @keyframes slow-glow { 0%, 100% { filter: drop-shadow(0 0 2px currentColor); } 50% { filter: drop-shadow(0 0 5px currentColor); } }
        .animate-slow-glow { animation: slow-glow 2s ease-in-out infinite; }
        
        @keyframes siri-wave { 0%, 100% { transform: scaleY(0.1); } 50% { transform: scaleY(1); } }
        .siri-wave-bar { width: 12px; height: 100%; border-radius: 9999px; background-image: linear-gradient(to top, #ec4899, #d946ef, #8b5cf6); animation: siri-wave 1.5s ease-in-out infinite; }
        
        @keyframes dot-pulse { 0%, 100% { transform: scale(0.5); opacity: 0.5; } 50% { transform: scale(1); opacity: 1; } }
        .animate-dot-pulse { animation: dot-pulse 2s ease-in-out infinite alternate; }

@keyframes oscillate-scan-line {
  0%   { top: 0%; }
  50%  { top: 100%; }
  100% { top: 0%; }
}

.animate-oscillate-scan-line {
  animation: oscillate-scan-line 2s ease-in-out infinite;
}

        
        @keyframes magnify-search {
          0% { transform: translate(-10px, -5px) rotate(-25deg) scale(1); }
          50% { transform: translate(10px, 5px) rotate(25deg) scale(1.1); }
          100% { transform: translate(-10px, -5px) rotate(-25deg) scale(1); }
        }
        .animate-magnify-search { animation: magnify-search 3s ease-in-out infinite; }

        @keyframes magnify-glint {
            0% { transform: translate(-30px, -10px) rotate(45deg); }
            100% { transform: translate(30px, 10px) rotate(45deg); }
        }
        .animate-magnify-glint { animation: magnify-glint 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;

