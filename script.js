// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// =============================================
// ALL TOP RECOMMENDATIONS COMBINED
// =============================================

// 1. SMOOTH REVEAL ON SCROLL (Fade + Slide)
// 2. PROGRESS BAR (Scroll indicator)
// 3. SECTION HIGHLIGHT (Active navigation)
// 4. STAGGERED SECTIONS (Sunod-sunod na elements)
// 5. SMOOTH ANCHOR SCROLL (Easing sa links)

// =============================================
// INITIAL SETUP
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Create progress bar
    createProgressBar();
    
    // Set initial states for reveal elements
    setupRevealElements();
    
    // Run once to check visible elements
    setTimeout(() => {
        checkReveal();
        updateActiveSection();
    }, 200);
});

// =============================================
// 1. SMOOTH REVEAL ON SCROLL (Fade + Slide)
// =============================================
function setupRevealElements() {
    const revealElements = document.querySelectorAll(
        '.about-content, .edu-card, .skill-progress-item, .hobby-card, .cert-card, .project-card, .social-link-item, .stat-card'
    );
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

function checkReveal() {
    const revealElements = document.querySelectorAll(
        '.about-content, .edu-card, .skill-progress-item, .hobby-card, .cert-card, .project-card, .social-link-item, .stat-card'
    );
    
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element is visible (with 100px threshold)
        if (rect.top < windowHeight - 100 && rect.bottom > 0) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            // Optional: Hide when out of view (para may effect pag balik)
            // Comment out kung gusto permanenteng visible
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        }
    });
}

// =============================================
// 2. PROGRESS BAR (Scroll indicator)
// =============================================
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #888, #fff, #888);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(255,255,255,0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// =============================================
// 3. SECTION HIGHLIGHT (Active navigation)
// =============================================
function updateActiveSection() {
    const sections = document.querySelectorAll('.hero, .about, .education-section, .skills-progress-section, .hobbies-section, .certifications-section, .projects, .contact');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute('id');
        
        // Check if section is in view
        if (rect.top <= 150 && rect.bottom >= 150) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.style.color = '';
                link.style.textShadow = '';
            });
            
            // Add active class to corresponding link
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--text-primary)';
                    link.style.textShadow = '0 0 10px rgba(255,255,255,0.3)';
                }
            });
        }
    });
}

// =============================================
// 4. STAGGERED SECTIONS (Sunod-sunod na elements)
// =============================================
function staggerReveal() {
    const sections = document.querySelectorAll('.about, .education-section, .skills-progress-section, .hobbies-section, .certifications-section, .projects');
    
    sections.forEach((section, sectionIndex) => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
            const children = section.querySelectorAll('.edu-card, .skill-progress-item, .hobby-card, .cert-card, .project-card, .social-link-item, .stat-card');
            
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100); // 100ms delay per child
            });
        }
    });
}

// =============================================
// 5. SMOOTH ANCHOR SCROLL (Easing sa links)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            // Smooth scroll with custom easing
            smoothScrollTo(targetPosition, 800);
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Custom smooth scroll easing function
function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

// =============================================
// NAVBAR TRANSPARENCY ON SCROLL
// =============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Call all scroll-based functions
    checkReveal();
    updateActiveSection();
    staggerReveal();
});

// =============================================
// 3D CURSOR EFFECT - 3 LINES
// =============================================
const hero = document.querySelector('.hero');
const nameFirst = document.querySelector('.name-first');
const nameMiddle = document.querySelector('.name-middle');
const nameLast = document.querySelector('.name-last');

if (nameFirst && nameMiddle && nameLast) {
    let timeout;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Base rotation (max 10 degrees)
        const baseRotateY = ((mouseX - centerX) / centerX) * 10;
        const baseRotateX = ((mouseY - centerY) / centerY) * -10;
        
        // Iba-ibang intensity per line
        nameFirst.style.transform = `perspective(1000px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg) translateZ(20px)`;
        nameFirst.style.transition = 'transform 0.1s ease-out';
        
        nameMiddle.style.transform = `perspective(1000px) rotateX(${baseRotateX * 1.1}deg) rotateY(${baseRotateY * 1.1}deg) translateZ(30px)`;
        nameMiddle.style.transition = 'transform 0.1s ease-out';
        
        nameLast.style.transform = `perspective(1000px) rotateX(${baseRotateX * 1.2}deg) rotateY(${baseRotateY * 1.2}deg) translateZ(40px)`;
        nameLast.style.transition = 'transform 0.1s ease-out';
        
        clearTimeout(timeout);
    });
    
    hero.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            nameFirst.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            nameMiddle.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            nameLast.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }, 200);
    });
}

// =============================================
// RANDOM DRIFTING PARA SA PANGALAN
// =============================================
function randomDrift() {
    if (!nameFirst || !nameMiddle || !nameLast) return;
    
    // DALE - konting galaw lang
    const driftX1 = (Math.random() - 0.5) * 8;
    const driftY1 = (Math.random() - 0.5) * 6;
    const rotate1 = (Math.random() - 0.5) * 1.5;
    
    // VINCENT - katamtamang galaw
    const driftX2 = (Math.random() - 0.5) * 12;
    const driftY2 = (Math.random() - 0.5) * 8;
    const rotate2 = (Math.random() - 0.5) * 2;
    
    // DIMAANO - pinakamalayang galaw
    const driftX3 = (Math.random() - 0.5) * 15;
    const driftY3 = (Math.random() - 0.5) * 10;
    const rotate3 = (Math.random() - 0.5) * 2.5;
    
    // Get current transform from 3D effect
    const currentTransformFirst = nameFirst.style.transform.replace(/translate\([^)]*\)/g, '').trim();
    const currentTransformMiddle = nameMiddle.style.transform.replace(/translate\([^)]*\)/g, '').trim();
    const currentTransformLast = nameLast.style.transform.replace(/translate\([^)]*\)/g, '').trim();
    
    // Apply combined transform
    nameFirst.style.transform = `${currentTransformFirst} translate(${driftX1}px, ${driftY1}px) rotate(${rotate1}deg)`;
    nameMiddle.style.transform = `${currentTransformMiddle} translate(${driftX2}px, ${driftY2}px) rotate(${rotate2}deg)`;
    nameLast.style.transform = `${currentTransformLast} translate(${driftX3}px, ${driftY3}px) rotate(${rotate3}deg)`;
}

// =============================================
// GLITCH EFFECT PARA SA "Computer Engineer"
// =============================================
const professionText = document.querySelector('.profession');
const originalText = 'Computer Engineer';
const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

function glitchEffect() {
    if (!professionText) return;
    
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        if (glitchCount < 6) {
            const textArray = originalText.split('');
            const glitchPos = Math.floor(Math.random() * textArray.length);
            const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            
            textArray[glitchPos] = randomChar;
            professionText.innerHTML = `<span class="separator">[</span> ${textArray.join('')} <span class="separator">]</span>`;
            
            glitchCount++;
        } else {
            professionText.innerHTML = `<span class="separator">[</span> ${originalText} <span class="separator">]</span>`;
            clearInterval(glitchInterval);
        }
    }, 80);
}

// =============================================
// GLOW FOLLOW (Cursor Effect)
// =============================================
const glow = document.createElement('div');
glow.className = 'glow-cursor';
document.body.appendChild(glow);
glow.style.opacity = '0';

document.addEventListener('mousemove', (e) => {
    glow.style.opacity = '1';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
        target.classList.contains('filter-btn') || target.classList.contains('project-link') ||
        target.classList.contains('skill-tag') || target.classList.contains('btn-primary') ||
        target.classList.contains('social-link-item')) {
        glow.style.width = '150px';
        glow.style.height = '150px';
        glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)';
    } else {
        glow.style.width = '300px';
        glow.style.height = '300px';
        glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)';
    }
});

document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
});

// =============================================
// RUN ALL EFFECTS
// =============================================
setInterval(randomDrift, 2000);
setInterval(glitchEffect, 5000);

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });
}
