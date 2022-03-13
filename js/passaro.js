import {novoElemento} from './main.js'

function Passaro(alturaJogo) {
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'imagens/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom)
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true 
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 12 : -4)
        const alturaMaxima = alturaJogo - this.elemento.clientWidth

        if(novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }

    this.setY(alturaJogo / 2)
}
export {Passaro}