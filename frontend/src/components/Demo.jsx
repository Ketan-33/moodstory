import React, { useEffect, useRef, useState } from "react";
import audio1 from "../assets/test.wav";
export default function AutoWebcamCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [message, setMessage] = useState("Click start to begin capturing");

  const [imageBlob, setImageBlob] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);



  async function startCapture() {
    setMessage("Starting webcam...");
    setIsCapturing(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setMessage("Capturing 5 frames...");
      captureFrames(stream);
    } catch (err) {
      console.error("Camera error:", err);
      setMessage("Error: Unable to access webcam");
      setIsCapturing(false);
    }
  }

  async function captureFrames(stream) {
    const delay = 1000; // 1 second
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");


    await new Promise((resolve) => setTimeout(resolve, delay));

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.9));
    console.log(blob);
    setImageBlob(blob);

    // stopWebcam(stream);
    setMessage("✅ Captured images and stopped webcam");
    setIsCapturing(false);
  }

  function stopWebcam(stream) {
    stream.getTracks().forEach((track) => track.stop());
  }


  useEffect(() => {
    const fetchFileAsBlob = async (fileUrl) => {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      return blob;
    };

    const loadFiles = async () => {
      const audioBlob = await fetchFileAsBlob(audio1);
      setAudioBlob(audioBlob);
    };

    loadFiles();
  }, []);

  const handleSubmit = async () => {
    // Create a FormData object
    console.log("Fetching...");

    const formData = new FormData();
    formData.append('image', imageBlob, 'face1.jpg');
    formData.append('audio', audioBlob, 'test.wav');
    // Manually log the FormData contents (use FormData.entries to inspect)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Make the API call
    try {
      const response = await fetch('http://127.0.0.1:8000/generate-story', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload success:', result);
      } else {
        console.error('Upload failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {

      console.log("OKKKKKKK...");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Webcam Auto Capture (5 seconds)</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "60%", borderRadius: "10px", border: "2px solid #ccc" }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startCapture}
          disabled={isCapturing}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: isCapturing ? "#aaa" : "#4CAF50",
            color: "white",
            border: "none",
            cursor: isCapturing ? "not-allowed" : "pointer",
          }}
        >
          {isCapturing ? "Capturing..." : "Start Capture"}
        </button>
        <button onClick={handleSubmit}>
          Fetch
        </button>
      </div>

      <p style={{ marginTop: "15px", fontSize: "16px" }}>{message}</p>
    </div>
  );
}