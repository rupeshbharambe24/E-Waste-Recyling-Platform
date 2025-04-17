from flask import Flask, request, jsonify
from twilio.rest import Client
from datetime import datetime
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Twilio credentials
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_WHATSAPP_NUMBER = os.getenv('TWILIO_WHATSAPP_NUMBER')
YOUR_PERSONAL_WHATSAPP = os.getenv('YOUR_PERSONAL_WHATSAPP')  # Format: whatsapp:+1234567890

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@app.route('/api/schedule-pickup', methods=['POST'])
def schedule_pickup():
    data = request.json
    
    # Extract pickup details from request
    pickup_date = data.get('pickup_date')
    time_slot = data.get('time_slot')
    address = data.get('address')
    waste_type = data.get('waste_type')
    item_count = data.get('item_count')
    
    # Format the date for display
    formatted_date = datetime.strptime(pickup_date, '%Y-%m-%d').strftime('%B %d, %Y')
    
    try:
        # Send WhatsApp message to YOUR personal number
        message = client.messages.create(
            from_=TWILIO_WHATSAPP_NUMBER,
            body=f'''
📅 New E-Waste Pickup Scheduled!
            
🗓️ Date: {formatted_date}
⏰ Time Slot: {time_slot}
📍 Address: {address}
📦 Items: {item_count} {waste_type}

Customer Details:
- Name: {data.get('customer_name', 'Not provided')}
- Contact: {data.get('customer_contact', 'Not provided')}

Action Required: Please confirm this pickup.
            ''',
            to=YOUR_PERSONAL_WHATSAPP
        )
        
        return jsonify({
            'success': True,
            'message': 'Pickup scheduled and notification sent to admin',
            'sid': message.sid
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)