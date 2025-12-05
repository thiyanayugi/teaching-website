from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from email_generator import generate_personalized_email, send_email
from dotenv import load_dotenv

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
def handle_submission():
    try:
        data = request.json
        print(f"📥 Received form submission from: {data.get('email')}")
        
        # Validate required fields
        required_fields = ['name', 'email', 'topic', 'background', 'experience']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'message': f'Missing required field: {field}'}), 400
        
        # Generate personalized email using Claude
        print("🤖 Calling Anthropic API to generate email...")
        try:
            email_content = generate_personalized_email(data)
            print(f"✅ Email content generated successfully ({len(email_content)} chars)")
        except Exception as e:
            print(f"❌ Anthropic API error: {type(e).__name__}: {str(e)}")
            return jsonify({'success': False, 'message': f'AI generation failed: {str(e)}'}), 500
        
        # Send the email
        print("📧 Sending email via Gmail SMTP...")
        try:
            send_email(
                to_email=data['email'],
                subject=f"Your Personalized {data['topic'].upper()} Learning Path - Thiyanayugi Mariraj",
                body=email_content
            )
            print("✅ Email sent successfully!")
        except Exception as e:
            print(f"❌ Email sending error: {type(e).__name__}: {str(e)}")
            return jsonify({'success': False, 'message': f'Email sending failed: {str(e)}'}), 500
        
        return jsonify({'success': True, 'message': 'Email sent successfully'})
    
    except Exception as e:
        print(f"❌ Unexpected error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
