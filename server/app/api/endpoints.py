from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os

# Import your Gemini Service
from app.services.gemini import ask_gemini

# Create router
router = APIRouter()

# ============================================
# DATA MODELS
# ============================================

class ChatRequest(BaseModel):
    """
    Schema for AI chat request.
    Matches the JSON sent from React: { "text": "Hello" }
    """
    text: str 
    user_id: Optional[str] = "test-user"

# ============================================
# ENDPOINTS
# ============================================

@router.post("/chat") 
async def ai_chat(request: ChatRequest):
    """
    Route: POST /api/chat
    Description: Receives user text, asks Gemini, returns AI response.
    """
    try:
        # 1. Validation (Optional, since Pydantic handles basics)
        if not request.text:
            raise HTTPException(status_code=400, detail="Message text is empty")

        # 2. Call Gemini Brain
        ai_response = ask_gemini(request.text)
        
        # 3. Return Success
        return {
            "response": ai_response,
            "status": "success"
        }
    
    except Exception as e:
        print(f"❌ AI Chat Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"AI Service Failed: {str(e)}"
        )

# ============================================
# UTILITY
# ============================================

@router.get("/health")
async def health_check():
    """
    Route: GET /api/health
    Checks if the API router is loaded correctly.
    """
    return {"status": "active", "service": "ASAP AI Router"}