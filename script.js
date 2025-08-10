/*===== PRELOADER =====*/
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Remove menu on link click
navLinks.forEach(link => link.addEventListener('click', () => {
    if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
}));

/*===== TYPED.JS (Typing Animation) =====*/
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ["Data Scientist", "ML Engineer", "AI Enthusiast"],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
        backDelay: 2000,
    });
}

/*===== HEADER BACKGROUND ON SCROLL =====*/
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 80) header.classList.add('scroll-header');
        else header.classList.remove('scroll-header');
    });
}

/*===== ACTIVE SECTION LINK ON SCROLL =====*/
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
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
});

/*===== DARK/LIGHT THEME =====*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun'; // Icon for dark mode

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-sun' : 'fa-moon';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'fa-sun' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // Swap classes to ensure the correct icon shows
    if(themeButton.classList.contains(iconTheme)){
        themeButton.classList.remove('fa-moon');
        themeButton.classList.add('fa-sun');
    } else {
        themeButton.classList.remove('fa-sun');
        themeButton.classList.add('fa-moon');
    }
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/*===== SCROLL UP BUTTON =====*/
const scrollUp = document.getElementById('scroll-up');
if(scrollUp){
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 560) scrollUp.classList.add('show-scroll');
        else scrollUp.classList.remove('show-scroll');
    });
}

/*===== AOS INITIALIZATION =====*/
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true, // Animate elements only once
    mirror: false
});

/*===== CONTACT FORM (WEB3FORMS) =====*/
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if(form){
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Check if access key is still the placeholder
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

        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
}
