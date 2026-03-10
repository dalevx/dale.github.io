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

// 3D CURSOR EFFECT - MAS MAGANDA (bawat letra gumagalaw)
const hero = document.querySelector('.hero');
const nameFirstLetters = document.querySelectorAll('.name-first span');
const nameLastLetters = document.querySelectorAll('.name-last span');

if (nameFirstLetters.length > 0 && nameLastLetters.length > 0) {
    let timeout;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Base rotation (mas subtle, 12 degrees max)
        const baseRotateY = ((mouseX - centerX) / centerX) * 12;
        const baseRotateX = ((mouseY - centerY) / centerY) * -12;
        
        // Iba-ibang galaw per letter - para mas maganda
        nameFirstLetters.forEach((letter, index) => {
            // Iba-ibang delay para sunod-sunod ang galaw
            const delay = index * 0.03;
            // Iba-ibang intensity para hindi pare-pareho
            const intensity = 0.8 + (index % 4) * 0.2;
            // Iba-ibang Z depth
            const zDepth = 15 + (index * 2);
            
            letter.style.transform = `perspective(1000px) 
                rotateX(${baseRotateX * intensity}deg) 
                rotateY(${baseRotateY * intensity}deg) 
                translateZ(${zDepth}px)`;
            letter.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
            letter.style.transitionDelay = `${delay}s`;
        });
        
        nameLastLetters.forEach((letter, index) => {
            const delay = index * 0.03 + 0.2; // Mas late magalaw ang DIMAANO
            const intensity = 1.0 + (index % 3) * 0.15;
            const zDepth = 20 + (index * 3);
            
            letter.style.transform = `perspective(1000px) 
                rotateX(${baseRotateX * intensity}deg) 
                rotateY(${baseRotateY * intensity}deg) 
                translateZ(${zDepth}px)`;
            letter.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
            letter.style.transitionDelay = `${delay}s`;
        });
        
        // Clear any existing timeout
        clearTimeout(timeout);
    });
    
    // Reset when mouse leaves (with delay para smooth)
    hero.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            nameFirstLetters.forEach(letter => {
                letter.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                letter.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                letter.style.transitionDelay = '0s';
            });
            
            nameLastLetters.forEach(letter => {
                letter.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                letter.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                letter.style.transitionDelay = '0s';
            });
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
