<!-- Updated: 2026-01-30 -->
# Teaching Platform - Complete Technical Documentation

<div align="center">

**Comprehensive Technical Reference & Implementation Guide**

[![Version](https://img.shields.io/badge/Version-1.0.0-success)](https://github.com/thiyanayugi/teaching-website)
[![Status](https://img.shields.io/badge/Status-Production-brightgreen)](https://teaching-platform-560659035104.europe-west1.run.app)
[![Documentation](https://img.shields.io/badge/Docs-Complete-blue)](PROJECT_DOCUMENTATION.md)

_Last Updated: December 8, 2025_

</div>

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Design](#architecture--design)
3. [Technology Stack](#technology-stack)
4. [Core Features](#core-features)
5. [Implementation Details](#implementation-details)
6. [Deployment](#deployment)
7. [API Reference](#api-reference)
8. [Security](#security)

---

## Project Overview

A production-ready, AI-enhanced teaching platform for AI and Automation courses. This platform combines modern web technologies with advanced AI capabilities to deliver personalized learning experiences through intelligent chatbot assistance and automated email generation.

---

## Technology Stack

### Backend

- **Framework**: Flask (Python)
- **AI Integration**: Anthropic Claude API (Claude 3.5 Sonnet)
- **Email Service**: SMTP with Gmail
- **Deployment**: Google Cloud Run
- **Server**: Gunicorn WSGI server

### Frontend

- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with glassmorphism effects
- **Icons**: Unicode emojis (⚡, ✨, 🧬, 🚀)
- **Animations**: CSS transitions and keyframe animations
- **Confetti**: canvas-confetti.js library

### Infrastructure

- **Hosting**: Google Cloud Run (containerized deployment)
- **Version Control**: Git/GitHub
- **Environment**: Python 3.11+
- **Dependencies Management**: requirements.txt

---

## Core Features

### 1. Bilingual Support (English/German)

**Implementation**: `language-switcher.js`

- **Language Toggle**: Smooth transition between English and German
- **Persistent State**: Language preference maintained during session
- **Dynamic Content**: All UI elements update in real-time
- **Translation Coverage**:
  - Hero section
  - About Me section
  - Service cards
  - Form labels and placeholders
  - Button text
  - Footer content

**Key Components**:

```javascript
const translations = {
  en: {
    /* English translations */
  },
  de: {
    /* German translations */
  },
};
```

### 2. AI-Powered Chatbot

**Files**:

- `frontend/chatbot.js` - Main chatbot logic
- `frontend/chatbot.css` - Chatbot styling
- `backend/app.py` - Chat API endpoint

**Features**:

#### Visual Design

- **Avatar**: Custom 3D avatar image (avatar.png) with smart cropping
- **Positioning**: Draggable widget that can be moved anywhere on screen
- **Animations**:
  - Morphing effect: Button expands into chat window
  - Smooth transitions using cubic-bezier easing
  - Content fade-in with delays
- **Styling**:
  - Frosted glass effect with backdrop-filter
  - White robot icon in toggle button with sparkle animation
  - White border and glow effects
  - Circular avatar containers with overflow:hidden for proper cropping

#### Interaction Features

- **Click-Outside-to-Close**: Clicking anywhere outside the chatbot closes it
- **Drag-to-Move**: Entire widget can be dragged by button or header
- **Smart Click Detection**: Distinguishes between clicks and drags (<200ms = click)
- **Message Avatars**: Bot messages show custom avatar, user messages show 👤

#### Technical Implementation

```javascript
class AIChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.apiUrl = "/api/chat";
  }

  // Drag logic with translate3d for smooth movement
  // Click-outside detection
  // Message rendering with avatar images
}
```

**API Integration**:

- Endpoint: `POST /api/chat`
- Uses Claude 3.5 Sonnet for intelligent responses
- Context-aware about courses and instructor background

### 3. Personalized Email Generation

**Files**:

- `backend/email_generator.py` - Email template and AI generation
- `backend/app.py` - Form submission endpoint

**Features**:

#### AI-Generated Content

- **Personalization**: Based on user's:
  - Name and email
  - Topic interest (Automation/AI/Both)
  - Background (Student/Professional/Career Changer/Hobbyist)
  - Experience level (Beginner/Intermediate/Advanced)
  - Specific interests (optional)
  - Goals (optional)
- **Language Detection**: Automatically detects user's language preference
- **Content Structure**:
  - Personalized greeting
  - Tailored learning path recommendations
  - Relevant course suggestions
  - Next steps and call-to-action

#### Email Template Design

- **HTML Email**: Fully styled HTML with inline CSS
- **Responsive**: Mobile-friendly design
- **Branding**:
  - Profile image with zoom effect (scale: 1.6, position: center 30%)
  - Gradient backgrounds
  - Professional signature
  - Social media links (LinkedIn, Email, Calendly)
- **Formatting Rules**:
  - HTML `<b>` tags for emphasis (no markdown)
  - Structured sections with clear hierarchy
  - Unique UUID footer to bypass Gmail duplicate detection

**AI Prompt Engineering**:

```python
# System prompt enforces:
# - HTML <b> tags only (no markdown **)
# - Professional yet friendly tone
# - Specific course recommendations
# - Actionable next steps
```

### 4. Interactive UI Components

#### Hero Section

- **Gradient Background**: Linear gradient from dark blue to light blue
- **Floating Blobs**: 5 animated liquid glass blobs with different speeds
- **Profile Image**:
  - Circular frame with rotating gradient border
  - Hover scale effect
  - Floating animation
- **CTA Button**: Animated gradient with hover effects

#### About Me Section

- **Collapsible Design**: Expands/collapses with smooth animation
- **Content**:
  - Introduction text
  - Highlight cards (Academic, Professional, Achievement)
  - Core Competencies grid (4 cards)
  - Professional Certifications (AWS, DeepLearning.AI, LinkedIn Learning)
- **Styling**: Glassmorphic cards with backdrop blur

#### What I Teach Section

- **Service Cards**:
  - Automation (⚡ icon)
  - Artificial Intelligence (✨ icon)
- **Features List**: Bullet points with checkmarks
- **Hover Effects**: Card lift and shadow enhancement

#### Contact Form

- **Fields**:

  - Name\* (required)
  - Email\* (required)
  - Topic\* (Automation/AI/Both) with icons
  - Background\* (Student/Professional/Career Changer/Hobbyist)
  - Experience Level\* (Beginner/Intermediate/Advanced)
  - Specific Interest (optional) - with "Optional" tag
  - Goals (optional) - with "Optional" tag

- **Validation**: HTML5 required fields
- **Loading State**: DNA emoji (🧬) with pulsing animation
- **Success State**: Confetti celebration with success message
- **Styling**:
  - Gradient borders on focus
  - Smooth transitions
  - Consistent placeholder colors (#94a3b8)
  - Optional tags in italic grey

### 5. Visual Design System

#### Color Palette

```css
:root {
  --primary: #1e40af; /* Deep Blue */
  --accent: #3b82f6; /* Bright Blue */
  --dark: #0f172a; /* Almost Black */
  --gray: #64748b; /* Medium Gray */
  --light: #f8fafc; /* Off White */
}
```

#### Typography

- **Font Family**: 'Inter', sans-serif (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear heading sizes with proper line heights

#### Effects

- **Glassmorphism**:
  ```css
  backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.9);
  ```
- **Shadows**: Layered box-shadows for depth
- **Animations**: Cubic-bezier easing for natural motion
- **Gradients**: Linear and radial gradients throughout

---

## File Structure

```
teaching-website/
├── backend/
│   ├── app.py                 # Flask application, routes
│   ├── email_generator.py     # Email template & AI generation
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── index.html            # Main HTML structure
│   ├── styles.css            # Global styles, layout
│   ├── interactive-features.css  # Animations, effects
│   ├── certifications.css    # Certification cards styling
│   ├── chatbot.css          # Chatbot widget styles
│   ├── chatbot.js           # Chatbot functionality
│   ├── language-switcher.js # Bilingual support
│   ├── liquid-glass.js      # Animated blob effects
│   ├── avatar.png           # Chatbot avatar image
│   └── deeplearning-logo.jpg # Certification logo
├── Dockerfile               # Container configuration
├── .gcloudignore           # Cloud deployment exclusions
└── requirements.txt        # Root Python dependencies
```

---

## Key Implementation Details

### 1. Chatbot Morphing Animation

**CSS Approach**:

```css
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
}

.chatbot-window {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px; /* Start small */
  height: 60px;
  border-radius: 50%; /* Start round */
  transition: width 0.5s, height 0.5s, border-radius 0.5s;
}

.chatbot-window.active {
  width: 380px;
  height: 550px;
  bottom: 20px;
  border-radius: 20px; /* Morph to rounded rectangle */
}
```

**Button Behavior**:

```css
.chatbot-button.active {
  transform: scale(0) rotate(90deg);
  opacity: 0;
  pointer-events: none;
}
```

### 2. Draggable Widget Implementation

**JavaScript Logic**:

```javascript
let isDragging = false;
let currentX, currentY, initialX, initialY;
let xOffset = 0,
  yOffset = 0;

const dragStart = (e) => {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  isDragging = true;
  dragStartTime = new Date().getTime();
};

const drag = (e) => {
  if (isDragging) {
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    xOffset = currentX;
    yOffset = currentY;
    element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  }
};
```

### 3. Avatar Image Cropping

**Problem**: Scaled images protruding from circular containers

**Solution**:

```css
.chatbot-avatar,
.message-avatar {
  overflow: hidden; /* Clip content */
  border-radius: 50%;
}

/* Image inside */
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%; /* Focus on face */
  transform: scale(1.5); /* Zoom in */
}
```

### 4. Email Image Zoom

**Technique**: Negative margins with overflow hidden

```html
<div style="overflow: hidden; border-radius: 50%; width: 80px; height: 80px;">
  <img
    src="profile.jpg"
    style="width: 120%; height: 120%; 
                object-fit: cover; 
                object-position: center 30%;
                transform: scale(1.6);
                margin: -10px;"
  />
</div>
```

### 5. Form Optional Tags

**HTML**:

```html
<label for="interest">
  Specific Interest
  <span class="optional-tag">Optional</span>
</label>
```

**CSS**:

```css
.optional-tag {
  font-style: italic;
  color: #94a3b8;
  font-weight: 400;
}
```

**Bilingual Support**:

- English: "Optional"
- German: "Optional" (same word, styled consistently)

---

## API Endpoints

### 1. Chat Endpoint

```
POST /api/chat
Content-Type: application/json

Request:
{
    "message": "What courses do you offer?"
}

Response:
{
    "response": "I offer courses in AI and Automation..."
}
```

### 2. Contact Form Endpoint

```
POST /submit
Content-Type: application/json

Request:
{
    "name": "John Doe",
    "email": "john@example.com",
    "topic": "ai",
    "background": "professional",
    "experience": "intermediate",
    "interest": "LLM agents",
    "goal": "Build AI chatbots",
    "language": "en"
}

Response:
{
    "success": true,
    "message": "Email sent successfully!"
}
```

---

## Environment Variables

Required for deployment:

```bash
ANTHROPIC_API_KEY="sk-ant-api03-..."  # Claude API key
GMAIL_ADDRESS="your-email@gmail.com"   # Sender email
GMAIL_PASSWORD="app-specific-password" # Gmail app password
PORT=8080                               # Server port (Cloud Run sets this)
```

---

## Deployment Configuration

### Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 backend.app:app
```

### Cloud Run Settings

- **Region**: europe-west1
- **Platform**: Managed
- **Authentication**: Allow unauthenticated
- **Auto-scaling**: Enabled
- **Container Port**: 8080

---

## Design Patterns & Best Practices

### 1. Progressive Enhancement

- Core functionality works without JavaScript
- Enhanced interactions with JS enabled
- Graceful degradation for older browsers

### 2. Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible grid layouts
- Touch-friendly interactions

### 3. Performance Optimization

- CSS transitions over JavaScript animations
- `will-change` for animated elements
- Lazy loading for images
- Minimal external dependencies

### 4. Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast

### 5. Code Organization

- Separation of concerns (HTML/CSS/JS)
- Modular CSS files by feature
- Clear naming conventions
- Commented code sections

---

## Animation Specifications

### Chatbot Morphing

- **Duration**: 0.5s
- **Easing**: cubic-bezier(0.19, 1, 0.22, 1) - "Apple-style spring"
- **Properties**: width, height, border-radius, bottom, right

### Content Fade-In

- **Duration**: 0.3s
- **Delay**: 0.2s (after window expansion)
- **Easing**: ease

### Button Sparkle

- **Duration**: 3s
- **Easing**: ease-in-out
- **Loop**: infinite
- **Effect**: Scale and rotate

### Liquid Blobs

- **Duration**: 18s - 25s (varied)
- **Easing**: ease-in-out
- **Loop**: infinite
- **Effect**: Position and border-radius morphing

---

## Icon System

All icons use Unicode emojis for:

- Zero dependencies
- Perfect scaling
- Consistent rendering
- Easy maintenance

**Icon Mapping**:

- ⚡ - Automation/High Voltage
- ✨ - AI/Sparkles
- 🧬 - Loading/DNA
- 🚀 - Both topics/Rocket
- 🤖 - Robot (previous chatbot icon)
- 👤 - User avatar

---

## Browser Compatibility

**Tested & Supported**:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**CSS Features Used**:

- CSS Grid
- Flexbox
- Custom Properties (CSS Variables)
- backdrop-filter (with fallbacks)
- CSS Transitions & Animations

---

## Security Considerations

### Implemented

- Environment variables for sensitive data
- HTTPS enforcement (Cloud Run)
- Input validation on forms
- Email sanitization
- CORS configuration

### Recommended for Production

- CSRF protection
- Rate limiting on API endpoints
- Input sanitization for AI prompts
- Google Cloud Secret Manager for credentials
- Content Security Policy headers

---

## Future Enhancement Opportunities

1. **User Authentication**: Login system for personalized experiences
2. **Course Catalog**: Detailed course pages with enrollment
3. **Payment Integration**: Stripe/PayPal for course purchases
4. **Student Dashboard**: Track progress and assignments
5. **Video Integration**: Embedded course preview videos
6. **Blog Section**: Educational content and updates
7. **Analytics**: Google Analytics or custom tracking
8. **A/B Testing**: Optimize conversion rates
9. **Multi-language**: Expand beyond English/German
10. **Mobile App**: Native iOS/Android applications

---

## Maintenance & Updates

### Regular Tasks

- Update Python dependencies monthly
- Monitor API usage and costs
- Review and respond to form submissions
- Update course content and certifications
- Check for broken links
- Monitor error logs in Cloud Run

### Version Control

- Main branch: Production-ready code
- Feature branches for new developments
- Semantic versioning for releases
- Detailed commit messages

---

## Credits & Resources

### Libraries & Tools

- **Flask**: Web framework
- **Anthropic Claude**: AI language model
- **Google Fonts**: Inter font family
- **canvas-confetti**: Celebration effects
- **Google Cloud Run**: Hosting platform

### Design Inspiration

- Modern glassmorphism trends
- Apple's design language (animations)
- Material Design principles
- Minimalist UI patterns

---

## Contact & Support

**Developer**: Thiyanayugi Mariraj
**Email**: yugimariraj01@gmail.com
**Location**: Dortmund, Germany

---

_Last Updated: December 7, 2025_
_Version: 1.0.0_
