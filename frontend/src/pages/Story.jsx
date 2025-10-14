import { useEffect, useState, useRef } from "react";
import { Mic, MicOff, Video } from "lucide-react";
import { ScanningAnimation } from "../components/ui/ScanningAnimation";
import "./css/Story.css"
const genres = ["Adventure", "Fantasy", "Mystery", "Sci-Fi", "Comedy"];

const Story = () => {
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

    </div>
  );
};

export default Story
