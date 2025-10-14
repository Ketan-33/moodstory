import os
from model import AudioMoodDetector

TEST_AUDIO_PATH = os.path.join(os.path.dirname(__file__), "joyfully.wav")

if __name__ == "__main__":
    detector = AudioMoodDetector()
    gender, mood, confidence, raw_output = detector.predict_mood(TEST_AUDIO_PATH)
    print(f"Predicted gender: {gender}")
    print(f"Predicted mood: {mood}")
    print(f"Confidence: {confidence}")
    print(f"Raw model output: {raw_output}")
