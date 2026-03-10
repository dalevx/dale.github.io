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
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
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

// 3D CURSOR EFFECT
const hero = document.querySelector('.hero');
const nameFirst = document.querySelector('.name-first');
const nameLast = document.querySelector('.name-last');

if (nameFirst && nameLast) {
    let timeout;
    
    hero.addEventListener('mousemove', (e) => {
        // Get mouse position relative to hero section
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max 8 degrees lang para subtle)
        const rotateY = ((mouseX - centerX) / centerX) * 8;
        const rotateX = ((mouseY - centerY) / centerY) * -8;
        
        // Apply rotation to each name with different intensity
        nameFirst.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        nameLast.style.transform = `perspective(1000px) rotateX(${rotateX * 1.2}deg) rotateY(${rotateY * 1.2}deg) translateZ(30px)`;
        
        // Add transition for smoothness
        nameFirst.style.transition = 'transform 0.1s ease-out';
        nameLast.style.transition = 'transform 0.1s ease-out';
        
        // Clear any existing timeout
        clearTimeout(timeout);
    });
    
    // Reset when mouse leaves (with delay para smooth)
    hero.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            nameFirst.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
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
