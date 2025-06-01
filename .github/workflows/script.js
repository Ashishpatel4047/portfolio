// ✅ AOS Initialization
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// ✅ ScrollReveal Animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text');
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .experience__item, .projects__item, .contact__input', { interval: 200 });

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
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link =>
    link.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    })
);

// ✅ Change Header Background on Scroll
function scrollHeader() {
    const header = document.getElementById('header');
    header?.classList.toggle('scroll-header', window.scrollY >= 80);
}
window.addEventListener('scroll', scrollHeader);

// ✅ Active Section Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
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
}
window.addEventListener('scroll', scrollActive);

// ✅ Scroll to Top Button
const scrollTop = document.getElementById('scroll-top');
function showScrollTop() {
    scrollTop?.classList.toggle('show-scroll', window.scrollY >= 560);
}
window.addEventListener('scroll', showScrollTop);

// ✅ Form Submission Handler
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
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

// ✅ GitHub - Open Your VedaWell Repo
const githubIcon = document.querySelector('.github__icon');
if (githubIcon) {
    githubIcon.addEventListener('click', () => {
        window.open('https://github.com/Ashishpatel4047/vedawell', '_blank');
    });
}

// ✅ LinkedIn Profile
const linkedinIcon = document.querySelector('.linkedin__icon');
if (linkedinIcon) {
    linkedinIcon.addEventListener('click', () => {
        window.open('https://www.linkedin.com/in/ashish-patel-868231249/', '_blank');
    });
}

// ✅ Resume Button (Optional)
const resumeButton = document.getElementById('resume-btn');
if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        window.open('Ashish patel.doc', '_blank'); // 🔁 Update this if needed
    });
}
