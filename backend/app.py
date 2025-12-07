from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from wtforms import Form, StringField, SelectField, TextAreaField, validators
from email_validator import validate_email, EmailNotValidError
import os
import datetime
import re
import html
from anthropic import Anthropic
from email_generator import generate_personalized_email, send_email
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')

# Security Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(32))
app.config['WTF_CSRF_ENABLED'] = True
app.config['WTF_CSRF_TIME_LIMIT'] = None  # No time limit for CSRF tokens

# Initialize security extensions
csrf = CSRFProtect(app)
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# CORS configuration - restrict in production
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5000", "https://teaching-platform-560659035104.europe-west1.run.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type", "X-CSRFToken"]
    }
})

# Initialize Anthropic client
anthropic_client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# Get port from environment variable
PORT = int(os.environ.get('PORT', 5000))

# Security headers middleware
@app.after_request
def set_security_headers(response):
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

# Input validation form
class ContactForm(Form):
    name = StringField('Name', [
        validators.DataRequired(message="Name is required"),
        validators.Length(min=2, max=100, message="Name must be between 2 and 100 characters")
    ])
    email = StringField('Email', [
        validators.DataRequired(message="Email is required"),
        validators.Email(message="Invalid email address")
    ])
    topic = SelectField('Topic', [
        validators.DataRequired(message="Topic is required")
    ], choices=[('automation', 'Automation'), ('ai', 'AI'), ('both', 'Both')])
    language = StringField('Language', [
        validators.Optional()
    ])
    background = SelectField('Background', [
        validators.DataRequired(message="Background is required")
    ], choices=[('student', 'Student'), ('professional', 'Professional'), ('researcher', 'Researcher'), ('hobbyist', 'Hobbyist')])
    experience = SelectField('Experience', [
        validators.DataRequired(message="Experience level is required")
    ], choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')])
    interest = TextAreaField('Interest', [
        validators.Optional(),
        validators.Length(max=500, message="Interest must be less than 500 characters")
    ])
    goal = TextAreaField('Goal', [
        validators.Optional(),
        validators.Length(max=1000, message="Goal must be less than 1000 characters")
    ])

def sanitize_input(text):
    """Sanitize user input to prevent XSS and injection attacks"""
    if not text:
        return text
    # Remove any HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Escape HTML entities
    text = html.escape(text)
    # Remove excessive whitespace
    text = ' '.join(text.split())
    return text

def validate_email_address(email):
    """Validate email address format"""
    try:
        # Validate and normalize email
        valid = validate_email(email, check_deliverability=False)
        return valid.email
    except EmailNotValidError as e:
        raise ValueError(f"Invalid email: {str(e)}")

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/submit', methods=['POST'])
@limiter.limit("5 per hour")  # Rate limit: 5 submissions per hour per IP
def handle_submission():
    try:
        data = request.json
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        print(f"📥 Received form submission from: {data.get('email')}")
        
        # Validate form data using WTForms
        form = ContactForm(data=data)
        if not form.validate():
            errors = {field.name: field.errors for field in form if field.errors}
            print(f"❌ Validation errors: {errors}")
            return jsonify({
                'success': False, 
                'message': 'Validation failed',
                'errors': errors
            }), 400
        
        # Validate and normalize email
        try:
            validated_email = validate_email_address(data['email'])
            data['email'] = validated_email
        except ValueError as e:
            print(f"❌ Email validation error: {str(e)}")
            return jsonify({'success': False, 'message': str(e)}), 400
        
        # Sanitize text inputs
        data['name'] = sanitize_input(data.get('name', ''))
        data['interest'] = sanitize_input(data.get('interest', ''))
        data['goal'] = sanitize_input(data.get('goal', ''))
        
        # Validate language code
        if data.get('language') and data['language'] not in ['en', 'de']:
            data['language'] = 'en'  # Default to English if invalid
        
        print(f"✅ Validation passed for: {data['name']} ({data['email']})")
        
        # Generate personalized email using Claude
        print("🤖 Calling Anthropic API to generate email...")
        try:
            email_content = generate_personalized_email(data)
            print(f"✅ Email content generated successfully ({len(email_content)} chars)")
        except Exception as e:
            print(f"❌ Anthropic API error: {type(e).__name__}: {str(e)}")
            return jsonify({
                'success': False, 
                'message': 'Failed to generate personalized content. Please try again later.'
            }), 500
        
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
            return jsonify({
                'success': False, 
                'message': 'Failed to send email. Please check your email address and try again.'
            }), 500
        
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
