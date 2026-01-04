"""
API Endpoints for ASAP Backend

ARCHITECTURE:
- This file defines all HTTP endpoints
- Uses FastAPI for automatic API documentation
- Connects to Supabase for data, Gemini for AI

FUTURE IMPROVEMENTS:
- Add authentication middleware (check JWT tokens)
- Add rate limiting (prevent abuse)
- Add request logging
- Add input validation with Pydantic
- Add API versioning (/api/v1/...)
"""

from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import os

# Import our custom tools
from app.tools.analysis import analyze_sentiments, generate_performance_report
from app.services.gemini import ask_gemini

# Create router (like Express.js router)
router = APIRouter()

# ============================================
# DATA MODELS (Request/Response schemas)
# ============================================

class SentimentRequest(BaseModel):
    """
    Schema for sentiment analysis request
    
    EXAMPLE:
    {
        "texts": ["I love this app!", "This is terrible"]
    }
    """
    texts: List[str] = Field(..., min_items=1, max_items=1000, description="List of texts to analyze")

class ChatRequest(BaseModel):
    """
    Schema for AI chat request
    
    EXAMPLE:
    {
        "message": "How can I improve my Instagram engagement?"
    }
    
    FUTURE: Add conversation_id for context
    """
    message: str = Field(..., min_length=1, max_length=5000, description="User's message to AI")

# ============================================
# ENDPOINT 1: Get All Posts
# ============================================

@router.get("/posts", tags=["Posts"])
async def get_posts():
    """
    Fetch all social media posts
    
    CURRENT: Returns mock data
    FUTURE: Connect to Supabase
    
    RESPONSE EXAMPLE:
    [
        {"id": 1, "content": "Hello world", "platform": "Twitter"},
        {"id": 2, "content": "Check this out", "platform": "Facebook"}
    ]
    
    TODO:
    - [ ] Add pagination (limit, offset parameters)
    - [ ] Add filtering by platform
    - [ ] Add sorting by date/engagement
    - [ ] Connect to Supabase database
    """
    # PLACEHOLDER DATA (Replace with Supabase query)
    return [
        {
            "id": 1, 
            "content": "🚀 First post from ASAP!", 
            "platform": "Twitter",
            "likes": 42,
            "views": 150
        },
        {
            "id": 2, 
            "content": "Loving the analytics dashboard!", 
            "platform": "Facebook",
            "likes": 28,
            "views": 200
        },
    ]

# ============================================
# ENDPOINT 2: Sentiment Analysis
# ============================================

@router.post("/analyze-sentiment", tags=["Analytics"])
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze sentiment of text using VADER
    
    PERFORMANCE:
    - ~10ms per text
    - 100 texts = ~1 second
    
    RETURNS:
    {
        "status": "success",
        "summary": "Analyzed 2 items. Overall vibe: Slightly Positive",
        "metrics": {
            "average_score": 0.567,
            "positive_count": 1,
            "negative_count": 1,
            "neutral_count": 0
        }
    }
    
    FUTURE IMPROVEMENTS:
    - [ ] Add caching (same texts = cached result)
    - [ ] Parallelize processing for speed
    - [ ] Add support for emoji analysis
    - [ ] Add language detection
    """
    try:
        # Call the analysis function from analysis.py
        result = analyze_sentiments(request.texts)
        
        if result.get("status") == "error":
            raise HTTPException(status_code=500, detail=result.get("error"))
        
        return result
    
    except Exception as e:
        # Log error (FUTURE: Send to error tracking service)
        print(f"❌ Sentiment analysis error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Sentiment analysis failed: {str(e)}"
        )

# ============================================
# ENDPOINT 3: AI Chat
# ============================================

@router.post("/ai/chat", tags=["AI"])
async def ai_chat(request: ChatRequest):
    """
    Chat with Gemini AI assistant
    
    PERFORMANCE:
    - 2-5 seconds per response
    - Depends on message complexity and network
    
    CURRENT CAPABILITIES:
    - General conversation
    - Social media advice
    
    FUTURE CAPABILITIES:
    - [ ] Access to user's post data (via tools)
    - [ ] Generate post captions
    - [ ] Suggest posting times
    - [ ] Competitor analysis
    - [ ] Conversation history/context
    
    SECURITY NOTES:
    - API key stored in .env (never expose to frontend)
    - Rate limit needed (prevent abuse)
    """
    try:
        # Validate Gemini API key exists
        if not os.getenv("GEMINI_API_KEY"):
            raise HTTPException(
                status_code=500, 
                detail="Gemini API key not configured"
            )
        
        # Call Gemini service
        response = ask_gemini(request.message)
        
        return {
            "response": response,
            "status": "success"
        }
    
    except Exception as e:
        print(f"❌ AI chat error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"AI service error: {str(e)}"
        )

# ============================================
# ENDPOINT 4: Performance Report
# ============================================

@router.get("/report", tags=["Analytics"])
async def get_report():
    """
    Generate performance analytics report
    
    RETURNS:
    {
        "status": "success",
        "report": {
            "total_posts": 50,
            "total_likes": 1250,
            "total_views": 15000,
            "avg_engagement": 8.3,
            "top_performing_post": "'My best post' (200 likes)"
        }
    }
    
    CURRENT: Uses mock data
    FUTURE: Connect to Supabase
    
    IMPROVEMENTS NEEDED:
    - [ ] Add date range filtering (last 7 days, 30 days, etc.)
    - [ ] Add platform breakdown
    - [ ] Add growth trends (vs previous period)
    - [ ] Cache results (5-minute TTL)
    - [ ] Add export to PDF/CSV
    """
    try:
        # MOCK DATA (Replace with Supabase query)
        fake_posts = [
            {
                "title": "Marketing tips for 2025",
                "likes": 150,
                "views": 1000,
                "engagement": 15,
                "shares": 30
            },
            {
                "title": "How to use ASAP effectively",
                "likes": 200,
                "views": 1500,
                "engagement": 20,
                "shares": 50
            },
        ]
        
        # Generate report using analysis tool
        result = generate_performance_report(fake_posts)
        
        if result.get("status") == "error":
            raise HTTPException(status_code=500, detail=result.get("error"))
        
        return result
    
    except Exception as e:
        print(f"❌ Report generation error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Report generation failed: {str(e)}"
        )

# ============================================
# ENDPOINT 5: Health Check
# ============================================

@router.get("/health", tags=["System"])
async def health_check():
    """
    Simple health check endpoint
    
    USAGE:
    - Frontend checks on startup
    - Monitoring services ping this
    - Load balancer health checks
    
    RETURNS: {"status": "healthy", "message": "ASAP Backend is running"}
    """
    return {
        "status": "healthy",
        "message": "ASAP Backend is running",
        "version": "1.0.0"
    }

