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
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Load grayscale
        img = cv2.resize(img, img_size)
        img = img / 255.0
        img = np.stack((img,)*3, axis=-1)  # Convert 1 channel -> 3 channels
        img = np.expand_dims(img, axis=0)  # Shape: (1, 48, 48, 3)
        return img

    def predict_emotion(self, img_path):
        img = self.preprocess_image(img_path)
        preds = self.model.predict(img)
        idx = int(np.argmax(preds))
        confidence = float(np.max(preds))
        emotion = self.class_labels[idx]
        return emotion, confidence
