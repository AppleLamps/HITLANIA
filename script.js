// Launch date: February 5, 2026 at 8:00 PM EST (UTC-5)
const launchDate = new Date('2026-02-06T01:00:00Z');

// DOM Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const notifyForm = document.getElementById('notify-form');
const emailInput = document.getElementById('email-input');

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
        }, 150);

        prevValues[key] = value;
    }
}

// Form handling
if (notifyForm) {
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
            notifyForm.classList.add('success');

            const btn = notifyForm.querySelector('.notify-btn');
            btn.innerHTML = '<span>Done</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

            const hint = document.querySelector('.notify-hint');
            if (hint) {
                hint.textContent = "We'll be in touch.";
            }

            emailInput.disabled = true;
            btn.disabled = true;
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
