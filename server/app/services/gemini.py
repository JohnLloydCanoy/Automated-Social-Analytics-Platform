"""
Google Gemini AI Service

RESPONSIBILITY:
- Manage Gemini API connection
- Provide conversation interface
- Handle errors gracefully

FUTURE ENHANCEMENTS:
- Add conversation history
- Add function calling (tools)
- Add system prompts
- Add response streaming
"""

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

# Validate API key exists
if not GEMINI_API_KEY:
    raise ValueError(
        "❌ GEMINI_API_KEY not found in .env file!\n"
        "Get your key from: https://aistudio.google.com/app/apikey"
    )

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# ============================================
# MAIN FUNCTION
# ============================================

def ask_gemini(prompt: str) -> str:
    """
    Send a prompt to Gemini and get response
    
    PARAMETERS:
    - prompt (str): User's question/message
    
    RETURNS:
    - str: AI-generated response
    
    EXAMPLE:
    >>> ask_gemini("How do I improve Instagram engagement?")
    "Here are 5 proven strategies to boost your Instagram engagement..."
    
    FUTURE IMPROVEMENTS:
    - [ ] Add conversation history (remember previous messages)
    - [ ] Add system prompt (personality customization)
    - [ ] Stream responses (show word-by-word)
    - [ ] Add safety filters
    - [ ] Add token usage tracking (cost monitoring)
    """
    try:
        # Send request to Gemini
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',  # Fastest model
            contents=prompt,
            
            # FUTURE: Add configuration
            # config={
            #     "temperature": 0.7,  # Creativity level (0-1)
            #     "max_tokens": 1000,  # Limit response length
            #     "system_instruction": "You are a social media expert..."
            # }
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

# ============================================
# FUTURE: TOOL FUNCTIONS (Function Calling)
# ============================================

"""
Gemini can call Python functions to access your data!

EXAMPLE:
def get_user_posts(user_id: str) -> list:
    # Fetch posts from Supabase
    pass

tools = [get_user_posts]

response = client.models.generate_content(
    model='gemini-2.0-flash-exp',
    contents="Show me my top 3 posts",
    tools=tools  # Gemini can now call get_user_posts()
)

FUTURE TOOLS TO ADD:
- fetch_recent_posts()
- calculate_engagement_rate()
- get_competitor_data()
- schedule_post()
"""