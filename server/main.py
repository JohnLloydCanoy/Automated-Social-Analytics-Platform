import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

# 1. Load the secret .env file
load_dotenv()

# 2. Initialize Supabase Connection
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# 3. Initialize FastAPI
app = FastAPI()

# 4. Allow Next.js (Port 3000) to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"status": "active", "message": "ASAP Brain is connected!"}

@app.get("/api/posts")
def get_posts():
    # Fetch all rows from the 'posts' table in Supabase
    response = supabase.table("posts").select("*").execute()
    return response.data