from app.services.gemini_api import generate_story
from app.services.lstm_model import generate_words
from app.services.mood_detector import detect_mood
from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.post("/generate-story")
async def generate_story_endpoint(image: UploadFile = File(...), audio: UploadFile = File(...)):
    # Save files
    img_path = f"uploads/{image.filename}"
    audio_path = f"uploads/{audio.filename}"
    
    with open(img_path, "wb") as f:
        f.write(await image.read())
    
    with open(audio_path, "wb") as f:
        f.write(await audio.read())

    # Dummy steps
    mood = detect_mood(img_path, audio_path)
    words = generate_words(mood)
    story = generate_story(mood, words)

    return {
        "mood": mood,
        "words": words,
        "story": story
    }
