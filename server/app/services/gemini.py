import os
import google.generativeai as genai # Standard Import
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")


if not api_key:
    print("❌ CRITICAL ERROR: GEMINI_API_KEY is missing from .env file!")
else:
    genai.configure(api_key=api_key)

def ask_gemini(prompt: str) -> str:
    try:

        model = genai.GenerativeModel("gemini-pro")
        

        response = model.generate_content(prompt)
        

        return response.text

    except Exception as e:
        # This prints the REAL error to your terminal so you can see it
        print(f"\n❌ GEMINI CRASH DETAILS: {e}\n")
        
        # Fallback message
        return "I'm having trouble connecting. Check your Python Terminal for the error details!"