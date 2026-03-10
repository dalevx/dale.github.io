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

// 3D TEXT THAT FOLLOWS CURSOR
const hero = document.querySelector('.hero');
const name3D = document.querySelector('.name-3d');

if (name3D) {
    hero.addEventListener('mousemove', (e) => {
        // Get mouse position relative to hero section
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        // Map mouse position to rotation values (-15deg to 15deg)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((mouseX - centerX) / centerX) * 15; // Max 15 degrees
        const rotateX = ((mouseY - centerY) / centerY) * -15; // Max 15 degrees, inverted
        
        // Apply 3D rotation
        name3D.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    // Reset when mouse leaves
    hero.addEventListener('mouseleave', () => {
        name3D.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(20px)';
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
