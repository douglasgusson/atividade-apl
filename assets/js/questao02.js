
let iptDiaSemana = $('#dias');
let iptQuantTurnos = $('input[name="quantTurnos"]');
let iptDuracaoTurno = $('input[name="duracaoTurno"]');
let iptIntervaloTurno = $('input[name="intervaloTurno"]');
let iptTempoSetup = $('input[name="tempoSetup"]');
let iptUnidadesAtual = $('input[name="unidadesAtual"]');
let iptUnidadesDesejada = $('input[name="unidadesDesejada"]');

let tempoEfetivoDia = 0;
let tempoEfetivoTotal = 0;
let dias = 0;

console.log(iptDiaSemana);

$('.add').click(function() {

    let dia = iptDiaSemana.val();
    let n = parseInt(iptQuantTurnos.val());
    let intervalo = parseInt(iptIntervaloTurno.val());
    let setup = parseInt(iptTempoSetup.val());
    let duracao = parseInt(iptDuracaoTurno.val());

    $('#tabelaTurnos tbody').append(
    	"<tr>" + 
            "<td>" + dia + "</td>" +
            "<td>" + n + "</td>" +
            "<td>" + duracao + "</td>" +
            "<td>" + intervalo + "</td>" +
            "<td>" + setup + "</td>" +
        "</tr>"
	);

    dias++;
    let perda = n * (intervalo + setup);
    tempoEfetivoDia += (n * duracao) - perda;

});

$('.result').click(function() {
    
    tempoEfetivoTotal = tempoEfetivoDia * dias;

    let unidadesAtual = parseInt(iptUnidadesAtual.val());
    let unidadesDesejadas = parseInt(iptUnidadesDesejada.val());; 
    
    unidadesAtual = unidadesAtual * dias;
    unidadesDesejadas = unidadesDesejadas * dias;
    
    let taktTimeAtual = tempoEfetivoTotal / unidadesAtual;
    let taktTimeNovo = tempoEfetivoTotal / unidadesDesejadas;

    $('#ttAtual').text('Takt time atual: ' + taktTimeAtual.toFixed(3) + ' min/unid.');
    $('#ttNovo').text('Takt time atual: ' + taktTimeNovo.toFixed(3) + ' min/unid.');

});


$('.clear').click(function() {
    location.reload();
});