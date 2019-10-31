
let dados = [];


$('.add').click(function () {

    let iptCcp = $('input[name="ccp"]');
    let iptCro = $('input[name="cro"]');
    let iptTa = $('input[name="ta"]');

    let ccp = parseFloat(iptCcp.val());
    let cro = parseFloat(iptCro.val());
    let ta = parseFloat(iptTa.val());

    let row = { 'ccp': ccp, 'cro': (cro / 100.0), 'ta': (ta / 100.0), 'lec': 0, 'ct': 0, 'nc': 0, 'tc': 0, 'pr': 0 };
    
    dados.push(row);
    addRowTabelaA(row);

    iptCcp.val('');
    iptCro.val('');
    iptTa.val('');
    iptCcp.focus();

});


$('.result').click(function () {

    let iptDemanda = $('input[name="demanda"]');
    let iptCustoUnitario = $('input[name="custoUnitario"]');
    let iptDiasAno = $('input[name="diasAno"]');
    let iptLeadTime = $('input[name="leadTime"]');

    let demanda = parseFloat(iptDemanda.val());
    let custoUnitario = parseFloat(iptCustoUnitario.val());
    let diasAno = parseInt(iptDiasAno.val());
    let leadTime = parseInt(iptLeadTime.val());

    for (let i = 0; i < dados.length; i++) {

        let numerador = (2 * demanda * dados[i]['ccp']);
        let denominador = (dados[i]['cro'] + dados[i]['ta']) * custoUnitario;
        let lec = Math.sqrt( numerador / denominador );
    
        let cm = denominador * (lec / 2);
        let cp = dados[i]['ccp'] * (demanda / lec);

        let nc = demanda / lec;
        let tc = (lec / demanda) * diasAno;

        let pr = (demanda / diasAno) * leadTime;

        dados[i]['lec'] = lec;
        dados[i]['ct'] = cm + cp;
        dados[i]['nc'] = nc;
        dados[i]['tc'] = tc;
        dados[i]['pr'] = pr;

        console.log(dados[i]);
        addRowTabelaB(dados[i]);

    }    

});


function addRowTabelaA(row) {
    $('#tabelaA tbody').append(
        "<tr>" +
        "<td>" + row['ccp'] + "</td>" +
        "<td>" + row['cro'] + "</td>" +
        "<td>" + row['ta'] + "</td>" +
        "</tr>"
    );
}


function addRowTabelaB(row) {
    $('#tabelaB tbody').append(
        "<tr>" +
        "<td>" + row['ccp'] + "</td>" +
        "<td>" + row['cro'] + "</td>" +
        "<td>" + row['ta'] + "</td>" +
        "<td>" + row['lec'].toFixed(3) + "</td>" +
        "<td>" + row['ct'].toFixed(3) + "</td>" +
        "<td>" + row['nc'].toFixed(3) + "</td>" +
        "<td>" + row['tc'].toFixed(3) + "</td>" +
        "<td>" + row['pr'].toFixed(3) + "</td>" +
        "</tr>"
    );
}
