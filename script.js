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
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// PAGE TRANSITIONS - smooth scroll with fade effects
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get all sections
            const sections = document.querySelectorAll('.hero, .about, .projects, .contact');
            
            // Fade out all sections
            sections.forEach(section => {
                section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            });
            
            // Scroll to target with offset para sa navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fade in ang target section after scroll
            setTimeout(() => {
                sections.forEach(section => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                });
                
                // Add highlight effect sa target section
                targetElement.style.transition = 'box-shadow 0.3s ease';
                targetElement.style.boxShadow = 'inset 0 0 30px rgba(255,255,255,0.1)';
                
                setTimeout(() => {
                    targetElement.style.boxShadow = 'none';
                }, 500);
            }, 400);
            
            // Update active state sa navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = 'var(--text-dim)';
            });
            this.style.color = 'var(--text-primary)';
        }
    });
});

// Navbar transparency on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3D CURSOR EFFECT - 3 LINES (original)
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

// ========== NEW RANDOM EFFECTS ==========

// IDEA B: RANDOM DRIFTING PARA SA PANGALAN (DALE, VINCENT, DIMAANO)
function randomDrift() {
    // DALE - konting galaw lang
    const driftX1 = (Math.random() - 0.5) * 8; // -4px to 4px
    const driftY1 = (Math.random() - 0.5) * 6; // -3px to 3px
    const rotate1 = (Math.random() - 0.5) * 1.5; // -0.75deg to 0.75deg
    
    // VINCENT - katamtamang galaw
    const driftX2 = (Math.random() - 0.5) * 12; // -6px to 6px
    const driftY2 = (Math.random() - 0.5) * 8; // -4px to 4px
    const rotate2 = (Math.random() - 0.5) * 2; // -1deg to 1deg
    
    // DIMAANO - pinakamalayang galaw
    const driftX3 = (Math.random() - 0.5) * 15; // -7.5px to 7.5px
    const driftY3 = (Math.random() - 0.5) * 10; // -5px to 5px
    const rotate3 = (Math.random() - 0.5) * 2.5; // -1.25deg to 1.25deg
    
    // Apply sa pangalan
    nameFirst.style.transform = `translate(${driftX1}px, ${driftY1}px) rotate(${rotate1}deg)`;
    nameMiddle.style.transform = `translate(${driftX2}px, ${driftY2}px) rotate(${rotate2}deg)`;
    nameLast.style.transform = `translate(${driftX3}px, ${driftY3}px) rotate(${rotate3}deg)`;
}

// IDEA D: GLITCH EFFECT PARA SA "Computer Engineer"
const professionText = document.querySelector('.profession');
const originalText = 'Computer Engineer';
const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

function glitchEffect() {
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        if (glitchCount < 6) { // Maglili glitch ng 6 na beses
            // Pumili ng random na letra na papalitan
            const textArray = originalText.split('');
            const glitchPos = Math.floor(Math.random() * textArray.length);
            const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            
            textArray[glitchPos] = randomChar;
            professionText.innerHTML = `<span class="separator">[</span> ${textArray.join('')} <span class="separator">]</span>`;
            
            glitchCount++;
        } else {
            // Balik sa original
            professionText.innerHTML = `<span class="separator">[</span> ${originalText} <span class="separator">]</span>`;
            clearInterval(glitchInterval);
        }
    }, 80); // 80ms per glitch
}

// RUN ALL EFFECTS
setInterval(() => {
    randomDrift(); // Palaging tumatakbo ang drifting (every 2 seconds)
}, 2000);

setInterval(() => {
    glitchEffect(); // Magka-glitch every 5 seconds
}, 5000);

// SCROLL REVEAL - CARD STAGGER
window.addEventListener('load', () => {
    // Initial setup - lahat ng cards nakatago
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Function to check if element is in viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to reveal cards with stagger effect
    function revealCards() {
        const cards = document.querySelectorAll('.project-card');
        let visibleCards = [];
        
        // Kunin ang mga visible na cards
        cards.forEach(card => {
            if (isInViewport(card)) {
                visibleCards.push(card);
            }
        });
        
        // Ipakita ang cards sunod-sunod
        visibleCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', () => {
        revealCards();
    });
    
    // Run once on load
    setTimeout(revealCards, 200);
});

// Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });
}
