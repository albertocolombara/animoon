import { apiUrl } from "../main_original.js";

const secAniPers = document.querySelector('.anime__info-personagens');
const listaPers = document.querySelector('.listar-personagens');

export function acessarPersonagens(idAnime) {
    secAniPers.style.display = "initial";
    listaPers.innerHTML = "";
    secAniPers.innerHTML = "";
    
    const persHeading = document.createElement('h3');
    persHeading.innerText = "Personagens";
    secAniPers.appendChild(persHeading);

    fetch(`${apiUrl}/${idAnime}/characters?sort=role`)
        .then(response => response.json())
        .then(personagens => {
            console.log(personagens.data.length)
            if (personagens.data.length > 0) {
                if (Array.isArray(personagens.data)) {
                    const personagensPrincipais = personagens.data.filter(personagem => personagem.attributes.role === 'main');
                    personagensPrincipais.forEach((personagemPrincipal) => {
                        fetch(`https://kitsu.io/api/edge/media-characters/${personagemPrincipal.id}/character`)
                        .then(response => response.json())
                        .then(personagens => {
                            fetch(`https://kitsu.io/api/edge/characters/${personagens.data.id}`)
                                .then(response => response.json())
                                .then(personagens => {
                                    const nomePersonagem = document.createElement('span');
                                    const imgPersonagem = document.createElement('img');
                                    const divPersonagem = document.createElement('div');
    
                                    nomePersonagem.textContent = personagens.data.attributes.name;
                                    imgPersonagem.src = personagens.data.attributes.image.original;
                                    imgPersonagem.alt = personagens.data.attributes.name;
                                    imgPersonagem.width = "60";
                                    divPersonagem.classList.add('listar-personagens-item');
                                    nomePersonagem.classList.add('nome-personagem');
    
                                    divPersonagem.appendChild(imgPersonagem);
                                    divPersonagem.appendChild(nomePersonagem);
                                    listaPers.appendChild(divPersonagem);
                                    secAniPers.appendChild(listaPers);
                                })
                        }) .catch(error => console.error("Personagens não exibidos. Erro na requisição:", error))
                    })
                } 
            } else {
                const semPers = document.createElement('span');
                semPers.textContent = "Personagens não encontrados :("
                secAniPers.appendChild(semPers);
            }        
        })
} 