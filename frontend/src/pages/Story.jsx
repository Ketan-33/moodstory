import { Mic, MicOff, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScanningAnimation } from "../components/ui/ScanningAnimation";
import "./css/Story.css";
import { useUserContext } from "../context/UserContext";

const Story = () => {
  const [pageState, setPageState] = useState("AUDIO_INPUT");
  const [story, setStory] = useState({ title: "", text: "" });
  const [displayedText, setDisplayedText] = useState([]);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const [stream, setStream] = useState(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [message, setMessage] = useState("Click start to begin capturing");
  const [imageBlob, setImageBlob] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const [question, setQuestion] = useState("How are you feeling today?");
  const audioChunks = useRef([]);


  const {userId} =useUserContext();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => setStream(mediaStream))
      .catch(console.error);
  }, []);


  const handleMicClick = async () => {
    if (!isListening) {
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(blob);
        // proceed to scanning
        startCapture();
        setPageState("SCANNING");
      };

      mediaRecorder.start();
      setIsListening(true);

      // auto stop after 4 seconds
      setTimeout(() => {
        mediaRecorder.stop();
        setIsListening(false);
      }, 4000);
    }
  };

  async function startCapture() {
    setMessage("Starting webcam...");
    setIsCapturing(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setMessage("Capturing frame...");
      captureFrames(stream);
    } catch (err) {
      console.error("Camera error:", err);
      setMessage("Error: Unable to access webcam");
      setIsCapturing(false);
    }
  }

  async function captureFrames(stream) {
    const delay = 1000;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !video) {
      console.error("Canvas or video not ready");
      return;
    }

    const ctx = canvas.getContext("2d");
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Video not ready to capture frame");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.9));
    if (!blob) return;

    setImageBlob(blob);
    setMessage("✅ Captured image and stopped webcam");
    setIsCapturing(false);
  }

  // -----------------------------
  // 📤 Handle Story Generation
  // -----------------------------
  useEffect(() => {
    if (pageState === "STORY_GENERATION") {
      const generateStory = async () => {
        try {
          const result = await handleSubmit();
          if (result && (result.title || result.body)) {
            setStory({
              title: result.title || "Untitled Story",
              text: result.body || "",
            });
            setDisplayedText([]);
            setTypewriterIndex(0);
            setPageState("STORY_DISPLAY");
          } else {
            console.error("Invalid response format from /generate-story:", result);
            setPageState("AUDIO_INPUT");
          }
        } catch (err) {
          console.error("Error generating story:", err);
          setPageState("AUDIO_INPUT");
        }
      };
      generateStory();
    }
  }, [pageState]);

  useEffect(() => {
    if (pageState !== "STORY_DISPLAY" || !story.text) return;

    const words = story.text.split(" ");
    let index = 0;
    setDisplayedText([]);

    const typeNext = () => {
      if (index < words.length) {
        setDisplayedText((prev) => [...prev, { word: words[index], id: index }]);
        index++;
        const delay = 180 + Math.random() * 60;
        setTimeout(typeNext, delay);
      }
    };
    typeNext();
  }, [story.text, pageState]);

  const handleSubmit = async () => {
    if (!imageBlob || !audioBlob) {
      console.error("Missing blobs:", { imageBlob, audioBlob });
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageBlob, "face1.jpg");
    formData.append("audio", audioBlob, "input.wav");
    formData.append("userId",userId );


    try {
      const response = await fetch("http://127.0.0.1:8000/generate-story", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStory({
          title: result.title || "Untitled Story",
          text: result.body || "No story content available.",
        });
        console.log(result)
        return result;
      } else {
        console.error("Upload failed:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  // -----------------------------
  // 🎨 UI Rendering
  // -----------------------------
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black font-sans">
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 🎤 AUDIO INPUT PAGE */}
      {pageState === "AUDIO_INPUT" && (
        <div className="bg-gradient-to-br from-purple-900 to-black w-full h-full flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-4xl mb-12 font-semibold tracking-wider">
            {question}
          </h1>
          <div
            className={`relative flex items-center justify-center w-48 h-48 rounded-full transition-all duration-300 ${isListening ? "animate-pulse-mic bg-pink-600/30" : "bg-pink-600/10"
              }`}
          >
            <button
              onClick={handleMicClick}
              className="p-8 bg-pink-600 rounded-full hover:bg-pink-700 transition-all"
            >
              <Mic className="w-16 h-16 text-white" />
            </button>
            {isListening && (
              <div className="absolute animate-speak-wave rounded-full border-4 border-pink-500 w-64 h-64 opacity-70" />
            )}
          </div>
          <p className="mt-10 text-lg text-gray-300">
            {isListening ? "Listening..." : "Tap the mic to start speaking"}
          </p>
        </div>
      )}

      {/* 📸 SCANNING PAGE */}
      {pageState === "SCANNING" && (
        <div className="w-full h-full flex items-center justify-center relative">
          <video
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            ref={(videoEl) => {
              videoRef.current = videoEl;
              if (videoEl && stream) videoEl.srcObject = stream;
            }}
          />
          <div className="absolute inset-0">
            <ScanningAnimation onComplete={() => setPageState("STORY_GENERATION")} />
          </div>
        </div>
      )}

      {/* 🧠 STORY GENERATION PAGE */}
      {pageState === "STORY_GENERATION" && (
        <div className="bg-gradient-to-br from-pink-900 to-purple-700 w-full h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl mb-12 animate-pulse">
            Generating your story...
          </h2>
          <div className="flex items-center justify-center h-24 w-64 space-x-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="siri-wave-bar" style={{ animationDelay: `${-0.2 * i}s` }}></div>
            ))}
          </div>
        </div>
      )}

      {/* 📖 STORY DISPLAY PAGE */}
      {pageState === "STORY_DISPLAY" && (
        <div className="bg-gradient-to-br from-black to-purple-900 w-full h-full text-white flex flex-col items-center relative p-6 pt-24 overflow-y-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            {story.title}
          </h1>
          <p className="max-w-4xl text-lg text-left text-justify leading-relaxed whitespace-pre-wrap">
            {displayedText.map(({ word, id }) => (
              <span key={id} className="ai-word">
                {word}{" "}
              </span>
            ))}
          </p>

          {previewVisible && stream && (
            <video
              autoPlay
              playsInline
              muted
              className="fixed bottom-24 right-6 w-48 h-32 rounded-lg border-2 border-pink-500 shadow-lg object-cover"
              ref={(videoEl) => {
                if (videoEl) videoEl.srcObject = stream;
              }}
            />
          )}

          <div className="fixed bottom-6 right-6 flex gap-4">
            <button
              onClick={() => {
                if (stream)
                  stream
                    .getAudioTracks()
                    .forEach((track) => (track.enabled = !micEnabled));
                setMicEnabled(!micEnabled);
              }}
              className="p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
            >
              {micEnabled ? (
                <Mic className="w-6 h-6 text-green-400" />
              ) : (
                <MicOff className="w-6 h-6 text-red-500" />
              )}
            </button>
            <button
              onClick={() => setPreviewVisible(!previewVisible)}
              className="p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
            >
              <Video className="w-6 h-6 text-pink-500 animate-slow-glow" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Story;

