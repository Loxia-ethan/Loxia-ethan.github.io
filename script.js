// Parallax scrolling effect for system buses
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5; // Different speeds for each layer
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial parallax position
updateParallax();

// Header scroll hide/show effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll Down - Hide header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll Up - Show header
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Smooth scrolling and breadcrumb navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
            updateBreadcrumb(this.getAttribute('href'));
        }
    });
});

function updateBreadcrumb(hash) {
    const breadcrumb = document.getElementById('breadcrumb');
    const labels = {
        '#home': 'Home',
        '#about': 'About',
        '#technologies': 'Technologies',
        '#testimonials': 'Testimonials',
        '#contact': 'Contact',
        '#stats': 'Statistics'
    };
    breadcrumb.innerHTML = '<a href="#home">Home</a>';
    if (hash && labels[hash]) {
        breadcrumb.innerHTML += ' / <span>' + labels[hash] + '</span>';
    }
}

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, 20);
    });
}

// Trigger counters when stats section is in view
const observerOptions = {
    threshold: 0.5
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'stats') {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.getElementById('stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Search functionality
document.querySelector('.search-btn').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const text = section.innerText.toLowerCase();
        if (text.includes(query) || query === '') {
            section.style.display = '';
            section.style.opacity = text.includes(query) || query === '' ? '1' : '0.5';
        } else {
            section.style.opacity = '0.3';
        }
    });
}

// Live chat widget
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
    chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
});

chatClose.addEventListener('click', () => {
    chatWidget.style.display = 'none';
});

chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user-message';
        userMsg.innerHTML = '<p>' + message + '</p>';
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot-message';
            botMsg.innerHTML = '<p>Thanks for your message! Our team will get back to you soon.</p>';
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSend.click();
    }
});

// Form redirect to cookie page on success
const contactForm = document.getElementById('contactForm');
const subscribeForm = document.getElementById('subscribeForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm(this, 'https://formspree.io/f/xyzqwerty');
    });
}

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm(this, 'https://formspree.io/f/xyzqwerty');
    });
}

function submitForm(form, endpoint) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success - redirect to cookie page
            setTimeout(() => {
                window.location.href = 'cookie.html';
            }, 1000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Still redirect to cookie page even if email fails
        setTimeout(() => {
            window.location.href = 'cookie.html';
        }, 1000);
    })
    .finally(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}