import google.generativeai as genai
from dotenv import load_dotenv
import os
import tempfile
import time
import playsound
from gtts import gTTS
import pyttsx3

# Load Gemini API key
load_dotenv()
api_key = os.getenv("gemini")
if not api_key:
    raise ValueError("❌ GEMINI API key not found. Please set it in your .env file.")

# Configure Gemini
genai.configure(api_key=api_key)

# Use the correct model name - updated to current Gemini model names
try:
    model = genai.GenerativeModel('gemini-2.0-flash')  # Updated model name
except Exception as e:
    print(f"❌ Failed to initialize Gemini model: {e}")
    print("Available models:")
    for m in genai.list_models():
        print(f"- {m.name}")
    exit()

# Language support configuration
SUPPORTED_LANGUAGES = {
    'en': {'name': 'English', 'tts_code': 'en'},
    'hi': {'name': 'Hindi', 'tts_code': 'hi'},
    'es': {'name': 'Spanish', 'tts_code': 'es'},
    'fr': {'name': 'French', 'tts_code': 'fr'},
    'de': {'name': 'German', 'tts_code': 'de'},
    'it': {'name': 'Italian', 'tts_code': 'it'},
    'pt': {'name': 'Portuguese', 'tts_code': 'pt'},
    'ru': {'name': 'Russian', 'tts_code': 'ru'},
    'ja': {'name': 'Japanese', 'tts_code': 'ja'},
    'ko': {'name': 'Korean', 'tts_code': 'ko'},
    'zh': {'name': 'Chinese', 'tts_code': 'zh'},
}

def clean_response(text):
    text = text.replace('*', '').replace('**', '').replace('__', '')
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return '\n'.join(lines)

def speak_text(text, lang_code='en'):
    if lang_code not in SUPPORTED_LANGUAGES:
        lang_code = 'en'
    
    tts_code = SUPPORTED_LANGUAGES[lang_code]['tts_code']
    
    try:
        # First try online TTS
        tts = gTTS(text=text, lang=tts_code, slow=False)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as fp:
            temp_path = fp.name
            tts.save(temp_path)
        
        try:
            playsound.playsound(temp_path)
        except KeyboardInterrupt:
            print("\n⏹️ Playback stopped by user")
        finally:
            os.remove(temp_path)
            
    except Exception as e:
        print(f"❌ Online TTS failed: {e}. Trying offline...")
        try:
            engine = pyttsx3.init()
            voices = engine.getProperty('voices')
            
            # Try to find a matching voice
            for voice in voices:
                if tts_code in voice.id.lower():
                    engine.setProperty('voice', voice.id)
                    break
            
            engine.setProperty('rate', 150)
            engine.say(text)
            engine.runAndWait()
        except Exception as inner_e:
            print(f"❌ Offline TTS also failed: {inner_e}")

def get_ewaste_management_info(item, language_code='en'):
    if language_code not in SUPPORTED_LANGUAGES:
        language_code = 'en'
    
    lang_name = SUPPORTED_LANGUAGES[language_code]['name']
    
    prompt = f"""
    Provide information about e-waste management for {item} in {lang_name} language only.
    Use simple vocabulary and short sentences.
    
    Format your response clearly with these sections:
    
    1. Classification:
    - Category
    - Hazard level (1-5)
    - Key components
    
    2. Management:
    - Best disposal method
    - Recycling options
    - Manufacturer programs
    
    3. Environmental Impact:
    - Benefits of proper disposal
    - Potential hazards
    
    4. Key Advice:
    - Safety precautions
    - Data protection tips
    
    Respond ONLY in {lang_name}. Do not include any English text.
    """
    
    try:
        response = model.generate_content(prompt)
        cleaned = clean_response(response.text)
        
        # Verify the response is in the correct language
        if language_code != 'en':
            verification_prompt = f"Translate the following to {lang_name} only:\n{cleaned}"
            verified_response = model.generate_content(verification_prompt)
            cleaned = clean_response(verified_response.text)
        
        return cleaned
    except Exception as e:
        return f"Error getting response: {str(e)}"

if __name__ == "__main__":
    print("📱 E-Waste Management Assistant (Multilingual)")
    print("Supported languages:", ", ".join([f"{code} ({SUPPORTED_LANGUAGES[code]['name']})" for code in SUPPORTED_LANGUAGES]))
    
    try:
        item = input("\nEnter your e-waste item: ").strip()
        lang_input = input("Preferred language code (e.g., en, hi, es): ").strip().lower()

        if item:
            if lang_input not in SUPPORTED_LANGUAGES:
                print(f"⚠️ Language not supported. Defaulting to English.")
                lang_input = 'en'
            
            print(f"\n🔍 Getting {SUPPORTED_LANGUAGES[lang_input]['name']} information for {item}...")
            info = get_ewaste_management_info(item, lang_input)
            
            print("\n🧾 E-Waste Info:\n")
            print(info)
            
            print("\n🔊 Speaking the information...")
            try:
                speak_text(info, lang_input)
            except KeyboardInterrupt:
                print("\n⏹️ Stopped by user")
        else:
            print("⚠️ Please enter a valid e-waste item.")
    except KeyboardInterrupt:
        print("\n👋 Exiting the program")