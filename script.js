```javascript
/* ============================== */
/* OT4IM — LIQUID GLASS SYSTEM */
/* ============================== */

const body = document.body;

const themeBtn =
    document.getElementById('theme-btn');

const themeIcon =
    document.querySelector('.theme-icon');

const modal =
    document.getElementById('modal');

const contactForm =
    document.getElementById('contactForm');

/* ============================== */
/* THEME SYSTEM */
/* ============================== */

function applyTheme(theme) {

    const isDark = theme === 'dark';

    body.classList.toggle(
        'dark-theme',
        isDark
    );

    themeIcon.textContent =
        isDark ? '☀️' : '🌙';

    localStorage.setItem(
        'theme',
        theme
    );
}

function toggleTheme() {

    const overlay =
        document.createElement('div');

    overlay.className =
        'liquid-overlay';

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    const nextTheme =
        body.classList.contains('dark-theme')
            ? 'light'
            : 'dark';

    setTimeout(() => {
        applyTheme(nextTheme);
    }, 180);

    setTimeout(() => {
        overlay.remove();
    }, 900);
}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const savedTheme =
            localStorage.getItem('theme');

        const prefersDark =
            window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;

        applyTheme(
            savedTheme ||
            (prefersDark ? 'dark' : 'light')
        );
    }
);

/* ============================== */
/* COUNTER */
/* ============================== */

let counterValue = 0;

const maxValue = 100;

const counterElement =
    document.getElementById('counter-value');

const progressFill =
    document.getElementById('progress-fill');

const progressPercent =
    document.getElementById('progress-percent');

function updateCounterDisplay() {

    counterElement.textContent =
        counterValue;

    const percentage =
        (counterValue / maxValue) * 100;

    progressFill.style.width =
        `${percentage}%`;

    progressPercent.textContent =
        `${Math.round(percentage)}%`;

    counterElement.animate(
        [
            {
                transform: 'scale(1)'
            },
            {
                transform: 'scale(1.06)'
            },
            {
                transform: 'scale(1)'
            }
        ],
        {
            duration: 240,
            easing:
                'cubic-bezier(.2,.8,.2,1)'
        }
    );
}

function incrementCounter() {

    if (counterValue >= maxValue)
        return;

    counterValue++;

    updateCounterDisplay();
}

function decrementCounter() {

    if (counterValue <= 0)
        return;

    counterValue--;

    updateCounterDisplay();
}

/* ============================== */
/* MODAL */
/* ============================== */

function openModal(message) {

    document.getElementById(
        'modal-message'
    ).textContent = message;

    modal.style.display = 'block';

    requestAnimationFrame(() => {
        modal.classList.add('visible');
    });
}

function closeModal() {

    modal.classList.remove('visible');

    setTimeout(() => {
        modal.style.display = 'none';
    }, 250);
}

window.addEventListener('click', (e) => {

    if (e.target === modal) {
        closeModal();
    }
});

/* ============================== */
/* FORM */
/* ============================== */

contactForm.addEventListener(
    'submit',
    (e) => {

        e.preventDefault();

        const fields =
            contactForm.querySelectorAll(
                'input, textarea'
            );

        let valid = true;

        fields.forEach(field => {

            const filled =
                field.value.trim().length > 0;

            field.classList.toggle(
                'invalid',
                !filled
            );

            if (!filled) valid = false;
        });

        if (!valid) return;

        const name =
            contactForm.querySelector(
                'input'
            ).value;

        openModal(
            `Спасибо, ${name}! Сообщение отправлено.`
        );

        contactForm.reset();
    }
);

/* ============================== */
/* NAV ACTIVE */
/* ============================== */

const sections =
    document.querySelectorAll('section');

const navLinks =
    document.querySelectorAll('.nav-link');

const navObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const id =
                    entry.target.id;

                navLinks.forEach(link => {

                    link.classList.remove(
                        'active'
                    );

                    if (
                        link.getAttribute('href')
                        === `#${id}`
                    ) {

                        link.classList.add(
                            'active'
                        );
                    }
                });
            });
        },

        {
            threshold: 0.45
        }
    );

sections.forEach(section => {
    navObserver.observe(section);
});

/* ============================== */
/* SMOOTH SCROLL */
/* ============================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        'click',
        (e) => {

            e.preventDefault();

            const target =
                document.querySelector(
                    anchor.getAttribute('href')
                );

            if (!target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    );
});

/* ============================== */
/* SCROLL REVEAL */
/* ============================== */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                entry.target.classList.add(
                    'revealed'
                );

                revealObserver.unobserve(
                    entry.target
                );
            });
        },

        {
            threshold: 0.1
        }
    );

document
.querySelectorAll(
    '.feature-card, .gallery-item, .contact-form'
)
.forEach(el => {

    el.classList.add('reveal');

    revealObserver.observe(el);
});

/* ============================== */
/* MAGNETIC BUTTONS */
/* ============================== */

document
.querySelectorAll(
    '.cta-button, .submit-btn'
)
.forEach(button => {

    button.addEventListener(
        'mousemove',
        e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;
        }
    );

    button.addEventListener(
        'mouseleave',
        () => {

            button.style.transform =
                'translate(0,0)';
        }
    );
});

/* ============================== */
/* PARALLAX LIGHT */
/* ============================== */

const shapes =
    document.querySelectorAll('.shape');

window.addEventListener(
    'scroll',

    () => {

        const scrollY =
            window.scrollY;

        shapes.forEach((shape, i) => {

            const speed =
                0.03 + i * 0.015;

            shape.style.transform =
                `translateY(${scrollY * speed}px)`;
        });
    },

    {
        passive: true
    }
);

/* ============================== */
/* KEYBOARD */
/* ============================== */

document.addEventListener(
    'keydown',
    e => {

        if (e.key === 'Escape') {
            closeModal();
        }

        if (
            e.key === '+' ||
            e.key === '='
        ) {

            incrementCounter();
        }

        if (e.key === '-') {

            decrementCounter();
        }
    }
);

/* ============================== */
/* ACCESSIBILITY */
/* ============================== */

document.addEventListener(
    'keydown',
    e => {

        if (e.key === 'Tab') {

            body.classList.add(
                'keyboard-nav'
            );
        }
    }
);

document.addEventListener(
    'mousedown',
    () => {

        body.classList.remove(
            'keyboard-nav'
        );
    }
);

/* ============================== */
/* PAGE INTRO */
/* ============================== */

window.addEventListener(
    'load',
    () => {

        body.classList.add('loaded');
    }
);

/* ============================== */
/* CONSOLE */
/* ============================== */

console.log(
    '%cOT4IM Liquid Glass UI',
    `
    font-size:20px;
    font-weight:700;
    color:#0071e3;
    `
);

console.log(
    '%cApple-style motion system initialized.',
    `
    font-size:13px;
    color:#888;
    `
);
```
