import { resultadosDePesquisa, campoDePesquisa, toggleBemVindo } from "../main.js";

export function limparTela() {
    resultadosDePesquisa.innerHTML = "";
    campoDePesquisa.value = "";
    toggleBemVindo.style.display = 'none';
}

export function formatarTitulo(animeData) {
    const formatTitles = animeData.titles.en || animeData.titles.en_us || animeData.titles.en_jp || animeData.titles.en_cn;
    return formatTitles || "Título Não Disponível";
}

export function ratingStars(averageRating) {
    const formatarRating = Math.round(averageRating);
    if (formatarRating >= 80) {
        return "★ ★ ★ ★ ★";
    } else if (formatarRating >= 60) {
        return "★ ★ ★ ★";
    } else if (formatarRating >= 40) {
        return "★ ★ ★";
    } else if (formatarRating >= 20) {
        return "★ ★ ";
    } else {
        return "★";
    }
}

export function verificarStatusAnime(status) {
    if (status === "current") {
        return "Em exibição";
    } else if (status === "upcoming") {
        return "Em breve";
    } else if (status === "tba") {
        return "Não anunciado";
    } else return "Finalizado"
}

export function formatarData(data) {
    if (data) {
        const partesData = data.split('-');
        const ano = partesData[0];
        const mes = partesData[1];
        const dia = partesData[2];
        const dataFormatada = dia + "/" + mes + "/" + ano;
        return(dataFormatada);
    } else return "-"
}

export function formatarTemporada(data) {
    if (data) {
        const partesData = data.split('-');
        const mes = partesData[1];
        const ano = partesData[0];
        let temp = "";
        if (mes >= 1 && mes < 3) {
            temp = "Inverno";
        } else if (mes >= 4 && mes < 7) {
            temp = "Primavera";
        } else if (mes >= 7 && mes < 10) {
            temp = "Verão";
        } else temp = "Outono";
        return (`${temp} / ${ano}`);
    } else return "-"
}

export function verificarDuracao(duracao) {
    if (duracao) {
        return `${duracao} min`
    } else return " "
}