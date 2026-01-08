import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ============================================
# CONFIGURATION
# ============================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# ============================================
# MAIN FUNCTION
# ============================================

def ask_gemini(prompt: str) -> str:
    try:
        # Send request to Gemini
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',  # Fastest model
            contents=prompt,
        )
        
        # Extract text from response
        return response.text
    
    except Exception as e:
        # Log error details
        print(f"❌ Gemini API Error: {str(e)}")
        
        # Return user-friendly error message
        return (
            "I'm having trouble connecting to my AI brain right now. "
            "Please try again in a moment! 🤖"
        )
