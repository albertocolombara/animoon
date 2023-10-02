import { apiUrl } from "../main.js";

export function acessarCategorias(idAnime) {
    const secAniCat = document.querySelector('.anime__categorias')
    secAniCat.innerHTML = " ";

    fetch(`${apiUrl}/${idAnime}/categories?sort=title`)
        .then(response => response.json())
        .then(categorias => {
            if (Array.isArray(categorias.data)) {
                categorias.data.forEach((categoria) => {
                    const nameCategoria = document.createElement('span');
                    nameCategoria.textContent = categoria.attributes.title;
                    nameCategoria.title = categoria.attributes.description;
                    secAniCat.appendChild(nameCategoria);
                })
            }
        })
} 
