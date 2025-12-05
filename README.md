# AI-Powered Teaching Platform

A modern, responsive web application that generates personalized learning paths using Claude AI and delivers them via email.

## 🎯 Overview

This platform allows students to receive AI-generated, personalized learning recommendations based on their background, experience level, and learning goals. The system uses Anthropic's Claude Sonnet 4 to create tailored educational content and SendGrid to deliver professional email responses.

## ✨ Key Features

- **AI-Powered Personalization**: Claude Sonnet 4 generates custom learning paths based on user input
- **Professional Email Delivery**: Automated emails with personalized content via SendGrid
- **Modern UI/UX**: Liquid glass morphism design with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Bilingual Support**: English and German language options
- **Interactive Sections**: Collapsible About Me and What I Teach sections

## 🛠️ Technology Stack

### Frontend

- HTML5, CSS3, Vanilla JavaScript
- Glass-morphism design aesthetic
- Responsive grid layouts

### Backend

- Flask (Python web framework)
- Flask-CORS for cross-origin requests
- Anthropic Claude API for AI generation
- SendGrid API for email delivery

### Deployment

- Railway (automated deployment)
- Gunicorn WSGI server

## 📋 Prerequisites

- Python 3.8+
- Anthropic API key
- SendGrid API key
- Gmail account (for sender email)

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd teaching-website
   ```

2. **Set up environment variables**

   ```bash
   cp backend/.env.example backend/.env
   ```

   Configure the following in `backend/.env`:

   - `ANTHROPIC_API_KEY`: Your Anthropic API key
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `GMAIL_USER`: Your sender email address

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run locally**

   ```bash
   cd backend
   python app.py
   ```

   Access the application at `http://localhost:5000`

## 🌐 Deployment

The application is configured for automatic deployment on Railway:

1. Push to the main branch
2. Railway automatically builds and deploys
3. Environment variables are managed in Railway dashboard

**Live URL**: https://web-production-543c9.up.railway.app

## 📧 Email Features

- Personalized learning path recommendations
- Professional HTML email templates
- Calendly integration for consultation booking
- Responsive email design

## 🎨 Design Highlights

- **Liquid Glass Aesthetic**: iOS-style glass morphism throughout
- **Smooth Animations**: Morphing containers and hover effects
- **Accessible**: WCAG-compliant color contrasts and semantic HTML
- **Performance**: Optimized assets and efficient CSS

## 📝 Project Structure

```
teaching-website/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Styling and animations
│   └── script.js           # Client-side logic
├── backend/
│   ├── app.py              # Flask application
│   └── email_generator.py  # AI and email logic
├── requirements.txt        # Python dependencies
└── railway.json           # Railway configuration
```

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration for API security
- Input validation on form submissions
- Secure API key handling

## 📄 License

This project is part of a personal portfolio.

## 👤 Author

**Thiyanayugi Mariraj**  
M.Sc. Automation & Robotics | TU Dortmund

- LinkedIn: [thiyanayugi-mariraj](https://linkedin.com/in/thiyanayugi-mariraj-a2b1b820b)
- Email: mariraj.thiyanayugi@gmail.com
- Location: Dortmund, Germany
