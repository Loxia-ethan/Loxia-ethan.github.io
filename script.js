// Create a canvas for the computer bus animation
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 3 + 1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(173, 216, 230, 0.8)';
        ctx.fill();

        particle.x += particle.speed;
        if (particle.x > canvas.width) {
            particle.x = 0;
        }
    }
    requestAnimationFrame(animateParticles);
}
createParticles();
animateParticles();

// Parallax function (existing code)

