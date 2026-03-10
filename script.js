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
