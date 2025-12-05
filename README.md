# AI Teaching Platform

A modern web application that generates personalized learning paths using Claude AI and delivers them via email.

## Features

- AI-powered personalized learning recommendations
- Instant email delivery via Gmail SMTP
- Modern liquid glass UI design
- Responsive and mobile-friendly
- Bilingual support (English/German)

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask, Python
- **AI**: Anthropic Claude Sonnet 4
- **Email**: Gmail SMTP
- **Deployment**: Google Cloud Run

## Setup

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Configure environment variables in `backend/.env`:
   - `ANTHROPIC_API_KEY`
   - `GMAIL_ADDRESS`
   - `GMAIL_PASSWORD`
4. Run locally: `cd backend && python app.py`

## Live Demo

https://teaching-platform-560659035104.europe-west1.run.app

## Author

**Thiyanayugi Mariraj**  
M.Sc. Automation & Robotics | TU Dortmund

- [LinkedIn](https://linkedin.com/in/thiyanayugi-mariraj-a2b1b820b)
- Email: mariraj.thiyanayugi@gmail.com
