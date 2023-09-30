import { acessarAnime } from "./detalhesAnime.js";
import { limparTela } from "./utils.js";

export function sortearAnime() {
    const sorteioAnime = document.querySelector('.nav__randomizar');
    sorteioAnime.addEventListener("click", () => {
        const randomAnime1 = Math.floor(Math.random() * 14267) + 1
        const randomAnime2 = Math.floor(Math.random() * (48015 - 40563 + 1)) + 40563 
        const randomizarAnime = Math.random() < 0.5 ? randomAnime1 : randomAnime2;
        acessarAnime(randomizarAnime);
        limparTela();
    });
}