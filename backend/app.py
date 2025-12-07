from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import datetime
from anthropic import Anthropic
from email_generator import generate_personalized_email, send_email
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# Initialize Anthropic client
anthropic_client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

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
                body=email_content,
                name=data['name'],
                language=data.get('language', 'en')
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
Specific Interest: {data.get('interest', 'Not specified')}
Learning Goal: {data.get('goal', 'Not specified')}

AI-GENERATED EMAIL SENT TO USER:
---------------------------------
{email_content}

================================
Submitted at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
            
            print(f"📧 Attempting to send admin notification to {admin_email}...")
            send_email(
                to_email=admin_email,
                subject=admin_subject,
                body=admin_body
            )
            print(f"✅ Admin notification sent successfully to {admin_email}")
        except Exception as e:
            # Don't fail the request if admin notification fails
            print(f"⚠️ Warning: Admin notification failed: {type(e).__name__}: {str(e)}")
            import traceback
            traceback.print_exc()
        
        return jsonify({'success': True, 'message': 'Email sent successfully'})
    
    except Exception as e:
        print(f"❌ Unexpected error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/chat', methods=['POST'])
def handle_chat():
    """Handle chatbot messages using Claude AI"""
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'success': False, 'message': 'Message is required'}), 400
        
        print(f"💬 Chatbot question: {user_message}")
        
        # Create context about the teaching services
        context = """You are an AI assistant for Thiyanayugi Mariraj's teaching platform. 

About Thiyanayugi:
- M.Sc. student in Automation & Robotics at TU Dortmund, Germany
- Specializes in AI-driven automation, multi-agent systems, and robotics
- Offers personalized 1-on-1 teaching in AI and Automation

Courses Offered:
1. AI & Machine Learning:
   - Large Language Models (LLMs) and AI Agents
   - Neural Networks and Deep Learning
   - Computer Vision and NLP
   - Prompt Engineering
   - AI Integration in real-world applications

2. Automation:
   - Process Automation and Workflow Optimization
   - Python Automation Scripts
   - API Integration and Web Scraping
   - Task Automation and Scheduling

Teaching Approach:
- Personalized 1-on-1 sessions tailored to student's background and goals
- Hands-on, project-based learning
- Focus on practical, real-world applications
- Flexible scheduling
- Both English and German language support

Getting Started:
- Students fill out a form with their background, experience level, and goals
- Receive a personalized learning path via email
- Book a free 30-minute consultation call via Calendly
- Flexible pricing based on student needs

Contact:
- Email: mariraj.thiyanayugi@gmail.com
- LinkedIn: linkedin.com/in/thiyanayugi-mariraj-a2b1b820b
- Location: Dortmund, Germany

IMPORTANT FORMATTING RULES:
- Keep responses under 100 words - be concise and engaging
- Use simple HTML for formatting: <br> for line breaks, <strong> for emphasis (NOT markdown **)
- Structure responses with short paragraphs (2-3 sentences max)
- Use bullet points with • symbol for lists
- Make it conversational and friendly
- End with a clear call-to-action when appropriate

If asked about pricing, mention it's flexible and personalized.
If asked to get started, encourage filling out the form or booking a free consultation."""

        # Generate response using Claude
        
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            messages=[
                {
                    "role": "user",
                    "content": f"{context}\n\nUser question: {user_message}\n\nProvide a helpful, concise response:"
                }
            ]
        )
        
        bot_response = response.content[0].text
        print(f"🤖 Bot response: {bot_response[:100]}...")
        
        return jsonify({
            'success': True,
            'response': bot_response
        })
        
    except Exception as e:
        print(f"❌ Chatbot error: {type(e).__name__}: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Sorry, I encountered an error. Please try again or use the contact form.'
        }), 500


if __name__ == '__main__':
    print(f"🚀 Starting server on port {PORT}...")
    app.run(host='0.0.0.0', port=PORT, debug=True)
