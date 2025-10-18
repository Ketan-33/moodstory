import os
import warnings

import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model


class CNNMoodDetector:
    def __init__(self, model_path=None):
        dirname = os.path.dirname(__file__)  # always points to models/CNNMoodDetection/

        if model_path is None:
            model_path = os.path.join(dirname, "face_emotion_model.keras")

        self.model = load_model(model_path)
        self.class_labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

    def preprocess_image(self, img_path, img_size=(48, 48)):
        img_color = cv2.imread(img_path)
        gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
        # Load Haar Cascade for face detection
        cascade_path = os.path.join(os.path.dirname(__file__), "haarcascade_frontalface_default.xml")
        face_cascade = cv2.CascadeClassifier(cascade_path)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        if len(faces) > 0:
            # Use the largest detected face
            x, y, w, h = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)[0]
            face_img = gray[y:y+h, x:x+w]
        else:
            # Fallback: use the whole image
            face_img = gray
        face_img = cv2.resize(face_img, img_size)
        face_img = face_img / 255.0
        face_img = np.stack((face_img,)*3, axis=-1)  # Convert 1 channel -> 3 channels
        face_img = np.expand_dims(face_img, axis=0)  # Shape: (1, 48, 48, 3)
        return face_img

    def predict_emotion(self, img_path):
        img = self.preprocess_image(img_path)
        preds = self.model.predict(img)
        idx = int(np.argmax(preds))
        confidence = float(np.max(preds))
        emotion = self.class_labels[idx]
        return emotion, confidence
