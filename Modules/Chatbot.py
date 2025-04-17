from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_ewaste_management_info, SUPPORTED_LANGUAGES

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    lang = data.get("language", "english").lower()

    # Match language name to code
    lang_code = next((code for code, lang_info in SUPPORTED_LANGUAGES.items() if lang_info['name'].lower() == lang), 'en')

    response_text = get_ewaste_management_info(user_message, lang_code)
    
    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(debug=True)
