const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
let playerLeft = 125;
let obstacleTop = -50;
let obstacleSpeed = 2;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerLeft > 0) {
        playerLeft -= 10;
    } else if (event.key === 'ArrowRight' && playerLeft < 250) {
        playerLeft += 10;
    }
    player.style.left = playerLeft + 'px';
});

function moveObstacle() {
    obstacleTop += obstacleSpeed;
    obstacle.style.top = obstacleTop + 'px';

    if (obstacleTop > 500) {
        obstacleTop = -50;
        obstacle.style.left = Math.floor(Math.random() * 250) + 'px';
    }

    if (obstacleTop + 50 > 450 && playerLeft < parseInt(obstacle.style.left) + 50 && playerLeft + 50 > parseInt(obstacle.style.left)) {
        alert('Game Over!');
        obstacleTop = -50;
        obstacle.style.left = Math.floor(Math.random() * 250) + 'px';
    }

    requestAnimationFrame(moveObstacle);
}

moveObstacle();