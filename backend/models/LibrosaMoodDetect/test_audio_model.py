import os
import numpy as np
import librosa
from tensorflow.keras.models import load_model

# Path to the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "audio_model.keras")

# Example test audio file (replace with your test file path)
TEST_AUDIO_PATH = os.path.join(os.path.dirname(__file__), "joyfully.wav")

# Load the trained model
def load_audio_model(model_path):
    return load_model(model_path)

# Preprocess audio for model input

# Preprocess audio for CNN model input (expects shape (1, 75, 1))
def preprocess_audio_cnn(file_path, sr=22050, duration=3, n_mfcc=40, n_frames=75):
    y, _ = librosa.load(file_path, sr=sr, duration=duration)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    # Pad or truncate to n_frames
    if mfcc.shape[1] < n_frames:
        pad_width = n_frames - mfcc.shape[1]
        mfcc = np.pad(mfcc, ((0,0),(0,pad_width)), mode='constant')
    elif mfcc.shape[1] > n_frames:
        mfcc = mfcc[:, :n_frames]
    # For CNN, flatten to (n_frames, 1)
    mfcc = mfcc.T  # shape (n_frames, n_mfcc)
    # If model expects (n_frames, 1), take mean across MFCCs per frame
    mfcc_mean = np.mean(mfcc, axis=1).reshape(n_frames, 1)
    # Reshape for model: (1, n_frames, 1)
    return mfcc_mean[np.newaxis, ...]

# Run prediction
def predict_mood(model, audio_features):
    prediction = model.predict(audio_features)
    predicted_class = np.argmax(prediction, axis=1)[0]
    return predicted_class, prediction

if __name__ == "__main__":
    model = load_audio_model(MODEL_PATH)
    audio_features = preprocess_audio_cnn(TEST_AUDIO_PATH)
    mood_class, raw_output = predict_mood(model, audio_features)

    class_labels = [
        'female_angry', 'female_calm', 'female_disgust', 'female_fearful',
        'female_happy', 'female_neutral', 'female_sad', 'female_surprised',
        'male_angry', 'male_calm', 'male_disgust', 'male_fearful', 'male_happy',
        'male_neutral', 'male_sad', 'male_surprised'
    ]
    predicted_label = class_labels[mood_class-1]
    gender, mood = predicted_label.split('_')
    print(f"Predicted gender: {gender}")
    print(f"Predicted mood: {mood}")
    print(f"Raw model output: {raw_output}")
