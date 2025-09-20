# language: python
import requests

url = "http://127.0.0.1:8000/generate-story"
files = {
    "image": open("../uploads/face1.jpg","rb"),
    "audio": open("../uploads/test.wav","rb"),
}
r = requests.post(url, files=files)
print(r.status_code, r.text)