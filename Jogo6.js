// script.js
let scene, camera, renderer, cube, plane;
let speed = 0.1;
let obstacles = [];

function init() {
    // Cena
    scene = new THREE.Scene();

    // Câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Cubo (personagem)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1;
    scene.add(cube);

    // Chão
    const planeGeometry = new THREE.PlaneGeometry(10, 1000);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);

    // Obstáculos
    for (let i = 0; i < 10; i++) {
        const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
        const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        obstacle.position.set(Math.random() * 5 - 2.5, 0.5, -i * 20);
        obstacles.push(obstacle);
        scene.add(obstacle);
    }

    // Controles
    document.addEventListener('keydown', onKeyDown);

    // Animação
    animate();
}

function onKeyDown(event) {
    if (event.key === 'ArrowLeft' && cube.position.x > -2.5) {
        cube.position.x -= 1;
    }
    if (event.key === 'ArrowRight' && cube.position.x < 2.5) {
        cube.position.x += 1;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Movimentação dos obstáculos
    for (let obstacle of obstacles) {
        obstacle.position.z += speed;
        if (obstacle.position.z > 10) {
            obstacle.position.z = -90;
            obstacle.position.x = Math.random() * 5 - 2.5;
        }

        // Colisão
        if (Math.abs(cube.position.x - obstacle.position.x) < 0.5 && Math.abs(cube.position.z - obstacle.position.z) < 0.5) {
            alert('Game Over!');
            speed = 0;
        }
    }

    renderer.render(scene, camera);
}

// Inicialização
init();
