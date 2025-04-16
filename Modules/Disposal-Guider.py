import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()

# Using Gemini API Key
api_key = os.getenv("gemini") 
if not api_key:
    raise ValueError("No API key found. Please set GEMINI_API_KEY in your .env file")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.0-flash') 

def clean_response(text):
    """Remove asterisks and other unwanted formatting from the response."""
    # Remove stars
    text = text.replace('*', '')
    # Remove double stars and underscores
    text = text.replace('**', '').replace('__', '')
    # Remove empty lines
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return '\n'.join(lines)

def get_ewaste_management_info(ewaste_item):
    prompt = f"""
    You are a concise environmental e-waste expert. Provide only valuable, actionable information about {ewaste_item}:
    
    1. Classification (one line each):
       - Category
       - Hazard level (1-5)
       - Key components
    
    2. Management (concise steps):
       - Best disposal method
       - Top recycling option
       - Manufacturer program if available
    
    3. Environmental impact (brief):
       - Main environmental benefit
       - Primary toxic concern
    
    4. Key advice (bullet points only):
       - Essential safety tip
       - Critical data tip if applicable
    
    Respond in clean plain text format without any markdown, asterisks, or decorative elements.
    Use clear section headings with emoji indicators.
    Be extremely concise - no filler text.
    """
    
    response = model.generate_content(prompt)
    cleaned_response = clean_response(response.text)
    return cleaned_response

print("E-Waste Management Assistant")
print("Enter an electronic item ;")
user_input = input("Enter your e-waste item :- ").strip()
if user_input:
    result = get_ewaste_management_info(user_input)
    print("\nE-Waste Management Information:")
    print(result)
else:
    print("Please enter a Valid e-waste atom.")