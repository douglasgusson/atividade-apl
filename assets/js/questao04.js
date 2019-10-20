
let iptDiaSemana = $('#dias');
let iptQuantTurnos = $('input[name="quantTurnos"]');
let iptDuracaoTurno = $('input[name="duracaoTurno"]');

let iptUnidadesPorHora = $('input[name="unidadesPorHora"]');

let iptTempoPerdaPlanejada = $('input[name="tempoPerdaPlanejada"]');
let iptTempoPerdaNaoPlanejada = $('input[name="tempoPerdaNaoPlanejada"]');

let totalPerdasPlanejadas = 0;
let totalPerdasNaoPlanejadas = 0;
let tempoTotal = 0;


$('.add').click(function() {
    let dia = iptDiaSemana.val();
    let n = parseInt(iptQuantTurnos.val());
    let duracao = parseInt(iptDuracaoTurno.val());
    tempoTotal += n * duracao;
    $('#ulTurnos').append('<li>' + dia + ', ' + n + ', ' + duracao + 'h</li>');

});

$('.addPerdaPlanejada').click(function() {
    let descricao = $('input[name="descricaoPerdaPlanejada"]').val();
    let tempo = parseInt(iptTempoPerdaPlanejada.val());
    totalPerdasPlanejadas += tempo;
    $('#ulPerdasPlanejadas').append('<li>' + descricao + ' = ' + tempo + 'h/semana</li>');
});

$('.addPerdaNaoPlanejada').click(function() {
    let descricao = $('input[name="descricaoPerdaNaoPlanejada"]').val();
    let tempo = parseInt(iptTempoPerdaNaoPlanejada.val());
    totalPerdasNaoPlanejadas += tempo;
    $('#ulPerdasNaoPlanejadas').append('<li>' + descricao + ' = ' + tempo + 'h/semana</li>');
});

$('.result').click(function() {    
    
    let unidades = iptUnidadesPorHora.val();
    
    let teoricoMensal = (unidades * tempoTotal) * 4;
    let efetivoMensal = (unidades * (tempoTotal - totalPerdasPlanejadas)) * 4;
    let realMensal = (unidades * (tempoTotal - (totalPerdasPlanejadas + totalPerdasNaoPlanejadas))) * 4;

    $('#ulResultados').append('<li>Capacidade teórica mensal: ' + teoricoMensal + ' unidades</li>');
    $('#ulResultados').append('<li>Capacidade efetiva mensal: ' + efetivoMensal + ' unidades</li>');
    $('#ulResultados').append('<li>Capacidade real mensal: ' + realMensal + ' unidades</li>');

    let utilizacao = (realMensal / teoricoMensal) * 100;
    let efeciencia = (realMensal / efetivoMensal) * 100;

    $('#ulResultados').append('<li>Utilização: ' + utilizacao.toFixed(2) + '%</li>');
    $('#ulResultados').append('<li>Eficiência: ' + efeciencia.toFixed(2) + '%</li>');


});


$('.clear').click(function() {
    location.reload();
});