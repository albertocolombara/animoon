import { campoDePesquisa, resultadosDePesquisa, apiUrl } from "../main.js";
import { acessarAnime } from "./animeRender.js";
import { formatarTitulo, limparTela } from "./utils.js";

export function iniciarPesquisa() {
    campoDePesquisa.addEventListener('input', () => {
        let termoDePesquisa = campoDePesquisa.value.trim();
        capitalizarPesquisa(campoDePesquisa);
    
        if (termoDePesquisa.length >= 3) {
            fetch(`${apiUrl}?filter[text]=${termoDePesquisa}&fields[anime]=titles,posterImage&page[limit]=7`)
                .then(response => response.json())
                .then((busca) => {
                    const filtrarBusca = busca.data.filter(anime => 
                        !["delete", "deleted", "Delete"].includes(anime.attributes.titles.en) &&
                        !["delete", "deleted", "Delete"].includes(anime.attributes.titles.en_jp)
                    );
                    exibirResultados(filtrarBusca);
                })
                .catch(error => console.error("Pesquisa interrompida. Erro na requisição:", error))
        } else resultadosDePesquisa.innerHTML = "";
    })
    
    function exibirResultados(dadosAnime) {
        resultadosDePesquisa.innerHTML = "";
    
        if (Array.isArray(dadosAnime)) {
            dadosAnime.forEach ((anime) => {
                const pesquisaTitulo = document.createElement('a');
                const pesquisaImg = document.createElement('img');
                const pesquisaLi = document.createElement('li');
                pesquisaLi.classList.add('resultado');
    
                pesquisaTitulo.textContent = formatarTitulo(anime.attributes);
                pesquisaImg.src = anime.attributes.posterImage.tiny ?? anime.attributes.posterImage.original;
                pesquisaImg.alt = formatarTitulo(anime.attributes);
                pesquisaImg.width = "30";
    
                pesquisaLi.addEventListener("click", () => {
                    acessarAnime(anime.id);
                    limparTela();
                });
    
                resultadosDePesquisa.appendChild(pesquisaLi);
                pesquisaLi.appendChild(pesquisaTitulo);
                pesquisaLi.appendChild(pesquisaImg);
    
                document.addEventListener('click', (event) => {
                    if (event.target !== resultadosDePesquisa && event.target !== campoDePesquisa) {
                        resultadosDePesquisa.innerHTML = "";
                    }
                })
            } 
        )}
    }

    function capitalizarPesquisa(pesquisa) {
        pesquisa.value = pesquisa.value.charAt(0).toUpperCase() + pesquisa.value.slice(1);
    }
}