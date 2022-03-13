import {novoElemento} from './main.js'
function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const elementoA_ladoEsquerdo = a.left
    const elementoA_ladoDireito = a.left + a.width
    const elementoB_ladoEsquerdo = b.left 
    const elementoB_ladoDireito = b.left + b.width

    const horizontal = 
        elementoA_ladoDireito >= elementoB_ladoEsquerdo 
                              &&
        elementoB_ladoDireito >= elementoA_ladoEsquerdo

    const elementoA_topo = a.top
    const elementoA_base = a.top + a.height
    const elementoB_topo = b.top 
    const elementoB_base = b.top + b.height

    const vertical = 
        elementoA_base >= elementoB_topo    
                       && 
        elementoB_base >= elementoA_topo
    
    return horizontal && vertical
    

}

export function Colidiu(passaro, barreiras) {
    let colidiu = false
    barreiras.pares.forEach(ParDeBarreiras => {
        if(!colidiu) {
            const superior = ParDeBarreiras.superior.elemento
            const inferior = ParDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu

}