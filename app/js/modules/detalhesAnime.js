import { apiUrl, secAniIntro, toggleBemVindo } from "../main_original.js";
import { acessarPersonagens } from "./persAnime.js";
import { formatarTitulo, ratingStars, verificarStatusAnime, formatarData } from "./utils.js";

export function acessarAnime(idAnime) {
    fetch(`${apiUrl}/` + idAnime)
    .then(response => {
        if (!response.ok) {
            alert("Anime não encontrado na base de dados T_T. Sorteie novamente!");
            toggleBemVindo.style.display = 'flex';
        } else return response.json();
    })
    .then((anime) => {
        console.log(anime)
        const aniDataAtt = anime.data.attributes;
        const backgroundImage = aniDataAtt.coverImage ? `${aniDataAtt.coverImage.large}` : `${aniDataAtt.posterImage.large}`;
        secAniIntro.style.display = "flex";
        secAniIntro.style.background = "linear-gradient(to bottom, #06093fbe, #06093f)," + `url('${backgroundImage}')` + "no-repeat center center / cover";
        secAniIntro.innerHTML = `
            <div class="anime__intro-left">
                <img src="${aniDataAtt.posterImage.small}" alt="${formatarTitulo(aniDataAtt)}">
            </div>
            <div class="anime__intro-right">
                <span class="anime__ratings">${aniDataAtt.showType.charAt(0).toUpperCase() + aniDataAtt.showType.slice(1)} | ${ratingStars(aniDataAtt.averageRating)}</span>
                <h2 class="anime__title">${formatarTitulo(aniDataAtt)}</h2>
                <p class="anime__desc">${aniDataAtt.description}</p>
                <div class="anime__extra-infos">
                    <div class="anime__extra-info">
                        <span class="info-title">Status</span>
                        <p>${verificarStatusAnime(aniDataAtt.status)}</p>
                    </div>
                    <div class="anime__extra-info">
                        <span class="info-title">Início</span>
                        <p>${formatarData(aniDataAtt.startDate)}</p>
                    </div>
                    <div class="anime__extra-info">
                        <span class="info-title">Fim</span>
                        <p>${formatarData(aniDataAtt.endDate) ?? "Não finalizado"}</p>
                    </div>
                    <div class="anime__extra-info">
                        <span class="info-title">Episódios</span>
                        <p>${aniDataAtt.episodeCount} - Duração: ${aniDataAtt.episodeLength} min</p>
                    </div>
                </div>
            </div>
        `
        // acessarPersonagens(anime.data.id)
    })
    .catch(error => console.error("Anime não exibido. Erro na requisição:", error))
}