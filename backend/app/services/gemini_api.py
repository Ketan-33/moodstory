import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
print("Loaded GEMINI_API_KEY:", API_KEY)

if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set or empty.")

# ✅ Explicitly configure the client with the API key
genai.configure(api_key=API_KEY)

def generate_story(mood: str, words: str):
    try:
        model = genai.GenerativeModel("gemini-2.5-pro")
        prompt = f"Im providing a persons mood and a list of related words. Just give the story directly. Create a short story to better their mood using them:\nmood: {mood}, words: {words}"
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Gemini API error: {str(e)}"
