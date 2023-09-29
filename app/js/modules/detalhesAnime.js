import { apiUrl, secAniIntro, toggleBemVindo } from "../main_original.js";
import { acessarPersonagens } from "./persAnime.js";
import { formatarTitulo, ratingStars } from "./utils.js";

export function acessarAnime(idAnime) {
    fetch(`${apiUrl}/` + idAnime)
    .then(response => {
        if (!response.ok) {
            alert("Anime não encontrado na base de dados T_T. Sorteie novamente!");
            toggleBemVindo.style.display = 'flex';
        } else return response.json();
    })
    .then((anime) => {
        const aniDataAtt = anime.data.attributes;
        const backgroundImage = aniDataAtt.coverImage ? `${aniDataAtt.coverImage.large}` : `${aniDataAtt.posterImage.large}`;
        secAniIntro.style.display = "flex";
        secAniIntro.style.background = "linear-gradient(to bottom, #06093fbe, #06093f)," + `url('${backgroundImage}')` + "no-repeat center center / cover";
        secAniIntro.innerHTML = `
            <div class="anime__intro-left">
                <img src="${aniDataAtt.posterImage.small}" alt="${formatarTitulo(aniDataAtt)}">
            </div>
            <div class="anime__intro-right">
                <span>${ratingStars(aniDataAtt.averageRating)}</span>
                <h2>${formatarTitulo(aniDataAtt)}</h2>
                <p>${aniDataAtt.description}</p>
            </div>
        `
        acessarPersonagens(anime.data.id)
    })
    .catch(error => console.error("Anime não exibido. Erro na requisição:", error))
}