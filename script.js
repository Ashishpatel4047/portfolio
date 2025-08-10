/*
 * SCRIPT SEQUENCE (Final Advanced & Optimized Version):
 * 1. Main DOMContentLoaded listener.
 * 2. Object-oriented and modular patterns.
 * 3. Performance-optimized scroll handling (throttling).
 * 4. Efficient event handling (delegation).
 * 5. Advanced A11y (Focus Management).
 * 6. Behavioral Responsiveness (Adapting JS for mobile).
 * 7. Dynamic Content Enhancement (Autolinking contacts).
 * 8. Form State Management.
 */

document.addEventListener('DOMContentLoaded', () => {

    /*=============================================
    =           INITIALIZATIONS & SETUP           =
    =============================================*/
    const isMobile = window.innerWidth < 768;

    // Initialize AOS with behavioral responsiveness
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: isMobile // Desactiva las animaciones en pantallas pequeñas
    });

    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ["Data Scientist", "ML Engineer", "AI Enthusiast"],
            typeSpeed: 70, backSpeed: 50, loop: true, backDelay: 2000
        });
    }

    /*=============================================
    =     DYNAMIC CONTENT ENHANCEMENT (NEW)       =
    =============================================*/
    
    /**
     * Finds text nodes that look like emails or phone numbers and wraps them
     * in clickable `<a>` tags. It's smart enough to avoid re-linking content.
     */
    function linkifyContent() {
        const contentContainer = document.body;
        
        // Regex for email addresses and phone numbers
        const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
        // This regex is broad for international numbers
        const phoneRegex = /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4,}/g;

        // Use TreeWalker for efficiently finding all text nodes
        const walker = document.createTreeWalker(contentContainer, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const nodesToProcess = [];

        while (node = walker.nextNode()) {
            // Ignore text inside scripts, styles, and existing links
            if (node.parentElement.tagName.toUpperCase() !== 'A' &&
                node.parentElement.tagName.toUpperCase() !== 'SCRIPT' &&
                node.parentElement.tagName.toUpperCase() !== 'STYLE') {
                nodesToProcess.push(node);
            }
        }
        
        nodesToProcess.forEach(textNode => {
            const text = textNode.textContent;
            let replacementMade = false;
            
            // Create a temporary element to build new nodes
            const fragment = document.createDocumentFragment();

            let lastIndex = 0;
            let match;
            
            const combinedRegex = new RegExp(`(${emailRegex.source})|(${phoneRegex.source})`, 'gi');
            
            while ((match = combinedRegex.exec(text)) !== null) {
                // Add the text before the match
                if (match.index > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
                }

                const link = document.createElement('a');
                const matchedText = match[0];

                if (new RegExp(emailRegex.source, 'i').test(matchedText)) {
                    // It's an email
                    link.href = `mailto:${matchedText}`;
                } else {
                    // It's a phone number
                    link.href = `tel:${matchedText.replace(/[^\d+]/g, '')}`;
                }
                link.textContent = matchedText;
                
                fragment.appendChild(link);
                lastIndex = combinedRegex.lastIndex;
                replacementMade = true;
            }

            // Add any remaining text
            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
            }

            if (replacementMade) {
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }

    // Run the content enhancement after a brief moment to ensure all is rendered
    setTimeout(linkifyContent, 100);

    /*=============================================
    =          UI COMPONENT LOGIC (ADVANCED)      =
    =============================================*/
    
    // --- (The rest of the advanced JS code remains the same) ---
    // (Menu, ThemeManager, ModalManager, Scroll, and Form logic)

    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('show-menu'));
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
        });
    }

    const themeManager = {
        themeButton: document.getElementById('theme-button'),
        darkThemeClass: 'dark-theme',
        iconThemeClass: 'fa-sun',
        init() { this.applySavedTheme(); this.themeButton.addEventListener('click', () => this.toggleTheme()); },
        applySavedTheme() {
            const savedTheme = localStorage.getItem('selected-theme');
            if (savedTheme) document.body.classList.toggle(this.darkThemeClass, savedTheme === 'dark');
        },
        toggleTheme() { document.body.classList.toggle(this.darkThemeClass); this.saveThemePreference(); },
        saveThemePreference() { localStorage.setItem('selected-theme', document.body.classList.contains(this.darkThemeClass) ? 'dark' : 'light'); }
    };
    if (themeManager.themeButton) themeManager.init();

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
                this.open(document.querySelector(openTrigger.dataset.modalTarget), openTrigger);
            } else if (closeTrigger) {
                this.close(closeTrigger.closest('.modal'));
            }
        },
        handleKeydown(e) { if (e.key === 'Escape') this.close(document.querySelector('.modal.active')); },
        open(modal, trigger) {
            if (!modal) return;
            this.lastFocusedElement = trigger;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modal.querySelector('.modal-content, .modal-close')?.focus();
        },
        close(modal) {
            if (!modal) return;
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.lastFocusedElement?.focus();
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
        if(header) header.classList.toggle('scroll-header', scrollY >= 80);
        sections.forEach(current => {
            const link = document.querySelector(`.nav__menu a[href*=${current.id}]`);
            if(link) link.classList.toggle('active-link', scrollY > current.offsetTop - 58 && scrollY <= current.offsetTop + current.offsetHeight);
        });
        if(scrollUp) scrollUp.classList.toggle('show-scroll', scrollY >= 560);
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => { handleScroll(); ticking = false; });
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
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            formStatus.textContent = 'Sending...';

            try {
                const response = await fetch(this.action, { method: 'POST', body: new FormData(this) });
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
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                setTimeout(() => formStatus.textContent = '', 5000);
            }
        });
    }
});
