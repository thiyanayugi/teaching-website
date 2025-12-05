# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Cloud Run will set PORT env variable)
ENV PORT=8080

# Change to backend directory and run the application
WORKDIR /app/backend
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
