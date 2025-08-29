# test_model.py
import os
import warnings
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import tensorflow as tf

# ---------------------------
# 1️⃣ Suppress warnings
# ---------------------------
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TF logs
warnings.filterwarnings("ignore")

# ---------------------------
# 2️⃣ Load the model
# ---------------------------
MODEL_PATH = "face_emotion_model.keras"
model = load_model(MODEL_PATH)

# ---------------------------
# 3️⃣ Define class labels
# ---------------------------
CLASS_LABELS = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

# ---------------------------
# 4️⃣ Load and preprocess image
# ---------------------------
def preprocess_image(img_path, img_size=(48, 48)):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Load grayscale
    img = cv2.resize(img, img_size)
    img = img / 255.0
    img = np.stack((img,)*3, axis=-1)  # Convert 1 channel -> 3 channels
    img = np.expand_dims(img, axis=0)  # Shape: (1, 48, 48, 3)
    return img


# ---------------------------
# 5️⃣ Predict function
# ---------------------------
def predict_emotion(img_path):
    img = preprocess_image(img_path)
    preds = model.predict(img)
    idx = int(np.argmax(preds))
    confidence = float(np.max(preds))
    emotion = CLASS_LABELS[idx]
    print(f"Image: {img_path}")
    print(f"Predicted Emotion: {emotion}, Confidence: {confidence:.2f}\n")

# ---------------------------
# 6️⃣ Test on multiple images
# ---------------------------
if __name__ == "__main__":
    test_images = ["face1.jpg", "face2.jpg"]  # Replace with your image paths
    for img_path in test_images:
        predict_emotion(img_path)
