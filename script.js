// Inject the page transition wipe dynamically
const wipe = document.createElement('div');
wipe.className = 'page-transition-wipe';
document.body.appendChild(wipe);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Transition Interceptor
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignore if it's not a real link, a blank target, or just an anchor link
            if (!href || href === '#' || href.startsWith('#') || link.getAttribute('target') === '_blank') {
                return; 
            }

            // It's an internal page navigation, let's intercept it
            e.preventDefault();
            
            // Trigger wipe up
            wipe.classList.add('is-active');

            // Wait for wipe to finish (600ms matching CSS transition)
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    // 2. Smooth Scroll for Anchor Links (e.g. #work)
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

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before hitting the bottom
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-anim');
    scrollElements.forEach(el => {
        animateOnScroll.observe(el);
    });

});
