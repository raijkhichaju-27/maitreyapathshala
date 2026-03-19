// script.js - Updated with properly fixed mobile menu

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const toggleIcon = mobileNavToggle ? mobileNavToggle.querySelector('i') : null;

// Toggle mobile menu
if (mobileNavToggle && toggleIcon) {
    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            // Close menu
            closeMobileMenu();
        } else {
            // Open menu
            openMobileMenu();
        }
    });
}

// Function to open mobile menu
function openMobileMenu() {
    if (mobileMenu && toggleIcon) {
        mobileMenu.classList.add('active');
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
        
        // Animate toggle button
        if (mobileNavToggle) {
            mobileNavToggle.style.transform = 'rotate(90deg)';
        }
    }
}

// Function to close mobile menu
function closeMobileMenu() {
    if (mobileMenu && toggleIcon) {
        mobileMenu.classList.remove('active');
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
        
        // Animate toggle button
        if (mobileNavToggle) {
            mobileNavToggle.style.transform = 'rotate(0deg)';
        }
    }
}

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickOnToggle = mobileNavToggle && mobileNavToggle.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle) {
            closeMobileMenu();
        }
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            navbar.style.background = 'white';
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a page link (not an anchor) or if it's empty
        if (href.includes('.html') || href === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            // Calculate offset for mobile nav
            const offset = window.innerWidth <= 768 ? 70 : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// MODAL FUNCTIONALITY
function openModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeModal() {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// Close modal when clicking outside content
document.addEventListener('click', (e) => {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal && e.target === activeModal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .program-card, .blog-post, .gallery-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// Make Start Learning button work (if on homepage)
const startLearningBtn = document.querySelector('.hero-buttons .cta.primary');
if (startLearningBtn && window.location.pathname.includes('index.html')) {
    startLearningBtn.addEventListener('click', () => {
        window.location.href = 'admissions.html';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Maitreya Pathshala website loaded successfully!');
    
    // Add current year to copyright
    const copyright = document.querySelector('.footer-bottom p');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('2024', new Date().getFullYear());
    }
    
    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    desktopNavLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Handle index.html comparison
        if (currentPage === '' || currentPage === 'index.html') {
            if (linkPage === 'index.html' || linkPage === './' || linkPage === '/') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});