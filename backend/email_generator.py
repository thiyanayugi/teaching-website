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
    language = data.get('language', 'en')
    
    # Language-specific instructions
    lang_instructions = {
        'en': 'Write the email in English.',
        'de': 'Write the email in German (Deutsch). Use formal "Sie" form for addressing the student.'
    }
    
    prompt = f"""You are Thiyanayugi Mariraj, a Master's student in Automation & Robotics at TU Dortmund 
with expertise in AI and automation. Generate a warm, personalized email response to a potential student.

IMPORTANT: {lang_instructions.get(language, lang_instructions['en'])}

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
1. Starts directly with the main content (NO greeting like "Hi [Name]" - the template already has "Hello {{name}}!")
2. Shows genuine excitement about their specific interest and learning goals
3. Acknowledges their background and experience level positively
4. Suggests 2-3 concrete, actionable learning paths or project ideas tailored to their level
5. Mentions 1-2 relevant projects or experiences you've had that relate to their interests
6. Ends with an encouraging message inviting them to take the next step
7. Keeps an encouraging, supportive, and professional tone
8. Is concise (250-350 words)

CRITICAL FORMATTING RULES:
- DO NOT include any greeting (no "Hi", "Hello", "Dear", etc.) - start directly with the content
- DO NOT include a subject line in the email body
- DO NOT mention Calendly or booking links in the email content (this will be added automatically in the template)
- **STRICTLY FORBIDDEN:** Do NOT use markdown bolding (like **text**). You MUST use HTML <b>text</b> tags for emphasis.
- Use line breaks and spacing for visual clarity
- Keep paragraphs short (2-3 sentences max)
- Use bullet points with - or • for lists

DO NOT include any sign-off or signature - this will be added automatically."""

    message = get_anthropic_client().messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return message.content[0].text

def import_uuid():
    """Helper to generate UUID for email uniqueness."""
    import uuid
    return str(uuid.uuid4())

def send_email(to_email: str, subject: str, body: str, name: str = "there", language: str = "en"):
    """Send email via Gmail SMTP."""
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    
    sender_email = os.getenv('GMAIL_ADDRESS', 'mariraj.thiyanayugi@gmail.com')
    gmail_password = os.getenv('GMAIL_PASSWORD')
    
    if not gmail_password:
        raise ValueError("GMAIL_PASSWORD not configured. Please set it in environment variables")
    
    print(f"📧 Sending email from {sender_email} to {to_email} via Gmail SMTP (Language: {language})")
    
    # Language-specific translations
    translations = {
        'en': {
            'header_title': 'Your Learning Journey Starts Here!',
            'header_subtitle': 'Personalized AI & Automation Guidance',
            'greeting': 'WELCOME',
            'signoff': 'Best Regards,',
            'cta_title': 'Ready to Take the Next Step?',
            'cta_subtitle': "Let's discuss your learning goals in a free 30-minute consultation",
            'cta_button': 'Schedule Your Free Call',
            'cta_note': 'Pick a time that works best for you',
            'footer_text': '© 2025 Thiyanayugi Mariraj | Dortmund, Germany',
            'footer_linkedin': 'LinkedIn',
            'footer_contact': 'Contact',
            'footer_book': 'Book a Call'
        },
        'de': {
            'header_title': 'Ihre Lernreise beginnt hier!',
            'header_subtitle': 'Personalisierte KI & Automatisierungs-Beratung',
            'greeting': 'WILLKOMMEN',
            'signoff': 'Mit freundlichen Grüßen,',
            'cta_title': 'Bereit für den nächsten Schritt?',
            'cta_subtitle': 'Lassen Sie uns Ihre Lernziele in einer kostenlosen 30-minütigen Beratung besprechen',
            'cta_button': 'Kostenloses Gespräch vereinbaren',
            'cta_note': 'Wählen Sie eine Zeit, die Ihnen am besten passt',
            'footer_text': '© 2025 Thiyanayugi Mariraj | Dortmund, Deutschland',
            'footer_linkedin': 'LinkedIn',
            'footer_contact': 'Kontakt',
            'footer_book': 'Termin buchen'
        }
    }
    
    t = translations.get(language, translations['en'])
    
    # Professional HTML Email Template
    html_body = f"""
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Your Learning Path</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <style>
        table {{border-collapse: collapse;}}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {{font-family: Arial, sans-serif;}}
    </style>
    <![endif]-->
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f1f5f9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            -webkit-font-smoothing: antialiased;
        }}
        table {{
            border-spacing: 0;
            border-collapse: collapse;
        }}
        td {{
            padding: 0;
        }}
        img {{
            border: 0;
            display: block;
        }}
        .wrapper {{
            width: 100%;
            background-color: #f1f5f9;
            padding: 40px 20px;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }}
        .header {{
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%);
            padding: 50px 40px;
            text-align: center;
        }}
        .header h1 {{
            color: #ffffff !important;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 12px;
            letter-spacing: -0.5px;
        }}
        .header p {{
            color: rgba(255, 255, 255, 0.9) !important;
            font-size: 16px;
            margin: 0;
        }}
        .content {{
            padding: 45px 40px;
        }}
        .greeting {{
            font-size: 15px;
            color: #3b82f6;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }}
        .recipient-name {{
            font-size: 26px;
            color: #0f172a;
            font-weight: 700;
            margin-bottom: 24px;
        }}
        .message-body {{
            font-size: 16px;
            line-height: 1.8;
            color: #334155;
            white-space: pre-wrap;
        }}
        .message-body b {{
            color: #1e40af;
            font-weight: 600;
        }}
        .divider {{
            height: 2px;
            background: linear-gradient(90deg, #e2e8f0 0%, #3b82f6 50%, #e2e8f0 100%);
            margin: 20px 0;
            border-radius: 1px;
        }}
        .cta-section {{
            text-align: center;
            padding: 20px 40px 35px;
            background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
        }}
        .cta-title {{
            font-size: 18px;
            color: #0f172a;
            font-weight: 600;
            margin-bottom: 8px;
        }}
        .cta-subtitle {{
            font-size: 14px;
            color: #64748b;
            margin-bottom: 24px;
        }}
        .cta-button {{
            display: inline-block;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 18px 45px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.5px;
            box-shadow: 0 10px 30px rgba(30, 64, 175, 0.35);
        }}
        .cta-note {{
            font-size: 13px;
            color: #94a3b8;
            margin-top: 16px;
        }}
        .signature {{
            padding: 35px 40px;
            border-top: 1px solid #e2e8f0;
        }}
        .footer {{
            background: #0f172a;
            padding: 30px 40px;
            text-align: center;
        }}
        .social-links {{
            margin-bottom: 20px;
        }}
        .social-links a {{
            display: inline-block;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            margin: 0 6px;
            line-height: 40px;
            text-align: center;
            text-decoration: none;
        }}
        .social-links a span {{
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
        }}
        .footer-text {{
            color: #94a3b8 !important;
            font-size: 13px;
            margin: 0 0 8px;
        }}
        .footer-links {{
            margin-top: 15px;
        }}
        .footer-links a {{
            color: #60a5fa !important;
            text-decoration: none;
            font-size: 13px;
            margin: 0 12px;
        }}
        .footer-links a:hover {{
            color: #93c5fd !important;
            text-decoration: underline;
        }}
        
        @media only screen and (max-width: 600px) {{
            .wrapper {{ padding: 20px 15px; }}
            .container {{ border-radius: 16px; }}
            .header {{ padding: 35px 25px; }}
            .header h1 {{ font-size: 24px; }}
            .content {{ padding: 30px 25px; }}
            .recipient-name {{ font-size: 22px; }}
            .message-body {{ font-size: 15px; }}
            .cta-section {{ padding: 30px 25px; }}
            .cta-button {{ padding: 16px 35px; font-size: 15px; }}
            .signature {{ padding: 25px; }}
            .footer {{ padding: 25px 20px; }}
        }}
    </style>
</head>
<body>
    <div style="display: none; max-height: 0px; overflow: hidden;">
        Your personalized learning path is ready! Let's start your AI & Automation journey together. 🚀
    </div>

    <div class="wrapper">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <div class="container">
                        
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="header">

                                    <h1 style="color: #ffffff !important;">{t['header_title']}</h1>
                                    <p style="color: rgba(255, 255, 255, 0.9) !important;">{t['header_subtitle']}</p>
                                </td>
                            </tr>
                        </table>
                        
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="content">
                                    <p class="greeting">{t['greeting']}</p>
                                    <p class="recipient-name">Hello {name}! 👋</p>
                                    
                                    <div class="message-body">{body}</div>
                                    
                                    <p style="color: #334155; font-size: 16px; margin-top: 24px; margin-bottom: 4px;">{t['signoff']}</p>
                                    <p style="color: #0f172a; font-size: 16px; font-weight: 700; margin: 0;">Thiyanayugi</p>
                                    
                                    <div class="divider"></div>
                                </td>
                            </tr>
                        </table>
                        
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="cta-section">
                                    <table role="presentation" cellspacing="0" cellpadding="0" align="center" width="100%">
                                        <tr>
                                            <td align="center">
                                                <p class="cta-title">{t['cta_title']}</p>
                                                <p class="cta-subtitle">{t['cta_subtitle']}</p>
                                                
                                                <a href="https://calendly.com/mariraj-thiyanayugi/30min" class="cta-button" target="_blank">
                                                    {t['cta_button']}
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p class="cta-note">{t['cta_note']}</p>
                                </td>
                            </tr>
                        </table>
                        
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="signature">
                                    <table role="presentation" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="vertical-align: top; padding-right: 20px;">
                                                <div style="width: 70px; height: 70px; border-radius: 50%; overflow: hidden; border: 3px solid #3b82f6;">
                                                    <img src="https://teaching-platform-560659035104.europe-west1.run.app/profile.png" alt="Thiyanayugi Mariraj" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; transform: scale(1.6);">
                                                </div>
                                            </td>
                                            <td style="vertical-align: middle;">
                                                <h4 style="color: #0f172a; font-size: 18px; font-weight: 700; margin: 0 0 4px;">Thiyanayugi Mariraj</h4>
                                                <p style="color: #3b82f6; font-size: 14px; font-weight: 600; margin: 0 0 6px;">M.Sc. Automation & Robotics</p>
                                                <p style="color: #64748b; font-size: 13px; margin: 0;">TU Dortmund | AI & Automation Expert</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!-- Footer -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="footer">

                                    
                                    <p class="footer-text" style="color: #94a3b8 !important; margin-bottom: 12px;">{t['footer_text']}</p>
                                    
                                    <div class="footer-links" style="margin-top: 12px;">
                                        <a href="https://linkedin.com/in/thiyanayugi-mariraj-a2b1b820b" style="color: #60a5fa !important; text-decoration: none; margin: 0 8px;">{t['footer_linkedin']}</a>
                                        <span style="color: #475569;">|</span>
                                        <a href="mailto:mariraj.thiyanayugi@gmail.com" style="color: #60a5fa !important; text-decoration: none; margin: 0 8px;">{t['footer_contact']}</a>
                                        <span style="color: #475569;">|</span>
                                        <a href="https://calendly.com/mariraj-thiyanayugi/30min" style="color: #60a5fa !important; text-decoration: none; margin: 0 8px;">{t['footer_book']}</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        </table>
        
        <!-- Invisible unique ID to prevent Gmail truncation/threading -->
        <div style="display: none; max-height: 0px; overflow: hidden; color: transparent; font-size: 0px; line-height: 0px; opacity: 0;">
            {import_uuid()}
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
            server.login(sender_email, gmail_password)
            server.send_message(msg)
        
        print("✅ Email sent successfully via SMTP!")
        return True
    except Exception as e:
        print(f"❌ SMTP Error: {type(e).__name__}: {str(e)}")
        raise
