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

// 3D TEXT THAT FOLLOWS CURSOR - IMPROVED
const hero = document.querySelector('.hero');
const name3D = document.querySelector('.name-3d');

if (name3D) {
    let timeout;
    
    hero.addEventListener('mousemove', (e) => {
        // Get mouse position relative to hero section
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Mas malaking rotation (20 degrees max) para mas obvious
        const rotateY = ((mouseX - centerX) / centerX) * 20;
        const rotateX = ((mouseY - centerY) / centerY) * -20;
        
        // Apply 3D rotation with smoother transition
        name3D.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
        
        // Clear any existing timeout
        clearTimeout(timeout);
    });
    
    // Reset when mouse leaves - may delay para smooth
    hero.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            name3D.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(30px)';
        }, 100);
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
