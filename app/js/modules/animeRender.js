import { apiUrl, secAniIntro, secAniBottom, toggleBemVindo, secAni } from "../main.js";
import { acessarCategorias } from "./animeCategoria.js";
import { acessarStaff } from "./animeStaff.js";
import { acessarDetalhes } from "./animeDetalhes.js";
import { acessarPersonagens } from "./animePersonagem.js";
import { formatarTitulo, ratingStars, verificarStatusAnime, verificarDuracao } from "./utils.js";
import { renderVideo } from "./animeVideo.js";

export function acessarAnime(idAnime) {
    secAni.style.display = "initial";
    fetch(`${apiUrl}/${idAnime}`)
    .then(response => {
        if (!response.ok) {
            alert("Houve um erro ao mostrar o anime T-T. Sorteie novamente!");
            toggleBemVindo.style.display = 'flex';
            secAni.style.display = "none";
        } else return response.json();
    })
    .then((anime) => {
        const aniDataAtt = anime.data.attributes;
        const backgroundImage = aniDataAtt.coverImage ? `${aniDataAtt.coverImage.original}` : `${aniDataAtt.posterImage.original}`;
        secAniIntro.style.display = "flex";
        secAniIntro.style.background = "linear-gradient(to bottom, #06093fbe, #06093f)," + `url('${backgroundImage}')` + "no-repeat top center / cover";
        secAniBottom.style.background = "linear-gradient(to top, #06093fe8, #06093f)," + `url('${backgroundImage}')` + "no-repeat bottom center / cover";
        secAniIntro.innerHTML = `
            <div class="anime__intro-left">
                <img src="${aniDataAtt.posterImage.small}" alt="${formatarTitulo(aniDataAtt)}">
            </div>
            <div class="anime__intro-right">
                <div class="anime__top">
                    <span class="anime__top-ratings">${aniDataAtt.showType.charAt(0).toUpperCase() + aniDataAtt.showType.slice(1)} | ${ratingStars(aniDataAtt.averageRating)}</span>
                    <a class="anime__top-favorite">Favoritar</a>
                </div>
                <h2 class="anime__title">${formatarTitulo(aniDataAtt)}</h2>
                <div class="anime__categorias"></div>
                <div class="anime__desc"><p>${aniDataAtt.description ?? ""}</p></div>
                <div class="anime__wrapper">
                    <div class="anime__extra-infos">
                        <div class="anime__extra-info">
                            <h4 class="info-title">Status</h4>
                            <p>${verificarStatusAnime(aniDataAtt.status)}</p>
                        </div>
                        <div class="anime__extra-info">
                            <h4 class="info-title">Episódios</h4>
                            <p>${aniDataAtt.episodeCount ?? "-"}</p>
                        </div>
                        <div class="anime__extra-info">
                            <h4 class="info-title">Duração Ep</h4>
                            <p>${verificarDuracao(aniDataAtt.episodeLength)}</p>
                        </div>
                    </div>
                    <div class="anime__trailer">
                        <span>▶️ Assista o trailer</span>
                    </div>
                    </div>
                </div>
            </div>
        `
        const aniTrailer = document.querySelector('.anime__trailer');
        aniTrailer.addEventListener('click', () => {
            if (aniDataAtt.youtubeVideoId === null) {
                alert("Trailer não disponível :(")
            } else renderVideo(aniDataAtt.youtubeVideoId);
        }) 

        aniTrailer.style.background = "linear-gradient(to bottom, #000000da, #000000da)," + `url('${aniDataAtt.posterImage.small}')` + "no-repeat center center";
        acessarCategorias(anime.data.id);
        acessarDetalhes(anime.data.id);
        acessarPersonagens(anime.data.id);
        acessarStaff(anime.data.id);
    })
    .catch(error => console.error("Anime não exibido. Erro na requisição:", error))
}

