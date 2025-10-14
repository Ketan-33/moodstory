from app.routes.api import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
