const INVIDIOUS_INSTANCE = "https://inv.nadeko.net";  // Escolha uma instância disponível
const API_URL = `${INVIDIOUS_INSTANCE}/api/v1/trending`;  // Pega vídeos populares

document.addEventListener("DOMContentLoaded", () => {
    fetchVideos();
});

async function fetchVideos() {
    try {
        const response = await fetch(API_URL);
        const videos = await response.json();
        
        const videoFeed = document.getElementById("video-feed");
        videoFeed.innerHTML = "";

        videos.forEach(video => {
            const videoCard = document.createElement("div");
            videoCard.className = "video-card";
            videoCard.innerHTML = `
                <img src="${video.videoThumbnails[3].url}" alt="${video.title}">
                <div class="video-title">${video.title}</div>
            `;
            videoCard.addEventListener("mouseenter", () => showPreview(video.videoId));
            videoCard.addEventListener("mouseleave", hidePreview);

            videoFeed.appendChild(videoCard);
        });
    } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
    }
}

function showPreview(videoId) {
    const previewContainer = document.getElementById("preview-container");
    const previewVideo = document.getElementById("preview-video");
    
    previewVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    previewContainer.classList.remove("hidden");
}

function hidePreview() {
    const previewContainer = document.getElementById("preview-container");
    const previewVideo = document.getElementById("preview-video");
    
    previewVideo.src = "";
    previewContainer.classList.add("hidden");
}
