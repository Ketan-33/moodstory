from models.CNNMoodDetection.model import CNNMoodDetector
from models.LibrosaMoodDetect.model import AudioMoodDetector

def detect_mood(image_path, audio_path=None):
    # Mood from Image
    mood_detector = CNNMoodDetector()
    imood, iconfidence = mood_detector.predict_emotion(image_path)
    
    # TODO: Mood from Audio
    audio_mood_detector = AudioMoodDetector()
    agender, amood, aconfidence, apreds = audio_mood_detector.predict_mood(audio_path)

    # TODO: Combine moods
    mood = imood if iconfidence > aconfidence else amood

    return mood
