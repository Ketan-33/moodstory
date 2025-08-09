from app.routes.api import router
from fastapi import FastAPI

app = FastAPI()
app.include_router(router)

@app.get("/health")
def health():
    return {"status": "Backend running!", "version": "v1.0"}
