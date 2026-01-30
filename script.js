// Launch date: February 5, 2026 at 8:00 PM EST (UTC-5)
const launchDate = new Date('2026-02-06T01:00:00Z');

// DOM Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const notifyForm = document.getElementById('notify-form');
const emailInput = document.getElementById('email-input');

// Store previous values for change detection
let prevValues = { days: null, hours: null, minutes: null, seconds: null };

function updateCountdown() {
    const now = new Date();
    const timeRemaining = launchDate - now;

    if (timeRemaining <= 0) {
        setCountdownValue(daysEl, '00', 'days');
        setCountdownValue(hoursEl, '00', 'hours');
        setCountdownValue(minutesEl, '00', 'minutes');
        setCountdownValue(secondsEl, '00', 'seconds');
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    setCountdownValue(daysEl, formatNumber(days), 'days');
    setCountdownValue(hoursEl, formatNumber(hours), 'hours');
    setCountdownValue(minutesEl, formatNumber(minutes), 'minutes');
    setCountdownValue(secondsEl, formatNumber(seconds), 'seconds');
}

function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

function setCountdownValue(element, value, key) {
    if (prevValues[key] !== value) {
        element.textContent = value;
        element.classList.add('changed');

        setTimeout(() => {
            element.classList.remove('changed');
        }, 200);

        prevValues[key] = value;
    }
}

// Form handling
if (notifyForm) {
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
            // Add success state
            notifyForm.classList.add('success');

            // Update button text
            const btn = notifyForm.querySelector('.notify-btn');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span>Subscribed!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

            // Update hint text
            const hint = document.querySelector('.notify-hint');
            if (hint) {
                hint.textContent = "You're on the list! We'll notify you at launch.";
            }

            // Disable form
            emailInput.disabled = true;
            btn.disabled = true;

            // Store email (in real app, send to backend)
            console.log('Email subscribed:', email);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initial countdown update
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);

    // Add staggered fade-in animation to features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Intersection Observer for scroll animations (if needed for future sections)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe any elements with .animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
