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
        
        # Send notification email to admin (invisible to user)
        try:
            admin_email = "yugimariraj01@gmail.com"
            admin_subject = f"🔔 New Form Submission: {data['name']} - {topic_display}"
            admin_body = f"""
NEW FORM SUBMISSION RECEIVED
================================

USER DETAILS:
-------------
Name: {data['name']}
Email: {data['email']}
Topic: {data['topic']}
Background: {data['background']}
Experience Level: {data['experience']}
Goals: {data['goals']}

AI-GENERATED EMAIL SENT TO USER:
---------------------------------
{email_content}

================================
Submitted at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
            
            send_email(
                to_email=admin_email,
                subject=admin_subject,
                body=admin_body
            )
            print(f"✅ Admin notification sent to {admin_email}")
        except Exception as e:
            # Don't fail the request if admin notification fails
            print(f"⚠️ Warning: Admin notification failed: {str(e)}")
        
        return jsonify({'success': True, 'message': 'Email sent successfully'})
    
    except Exception as e:
        print(f"❌ Unexpected error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
