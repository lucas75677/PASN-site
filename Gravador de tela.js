const downloadButton = document.createElement("button");
downloadButton.innerText = "Baixar Vídeo";
document.body.appendChild(downloadButton);

downloadButton.addEventListener("click", () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gravacao.webm";
    a.click();
});

let mediaRecorder;
let recordedChunks = [];

document.getElementById('start').addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            document.getElementById('preview').src = url;
            recordedChunks = [];
        };

        mediaRecorder.start();
        document.getElementById('start').disabled = true;
        document.getElementById('stop').disabled = false;
    } catch (err) {
        console.error("Erro ao capturar a tela:", err);
    }
});

document.getElementById('stop').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
});
