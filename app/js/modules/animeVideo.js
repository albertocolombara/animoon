import { secAni } from "../main.js";

export const aniVideo = document.createElement('div');
const aniVideoOverlay = document.createElement('div');
const video = document.createElement('iframe');

export function renderVideo(videoYt) {
    aniVideo.style.display = "flex";
    video.src = `https://www.youtube-nocookie.com/embed/${videoYt}?enablejsapi=1`;
    video.width = "560";
    video.height = "315";
    video.title = "YouTube video player";
    video.id = "youtube-iframe";
    video.setAttribute('allowfullscreen', '');
    video.setAttribute('frameborder', '0');
    video.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share')
    aniVideo.classList.add('anime__video');
    aniVideoOverlay.classList.add('anime__video-overlay');
    aniVideoOverlay.appendChild(video);
    aniVideo.appendChild(aniVideoOverlay);
    secAni.appendChild(aniVideo);

    document.addEventListener("click", event => {
        if (event.target === aniVideo) {
            aniVideoOverlay.removeChild(video);
            aniVideo.style.display = "none";
        }
    })
}