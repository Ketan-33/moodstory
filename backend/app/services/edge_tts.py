import edge_tts
import os
import asyncio

async def generate_voice(script: str, index: int = 0):
    if not script or script.strip() == "":
        raise ValueError("Script cannot be empty or whitespace.")

    os.makedirs("output", exist_ok=True)
    output_path = f"output/audio_{index}.mp3"
    voice = "en-US-JennyNeural"
    print(f"🎙 Generating voice for script: '{script[:50]}...'")

    try:
        tts = edge_tts.Communicate(script, voice)
        await tts.save(output_path)
        print(f"✅ Audio saved at: {output_path}")
        return output_path
    except Exception as e:
        print(f"❌ Error generating voice: {e}")
        raise

# Example usage (uncomment below to test)
# if __name__ == "__main__":
#     asyncio.run(generate_voice("Hello! This is a test voice generation.", 1))
