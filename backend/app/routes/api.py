from app.services.gemini_api import generate_story
from app.services.lstm_model import generate_words
from app.services.mood_detector import detect_mood
from fastapi import APIRouter, File, UploadFile,Form

router = APIRouter()

@router.post("/generate-story")
async def generate_story_endpoint(    
    image: UploadFile = File(...),
    audio: UploadFile = File(...),
    userId: str = Form(...),
    genre: str = Form("any")):
    # Save files
    img_path = f"uploads/{image.filename}"
    audio_path = f"uploads/{audio.filename}"
    
    with open(img_path, "wb") as f:
        f.write(await image.read())
    
    with open(audio_path, "wb") as f:
        f.write(await audio.read())

    # Dummy steps
    mood, amood, imood = detect_mood(img_path, audio_path)
    words = generate_words(mood)
    story = generate_story(mood, words)

    story_lines = story.split("\n", 1)  # split at the first newline
    title = story_lines[0].strip() if len(story_lines) > 0 else ""
    body = story_lines[1].strip() if len(story_lines) > 1 else ""
    
    return {
        "mood": mood,
        "audioMood": amood,
        "imageMood": imood,
        "words": words,
        "title": title,
        "body": body,
        "userId":userId
    }
