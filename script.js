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
    tempoDecorridoEmSegundos=900; //altera no codigo, mas nao altera na tela ↓↓↓
    alterarContexto('descanso-longo');
    botaoLongo.classList.add('active');
    
});

function alterarContexto (contexto) {
    mostrarTimer(); //necessario para mudanca funcionar na tela ↑↑↑
    botoes.forEach(function(elementoDaLista){
        elementoDaLista.classList.remove('active');
    }) //remove avite em todos elementos escolhidos antes de colocar no elemento em foco
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




//toca ou disliga musica quando aperta toggle-checkbox
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
        //alert('Tempo finalizado');
        zerar();
        return
    }
    tempoDecorridoEmSegundos-=1;
    mostrarTimer();
}

startPauseBt.addEventListener('click', iniciarOupausar);

function iniciarOupausar() {
    //se intervaloId = true (tem algum valor)
    if(intervaloId){
        somDePausa.play(); //como prof fez
        zerar();
        trocaComecarEPausar.textContent = 'Começar'; //troca texto dentro de elemento
        trocaComecarEPausar.previousElementSibling.setAttribute('src','/imagens/play_arrow.png'); //troca imagem no elementoanterior de texto
        return; //para poder interomper a exacucao de codigo
    }
    somDeComeco.play(); //como prof fez
    //primeiro parametro o metodo que vai ser executado, segundo - com quanto temto vai ser executado
    intervaloId = setInterval(contagemRegressiva, 1000);
                                                //1000=1segunda
    trocaComecarEPausar.textContent = 'Pausar';
    trocaComecarEPausar.previousElementSibling.setAttribute('src','/imagens/pause.png');
}

function zerar() {
    //interompe a exacucao de codigo
    clearInterval(intervaloId);
    intervaloId=null;
}

/* como eu resolvi!!
startPauseBt.addEventListener('click', ()=> {
    if(intervaloId==null){
        somDePausa.play();
    } else{
        somDeComeco.play();
    }
})*/

function mostrarTimer () {
    const tempo = new Date (tempoDecorridoEmSegundos*1000);
    const tempoFormotado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'}); //formotando tempo de segundas para minutos e segundos
    tempoNaTela.innerHTML= `${tempoFormotado}`;
}

mostrarTimer();
