const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function randomFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x, segment.y, 10, 10);
        ctx.strokeRect(segment.x, segment.y, 10, 10);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function update() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    
    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        randomFood();
    } else {
        snake.pop(); // Remove last segment if no food eaten
    }
    
    snake.unshift(head); // Add new head
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function gameLoop() {
    update();
    draw();
}

randomFood();
document.addEventListener('keydown', changeDirection);
setInterval(gameLoop, 100);
