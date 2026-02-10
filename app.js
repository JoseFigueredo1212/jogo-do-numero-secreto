let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do número secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = `Tente adivinhar o número secreto entre 1 e ${numeroLimite}!`;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Portuguese Female', {rate: 1.5});
}

function exibirMensagemInicial() {   
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Tente adivinhar o número secreto entre 1 e ${numeroLimite}!`);
}

exibirMensagemInicial();

function verificaParOuImpar() {
    if (numeroSecreto % 2 == 0) {
        exibirTextoNaTela('p', 'Dica: O número secreto é par.');
    } else {
        exibirTextoNaTela('p', 'Dica: O número secreto é ímpar.');
    }
}  

function verificarDezena() {
    let dezena = Math.floor(numeroSecreto / 10);
    exibirTextoNaTela('p', `Dica: O número secreto está na dezena ${dezena}.`);
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou o número secreto!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.querySelector('#reiniciar').disabled = false;
        document.querySelector('#chutar').disabled = true;

    } else if (tentativas == 3) {
        verificaParOuImpar();
    } else if (tentativas == 6) {
        verificarDezena();
    } else if (chute < numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é maior do que ' + chute);
    } else {
        exibirTextoNaTela('p', 'O número secreto é menor do que ' + chute);
    }
    tentativas++;
    limparCampoDeChute();
    }

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quatidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quatidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampoDeChute() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    document.querySelector('#reiniciar').disabled = true;
    document.querySelector('#chutar').disabled = false;
}