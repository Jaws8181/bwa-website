/**
 * AutomateBarrie Landing Page - JavaScript
 * Handles navigation, animations, and form submission
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Navigation - Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        
        // Animate icon
        if (isMenuOpen) {
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Intersection Observer - Reveal Animations
    // ========================================
    const revealElements = document.querySelectorAll('#services .group, #case-studies .group, #pricing > div > div > div');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Section headers reveal
    const sectionHeaders = document.querySelectorAll('#services .text-center, #pricing .text-center, #case-studies .text-center, #contact > div > div > div:first-child');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    sectionHeaders.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        headerObserver.observe(el);
    });

    // ========================================
    // Contact Form - Web3Forms Submission
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="spinner"></div><span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Show success message
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Something went wrong');
                }
            } catch (error) {
                // Show error state
                submitBtn.innerHTML = '<span class="text-red-300">Failed to send. Please try again.</span>';
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                }, 3000);
            }
        });
    }

    // ========================================
    // Counter Animation for Stats
    // ========================================
    const animateCounter = (element, target, suffix = '') => {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    };

    // Observe stats section
    const statsSection = document.querySelector('#hero .grid-cols-3');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElements = entry.target.querySelectorAll('.font-bold');
                    statElements.forEach(el => {
                        const text = el.textContent;
                        if (text.includes('+')) {
                            animateCounter(el, parseInt(text), '+');
                        } else if (text.includes('%')) {
                            animateCounter(el, parseInt(text), '%');
                        } else if (text.includes('x')) {
                            animateCounter(el, parseInt(text), 'x');
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ========================================
    // Typing Effect for Hero (Optional Enhancement)
    // ========================================
    // Adds subtle interactivity to the page without being distracting

    // ========================================
    // Parallax Effect on Hero Background Elements
    // ========================================
    const heroSection = document.getElementById('hero');
    const floatingElements = heroSection ? heroSection.querySelectorAll('.animate-float') : [];

    if (floatingElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            floatingElements.forEach((el, index) => {
                const factor = (index + 1) * 0.5;
                el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        }, { passive: true });
    }
});
