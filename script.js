// ✅ AOS Initialization
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});
AOS.init({
    duration: 1000,
    easing: 'ease-in-out-cubic',
    once: false,
    mirror: true, // Repeat animation on scroll
    offset: 100,
    anchorPlacement: 'top-bottom'

// ✅ ScrollReveal Initialization
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
});

const scrollRevealElements = [
    ['.home__data, .about__img, .skills__subtitle, .skills__text'],
    ['.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 }],
    ['.home__social-icon', { interval: 200 }],
    ['.skills__data, .experience__item, .projects__item, .contact__input', { interval: 200 }]
];

scrollRevealElements.forEach(([selector, options = {}]) => {
    sr.reveal(selector, options);
});

// ✅ ScrollReveal with Advanced Effects
const sr = ScrollReveal({
    origin: 'top',
    distance: '70px',
    duration: 1200,
    delay: 300,
    reset: false,
    easing: 'ease-in-out',
    mobile: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {
    interval: 200,
    scale: 0.9
});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {
    delay: 400,
    origin: 'left',
    opacity: 0,
    distance: '100px'
});
sr.reveal('.home__social-icon', {
    interval: 150,
    origin: 'bottom',
    rotate: { x: 0, y: 80, z: 0 }
});
sr.reveal('.skills__data, .experience__item, .projects__item, .contact__input', {
    interval: 100,
    scale: 0.8,
    rotate: { x: 0, y: 40, z: 0 }
});


// ✅ Mobile Menu Toggle
const navMenu = document.getElementById('nav-menu');
document.getElementById('nav-toggle')?.addEventListener('click', () => {
    navMenu?.classList.add('show-menu');
});
document.getElementById('nav-close')?.addEventListener('click', () => {
    navMenu?.classList.remove('show-menu');
});

// ✅ Remove Menu on Link Click
document.querySelectorAll('.nav__link').forEach(link =>
    link.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    })
);

// ✅ Change Header Background on Scroll
window.addEventListener('scroll', () => {
    document.getElementById('header')?.classList.toggle('scroll-header', window.scrollY >= 80);
});

// ✅ Active Section Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
});

// ✅ Scroll to Top Button Visibility
window.addEventListener('scroll', () => {
    document.getElementById('scroll-top')?.classList.toggle('show-scroll', window.scrollY >= 560);
});

// ✅ Form Submission Handler
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = ['name', 'email', 'subject', 'message'];
        const values = fields.map(field =>
            contactForm.querySelector(`[name="${field}"], .contact__textarea`)?.value.trim()
        );

        if (values.some(value => !value)) {
            alert('⚠️ Please fill all fields!');
            return;
        }

        alert('✅ Thank you for your message!');
        contactForm.reset();
    });
}

// ✅ Social Icons Handlers
const socialLinks = {
    '.github__icon': 'https://vedawell.vercel.app/',
    '.linkedin__icon': 'https://www.linkedin.com/in/ashish-patel-868231249/',
    '#resume-btn': 'Ashish patel.doc' // 🔁 Update if path changes
};

Object.entries(socialLinks).forEach(([selector, url]) => {
    document.querySelector(selector)?.addEventListener('click', () => {
        window.open(url, '_blank');
    });
});
// ✅ Mobile Menu Toggle
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu?.classList.add('show-menu');
    });
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    });
}

// ✅ Remove Menu on Link Click
document.querySelectorAll('.nav__link').forEach(link =>
    link.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    })
);

// ✅ Change Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scroll-header', window.scrollY >= 80);
});

// ✅ Active Section Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
});

// ✅ Scroll to Top Button
const scrollTop = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollTop?.classList.toggle('show-scroll', window.scrollY >= 560);
});

// ✅ Contact Form Validation + Toast
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]')?.value.trim();
        const email = contactForm.querySelector('[name="email"]')?.value.trim();
        const subject = contactForm.querySelector('[name="subject"]')?.value.trim();
        const message = contactForm.querySelector('[name="message"], .contact__textarea')?.value.trim();

        if (!name || !email || !subject || !message) {
            alert('⚠️ Please fill all fields!');
            return;
        }

        alert('✅ Thank you for your message!');
        contactForm.reset();
    });
}

// ✅ GitHub Icon Link
document.querySelector('.github__icon')?.addEventListener('click', () => {
    window.open('https://vedawell.vercel.app/', '_blank');
});

// ✅ LinkedIn Icon Link
document.querySelector('.linkedin__icon')?.addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/ashish-patel-868231249/', '_blank');
});

// ✅ Resume Button
document.getElementById('resume-btn')?.addEventListener('click', () => {
    window.open('Ashish patel.doc', '_blank'); // ✅ Update path if required
});
