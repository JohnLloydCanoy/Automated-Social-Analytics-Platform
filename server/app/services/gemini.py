import os
import google.generativeai as genai # Standard Import
from dotenv import load_dotenv

# 1. Load Environment Variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# 2. Configure the "Standard" way (More reliable)
if not api_key:
    print("❌ CRITICAL ERROR: GEMINI_API_KEY is missing from .env file!")
else:
    genai.configure(api_key=api_key)

def ask_gemini(prompt: str) -> str:
    try:
        # 3. Use the Standard Model approach
        # Switched to 'gemini-1.5-flash' because '2.0-flash-exp' is unstable/beta
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # 4. Generate Content (Simple Text Mode)
        response = model.generate_content(prompt)
        
        # 5. Return the text
        return response.text

    except Exception as e:
        # This prints the REAL error to your terminal so you can see it
        print(f"\n❌ GEMINI CRASH DETAILS: {e}\n")
        
        # Fallback message
        return "I'm having trouble connecting. Check your Python Terminal for the error details!"