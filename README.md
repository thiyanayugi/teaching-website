# AI-Powered Teaching Website

A premium, bilingual (English/German) teaching website for AI and Automation courses, featuring advanced animations, AI-powered email generation, and a modern glassmorphism design.

## 🚀 Features

- **Bilingual Support**: Full English and German translations
- **AI-Powered Contact**: Claude Sonnet 4 generates personalized learning paths
- **Modern Design**: Liquid glass animations, smooth transitions, premium aesthetics
- **Responsive Form**: Dynamic animations while typing, smart validation
- **Email Integration**: Automated email sending with Gmail SMTP

## 📋 Prerequisites

- Python 3.9+
- Anthropic API Key
- Gmail account with App Password

## 🛠️ Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd teaching-website
   ```

2. **Set up Python environment**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r ../requirements.txt
   ```

3. **Configure environment variables**

   Create `backend/.env` file:

   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   ```

4. **Run the application**

   ```bash
   python app.py
   ```

   Visit `http://localhost:5000`

## 🚂 Railway Deployment

### Quick Deploy

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Railway**

   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the configuration

3. **Set Environment Variables**

   In Railway dashboard, add these variables:

   - `ANTHROPIC_API_KEY`: Your Anthropic API key
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_APP_PASSWORD`: Your Gmail app password

4. **Deploy**
   - Railway will automatically build and deploy
   - Your site will be live at `https://your-app.railway.app`

### Manual Railway CLI Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set ANTHROPIC_API_KEY=your_key
railway variables set GMAIL_USER=your_email
railway variables set GMAIL_APP_PASSWORD=your_password

# Deploy
railway up
```

## 📁 Project Structure

```
teaching-website/
├── backend/
│   ├── app.py              # Flask application
│   ├── email_generator.py  # AI email generation
│   └── .env               # Environment variables (not in git)
├── frontend/
│   ├── index.html         # Main HTML
│   ├── styles.css         # Styling with animations
│   ├── script.js          # Form handling
│   ├── language-switcher.js  # Bilingual support
│   └── liquid-glass.js    # Glassmorphism effects
├── requirements.txt       # Python dependencies
├── Procfile              # Railway start command
├── railway.json          # Railway configuration
└── .gitignore           # Git ignore rules
```

## 🔧 Technologies

- **Backend**: Flask, Python
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **AI**: Anthropic Claude Sonnet 4
- **Email**: Gmail SMTP
- **Deployment**: Railway
- **Design**: Glassmorphism, CSS animations

## 🎨 Features Breakdown

### Design

- Liquid glass background animations
- Smooth form field animations
- Collapsible About Me section
- Premium dark blue theme
- Responsive design

### Functionality

- Bilingual language switcher (EN/DE)
- AI-generated personalized learning paths
- Automated email sending
- Form validation
- Success/error handling

## 📧 Email Configuration

To enable email functionality:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Add to `.env` file as `GMAIL_APP_PASSWORD`

## 🌐 Environment Variables

| Variable             | Description                       | Required |
| -------------------- | --------------------------------- | -------- |
| `ANTHROPIC_API_KEY`  | Anthropic API key for Claude      | Yes      |
| `GMAIL_USER`         | Gmail address for sending emails  | Yes      |
| `GMAIL_APP_PASSWORD` | Gmail app password (16 chars)     | Yes      |
| `PORT`               | Server port (auto-set by Railway) | No       |

## 📝 License

Private project - All rights reserved

## 👤 Author

**Thiyanayugi Mariraj**

- M.Sc. Automation & Robotics | AI Engineer | Educator
- Location: Dortmund, Germany
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]

---

Built with ❤️ using Flask, Claude AI, and modern web technologies
