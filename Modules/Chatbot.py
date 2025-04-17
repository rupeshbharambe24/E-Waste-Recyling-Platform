from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_ewaste_management_info, SUPPORTED_LANGUAGES
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing in .env file")

# This enables CORS globally for all routes
CORS(app, supports_credentials=True)

@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        # This handles CORS preflight
        return '', 200

    data = request.get_json()
    user_message = data.get("message", "")
    lang = data.get("language", "english").lower()

    lang_code = next((code for code, info in SUPPORTED_LANGUAGES.items() if info['name'].lower() == lang), 'en')
    response_text = get_ewaste_management_info(user_message, lang_code)

    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(debug=True)
