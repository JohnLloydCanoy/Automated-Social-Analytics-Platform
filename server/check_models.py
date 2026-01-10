
import os
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ Error: No API Key found in .env")
    exit()

print(f"🔑 Checking models for Key: {api_key[:5]}... (Safety Mask)")
genai.configure(api_key=api_key)

try:
    print("📡 Connecting to Google...")
    print("------------------------------------------------")
    print(f"{'MODEL NAME':<30} | {'SUPPORTED METHODS'}")
    print("------------------------------------------------")
    

    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"{m.name:<30} | {m.supported_generation_methods}")

    print("------------------------------------------------")
    print("✅ Done! Use one of the names above in your code.")

except Exception as e:
    print(f"\n❌ CRITICAL ERROR: {e}")
    print("Note: If this says 'Permission Denied' or 'User location is not supported', you might need a new API Key from aistudio.google.com")