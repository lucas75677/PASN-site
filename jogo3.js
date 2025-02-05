const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 20; // Tamanho de cada "bloco" do jogo
const WIDTH = canvas.width / TILE_SIZE;
const HEIGHT = canvas.height / TILE_SIZE;

let snake = [{ x: 10, y: 10 }]; // Cobra começa com um bloco
let direction = { x: 0, y: 0 }; // Direção inicial
let food = { x: 5, y: 5 }; // Posição da comida
let score = 0;

// Função para desenhar o jogo
function draw() {
  // Limpa o canvas
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  });

  // Desenha a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

  // Mostra o placar
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Função para atualizar o estado do jogo
function update() {
  // Move a cobra
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Verifica colisão com as paredes
  if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
    resetGame();
    return;
  }

  // Verifica colisão com o próprio corpo
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    resetGame();
    return;
  }

  // Adiciona a nova cabeça
  snake.unshift(head);

  // Verifica se a cobra comeu a comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    // Remove o último segmento da cobra
    snake.pop();
  }
}

// Função para reposicionar a comida
function placeFood() {
  food.x = Math.floor(Math.random() * WIDTH);
  food.y = Math.floor(Math.random() * HEIGHT);

  // Verifica se a comida não foi colocada em cima da cobra
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Função para reiniciar o jogo
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  placeFood();
}

// Função para capturar as teclas pressionadas
function handleKeyPress(e) {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

// Loop do jogo
function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

// Inicia o jogo
document.addEventListener("keydown", handleKeyPress);
placeFood();
gameLoop();
