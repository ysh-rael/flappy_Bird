import {novoElemento} from './main.js'

function Barreira(reverse = false) {
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div','borda')
    const corpo = novoElemento('div','corpo')
    this.elemento.appendChild(reverse ? corpo : borda)
    this.elemento.appendChild(reverse ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

// const b = new barreira(true)
// b.setAltura(250)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento('div','par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento) // elemento da barreira. (por que? olhe a linha 25!)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

function Barreiras(altura, largura, abertura, espaco, NotificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3),
        new ParDeBarreiras(altura, abertura, largura + espaco * 4)
    ]

    const deslocamento = 3      
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            // quando o elemento sair da área do jogo
            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura / 2 
            const cruzouMeio = par.getX() + deslocamento >= meio && par.getX() < meio
            if(cruzouMeio) NotificarPonto()
        })
    }
}
// const b = new ParDeBarreiras(700, 200, 400)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

// const barreiras = new Barreiras(700, 1200, 200, 400)
// const passaro = new Passaro(700)
// const areaDoJogo = document.querySelector('[wm-flappy]')

// areaDoJogo.appendChild(passaro.elemento)
// barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(() => {
//     barreiras.animar()
//     passaro.animar()
// },20)

export {Barreiras}