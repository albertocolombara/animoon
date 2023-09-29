import { acessarAnime } from "./detalhesAnime.js";
import { limparTela } from "./utils.js";

export function sortearAnime() {
    const sorteioAnime = document.querySelector('.nav__randomizar');
    sorteioAnime.addEventListener("click", () => {
        const randomizarAnime = Math.floor(Math.random() * 14267) + 1;
        acessarAnime(randomizarAnime);
        limparTela();
    });
}