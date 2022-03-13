export function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

import {Barreiras} from './barreiras.js'
import {Passaro} from './passaro.js'
import {Progresso} from './progresso.js'
import {Colidiu} from './colisao.js'


function FlappyBird() {
    let pontos = 0   
    
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth
    
    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 250, 400,
        () => progresso.atualizarPontos(++pontos))
        const passaro = new Passaro(altura)

        areaDoJogo.appendChild(progresso.elemento)
        areaDoJogo.appendChild(passaro.elemento)
        barreiras.pares.forEach(par => {
            areaDoJogo.appendChild(par.elemento)
        })
    this.start = () => {
        //loop do jogo
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()
           if( Colidiu(passaro, barreiras) ) clearInterval(temporizador)
        },20)
    }
}

new FlappyBird().start()
