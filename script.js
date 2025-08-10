/*
 * SCRIPT SEQUENCE (Advanced & Optimized):
 * 1. Main DOMContentLoaded listener to ensure all elements are ready.
 * 2. Code encapsulated to avoid global scope pollution.
 * 3. Object-oriented patterns for better organization (e.g., themeManager).
 * 4. Performance-optimized scroll handling using requestAnimationFrame.
 * 5. Efficient event handling using Event Delegation for modals.
 * 6. Accessibility (A11y) enhancements for modals (focus management).
 * 7. State management for the contact form.
 */

document.addEventListener('DOMContentLoaded', () => {

    /*=============================================
    =           INITIALIZATIONS & SETUP           =
    =============================================*/
    
    // Initialize libraries
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ["Data Scientist", "ML Engineer", "AI Enthusiast"],
            typeSpeed: 70, backSpeed: 50, loop: true, backDelay: 2000
        });
    }

    /*=============================================
    =          UI COMPONENT LOGIC (ADVANCED)      =
    =============================================*/

    // --- Menu Show/Hide ---
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('show-menu'));
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
        });
    }

    // --- Object-Oriented Theme Manager ---
    const themeManager = {
        themeButton: document.getElementById('theme-button'),
        darkThemeClass: 'dark-theme',
        iconThemeClass: 'fa-sun',

        init() {
            this.applySavedTheme();
            this.themeButton.addEventListener('click', () => this.toggleTheme());
        },

        applySavedTheme() {
            const savedTheme = localStorage.getItem('selected-theme');
            const savedIcon = localStorage.getItem('selected-icon');
            if (savedTheme) {
                document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](this.darkThemeClass);
                this.themeButton.classList[savedIcon === 'fa-sun' ? 'add' : 'remove'](this.iconThemeClass);
            }
        },

        toggleTheme() {
            document.body.classList.toggle(this.darkThemeClass);
            this.themeButton.classList.toggle(this.iconThemeClass);
            this.saveThemePreference();
        },

        saveThemePreference() {
            const currentTheme = document.body.classList.contains(this.darkThemeClass) ? 'dark' : 'light';
            const currentIcon = this.themeButton.classList.contains(this.iconThemeClass) ? 'fa-sun' : 'fa-moon';
            localStorage.setItem('selected-theme', currentTheme);
            localStorage.setItem('selected-icon', currentIcon);
        }
    };
    themeManager.init();


    // --- Advanced Modal Handling with Event Delegation & A11y ---
    const modalManager = {
        lastFocusedElement: null,
        
        init() {
            document.addEventListener('click', this.handleDocumentClick.bind(this));
            document.addEventListener('keydown', this.handleKeydown.bind(this));
        },

        handleDocumentClick(e) {
            const openTrigger = e.target.closest('[data-modal-target]');
            const closeTrigger = e.target.closest('.modal-close, .modal-overlay');

            if (openTrigger) {
                e.preventDefault();
                const modalId = openTrigger.dataset.modalTarget;
                const modal = document.querySelector(modalId);
                if (modal) this.open(modal, openTrigger);
            } else if (closeTrigger) {
                const modal = closeTrigger.closest('.modal');
                if (modal) this.close(modal);
            }
        },
        
        handleKeydown(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) this.close(activeModal);
            }
        },

        open(modal, triggerElement) {
            this.lastFocusedElement = triggerElement; // Save the element that opened the modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modal.querySelector('.modal-content, .modal-close').focus(); // Focus inside the modal
        },

        close(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus(); // Return focus to the trigger element
            }
        }
    };
    modalManager.init();


    /*=============================================
    =        SCROLL-BASED LOGIC (OPTIMIZED)       =
    =============================================*/
    const sections = document.querySelectorAll('section[id]');
    const header = document.getElementById('header');
    const scrollUp = document.getElementById('scroll-up');
    let ticking = false;

    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Header background logic
        if (header) {
            header.classList.toggle('scroll-header', scrollY >= 80);
        }

        // Active link highlighting logic
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const link = document.querySelector(`.nav__menu a[href*=${current.id}]`);
            if(link) {
                 link.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
            }
        });

        // Scroll-to-top button logic
        if (scrollUp) {
            scrollUp.classList.toggle('show-scroll', scrollY >= 560);
        }
    }

    // Performance-optimized scroll listener
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });


    /*=============================================
    =           FORM HANDLING (WITH STATE)        =
    =============================================*/
    const form = document.getElementById('contact-form');
    if (form) {
        const formStatus = document.getElementById('form-status');
        const submitButton = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Disable button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            formStatus.textContent = 'Sending...';

            // Check for placeholder access key
            if (this.access_key.value === "YOUR_ACCESS_KEY_HERE") {
                formStatus.textContent = 'Error: Please configure Access Key in HTML.';
                formStatus.style.color = 'red';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                return;
            }

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this)
                });
                const data = await response.json();

                if (data.success) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = 'green';
                    this.reset();
                } else {
                    formStatus.textContent = data.message || 'An error occurred.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                formStatus.textContent = 'Network error. Please try again.';
                formStatus.style.color = 'red';
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                setTimeout(() => formStatus.textContent = '', 5000);
            }
        });
    }
});
