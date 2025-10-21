from app.routes.api import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
app = FastAPI()

# Configure CORS origins (adjust as needed)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # You can add more origins here, e.g., your deployed frontend URLs
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] to allow all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health")
def health():
    return {"status": "Backend running!", "version": "v1.0"}


client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
users_collection = db["users"]

class User(BaseModel):
    id: str
    name: str
    email: str
    imageUrl: str | None = None

@app.post("/sync-user")
def sync_user(user: User):
    existing_user = users_collection.find_one({"id": user.id})
    if existing_user:
        return {"message": "User already exists","success":True}

    users_collection.insert_one(user)
    return {"message": "User inserted successfully","success":True}
