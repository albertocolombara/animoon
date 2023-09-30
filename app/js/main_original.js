import { iniciarPesquisa } from "./modules/pesquisa.js";
import { sortearAnime } from "./modules/sortearAnime.js";
import { acessarStaff } from "./modules/staffAnime.js";

export const apiUrl = 'https://kitsu.io/api/edge/anime';
export const campoDePesquisa = document.getElementById("campoDePesquisa");
export const resultadosDePesquisa = document.getElementById("resultados");
export const toggleBemVindo = document.querySelector('.bem-vindo');
export const secAni = document.querySelector('.anime');
export const secAniIntro = document.querySelector('.anime__intro');
export const secAniPers = document.querySelector('.anime__personagens');

sortearAnime()
iniciarPesquisa()