const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const img = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll ('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');
const somDeComeco = new Audio('/sons/play.wav');
const somDePausa = new Audio('/sons/pause.mp3');
const somDeFim = new Audio('/sons/beep.mp3');
const trocaComecarEPausar = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


//troca de fundo e imagem com data-contextto (tag html) diferente

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos=1500;
    alterarContexto('foco');
    botaoFoco.classList.add('active');
    
});

botaoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos=300;
    alterarContexto('descanso-curto');
    botaoCurto.classList.add('active');
    
});

botaoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos=900; 
    alterarContexto('descanso-longo');
    botaoLongo.classList.add('active');
    
});

function alterarContexto (contexto) {
    mostrarTimer(); 
    botoes.forEach(function(elementoDaLista){
        elementoDaLista.classList.remove('active');
    }) 
    html.setAttribute('data-contexto', contexto);
    img.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;
        default:
            break;
    }
}




//toca ou disliga musica quando aperta switch

musica.loop = true;
musicaFocoInput.addEventListener('change', ()=> {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})




//contagem regressiva

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos<= 0) {
        somDeFim.play();
        zerar();
        return
    }
    tempoDecorridoEmSegundos-=1;
    mostrarTimer();
}

startPauseBt.addEventListener('click', iniciarOupausar);

function iniciarOupausar() {
    if(intervaloId){
        somDePausa.play(); 
        zerar();
        trocaComecarEPausar.textContent = 'Começar'; 
        trocaComecarEPausar.previousElementSibling.setAttribute('src','/imagens/play_arrow.png'); 
        return; 
    }
    somDeComeco.play(); 
    intervaloId = setInterval(contagemRegressiva, 1000);
    trocaComecarEPausar.textContent = 'Pausar';
    trocaComecarEPausar.previousElementSibling.setAttribute('src','/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId=null;
}


function mostrarTimer () {
    const tempo = new Date (tempoDecorridoEmSegundos*1000);
    const tempoFormotado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'}); 
    tempoNaTela.innerHTML= `${tempoFormotado}`;
}

mostrarTimer();
