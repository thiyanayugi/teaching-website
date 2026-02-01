#!/bin/bash
# Deployment script for Google Cloud Run

# Exit on error
set -e

SERVICE_NAME="teaching-website"
REGION="us-central1"

print_message() {
    echo "=========================================="
    echo "$1"
    echo "=========================================="
}

# Check if we are in Cloud Shell or have gcloud installed
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud CLI is not installed. Please run this script in Google Cloud Shell."
    exit 1
fi

PROJECT_ID=$(gcloud config get-value project)

if [ -z "$PROJECT_ID" ]; then
    echo "Error: No Google Cloud project selected."
    echo "Please set a project using: gcloud config set project [PROJECT_ID]"
    exit 1
fi

print_message "Deploying '$SERVICE_NAME' to project '$PROJECT_ID' in region '$REGION'"

# Ask for confirmation
read -p "Do you want to proceed? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

# Deploy
# Note: Source is '.' because Dockerfile is in the root
print_message "Building and Deploying..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars="ANTHROPIC_API_KEY=PLACEHOLDER_CHANGE_ME_IN_CONSOLE"

print_message "Deployment Complete!"
echo "IMPORTANT: You need to update the ANTHROPIC_API_KEY environment variable in the Cloud Run console if you haven't set it."
