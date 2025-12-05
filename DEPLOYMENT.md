# 🚀 Railway Deployment Guide

## Quick Start (5 Minutes)

### Option 1: Deploy from GitHub (Recommended)

1. **Create GitHub Repository**

   ```bash
   # Already initialized! Now push to GitHub:
   git remote add origin https://github.com/YOUR_USERNAME/teaching-website.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Railway**

   - Visit [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway auto-detects configuration ✅

3. **Add Environment Variables**

   In Railway dashboard → Variables tab:

   ```
   ANTHROPIC_API_KEY = your_anthropic_api_key
   GMAIL_USER = your_email@gmail.com
   GMAIL_APP_PASSWORD = your_16_char_app_password
   ```

4. **Done!** 🎉
   - Railway builds and deploys automatically
   - Your site is live at: `https://your-app.railway.app`

---

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to new project
railway init

# Set environment variables
railway variables set ANTHROPIC_API_KEY=sk-ant-...
railway variables set GMAIL_USER=your@gmail.com
railway variables set GMAIL_APP_PASSWORD=abcd1234efgh5678

# Deploy!
railway up
```

---

## 📋 Pre-Deployment Checklist

- ✅ `requirements.txt` created
- ✅ `Procfile` created
- ✅ `railway.json` created
- ✅ `.gitignore` created
- ✅ `app.py` updated with PORT support
- ✅ Git repository initialized
- ⏳ Push to GitHub
- ⏳ Deploy on Railway
- ⏳ Add environment variables

---

## 🔑 Getting Your API Keys

### Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up/Login
3. Navigate to API Keys
4. Create new key
5. Copy the key (starts with `sk-ant-`)

### Gmail App Password

1. Enable 2-Factor Authentication on Gmail
2. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
3. Click "2-Step Verification" → "App passwords"
4. Select "Mail" and your device
5. Copy the 16-character password (no spaces)

---

## 🐛 Troubleshooting

### Build Fails

- Check `requirements.txt` has all dependencies
- Ensure Python version is 3.9+

### App Crashes

- Verify all environment variables are set
- Check Railway logs for errors

### Email Not Sending

- Confirm Gmail App Password is correct (16 chars, no spaces)
- Ensure 2FA is enabled on Gmail account

---

## 📊 What Railway Does

1. **Detects** your Python app from `requirements.txt`
2. **Installs** dependencies with pip
3. **Runs** the command from `Procfile`
4. **Exposes** your app on a public URL
5. **Auto-deploys** on every git push

---

## 🎯 Next Steps After Deployment

1. Test the live site
2. Share the URL
3. Monitor Railway logs
4. Set up custom domain (optional)

---

**Need help?** Check [Railway Docs](https://docs.railway.app) or Railway Discord
