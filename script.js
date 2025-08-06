// ✅ AOS Initialization
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

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
