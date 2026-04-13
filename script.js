// Complete script.js file incorporating original and new code

// Original Code Placeholder
// Add your original JavaScript code here

// Computer Bus Animation

const canvas = document.getElementById('busCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let bus = { x: 100, y: 200, width: 150, height: 50, speed: 2 };

function drawBus() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(bus.x, bus.y, bus.width, bus.height);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(bus.x + 20, bus.y + bus.height, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(bus.x + bus.width - 20, bus.y + bus.height, 20, 0, Math.PI * 2);
    ctx.fill();
}

function updateBus() {
    bus.x += bus.speed;
    if (bus.x > canvas.width) {
        bus.x = -bus.width;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBus();
    updateBus();
    requestAnimationFrame(animate);
}

animate();