function dados(){
    const form = document.querySelector('.form');
    const resultado = document.querySelector('.resultado');

    function recebeEventoForm(evento){
        evento.preventDefault();

        //criando variaveis
        const inputTemp = form.querySelector('#temp');
        const inputPressao = form.querySelector('#pressao');
        const inputTempC = form.querySelector('#tempC');
        const inputPressaoC = form.querySelector('#pressaoC');
        const inputConstGas = form.querySelector('#constGas');
        const inputExpW = form.querySelector('#expW');
        let chute = 1;
        const temp = Number(inputTemp.value);
        const tempC = Number(inputTempC.value);
        const pressao = Number(inputPressao.value);
        const pressaoC = Number(inputPressaoC.value);
        const constGas = Number(inputConstGas.value);
        const expW = Number(inputExpW.value);
        const pR = pressao/pressaoC;
        const tR = temp/tempC;

        //Calculando dados
        const alfaTRobson = (1 + (0.37464 + 1.54266 * expW - 0.26992 * (expW ** 2))*(1 - tR**0.5))**2;
        const alfaTrRk = tR**-0.5;
        const sigmaRobson = 1 + Math.sqrt(2);
        const sigmaRk = 1;
        const epsilonRobson = 1 - Math.sqrt(2);
        const epsilonRk = 0;
        const ferraduraRobson = 0.07780;
        const ferraduraRk = 0.08664;
        const tridentRobson = 0.45724;
        const tridentRk = 0.42748;
        const qRobson = (tridentRobson * alfaTRobson )/(ferraduraRobson * tR);
        const qRk = (tridentRk * alfaTrRk )/(ferraduraRk * tR);
        const betaRobson = ferraduraRobson * pR / tR;
        const betaRk = (ferraduraRk) * (pR/tR);

        //Encontrando Volume do Vapor
        const chuteUmRobson = (1+ betaRobson-((qRobson * betaRobson)*(( chute - betaRobson)/((chute + epsilonRobson*betaRobson)*(chute + sigmaRobson*betaRobson)))));
        const chuteUmRk = (1+ betaRk-((qRk * betaRk)*(( chute - betaRk)/((chute + epsilonRk*betaRk)*(chute + sigmaRk*betaRk)))));
        const erroRobson = chuteUmRobson - chute;
        const erroRk = chuteUmRk - chute;
        let chuteRobson = 0.09;
        let chuteRk = 0.09;
        const erroNovoRobson = chuteUmRobson - chuteRobson;
        const erroNovoRk = chuteUmRk- chuteRk;
        const ziUmRobson = erroNovoRobson;
        const ziUmRk = erroNovoRk;
        const ziMaisUmRobson = (1+ betaRobson-((qRobson * betaRobson)*(( ziUmRobson - betaRobson)/((ziUmRobson + epsilonRobson*betaRobson)*(ziUmRobson + sigmaRobson*betaRobson)))));
        const ziMaisUmRk = (1+ betaRk-((qRk * betaRk)*(( ziUmRk - betaRk)/((ziUmRk + epsilonRk*betaRk)*(ziUmRk + sigmaRk*betaRk)))));
        const erroFinalRk = chuteUmRk - ziUmRk;
        const erroFinalRobson = chuteUmRobson - ziUmRobson;
        const volumeVaporRobson = (ziMaisUmRobson*constGas*temp)/pressao;
        const volumeVaporRk = (ziMaisUmRk*constGas*temp)/pressao;

        // Agora aqui é para liquido
        const liquidoChuteRob = betaRobson + (betaRobson+ epsilonRobson * betaRobson) * (betaRobson + sigmaRobson * betaRobson) * (1 + betaRobson - betaRobson )/ (qRobson * betaRobson);
        const liquidoChuteRk = betaRk + (betaRk+ epsilonRk * betaRk) * (betaRk + sigmaRobson * betaRk) * (1 + betaRk - betaRk )/ (qRk * betaRk);
        const liquidoErroRob = liquidoChuteRob + 0.007;
        const liquidoErroRk = liquidoChuteRk + 0.00354;
        const liquidoZiRobson = liquidoErroRob ;
        const liquidoZiRk = liquidoErroRk;
        const liquidoZiMaisUmRob = betaRobson + (liquidoZiRobson+ epsilonRobson * betaRobson) * (liquidoZiRobson + sigmaRobson * betaRobson) * (1 + betaRobson - liquidoZiRobson )/ (qRobson * betaRobson);
        const liquidoZiMaisUmRk = betaRk + (liquidoZiRk+ epsilonRk * betaRk) * (liquidoZiRk + sigmaRk * betaRk) * (1 + betaRk - liquidoZiRk )/ (qRk * betaRk);
        const volumeLiquidoRk = (liquidoZiMaisUmRk*constGas*temp)/pressao;
        const volumeLiquidoRobson = (liquidoZiMaisUmRob*constGas*temp)/pressao;
        


        

        resultado.innerHTML = `<p> O Volume do Vapor de Rk é ${volumeVaporRk} </p> <p> O Volume do Vapor de PR é ${volumeVaporRobson} </p> <p> O Volume do Liquido de Rk é ${volumeLiquidoRk} </p> <p> O Volume do Liquido de PR é ${volumeLiquidoRobson} </p>`;

       
        


    }
    form.addEventListener('submit', recebeEventoForm);
}

dados();




