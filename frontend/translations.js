// Multi-language translations
const translations = {
    en: {
        faq: {
            title: "❓ Frequently Asked Questions",
            questions: [
                {
                    q: "How does the personalized learning path work?",
                    a: "After you submit the form, I'll use AI to analyze your background, experience level, and goals to create a customized learning roadmap. You'll receive a detailed email with specific project ideas, learning resources, and next steps tailored just for you!"
                },
                {
                    q: "What's included in the 1-on-1 sessions?",
                    a: "Each session is completely personalized to your needs. We'll work on hands-on projects, solve real-world problems, and build practical skills. Sessions include code reviews, project guidance, and direct mentorship from my experience at TU Dortmund and in industry."
                },
                {
                    q: "How much does it cost?",
                    a: "Pricing is flexible based on your needs and goals. After our free 30-minute consultation, I'll provide a customized quote. I offer student discounts and package deals for multiple sessions."
                },
                {
                    q: "Do you teach in English or German?",
                    a: "I'm fluent in both! Sessions can be conducted in English (C2 level) or German (B2 level), whichever you're more comfortable with."
                },
                {
                    q: "How quickly will I receive my personalized learning path?",
                    a: "You'll receive your customized learning path via email within minutes of submitting the form! The AI analyzes your information and generates a detailed, personalized roadmap instantly."
                }
            ]
        },
        loading: {
            title: "Creating Your Personalized Learning Path...",
            step: "Analyzing your background and goals"
        },
        success: {
            title: "Success!",
            message: "Your personalized learning path is on its way!",
            subtitle: "Check your email inbox for your customized roadmap.",
            button: "Awesome!"
        }
    },
    de: {
        faq: {
            title: "❓ Häufig gestellte Fragen",
            questions: [
                {
                    q: "Wie funktioniert der personalisierte Lernpfad?",
                    a: "Nachdem Sie das Formular abgeschickt haben, nutze ich KI, um Ihren Hintergrund, Ihr Erfahrungsniveau und Ihre Ziele zu analysieren und einen maßgeschneiderten Lernplan zu erstellen. Sie erhalten eine detaillierte E-Mail mit spezifischen Projektideen, Lernressourcen und nächsten Schritten, die genau auf Sie zugeschnitten sind!"
                },
                {
                    q: "Was ist in den 1-zu-1-Sitzungen enthalten?",
                    a: "Jede Sitzung ist vollständig auf Ihre Bedürfnisse zugeschnitten. Wir arbeiten an praktischen Projekten, lösen reale Probleme und bauen praktische Fähigkeiten auf. Die Sitzungen umfassen Code-Reviews, Projektberatung und direkte Betreuung aus meiner Erfahrung an der TU Dortmund und in der Industrie."
                },
                {
                    q: "Wie viel kostet es?",
                    a: "Die Preisgestaltung ist flexibel und basiert auf Ihren Bedürfnissen und Zielen. Nach unserer kostenlosen 30-minütigen Beratung erstelle ich Ihnen ein individuelles Angebot. Ich biete Studentenrabatte und Paketangebote für mehrere Sitzungen an."
                },
                {
                    q: "Unterrichten Sie auf Englisch oder Deutsch?",
                    a: "Ich spreche beide Sprachen fließend! Die Sitzungen können auf Englisch (C2-Niveau) oder Deutsch (B2-Niveau) durchgeführt werden, je nachdem, womit Sie sich wohler fühlen."
                },
                {
                    q: "Wie schnell erhalte ich meinen personalisierten Lernpfad?",
                    a: "Sie erhalten Ihren maßgeschneiderten Lernpfad innerhalb von Minuten nach dem Absenden des Formulars per E-Mail! Die KI analysiert Ihre Informationen und erstellt sofort einen detaillierten, personalisierten Fahrplan."
                }
            ]
        },
        loading: {
            title: "Erstelle Ihren personalisierten Lernpfad...",
            step: "Analysiere Ihren Hintergrund und Ihre Ziele"
        },
        success: {
            title: "Erfolg!",
            message: "Ihr personalisierter Lernpfad ist unterwegs!",
            subtitle: "Überprüfen Sie Ihren E-Mail-Posteingang für Ihren maßgeschneiderten Fahrplan.",
            button: "Großartig!"
        }
    }
};

// Update FAQ content based on language
function updateLanguage(lang) {
    const t = translations[lang] || translations.en;
    
    // Update FAQ
    const faqTitle = document.querySelector('.faq-section h3');
    if (faqTitle) faqTitle.textContent = t.faq.title;
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        if (t.faq.questions[index]) {
            const question = item.querySelector('.faq-question span:first-child');
            const answer = item.querySelector('.faq-answer p');
            if (question) question.textContent = t.faq.questions[index].q;
            if (answer) answer.textContent = t.faq.questions[index].a;
        }
    });
    
    // Update loading overlay
    const loadingTitle = document.querySelector('.loader-text h3');
    const loadingStep = document.querySelector('.loading-step');
    if (loadingTitle) loadingTitle.textContent = t.loading.title;
    if (loadingStep) loadingStep.textContent = t.loading.step;
    
    // Update success modal
    const successTitle = document.querySelector('.success-content h2');
    const successMessage = document.querySelector('.success-content p:not(.success-subtitle)');
    const successSubtitle = document.querySelector('.success-subtitle');
    const successButton = document.querySelector('.success-btn');
    if (successTitle) successTitle.textContent = t.success.title;
    if (successMessage) successMessage.textContent = t.success.message;
    if (successSubtitle) successSubtitle.textContent = t.success.subtitle;
    if (successButton) successButton.textContent = t.success.button;
}

// Listen for language change from language-switcher
document.addEventListener('DOMContentLoaded', () => {
    // Initial update based on current page language
    const currentLang = document.documentElement.lang || 'en';
    console.log('Initial language:', currentLang);
    updateLanguage(currentLang);
});

// Listen for custom languageChanged event from language-switcher.js
window.addEventListener('languageChanged', (event) => {
    const newLang = event.detail.language;
    console.log('Language changed to:', newLang);
    updateLanguage(newLang);
});
