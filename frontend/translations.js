const translations = {
    en: {
        heroTitle: "Master AI & Automation with Personalized Teaching",
        heroSubtitle: "I'm Thiyanayugi Mariraj, an M.Sc. student at TU Dortmund specializing in AI-driven automation. I help students and professionals build real-world skills.",
        ctaStart: "Start Learning Today",
        ctaCourses: "See What I Teach",
        sectionFeatures: "What Makes Me Different",
        sectionExpertise: "My Expertise",
        sectionCertifications: "Professional Certifications",
        sectionCourses: "What I Teach",
        sectionContact: "Ready to Start Learning?",
        formName: "Your Name",
        formEmail: "Email Address",
        formTopic: "I Want to Learn",
        formExperience: "Experience Level",
        formGoal: "What do you want to achieve?",
        btnSubmit: "Get My Learning Path"
    },
    de: {
        heroTitle: "Meistere KI & Automatisierung mit persönlichem Unterricht",
        heroSubtitle: "Ich bin Thiyanayugi Mariraj, M.Sc. Student der TU Dortmund, spezialisiert auf KI-gesteuerte Automatisierung. Ich helfe Studenten und Profis, praxisnahe Fähigkeiten aufzubauen.",
        ctaStart: "Heute beginnen",
        ctaCourses: "Kursangebot ansehen",
        sectionFeatures: "Was mich unterscheidet",
        sectionExpertise: "Meine Expertise",
        sectionCertifications: "Zertifizierungen",
        sectionCourses: "Was ich unterrichte",
        sectionContact: "Bereit zu lernen?",
        formName: "Dein Name",
        formEmail: "E-Mail-Adresse",
        formTopic: "Ich möchte lernen",
        formExperience: "Erfahrungslevel",
        formGoal: "Was möchtest du erreichen?",
        btnSubmit: "Lernpfad erhalten"
    }
};

function changeLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Persist choice
    localStorage.setItem('preferredLanguage', lang);

    // Update Toggle UI
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}
