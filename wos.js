// Função para abrir aplicativos
function openApp(app) {
    const windowsArea = document.querySelector('.windows-area');
    let windowContent = '';

    switch (app) {
        case 'files':
            windowContent = `
                <div class="window" id="files-window">
                    <div class="window-header">
                        <span>Arquivos</span>
                        <button class="close-btn" onclick="closeWindow('files-window')">X</button>
                    </div>
                    <div class="window-content">
                        <button onclick="createFolder('downloads')">Criar Pasta Downloads</button>
                        <div id="files-list"></div>
                    </div>
                </div>
            `;
            break;
        case 'calculator':
            windowContent = `
                <div class="window" id="calculator-window">
                    <div class="window-header">
                        <span>Calculadora</span>
                        <button class="close-btn" onclick="closeWindow('calculator-window')">X</button>
                    </div>
                    <div class="window-content">
                        <input type="text" id="calc-input" disabled>
                        <div class="calc-buttons">
                            <button onclick="appendToCalc('7')">7</button>
                            <button onclick="appendToCalc('8')">8</button>
                            <button onclick="appendToCalc('9')">9</button>
                            <button onclick="appendToCalc('+')">+</button>
                            <button onclick="appendToCalc('4')">4</button>
                            <button onclick="appendToCalc('5')">5</button>
                            <button onclick="appendToCalc('6')">6</button>
                            <button onclick="appendToCalc('-')">-</button>
                            <button onclick="appendToCalc('1')">1</button>
                            <button onclick="appendToCalc('2')">2</button>
                            <button onclick="appendToCalc('3')">3</button>
                            <button onclick="appendToCalc('*')">*</button>
                            <button onclick="appendToCalc('0')">0</button>
                            <button onclick="appendToCalc('.')">.</button>
                            <button onclick="calculate()">=</button>
                            <button onclick="appendToCalc('/')">/</button>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'terminal':
            windowContent = `
                <div class="window" id="terminal-window">
                    <div class="window-header">
                        <span>Terminal</span>
                        <button class="close-btn" onclick="closeWindow('terminal-window')">X</button>
                    </div>
                    <div class="window-content">
                        <input type="text" id="terminal-input" onkeypress="handleTerminalCommand(event)">
                        <div id="terminal-output"></div>
                    </div>
                </div>
            `;
            break;
        // Adicione outros casos para os outros aplicativos
    }

    windowsArea.innerHTML += windowContent;
}

// Função para fechar janelas
function closeWindow(windowId) {
    const windowToClose = document.getElementById(windowId);
    if (windowToClose) {
        windowToClose.remove();
    }
}

// Função para criar pasta
function createFolder(folderName) {
    const filesList = document.getElementById('files-list');
    filesList.innerHTML += `<div>📁 ${folderName}</div>`;
}

// Função para atualizar a hora e a data
function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');

    clock.textContent = now.toLocaleTimeString();
    date.textContent = now.toLocaleDateString();
}

setInterval(updateClock, 1000);
updateClock();

// Função para manipular comandos do terminal
function handleTerminalCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        const command = input.value;

        if (command === '/ls') {
            output.textContent = 'Arquivos: arquivo1.txt, arquivo2.txt';
        } else if (command === '/dns') {
            output.textContent = 'DNS: 8.8.8.8, 8.8.4.4';
        } else {
            output.textContent = `Comando não reconhecido: ${command}`;
        }

        input.value = '';
    }
}

// Função para adicionar números e operadores à calculadora
function appendToCalc(value) {
    const input = document.getElementById('calc-input');
    input.value += value;
}

// Função para calcular o resultado
function calculate() {
    const input = document.getElementById('calc-input');
    try {
        input.value = eval(input.value);
    } catch (e) {
        input.value = 'Erro';
    }
}
