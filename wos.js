function openWindow() {
    const desktop = document.querySelector('.desktop');
    const windowCount = document.querySelectorAll('.window').length + 1;

    const newWindow = document.createElement('div');
    newWindow.className = 'window';
    newWindow.id = `window${windowCount}`;
    newWindow.style.top = `${windowCount * 20}px`;
    newWindow.style.left = `${windowCount * 20}px`;

    newWindow.innerHTML = `
        <div class="window-header">
            <span>Janela ${windowCount}</span>
            <button class="close-btn" onclick="closeWindow('${newWindow.id}')">X</button>
        </div>
        <div class="window-content">
            <p>Conteúdo da Janela ${windowCount}</p>
        </div>
    `;

    desktop.appendChild(newWindow);
}

function closeWindow(windowId) {
    const windowToClose = document.getElementById(windowId);
    if (windowToClose) {
        windowToClose.remove();
    }
}

function openApp(app) {
    let content = '';
    switch (app) {
        case 'files':
            content = `
                <div class="window-header">
                    <span>Arquivos</span>
                    <button class="close-btn" onclick="closeWindow('files-window')">X</button>
                </div>
                <div class="window-content">
                    <button onclick="createFolder('downloads')">Criar Pasta Downloads</button>
                    <div id="files-list"></div>
                </div>
            `;
            break;
        case 'calculator':
            content = `
                <div class="window-header">
                    <span>Calculadora</span>
                    <button class="close-btn" onclick="closeWindow('calculator-window')">X</button>
                </div>
                <div class="window-content">
                    <input type="text" id="calc-input" disabled>
                    <div>
                        <button onclick="appendToCalc('7')">7</button>
                        <button onclick="appendToCalc('8')">8</button>
                        <button onclick="appendToCalc('9')">9</button>
                        <button onclick="appendToCalc('+')">+</button>
                    </div>
                    <div>
                        <button onclick="appendToCalc('4')">4</button>
                        <button onclick="appendToCalc('5')">5</button>
                        <button onclick="appendToCalc('6')">6</button>
                        <button onclick="appendToCalc('-')">-</button>
                    </div>
                    <div>
                        <button onclick="appendToCalc('1')">1</button>
                        <button onclick="appendToCalc('2')">2</button>
                        <button onclick="appendToCalc('3')">3</button>
                        <button onclick="appendToCalc('*')">*</button>
                    </div>
                    <div>
                        <button onclick="appendToCalc('0')">0</button>
                        <button onclick="appendToCalc('.')">.</button>
                        <button onclick="calculate()">=</button>
                        <button onclick="appendToCalc('/')">/</button>
                    </div>
                </div>
            `;
            break;
        case 'terminal':
            content = `
                <div class="window-header">
                    <span>Terminal</span>
                    <button class="close-btn" onclick="closeWindow('terminal-window')">X</button>
                </div>
                <div class="window-content">
                    <input type="text" id="terminal-input" onkeypress="handleTerminalCommand(event)">
                    <div id="terminal-output"></div>
                </div>
            `;
            break;
        case 'control-panel':
            content = `
                <div class="window-header">
                    <span>Painel de Controle</span>
                    <button class="close-btn" onclick="closeWindow('control-panel-window')">X</button>
                </div>
                <div class="window-content">
                    <button onclick="changeBackgroundColor()">Mudar Cor da Tela Inicial</button>
                    <button onclick="changeWindowColor()">Mudar Cor das Janelas</button>
                    <button onclick="changeWallpaper()">Mudar Papel de Parede</button>
                </div>
            `;
            break;
        case 'browser':
            content = `
                <div class="window-header">
                    <span>Navegador</span>
                    <button class="close-btn" onclick="closeWindow('browser-window')">X</button>
                </div>
                <div class="window-content">
                    <input type="text" id="browser-url" placeholder="Digite a URL">
                    <button onclick="loadUrl()">Carregar</button>
                    <iframe id="browser-iframe" src="" style="width: 100%; height: 300px;"></iframe>
                </div>
            `;
            break;
        case 'notepad':
            content = `
                <div class="window-header">
                    <span>Bloco de Notas</span>
                    <button class="close-btn" onclick="closeWindow('notepad-window')">X</button>
                </div>
                <div class="window-content">
                    <textarea id="notepad-text" style="width: 100%; height: 200px;"></textarea>
                    <button onclick="saveNotepad()">Salvar</button>
                </div>
            `;
            break;
        case 'draw':
            content = `
                <div class="window-header">
                    <span>Desenhar</span>
                    <button class="close-btn" onclick="closeWindow('draw-window')">X</button>
                </div>
                <div class="window-content">
                    <canvas id="draw-canvas" width="300" height="300" style="border: 1px solid black;"></canvas>
                    <button onclick="clearCanvas()">Limpar</button>
                </div>
            `;
            break;
        case 'contacts':
            content = `
                <div class="window-header">
                    <span>Contatos</span>
                    <button class="close-btn" onclick="closeWindow('contacts-window')">X</button>
                </div>
                <div class="window-content">
                    <input type="text" id="contact-name" placeholder="Nome">
                    <input type="text" id="contact-phone" placeholder="Telefone">
                    <button onclick="addContact()">Adicionar Contato</button>
                    <div id="contacts-list"></div>
                </div>
            `;
            break;
        case 'trash':
            content = `
                <div class="window-header">
                    <span>Lixeira</span>
                    <button class="close-btn" onclick="closeWindow('trash-window')">X</button>
                </div>
                <div class="window-content">
                    <p>Lixeira vazia</p>
                </div>
            `;
            break;
    }

    const newWindow = document.createElement('div');
    newWindow.className = 'window';
    newWindow.id = `${app}-window`;
    newWindow.style.top = '50px';
    newWindow.style.left = '50px';
    newWindow.innerHTML = content;

    document.querySelector('.desktop').appendChild(newWindow);
}

function createFolder(folderName) {
    const filesList = document.getElementById('files-list');
    const newFolder = document.createElement('div');
    newFolder.textContent = folderName;
    filesList.appendChild(newFolder);
}

function appendToCalc(value) {
    const calcInput = document.getElementById('calc-input');
    calcInput.value += value;
}

function calculate() {
    const calcInput = document.getElementById('calc-input');
    calcInput.value = eval(calcInput.value);
}

function handleTerminalCommand(event) {
    if (event.key === 'Enter') {
        const terminalInput = document.getElementById('terminal-input');
        const terminalOutput = document.getElementById('terminal-output');
        const command = terminalInput.value;

        if (command === '/ls') {
            terminalOutput.textContent = 'Arquivos: arquivo1.txt, arquivo2.txt';
        } else if (command === '/dns') {
            terminalOutput.textContent = 'DNS: 8.8.8.8, 8.8.4.4';
        } else {
            terminalOutput.textContent = `Comando não reconhecido: ${command}`;
        }

        terminalInput.value = '';
    }
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = prompt('Digite a nova cor de fundo (ex: #000000):');
}

function changeWindowColor() {
    const windows = document.querySelectorAll('.window');
    const newColor = prompt('Digite a nova cor das janelas (ex: #ffffff):');
    windows.forEach(window => window.style.backgroundColor = newColor);
}

function changeWallpaper() {
    const newWallpaper = prompt('Digite a URL da nova imagem de fundo:');
    document.body.style.backgroundImage = `url('${newWallpaper}')`;
}

function loadUrl() {
    const browserUrl = document.getElementById('browser-url').value;
    const browserIframe = document.getElementById('browser-iframe');
    browserIframe.src = browserUrl;
}

function saveNotepad() {
    const notepadText = document.getElementById('notepad-text').value;
    localStorage.setItem('notepad', notepadText);
    alert('Texto salvo!');
}

function clearCanvas() {
    const canvas = document.getElementById('draw-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addContact() {
    const contactName = document.getElementById('contact-name').value;
    const contactPhone = document.getElementById('contact-phone').value;
    const contactsList = document.getElementById('contacts-list');

    const newContact = document.createElement('div');
    newContact.textContent = `${contactName}: ${contactPhone}`;
    contactsList.appendChild(newContact);

    document.getElementById('contact-name').value = '';
    document.getElementById('contact-phone').value = '';
}

function updateTime() {
    const now = new Date();
    const time = document.getElementById('time');
    const date = document.getElementById('date');

    time.textContent = now.toLocaleTimeString();
    date.textContent = now.toLocaleDateString();
}

setInterval(updateTime, 1000);
updateTime();
