import { apiUrl, secAniPers } from "../main_original.js";

export function acessarPersonagens(idAnime) {
    secAniPers.innerHTML = "";

    fetch(`${apiUrl}/${idAnime}/characters?sort=role`)
        .then(response => response.json())
        .then(personagens => {
            if (Array.isArray(personagens.data)) {
                const personagensPrincipais = personagens.data.filter(personagem => personagem.attributes.role === 'main');
                personagensPrincipais.forEach((personagemPrincipal) => {
                    fetch(`https://kitsu.io/api/edge/media-characters/${personagemPrincipal.id}/character`)
                    .then(response => response.json())
                    .then(personagens => {
                        fetch(`https://kitsu.io/api/edge/characters/${personagens.data.id}`)
                            .then(response => response.json())
                            .then(personagens => {
                                const nomePersonagem = document.createElement('span')
                                const imgPersonagem = document.createElement('img')
                                const divPersonagem = document.createElement('div')

                                nomePersonagem.textContent = personagens.data.attributes.name;
                                imgPersonagem.src = personagens.data.attributes.image.original;
                                imgPersonagem.alt = personagens.data.attributes.name;
                                imgPersonagem.width = "120";
                                divPersonagem.classList.add('anime__personagens-item');

                                divPersonagem.appendChild(nomePersonagem);
                                divPersonagem.appendChild(imgPersonagem);
                                secAniPers.appendChild(divPersonagem);
                            })
                    })
                })
            }
        })
} 