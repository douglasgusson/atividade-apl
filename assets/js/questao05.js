
let dados = [];
let a, b, r;
let somatorios = {};

$('.add').click(function() {
	
	let iptPeriodo = $('input[name="periodo"]');
	let iptDemanda = $('input[name="demanda"]');
	
	let x = parseInt(iptPeriodo.val());
	let y = parseFloat(iptDemanda.val());


	let row = {'x': x, 'y': y, 'xy': (x * y), 'x2': Math.pow(x, 2), 'y2': Math.pow(y, 2), 'previsao': 0};

	dados.push(row);

	addRow(row);

	iptPeriodo.val(x+1);
	iptDemanda.val('');
	iptDemanda.focus();

});


$('.clear').click(function() {
    location.reload();
});


$('.result').click(function() {

    somatorio();
    calcularB();
    calcularA();
    calcularPrevisoes();
    somatorio();

    calcularR();

    $('.resultados')
        .replaceWith(
            '<li><b>B:</b> ' + b.toFixed(3) + '</li>' +
            '<li><b>A:</b> ' + a.toFixed(3) + '</li>' +
            '<li><b>R:</b> ' + r.toFixed(3) + '%</li>'
        );
    
});


function addRow(row) {
	$('#tabelaPrevisao tbody').append(
    	"<tr>" + 
            "<td>" + row['x'] + "</td>" +
            "<td>" + row['y'] + "</td>" +
            "<td>" + row['xy'] + "</td>" +
            "<td>" + row['x2'] + "</td>" +
            "<td>" + row['y2'] + "</td>" +
            "<td class='previsao'>" + row['previsao'].toFixed(3) + "</td>" +
        "</tr>"
	);
}


function somatorio() {

    somatorios = {'x': 0, 'y': 0, 'xy': 0, 'x2': 0, 'y2': 0, 'previsao': 0};

    for (let i = 0; i < dados.length; i++) {
        somatorios['x'] += dados[i]['x'];
        somatorios['y'] += dados[i]['y'];
        somatorios['xy'] += dados[i]['xy'];
        somatorios['x2'] += dados[i]['x2'];
        somatorios['y2'] += dados[i]['y2'];
        somatorios['previsao'] += dados[i]['previsao'];
    }

    $('#tabelaPrevisao tfoot tr').replaceWith(
        "<tr>" + 
            "<td>" + somatorios['x'].toFixed(3) + "</td>" +
            "<td>" + somatorios['y'].toFixed(3) + "</td>" +
            "<td>" + somatorios['xy'].toFixed(3) + "</td>" +
            "<td>" + somatorios['x2'].toFixed(3) + "</td>" +
            "<td>" + somatorios['y2'].toFixed(3) + "</td>" +
            "<td class='totalPrevisao'>" + somatorios['previsao'].toFixed(3) + "</td>" +
        "</tr>"
    ); 
}


function calcularB() {
    let n = dados.length;
    b = ((n * somatorios['xy'] - somatorios['x'] * somatorios['y']) 
        / (n * somatorios['x2'] - Math.pow(somatorios['x'], 2)));
}


function calcularA() {
    let n = dados.length;
    a = ((1 / n) * somatorios['y'] - (b / n) * somatorios['x']);
}

function calcularPrevisoes() {
    let tds = $('.previsao');
    for (let i = 0; i < dados.length; i++) {
        let y = (a + b * dados[i]['x']);  
        dados[i]['previsao'] = y;
        $(tds[i]).text(y.toFixed(3));
    }
}


function calcularR() {
    let n = dados.length;
    let numerador = (n * somatorios['xy']) - (somatorios['x'] * somatorios['y']);
    let aa = n * somatorios['x2'] - Math.pow(somatorios['x'], 2);
    let bb = n * somatorios['y2'] - Math.pow(somatorios['y'], 2);
    r = numerador / Math.sqrt(aa * bb);    
    r = (Math.pow(r, 2) * 100.0);
}