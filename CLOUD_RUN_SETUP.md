# Google Cloud Run Deployment Guide

## Prerequisites

1. **Google Cloud Account** - Sign up at https://cloud.google.com
2. **gcloud CLI** - Install from https://cloud.google.com/sdk/docs/install
3. **Docker** (optional) - For local testing

## Setup Steps

### 1. Initialize Google Cloud

```bash
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create teaching-platform-ai --name="AI Teaching Platform"

# Set the project
gcloud config set project teaching-platform-ai

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Set Environment Variables

Create a `.env.yaml` file (DO NOT commit this):

```yaml
ANTHROPIC_API_KEY: "your-anthropic-api-key"
GMAIL_ADDRESS: "mariraj.thiyanayugi@gmail.com"
GMAIL_PASSWORD: "your-gmail-app-password"
```

### 3. Deploy to Cloud Run

```bash
# Deploy from source (Cloud Run will build automatically)
gcloud run deploy teaching-platform \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --env-vars-file .env.yaml \
  --memory 512Mi \
  --timeout 300

# Or build and deploy with Docker
gcloud builds submit --tag gcr.io/teaching-platform-ai/teaching-platform
gcloud run deploy teaching-platform \
  --image gcr.io/teaching-platform-ai/teaching-platform \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --env-vars-file .env.yaml
```

### 4. Set Environment Variables (Alternative)

Instead of `.env.yaml`, you can set them via command:

```bash
gcloud run services update teaching-platform \
  --update-env-vars ANTHROPIC_API_KEY="your-key" \
  --update-env-vars GMAIL_ADDRESS="your-email" \
  --update-env-vars GMAIL_PASSWORD="your-password"
```

## Gmail App Password Setup

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Generate an App Password for "Mail"
5. Use this password in `GMAIL_PASSWORD` environment variable

## Benefits of Cloud Run

✅ **SMTP Support** - Fast email delivery
✅ **Auto-scaling** - Scales to zero when not in use
✅ **Free Tier** - 2 million requests/month free
✅ **Fast Cold Starts** - Better than Railway
✅ **Custom Domains** - Easy to set up

## Monitoring

View logs:

```bash
gcloud run services logs read teaching-platform --limit=50
```

## Cost Estimate

- **Free tier**: 2M requests, 360,000 GB-seconds/month
- **Your usage**: Likely stays in free tier
- **Estimated cost**: $0/month

## Troubleshooting

**Port issues**: Cloud Run sets `PORT` env variable automatically
**Timeout**: Increased to 300s for AI generation
**Memory**: 512Mi should be sufficient

## Your Live URL

After deployment, you'll get a URL like:
`https://teaching-platform-xxxxxxxxx-uc.a.run.app`
