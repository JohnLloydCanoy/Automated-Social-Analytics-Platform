import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from typing import List, Dict, Any, Union

_analyzser = SentimentIntensityAnalyzer()

def analyze_sentiments(text: List[str]) -> Dict[str, Any]:
    """
    It performs sentiment analysis on a list of text strings using VADER sentiment analysis tool.
    """
    if not text or not isinstance(text, list):
        return {
            "error": "Input must be a non-empty list of strings.",
            "status": "failed"
        }
    try:
        # If Big or Batch Processing is needed, it can be handled here
        results = []
        for text in texts:
            if not isinstance(text, str):
                continue
            score = _analyzser.polarity_scores(text)
            results.append(score['compound'])
        if not results:
            return {"summary": "No valid text found to analyze.", "status": "empty"}
        series = pd.Series(results)
        avg_score = series.mean()
        positive_count = (series > 0.05).sum()
        negative_count = (series < -0.05).sum()
        neutral_count = len(series) - positive_count - negative_count
        
        vibe = "neutral"
        if avg_score > 0.3: vibe = "Very Positive"
        elif avg_score > 0.05: vibe = "Slightly Positive"
        elif avg_score < -0.3: vibe = "Very Negative"
        elif avg_score < -0.05: vibe = "Slightly Negative"
        
        return {
            "status": "success",
            "summary": f"Analyzed {len(series)} items. Overall vibe: {vibe}",
            "metrics": {
                "average_score": round(float(avg_score), 3),
                "positive_count": int(positive_count),
                "negative_count": int(negative_count),
                "neutral_count": int(neutral_count)
            }
        }

    except Exception as e:

        return {"error": f"Analysis failed: {str(e)}", "status": "error"}
    
def generate_performance_report(posts_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Generates growth statistics from raw post data.
    Safely handles missing keys and empty datasets.
    """
    if not posts_data:
        return {"message": "No data available", "status": "empty"}

    try:
        # 1. Load Data
        df = pd.DataFrame(posts_data)

        # 2. Sanitize Data (Security/Stability)
        required_cols = ['likes', 'engagement', 'shares', 'views']
        for col in required_cols:
            if col not in df.columns:
                df[col] = 0
            else:
                # Force numeric type, turning errors (strings) into NaN then 0
                df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

        stats = {
            "total_posts": len(df),
            "total_likes": int(df['likes'].sum()),
            "total_views": int(df['views'].sum()),
            "avg_engagement": round(float(df['engagement'].mean()), 2),
            "top_performing_post": "None"
        }

        if not df.empty and df['likes'].sum() > 0:

            best_idx = df['likes'].idxmax()

            title = df.loc[best_idx].get('title', 'Untitled Post')
            likes = df.loc[best_idx]['likes']
            stats["top_performing_post"] = f"'{title}' ({likes} likes)"

        return {"status": "success", "report": stats}

    except Exception as e:
        return {"error": f"Report generation failed: {str(e)}", "status": "error"}