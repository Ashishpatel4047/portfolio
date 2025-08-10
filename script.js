/*
 * SCRIPT SEQUENCE:
 * 1. Initializations (Preloader, Libraries like AOS, Typed.js)
 * 2. UI Component Logic (Menu, Theme Toggler, Modals)
 * 3. Scroll-Based Logic (Header, Active Links, Scroll-Up Button)
 * 4. Form Handling (Contact Form)
 */

/*=============================================
=            INITIALIZATIONS                  =
=============================================*/

/*===== PRELOADER =====*/
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/*===== TYPED.JS (TYPING ANIMATION) =====*/
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ["Data Scientist", "ML Engineer", "AI Enthusiast"],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
        backDelay: 2000,
    });
}

/*===== AOS (ANIMATE ON SCROLL) INITIALIZATION =====*/
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true, // Animate elements only once
    mirror: false
});


/*=============================================
=            UI COMPONENT LOGIC               =
=============================================*/

/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Remove menu when a link is clicked
navLinks.forEach(link => link.addEventListener('click', () => {
    if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
}));

/*===== DARK/LIGHT THEME TOGGLER =====*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun'; // The icon class when in dark mode

// Check for previously saved user preference in localStorage
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Function to get current theme/icon state
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-sun' : 'fa-moon';

// On load, apply saved theme if it exists
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'fa-sun' ? 'add' : 'remove'](iconTheme);
}

// Add click event listener to the theme button
themeButton.addEventListener('click', () => {
    // Toggle theme on the body
    document.body.classList.toggle(darkTheme);
    // Toggle the icon
    themeButton.classList.toggle(iconTheme);

    // Swap classes to ensure the correct icon is always ready
    if (themeButton.classList.contains(iconTheme)) {
        themeButton.classList.remove('fa-moon');
        themeButton.classList.add('fa-sun');
    } else {
        themeButton.classList.remove('fa-sun');
        themeButton.classList.add('fa-moon');
    }

    // Save the user's choice to localStorage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/*===== PROJECT MODAL INTERACTIVITY =====*/
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('.modal');

// Event listener to open a modal
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        if (modal) {
            modal.classList.add('active');
            // Prevent body from scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    });
});

// Event listeners to close a modal
modals.forEach(modal => {
    const overlay = modal.querySelector('.modal-overlay');
    const closeButton = modal.querySelector('.modal-close');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore body scroll
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});


/*=============================================
=            SCROLL-BASED LOGIC               =
=============================================*/

const sections = document.querySelectorAll('section[id]');
const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');

function handleScroll() {
    const scrollY = window.pageYOffset;

    // Change header background
    if (header) {
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }

    // Highlight active section link in nav
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
    
    // Show/hide scroll-to-top button
    if (scrollUp) {
        if (scrollY >= 560) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
}

// Add a single scroll event listener for better performance
window.addEventListener('scroll', handleScroll);


/*=============================================
=               FORM HANDLING                 =
=============================================*/

/*===== CONTACT FORM (WEB3FORMS) =====*/
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        // Check if the access key is still the placeholder
        const accessKey = formData.get("access_key");
        if (accessKey === "YOUR_ACCESS_KEY_HERE") {
            formStatus.style.color = 'red';
            formStatus.textContent = 'Error: Please add your Access Key in the HTML.';
            return;
        }

        formStatus.textContent = 'Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                formStatus.style.color = 'green';
                formStatus.textContent = 'Message sent successfully!';
                form.reset();
            } else {
                formStatus.style.color = 'red';
                formStatus.textContent = data.message || 'An error occurred.';
            }
        } catch (error) {
            formStatus.style.color = 'red';
            formStatus.textContent = 'An error occurred while sending the message.';
        }

        // Clear the status message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
}
