import React, { useRef, useEffect } from "react";

const MediaCapture = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    const startMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    startMedia();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // empty deps → run only once

  return (
    <div>
      <h2>Live Camera & Microphone</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "400px", borderRadius: "12px" }}
      />
    </div>
  );
};

export default MediaCapture;
