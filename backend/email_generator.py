from anthropic import Anthropic
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def get_anthropic_client():
    """Get or create Anthropic client instance."""
    return Anthropic()

def generate_personalized_email(data: dict) -> str:
    """Generate a personalized email using Claude Sonnet."""
    
    topic_details = {
        'automation': {
            'expertise': 'ROS robotics, sensor fusion, SLAM, industrial process automation, and Python workflow automation',
            'projects': 'autonomous mobile robots, warehouse automation systems, and real-time path planning algorithms'
        },
        'ai': {
            'expertise': 'LLMs, multi-agent systems with LangChain, deep learning (PyTorch/TensorFlow), RAG pipelines, and prompt engineering',
            'projects': 'AI agent frameworks, Graph Neural Networks for optimization, and production-ready ML systems'
        }
    }
    
    selected = topic_details.get(data['topic'], topic_details['ai'])
    
    prompt = f"""You are Thiyanayugi Mariraj, a Master's student in Automation & Robotics at TU Dortmund 
with expertise in AI and automation. Generate a warm, personalized email response to a potential student.

STUDENT INFORMATION:
- Name: {data['name']}
- Wants to learn: {data['topic'].upper()}
- Background: {data['background']}
- Experience Level: {data['experience']}
- Specific Interest: {data.get('interest', 'Not specified')}
- Goal: {data.get('goal', 'General learning and skill development')}

YOUR EXPERTISE IN THIS AREA:
- Skills: {selected['expertise']}
- Past Projects: {selected['projects']}

WRITE A PERSONALIZED EMAIL THAT:
1. Starts with an enthusiastic greeting using their name
2. Shows genuine excitement about their specific interest and learning goals
3. Acknowledges their background and experience level positively
4. Suggests 2-3 concrete, actionable learning paths or project ideas tailored to their level
5. Mentions 1-2 relevant projects or experiences you've had that relate to their interests
6. Ends with an encouraging message inviting them to take the next step
7. Keeps an encouraging, supportive, and professional tone
8. Is concise (250-350 words)

CRITICAL FORMATTING RULES:
- DO NOT include a subject line in the email body
- DO NOT mention Calendly or booking links in the email content (this will be added automatically in the template)
- For emphasis, wrap important words/phrases in <b></b> HTML tags (e.g., <b>important term</b>)
- Use line breaks and spacing for visual clarity
- Keep paragraphs short (2-3 sentences max)
- Use bullet points with - or • for lists
- Capitalise first letter for important words.

STRUCTURE:
- Warm greeting with their name
- Express excitement about their specific interest
- 2-3 specific suggestions or learning paths (use <b></b> for key terms)
- Brief mention of your relevant experience
- Encouraging closing statement (NO mention of booking/Calendly)

DO NOT include any sign-off or signature - this will be added automatically."""

    message = get_anthropic_client().messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return message.content[0].text


def send_email(to_email: str, subject: str, body: str):
    """
    Smart email sending - automatically chooses the best method:
    - Cloud Run: Uses Gmail SMTP (fast, direct)
    - Railway: Uses SendGrid API (SMTP blocked)
    """
    
    sender_email = os.getenv('GMAIL_ADDRESS', 'mariraj.thiyanayugi@gmail.com')
    gmail_password = os.getenv('GMAIL_PASSWORD')
    sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
    
    # Determine which email method to use
    use_smtp = gmail_password is not None
    use_sendgrid = sendgrid_api_key is not None
    
    if use_smtp:
        # Cloud Run: Use Gmail SMTP (fast!)
        print(f"📧 Using Gmail SMTP to send email from {sender_email} to {to_email}")
        return _send_via_smtp(to_email, subject, body, sender_email, gmail_password)
    elif use_sendgrid:
        # Railway: Use SendGrid API
        print(f"📧 Using SendGrid API to send email from {sender_email} to {to_email}")
        return _send_via_sendgrid(to_email, subject, body, sender_email, sendgrid_api_key)
    else:
        raise ValueError("No email configuration found. Please set either GMAIL_PASSWORD (for SMTP) or SENDGRID_API_KEY (for SendGrid)")


def _send_via_smtp(to_email: str, subject: str, body: str, sender_email: str, password: str):
    """Send email via Gmail SMTP (works on Cloud Run)."""
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    
    # Create HTML version with nice formatting
    html_body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 24px;">🎓 Your Learning Journey Starts Here!</h2>
    </div>
    <div style="background-color: white; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="white-space: pre-wrap; line-height: 1.8; color: #1e293b;">{body}</div>
        
        <div style="margin-top: 30px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
            <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">
                Let's discuss your learning goals in a free 30-minute consultation call:
            </p>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://calendly.com/mariraj-thiyanayugi/30min" 
                   style="display: inline-block; 
                          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
                          color: white; 
                          padding: 16px 40px; 
                          text-decoration: none; 
                          border-radius: 10px; 
                          font-weight: bold; 
                          font-size: 15px; 
                          box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);">
                    📅 Schedule Your Free Call
                </a>
            </div>
            
            <p style="margin: 20px 0 0 0; text-align: center; font-size: 14px; color: #64748b;">
                Pick a time that works best for you - I'm looking forward to connecting!
            </p>
        </div>
        
        <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #1e293b;">Best regards,<br><b>Thiyanayugi Mariraj</b></p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">
                M.Sc. Automation &amp; Robotics | TU Dortmund
            </p>
        </div>
    </div>
    <div style="margin-top: 25px; padding: 20px; text-align: center; font-size: 14px; background-color: #1e293b; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; color: #94a3b8;">
            © 2025 Thiyanayugi Mariraj | Dortmund, Germany
        </p>
        <div style="margin: 0;">
            <a href="https://linkedin.com/in/thiyanayugi-mariraj-a2b1b820b" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            <a href="mailto:mariraj.thiyanayugi@gmail.com" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">Email</a>
            <a href="https://calendly.com/mariraj-thiyanayugi/30min" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">Book Appointment</a>
        </div>
    </div>
</body>
</html>
"""
    
    # Create message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"Thiyanayugi Mariraj <{sender_email}>"
    msg['To'] = to_email
    
    # Attach both plain text and HTML versions
    msg.attach(MIMEText(body, 'plain'))
    msg.attach(MIMEText(html_body, 'html'))
    
    try:
        # Connect to Gmail SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, password)
            server.send_message(msg)
        
        print("✅ Email sent successfully via SMTP!")
        return True
    except Exception as e:
        print(f"❌ SMTP Error: {type(e).__name__}: {str(e)}")
        raise


def _send_via_sendgrid(to_email: str, subject: str, body: str, sender_email: str, api_key: str):
    """Send email via SendGrid API (works on Railway)."""
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail, Email, To, Content
    
    # Create HTML version
    html_body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 24px;">🎓 Your Learning Journey Starts Here!</h2>
    </div>
    <div style="background-color: white; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="white-space: pre-wrap; line-height: 1.8; color: #1e293b;">{body}</div>
        
        <div style="margin-top: 30px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
            <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">
                Let's discuss your learning goals in a free 30-minute consultation call:
            </p>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://calendly.com/mariraj-thiyanayugi/30min" 
                   style="display: inline-block; 
                          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
                          color: white; 
                          padding: 16px 40px; 
                          text-decoration: none; 
                          border-radius: 10px; 
                          font-weight: bold; 
                          font-size: 15px; 
                          box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);">
                    📅 Schedule Your Free Call
                </a>
            </div>
            
            <p style="margin: 20px 0 0 0; text-align: center; font-size: 14px; color: #64748b;">
                Pick a time that works best for you - I'm looking forward to connecting!
            </p>
        </div>
        
        <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #1e293b;">Best regards,<br><b>Thiyanayugi Mariraj</b></p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">
                M.Sc. Automation &amp; Robotics | TU Dortmund
            </p>
        </div>
    </div>
    <div style="margin-top: 25px; padding: 20px; text-align: center; font-size: 14px; background-color: #1e293b; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; color: #94a3b8;">
            © 2025 Thiyanayugi Mariraj | Dortmund, Germany
        </p>
        <div style="margin: 0;">
            <a href="https://linkedin.com/in/thiyanayugi-mariraj-a2b1b820b" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            <a href="mailto:mariraj.thiyanayugi@gmail.com" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">Email</a>
            <a href="https://calendly.com/mariraj-thiyanayugi/30min" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">Book Appointment</a>
        </div>
    </div>
</body>
</html>
"""
    
    message = Mail(
        from_email=Email(sender_email, "Thiyanayugi Mariraj - AI Teaching"),
        to_emails=To(to_email),
        subject=subject,
        plain_text_content=Content("text/plain", body),
        html_content=Content("text/html", html_body)
    )
    
    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        print(f"✅ Email sent successfully via SendGrid! Status code: {response.status_code}")
        return True
    except Exception as e:
        print(f"❌ SendGrid Error: {type(e).__name__}: {str(e)}")
        raise
