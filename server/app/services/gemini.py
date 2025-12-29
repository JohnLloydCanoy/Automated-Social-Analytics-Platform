import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
from app.tools.data_tools import get_all_posts

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

# Importig custom tools to be used with Gemini
project_tools =[
    
]
