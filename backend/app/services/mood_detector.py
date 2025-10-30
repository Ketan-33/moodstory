from models.CNNMoodDetection.model import CNNMoodDetector
from models.LibrosaMoodDetect.model import AudioMoodDetector

def fusion_mood_detect(image_path, audio_path=None):
    mood_detector = CNNMoodDetector()
    imood, iconf = mood_detector.predict_emotion(image_path)

    audio_mood_detector = AudioMoodDetector()
    agender, amood, aconf, apreds = audio_mood_detector.predict_mood(audio_path)

    moods = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

    # matrix only for conflicting cases
    fusion_matrix = {
        ('angry', 'sad'): 'angry',
        ('happy', 'neutral'): 'happy',
        ('sad', 'neutral'): 'sad',
        ('fear', 'angry'): 'fear',
        ('happy', 'surprise'): 'happy',
        ('angry', 'disgust'): 'angry',
        ('disgust', 'sad'): 'disgust',
        ('neutral', 'surprise'): 'surprise',
    }

    # Case 1: same emotion → easy
    if imood == amood:
        mood = imood

    # Case 2: strong confidence gap
    elif abs(iconf - aconf) > 0.25:
        mood = imood if iconf > aconf else amood

    # Case 3: conflict resolution via matrix
    elif (imood, amood) in fusion_matrix:
        mood = fusion_matrix[(imood, amood)]
    elif (amood, imood) in fusion_matrix:
        mood = fusion_matrix[(amood, imood)]

    # Case 4: fallback (weighted confidence)
    else:
        mood = imood if iconf >= aconf else amood

    return mood, amood, imood
