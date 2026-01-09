import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import ChatRequest, router as api_router
# Initialize FastAPI
app = FastAPI(title="ASAP Brain", version="1.0")

# Allow Next.js (Port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the routes from the api folder
# This adds "/api" to the beginning of all routes in that file
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "active", "message": "ASAP Brain is connected!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


