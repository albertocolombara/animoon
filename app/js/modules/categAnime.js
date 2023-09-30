import { apiUrl } from "../main_original.js";

export function acessarCategorias(idAnime) {
    const secAniCat = document.querySelector('.listar-categorias')
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
