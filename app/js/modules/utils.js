import { resultadosDePesquisa, campoDePesquisa, toggleBemVindo } from "../main_original.js";

export function limparTela() {
    resultadosDePesquisa.innerHTML = "";
    campoDePesquisa.value = "";
    toggleBemVindo.style.display = 'none';
}

export function formatarTitulo(animeData) {
    const formatTitles = animeData.titles.en || animeData.titles.en_us || animeData.titles.en_jp;
    return formatTitles || "Título Não Disponível";
}

export function ratingStars(averageRating) {
    const formatarRating = Math.round(averageRating);
    if (formatarRating >= 80) {
        return "★ ★ ★ ★ ★";
    } else if (formatarRating >= 60) {
        return "★ ★ ★ ★ ☆";
    } else if (formatarRating >= 40) {
        return "★ ★ ★ ☆ ☆";
    } else if (formatarRating >= 20) {
        return "★ ★ ☆ ☆ ☆";
    } else {
        return "★ ☆ ☆ ☆ ☆";
    }
}