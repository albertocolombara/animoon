import { apiUrl } from "../main_original.js";
import { formatarData, formatarTemporada } from "./utils.js";

const secAniDetalhes = document.querySelector('.anime__info-detalhes');
const listaDetalhes = document.querySelector('.listar-detalhes');

export function acessarDetalhes(idAnime) {
    secAniDetalhes.style.display = "initial";
    listaDetalhes.innerHTML = "";
    secAniDetalhes.innerHTML = "";
    
    const detalhesHeading = document.createElement('h3');
    detalhesHeading.innerText = "Detalhes";
    secAniDetalhes.appendChild(detalhesHeading);

    fetch(`${apiUrl}/${idAnime}`)
        .then(response => response.json())
        .then(anime => {
            console.log(anime);
            secAniDetalhes.innerHTML = `
            <h3>Detalhes</h3>
            <div class="listar-detalhes">
                <div class="listar-detalhes-item"> 
                    <h4>Temporada</h4>
                    <span>${formatarTemporada(anime.data.attributes.startDate)}</span>
                </div>
                <div class="listar-detalhes-item">
                    <h4>Data de início</h4>
                    <span>${formatarData(anime.data.attributes.startDate)}</span>
                </div>
                <div class="listar-detalhes-item"> 
                    <h4>Finalizou em</h4>
                    <span>${formatarData(anime.data.attributes.endDate)}</span>
                </div>
                <div class="listar-detalhes-item"> 
                    <h4>Romaji</h4>
                    <span>${anime.data.attributes.titles.en_jp ?? "-"}</span>
                </div>
                <div class="listar-detalhes-item"> 
                    <h4>Japonês</h4>
                    <span>${anime.data.attributes.titles.ja_jp ?? "-"}</span>
                </div>
            </div>
            `
        })
} 