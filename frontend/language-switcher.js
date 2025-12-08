// Language Switcher Functionality
const translations = {
    en: {
        // Hero
        greeting: "Hello, I'm",
        name: "Thiyanayugi Mariraj",
        tagline: "M.Sc. Automation & Robotics | AI Engineer | Educator",
        intro: "With hands-on experience in both research and industry, I bridge the gap between cutting-edge AI research and practical engineering applications.",
        ctaButton: "Start Learning →",
        
        // About Me
        aboutMe: "About Me",
        aboutIntro: "With hands-on experience in both research and industry, I bridge the gap between cutting-edge AI research and practical engineering applications.",
        academicTitle: "Academic Excellence",
        academicText: "M.Sc. Automation & Robotics at TU Dortmund | B.E. Robotics & Automation from PSG College of Technology, India",
        experienceTitle: "Professional Experience",
        experienceText: "Research Assistant at TU Dortmund's Information Processing Lab | Robotics Engineering Intern at Pricol Limited",
        achievementTitle: "Recent Achievement",
        achievementText: "Completed Master's Thesis on 6G-enabled collaborative robotics with Graph Neural Networks for warehouse automation",
        competenciesTitle: "Core Competencies",
        
        // Competencies
        aiMLTitle: "AI & Machine Learning",
        aiMLItems: ["LLM Fine-tuning & Prompt Engineering", "RAG & Vector Databases", "Multi-agent Systems (LangChain)", "Deep Learning (PyTorch/TensorFlow)", "Natural Language Processing"],
        roboticsTitle: "Robotics & Automation",
        roboticsItems: ["ROS Framework & Development", "Computer Vision & Object Detection", "Sensor Fusion & SLAM", "Path Planning & Navigation", "Industrial Automation Systems"],
        devTitle: "Development & Deployment",
        devItems: ["Python, C++, SQL", "AWS SageMaker & Cloud ML", "MLOps & Model Deployment", "Docker & Containerization", "Git, Linux, Agile Methods"],
        commTitle: "Communication",
        commItems: ["English (Fluent/C2)", "German (B2)", "Tamil (Native)", "Technical Documentation", "Cross-functional Collaboration"],
        
        // Services
        servicesTitle: "What I Teach",
        automationTitle: "Automation",
        automationItems: ["Industrial Automation", "Process Control", "PLC Programming", "SCADA Systems"],
        automationTag: "Engineering",
        aiTitle: "Artificial Intelligence",
        aiItems: ["Machine Learning", "Deep Learning", "NLP & LLMs", "Computer Vision"],
        aiTag: "AI/ML",
        
        // Contact Form
        contactTitle: "Let's Start Your Learning Journey",
        contactSubtitle: "Tell me about yourself and I'll craft a personalized learning path for you.",
        formName: "Your Name *",
        formEmail: "Email Address *",
        formTopic: "I Want to Learn *",
        formTopicPlaceholder: "Select a topic...",
        formTopicAutomation: "⚡ Automation",
        formTopicAI: "✨ Artificial Intelligence",
        formTopicBoth: "🚀 Both",
        formBackground: "My Background *",
        formBackgroundPlaceholder: "Select your background...",
        formBackgroundStudent: "📚 Student",
        formBackgroundProfessional: "💼 Professional",
        formBackgroundCareerChanger: "🔄 Career Changer",
        formBackgroundHobbyist: "🎯 Hobbyist/Self-Learner",
        formExperience: "Experience Level *",
        formExperiencePlaceholder: "Select your level...",
        formExperienceBeginner: "🌱 Beginner",
        formExperienceIntermediate: "📈 Intermediate",
        formExperienceAdvanced: "🚀 Advanced",
        formInterest: "Specific Interest <span style=\"font-style: italic; color: #94a3b8; font-weight: 400;\">(optional)</span>",
        formInterestPlaceholder: "e.g., Building chatbots with LLMs... / Automating warehouse robots...",
        formGoal: "What do you want to achieve? <span style=\"font-style: italic; color: #94a3b8; font-weight: 400;\">(optional)</span>",
        formGoalPlaceholder: "e.g., I want to build AI agents for my startup... / I need to automate workflows at my company...",
        formSubmit: "Get My Personalized Learning Path",
        
        // Footer
        footer: "© 2025 Thiyanayugi Mariraj | Dortmund, Germany",
        footerLinkedIn: "LinkedIn",
        footerEmail: "Email",
        footerBooking: "Book Appointment"
    },
    de: {
        // Hero
        greeting: "Hallo, ich bin",
        name: "Thiyanayugi Mariraj",
        tagline: "M.Sc. Automatisierung & Robotik | KI-Ingenieur | Dozent",
        intro: "Mit praktischer Erfahrung in Forschung und Industrie überbrücke ich die Lücke zwischen modernster KI-Forschung und praktischen Ingenieuranwendungen.",
        ctaButton: "Jetzt lernen →",
        
        // About Me
        aboutMe: "Über Mich",
        aboutIntro: "Mit praktischer Erfahrung in Forschung und Industrie überbrücke ich die Lücke zwischen modernster KI-Forschung und praktischen Ingenieuranwendungen.",
        academicTitle: "Akademische Exzellenz",
        academicText: "M.Sc. Automatisierung & Robotik an der TU Dortmund | B.E. Robotik & Automatisierung vom PSG College of Technology, Indien",
        experienceTitle: "Berufserfahrung",
        experienceText: "Wissenschaftlicher Mitarbeiter am Informationsverarbeitungslabor der TU Dortmund | Robotik-Ingenieur-Praktikant bei Pricol Limited",
        achievementTitle: "Jüngste Leistung",
        achievementText: "Abgeschlossene Masterarbeit über 6G-fähige kollaborative Robotik mit Graph Neural Networks für Lagerautomatisierung",
        competenciesTitle: "Kernkompetenzen",
        
        // Competencies
        aiMLTitle: "KI & Maschinelles Lernen",
        aiMLItems: ["LLM-Feinabstimmung & Prompt Engineering", "RAG & Vektordatenbanken", "Multi-Agenten-Systeme (LangChain)", "Deep Learning (PyTorch/TensorFlow)", "Natürliche Sprachverarbeitung"],
        roboticsTitle: "Robotik & Automatisierung",
        roboticsItems: ["ROS Framework & Entwicklung", "Computer Vision & Objekterkennung", "Sensorfusion & SLAM", "Pfadplanung & Navigation", "Industrielle Automatisierungssysteme"],
        devTitle: "Entwicklung & Bereitstellung",
        devItems: ["Python, C++, SQL", "AWS SageMaker & Cloud ML", "MLOps & Modellbereitstellung", "Docker & Containerisierung", "Git, Linux, Agile Methoden"],
        commTitle: "Kommunikation",
        commItems: ["Englisch (Fließend/C2)", "Deutsch (B2)", "Tamil (Muttersprache)", "Technische Dokumentation", "Funktionsübergreifende Zusammenarbeit"],
        
        // Services
        servicesTitle: "Was Ich Lehre",
        automationTitle: "Automatisierung",
        automationItems: ["Industrielle Automatisierung", "Prozesssteuerung", "SPS-Programmierung", "SCADA-Systeme"],
        automationTag: "Ingenieurwesen",
        aiTitle: "Künstliche Intelligenz",
        aiItems: ["Maschinelles Lernen", "Deep Learning", "NLP & LLMs", "Computer Vision"],
        aiTag: "KI/ML",
        
        // Contact Form
        contactTitle: "Starten Sie Ihre Lernreise",
        contactSubtitle: "Erzählen Sie mir von sich und ich erstelle einen personalisierten Lernpfad für Sie.",
        formName: "Ihr Name *",
        formEmail: "E-Mail-Adresse *",
        formTopic: "Ich möchte lernen *",
        formTopicPlaceholder: "Thema auswählen...",
        formTopicAutomation: "⚡ Automatisierung",
        formTopicAI: "✨ Künstliche Intelligenz",
        formTopicBoth: "🚀 Beides",
        formBackground: "Mein Hintergrund *",
        formBackgroundPlaceholder: "Hintergrund auswählen...",
        formBackgroundStudent: "📚 Student",
        formBackgroundProfessional: "💼 Berufstätig",
        formBackgroundCareerChanger: "🔄 Karrierewechsler",
        formBackgroundHobbyist: "🎯 Hobbyist/Selbstlerner",
        formExperience: "Erfahrungsstufe *",
        formExperiencePlaceholder: "Stufe auswählen...",
        formExperienceBeginner: "🌱 Anfänger",
        formExperienceIntermediate: "📈 Fortgeschritten",
        formExperienceAdvanced: "🚀 Experte",
        formInterest: "Spezifisches Interesse <span class=\"optional-tag\">Optional</span>",
        formInterestPlaceholder: "z.B., Chatbots mit LLMs erstellen... / Lagerroboter automatisieren...",
        formGoal: "Was möchten Sie erreichen? <span class=\"optional-tag\">Optional</span>",
        formGoalPlaceholder: "z.B., Ich möchte KI-Agenten für mein Startup entwickeln... / Ich muss Workflows in meinem Unternehmen automatisieren...",
        formSubmit: "Meinen personalisierten Lernpfad erhalten",
        formBgStudent: "📚 Student",
        formBgProfessional: "💼 Berufstätig",
        formBgResearcher: "🔬 Forscher",
        formBgHobbyist: "🎯 Hobbyist/Selbstlerner",
        formExpBeginner: "🌱 Anfänger",
        formExpIntermediate: "📈 Fortgeschritten",
        formExpAdvanced: "🚀 Experte",
        
        // Footer
        footer: "© 2025 Thiyanayugi Mariraj | Dortmund, Deutschland",
        footerLinkedIn: "LinkedIn",
        footerEmail: "E-Mail",
        footerBooking: "Termin Buchen"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';
    let isTransitioning = false;
    let pendingTimeouts = [];

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const newLang = this.dataset.lang;
            if (newLang === currentLang || isTransitioning) return;

            // Clear any pending timeouts
            pendingTimeouts.forEach(timeout => clearTimeout(timeout));
            pendingTimeouts = [];

            isTransitioning = true;

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update document lang attribute for other scripts
            document.documentElement.lang = newLang;
            
            // Dispatch custom event for translations.js
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));

            // Switch language
            switchLanguage(newLang);
            currentLang = newLang;

            // Reset transitioning flag after all animations complete
            const resetTimeout = setTimeout(() => {
                isTransitioning = false;
            }, 1000);
            pendingTimeouts.push(resetTimeout);
        });
    });

    function switchLanguage(lang) {
        const t = translations[lang];

        // Fade out all translatable elements (except name)
        const allElements = document.querySelectorAll('.greeting, .tagline, .hero .intro, .cta-button, .about h2, .about .intro-text, .highlight-item h4, .highlight-item p, .expertise-areas h3, .services h2, .service-card h3, .contact h2, .form-subtitle, footer p, .competency-card h4, .competency-card li, .service-card li, .card-tag, label, .submit-btn');
        
        allElements.forEach(el => {
            if (el) el.style.opacity = '0';
        });

        // Wait for fade out, then update all content at once
        setTimeout(() => {
            // Update name immediately without fade
            const nameElement = document.querySelector('.hero h1');
            if (nameElement) nameElement.textContent = t.name;

            // Update main text content
            const elements = {
                '.greeting': t.greeting,
                '.tagline': t.tagline,
                '.hero .intro': t.intro,
                '.cta-button': t.ctaButton,
                '.about h2': t.aboutMe,
                '.about .intro-text': t.aboutIntro,
                '.highlight-item:nth-child(1) h4': t.academicTitle,
                '.highlight-item:nth-child(1) p': t.academicText,
                '.highlight-item:nth-child(2) h4': t.experienceTitle,
                '.highlight-item:nth-child(2) p': t.experienceText,
                '.highlight-item:nth-child(3) h4': t.achievementTitle,
                '.highlight-item:nth-child(3) p': t.achievementText,
                '.expertise-areas h3': t.competenciesTitle,
                '.services h2': t.servicesTitle,
                '.service-card:nth-child(1) h3': t.automationTitle,
                '.service-card:nth-child(2) h3': t.aiTitle,
                '.contact h2': t.contactTitle,
                '.form-subtitle': t.contactSubtitle,
                'footer p': t.footer
            };

            Object.entries(elements).forEach(([selector, text]) => {
                const element = document.querySelector(selector);
                if (element) element.textContent = text;
            });

            // Update competency cards
            const competencyCards = document.querySelectorAll('.competency-card');
            if (competencyCards.length >= 4) {
                competencyCards[0].querySelector('h4').textContent = t.aiMLTitle;
                const aiList = competencyCards[0].querySelectorAll('li');
                t.aiMLItems.forEach((item, i) => {
                    if (aiList[i]) aiList[i].textContent = item;
                });

                competencyCards[1].querySelector('h4').textContent = t.roboticsTitle;
                const roboticsList = competencyCards[1].querySelectorAll('li');
                t.roboticsItems.forEach((item, i) => {
                    if (roboticsList[i]) roboticsList[i].textContent = item;
                });

                competencyCards[2].querySelector('h4').textContent = t.devTitle;
                const devList = competencyCards[2].querySelectorAll('li');
                t.devItems.forEach((item, i) => {
                    if (devList[i]) devList[i].textContent = item;
                });

                competencyCards[3].querySelector('h4').textContent = t.commTitle;
                const commList = competencyCards[3].querySelectorAll('li');
                t.commItems.forEach((item, i) => {
                    if (commList[i]) commList[i].textContent = item;
                });
            }

            // Update service cards
            const serviceCards = document.querySelectorAll('.service-card');
            if (serviceCards.length >= 2) {
                const autoList = serviceCards[0].querySelectorAll('li');
                t.automationItems.forEach((item, i) => {
                    if (autoList[i]) autoList[i].textContent = item;
                });

                const aiList = serviceCards[1].querySelectorAll('li');
                t.aiItems.forEach((item, i) => {
                    if (aiList[i]) aiList[i].textContent = item;
                });
            }

            // Update form fields
            const nameLabel = document.querySelector('label[for="name"]');
            if (nameLabel) nameLabel.textContent = t.formName;
            
            const emailLabel = document.querySelector('label[for="email"]');
            if (emailLabel) emailLabel.textContent = t.formEmail;
            
            const topicLabel = document.querySelector('label[for="topic"]');
            if (topicLabel) topicLabel.textContent = t.formTopic;
            
            const topicSelect = document.querySelector('#topic');
            if (topicSelect) {
                topicSelect.options[0].textContent = t.formTopicPlaceholder;
                topicSelect.options[1].textContent = t.formTopicAutomation;
                topicSelect.options[2].textContent = t.formTopicAI;
                topicSelect.options[3].textContent = t.formTopicBoth;
            }
            
            const bgLabel = document.querySelector('label[for="background"]');
            if (bgLabel) bgLabel.textContent = t.formBackground;
            
            const bgSelect = document.querySelector('#background');
            if (bgSelect) {
                bgSelect.options[0].textContent = t.formBackgroundPlaceholder;
                bgSelect.options[1].textContent = t.formBgStudent;
                bgSelect.options[2].textContent = t.formBgProfessional;
                bgSelect.options[3].textContent = t.formBgResearcher;
                bgSelect.options[4].textContent = t.formBgHobbyist;
            }
            
            const expLabel = document.querySelector('label[for="experience"]');
            if (expLabel) expLabel.textContent = t.formExperience;
            
            const expSelect = document.querySelector('#experience');
            if (expSelect) {
                expSelect.options[0].textContent = t.formExperiencePlaceholder;
                expSelect.options[1].textContent = t.formExpBeginner;
                expSelect.options[2].textContent = t.formExpIntermediate;
                expSelect.options[3].textContent = t.formExpAdvanced;
            }
            
            const interestLabel = document.querySelector('label[for="interest"]');
            if (interestLabel) interestLabel.innerHTML = t.formInterest;
            const interestInput = document.querySelector('#interest');
            if (interestInput) interestInput.placeholder = t.formInterestPlaceholder;
            
            const goalLabel = document.querySelector('label[for="goal"]');
            if (goalLabel) goalLabel.innerHTML = t.formGoal;
            const goalInput = document.querySelector('#goal');
            if (goalInput) goalInput.placeholder = t.formGoalPlaceholder;
            
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) submitBtn.textContent = t.formSubmit;

            // Update footer links
            const footerLinks = document.querySelectorAll('.social-links a');
            if (footerLinks.length >= 3) {
                footerLinks[0].textContent = t.footerLinkedIn;
                footerLinks[1].textContent = t.footerEmail;
                footerLinks[2].textContent = t.footerBooking;
            }

            // Fade everything back in
            allElements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }, 200);
    }
});
