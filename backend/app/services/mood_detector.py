from models.CNNMoodDetection.model import CNNMoodDetector


def detect_mood(image_path, audio_path=None):
    # Mood from Image
    mood_detector = CNNMoodDetector()
    imood, iconfidence = mood_detector.predict_emotion(image_path)
    
    # TODO: Mood from Audio
    # amood = "happy"
    
    # TODO: Combine moods
    mood = imood # change to iconfidence > aconfidence ? imood : amood after audio model is done
    
    return mood
