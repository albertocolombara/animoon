import { acessarAnime } from "./animeRender.js";
import { limparTela } from "./utils.js";
import { toggleBemVindo, secAni } from "../main.js";

let botaoHabilitado = true;

export function sortearAnime() {
    const sorteioAnime = document.querySelector('.nav__randomizar');
    
    sorteioAnime.addEventListener("click", () => {
        if (!botaoHabilitado) {
           alert("Espere 1s para poder usar novamente.");
           return;
        } 

        botaoHabilitado = false;
        const randomAnime1 = Math.floor(Math.random() * 14267) + 1;
        const randomAnime2 = Math.floor(Math.random() * (48015 - 40563 + 1)) + 40563;
        const randomizarAnime = Math.random() < 0.5 ? randomAnime1 : randomAnime2;
        acessarAnime(randomizarAnime);
        limparTela();

        setTimeout(() => {
            botaoHabilitado = true;
        }, 1500);
    });
}
