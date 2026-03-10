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

// SCROLL TRANSITION - pag nag-scroll pababa, may lalabas na effects
const observerOptions = {
    threshold: 0.2, // 20% ng section ang visible bago mag-trigger
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Kapag pumasok sa view yung section
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add subtle glow effect
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease';
            entry.target.style.boxShadow = 'inset 0 0 30px rgba(255,255,255,0.05)';
            
            setTimeout(() => {
                entry.target.style.boxShadow = 'none';
            }, 600);
        }
    });
}, observerOptions);

// Apply sa lahat ng sections at project cards
document.querySelectorAll('.hero, .about, .projects, .contact, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
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

// 3D CURSOR EFFECT - 3 LINES
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

// Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });
}

// Fade in animation on page load
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.hero, .about, .projects, .contact');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animation = `fadeInUp 0.6s ease`;
        }, index * 0.1);
    });
});
