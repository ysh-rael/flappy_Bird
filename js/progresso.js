import {novoElemento} from './main.js'

export function Progresso() {
    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => this.elemento.innerHTML = pontos
    this.elemento.innerHTML = 0   
}