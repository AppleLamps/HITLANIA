// Set the launch date: January 29, 2026 at 8:00 PM EST + 7 days = February 5, 2026 at 8:00 PM EST
// EST is UTC-5
const launchDate = new Date('February 5, 2026 20:00:00 EST');

function updateCountdown() {
    const now = new Date();
    const timeRemaining = launchDate - now;
    
    if (timeRemaining <= 0) {
        // Countdown finished
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        
        // Optional: Add a message or redirect when countdown ends
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update the DOM with animation
    animateValue('days', days);
    animateValue('hours', hours);
    animateValue('minutes', minutes);
    animateValue('seconds', seconds);
}

function animateValue(id, newValue) {
    const element = document.getElementById(id);
    const currentValue = parseInt(element.textContent);
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.textContent = newValue.toString().padStart(2, '0');
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add smooth transition to time elements
document.addEventListener('DOMContentLoaded', () => {
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(element => {
        element.style.transition = 'transform 0.2s ease';
    });
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
    
    // Add particle effect on hover for time boxes
    const timeBoxes = document.querySelectorAll('.time-box');
    timeBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Console easter egg
console.log('%c HITLANIA ', 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; font-size: 30px; padding: 10px; font-weight: bold;');
console.log('%c Coming Soon... ', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
