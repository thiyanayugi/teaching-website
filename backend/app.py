from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from email_generator import generate_personalized_email, send_email
from dotenv import load_dotenv

# Try to import cloud storage (only available on Cloud Run)
try:
    from cloud_storage import save_user_data
    CLOUD_STORAGE_AVAILABLE = True
except ImportError:
    CLOUD_STORAGE_AVAILABLE = False
    print("⚠️  Cloud Storage not available (running on Railway)")

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# Get port from environment variable (Railway sets this)
PORT = int(os.environ.get('PORT', 5000))

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/submit', methods=['POST'])
def submit_form():
    try:
        data = request.json
        print(f"📝 Received form submission from: {data.get('email')}")
        print(f"   Topic: {data.get('topic')}, Background: {data.get('background')}, Experience: {data.get('experience')}")
        
        # Validate required fields
        required_fields = ['name', 'email', 'topic', 'background', 'experience', 'goals'] # Added 'goals' to required fields
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'message': f'Missing required field: {field}'}), 400
        
        # Generate personalized email content
        print("🤖 Generating personalized email with Claude AI...")
        try:
            email_content = generate_personalized_email(
                name=data['name'],
                topic=data['topic'],
                background=data['background'],
                experience=data['experience'],
                goals=data['goals']
            )
            print("✅ Email content generated successfully!")
        except Exception as e:
            print(f"❌ AI generation error: {type(e).__name__}: {str(e)}")
            return jsonify({'success': False, 'message': f'AI generation failed: {str(e)}'}), 500
        
        # Send the email
        print("📧 Sending email via Gmail SMTP...")
        
        # Create meaningful subject line
        topic_display = "AI & Automation" if data['topic'].lower() == 'both' else data['topic'].upper()
        
        try:
            send_email(
                to_email=data['email'],
                subject=f"Your Personalized {topic_display} Learning Path - Thiyanayugi Mariraj",
                body=email_content
            )
            print("✅ Email sent successfully!")
        except Exception as e:
            print(f"❌ Email sending error: {type(e).__name__}: {str(e)}")
            return jsonify({'success': False, 'message': f'Email sending failed: {str(e)}'}), 500
        
        # Save user data to Cloud Storage (only on Cloud Run)
        if CLOUD_STORAGE_AVAILABLE:
            try:
                save_user_data(data)
            except Exception as e:
                print(f"⚠️ Warning: Failed to save data to Cloud Storage: {str(e)}")
                # Don't fail the request if storage fails
        
        return jsonify({'success': True, 'message': 'Email sent successfully'})
    
    except Exception as e:
        print(f"❌ Unexpected error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
