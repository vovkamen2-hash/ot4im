// ============= DARK THEME LOGIC =============

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Toggle dark theme class
    body.classList.toggle('dark-theme');
    
    // Update icon
    if (body.classList.contains('dark-theme')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
    
    // Add animation
    themeBtn.style.animation = 'none';
    setTimeout(() => {
        themeBtn.style.animation = 'toggleSwitch 0.3s ease-out';
    }, 10);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (e.matches && !localStorage.getItem('theme')) {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
});

// ============= COUNTER LOGIC =============

let counterValue = 0;
const maxValue = 100;

function incrementCounter() {
    if (counterValue < maxValue) {
        counterValue++;
        updateCounterDisplay();
    }
}

function decrementCounter() {
    if (counterValue > 0) {
        counterValue--;
        updateCounterDisplay();
    }
}

function updateCounterDisplay() {
    const counterElement = document.getElementById('counter-value');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');

    // Animate counter value
    counterElement.style.animation = 'none';
    setTimeout(() => {
        counterElement.style.animation = 'pulse 0.3s ease-out';
    }, 10);

    counterElement.textContent = counterValue;

    // Update progress bar
    const percentage = (counterValue / maxValue) * 100;
    progressFill.style.width = percentage + '%';
    progressPercent.textContent = Math.round(percentage) + '%';
}

// ============= MODAL LOGIC =============

const modal = document.getElementById('modal');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// ============= FORM HANDLING =============

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate form
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderBottom = '2px solid red';
        } else {
            input.style.borderBottom = '2px solid #ff1744';
        }
    });

    if (isValid) {
        // Show success modal
        document.getElementById('modal-message').textContent = 
            'Спасибо, ' + contactForm.querySelector('input').value + '! Ваше сообщение отправлено успешно!';
        openModal();

        // Reset form
        contactForm.reset();
        inputs.forEach(input => {
            input.style.borderBottom = '';
        });
    }
});

// ============= NAVIGATION ACTIVE STATE =============

const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.scrollY;

    // Get all sections
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to current link
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============= PARALLAX EFFECT =============

function parallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    const scrollY = window.scrollY;

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// ============= SCROLL ANIMATIONS (INTERSECTION OBSERVER) =============

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and gallery items on page load
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .gallery-item, .contact-form'
    );
    
    elementsToObserve.forEach((element) => {
        observer.observe(element);
    });
});

// ============= SMOOTH SCROLL BEHAVIOR FOR BUTTONS =============

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

// ============= PAGE LOAD ANIMATIONS =============

window.addEventListener('load', () => {
    // Add fade-in animation to navbar
    document.querySelector('.navbar').style.animation = 'slideDown 0.6s ease-out';
});

// ============= RESPONSIVE ADJUSTMENTS =============

let isMobileView = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    const wasMobile = isMobileView;
    isMobileView = window.innerWidth <= 768;

    if (wasMobile !== isMobileView) {
        // Adjust animations for mobile if needed
        console.log('View changed:', isMobileView ? 'Mobile' : 'Desktop');
    }
});

// ============= KEYBOARD NAVIGATION =============

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Counter keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (document.activeElement === document.getElementById('counter-value') || 
        document.activeElement === document.body) {
        if (e.key === '+' || e.key === '=') {
            incrementCounter();
        }
        if (e.key === '-') {
            decrementCounter();
        }
    }
});

// ============= PERFORMANCE OPTIMIZATION =============

// Debounce scroll events for better performance
let scrollTimeout;
let isScrolling = false;

function onScroll() {
    if (!isScrolling) {
        isScrolling = true;
        updateActiveNav();
        parallaxEffect();
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ============= ACCESSIBILITY FEATURES =============

// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============= UTILITY FUNCTIONS =============

// Function to get random color from gradient
function getRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// Function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============= CONSOLE GREETING =============

console.log('%c✨ Welcome to OT4IM! ✨', 'font-size: 20px; font-weight: bold; color: #ff1744;');
console.log('%cEnjoy exploring our interactive web app with beautiful animations! Try switching the theme with the button in the top-right corner!', 'font-size: 14px; color: #c41c3b;');
