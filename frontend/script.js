document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.button-text');
    const btnLoading = submitBtn.querySelector('.button-loading');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    // Collect form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        topic: form.topic.value,
        background: form.background.value,
        experience: form.experience.value,
        interest: form.interest.value,
        goal: form.goal.value
    };

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            // Hide form, show success
            form.style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        // Reset button state on error
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Show error to user
        alert('Error: ' + (error.message || 'Something went wrong. Please try again.'));
        console.error('Error:', error);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toggle About Me section
function toggleAbout() {
    const content = document.getElementById('about-content');
    const toggle = document.getElementById('about-toggle');
    
    content.classList.toggle('expanded');
    toggle.classList.toggle('rotated');
}

// Toggle What I Teach section
function toggleServices() {
    const content = document.getElementById('services-content');
    const toggle = document.getElementById('services-toggle');
    
    content.classList.toggle('expanded');
    toggle.classList.toggle('rotated');
}
