/**
 * Portfolio Interaction Scripts
 * Replicating high-end editorial experiences with pure Vanilla JS.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Splash Screen Logic
    const splash = document.getElementById('splash');
    
    // Simulate initial loading time (in real world, wait for images)
    setTimeout(() => {
        splash.classList.add('is-hidden');
        
        // After splash hides, trigger the hero animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero .clip-container');
            heroElements.forEach(el => el.classList.add('is-visible'));
        }, 500); // Wait bit before showing text for dramatic effect
        
    }, 1500); 

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before it hits bottom
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS transition
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const clipContainers = document.querySelectorAll('.clip-container, .zoom-container');
    clipContainers.forEach(el => {
        // Exclude hero elements since they are animated on load
        if (!el.closest('.hero')) {
            animateOnScroll.observe(el);
        }
    });

    // 3. Smooth Scroll for Anchor Links (Optional polish)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Hero Hover Dark Mode Interaction
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            document.body.classList.add('is-hovering-hero');
        });
        heroTitle.addEventListener('mouseleave', () => {
            document.body.classList.remove('is-hovering-hero');
        });
    }
});
