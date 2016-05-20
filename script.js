/**
 * Created by christopher.peters on 08/04/16.
 */
var bigData = [];
var url = ("http://localhost:63342/MyWeatherStationCharts/queryData.php?what=values");
var windowWidth = $(window).width();
var windowHeight = $(window).height();

window.onload = function(){
    $.ajax({
        url: url,
        type: "GET",
        success: storeData
    });

    function storeData(data){
        for (var i = 0; i < data.length; i++){
            bigData.push(data[i]);
        }
    }

};


function plotting(xArray, yArray, string ){

    var iDiv = document.createElement('div');
    iDiv.id = 'graphContainer';
    iDiv.style.paddingTop = '100px';
    iDiv.style.height = windowHeight -175 + 'px';
    iDiv.style.width = windowWidth + 'px';
    document.getElementsByTagName('body')[0].appendChild(iDiv);


    TEMP = document.getElementById('graphContainer');
    Plotly.plot( TEMP, [{
        x: xArray,
        y: yArray,
        name:string,
        type:'scatter'}], {
        margin: { t: 0 },
        xaxis:{title:'Zeit'},
        yaxis:{title: string}} );

}

function drawTempGraph(){
    if(document.getElementById("graphContainer") !== null)
    {
        clearDiv();
    }
    var xAchsis = [],
        yAchsis = [];
    for (var key in bigData){
        xAchsis.push(bigData[key].date);
        yAchsis.push(bigData[key].temperature);
    }
    showValues(yAchsis,"temp");
    plotting(xAchsis,yAchsis,'Temperatur');
}

function drawHumidGraph(){
    if(document.getElementById("graphContainer") !== null)
    {
        clearDiv();
    }
    var xAchsis = [],
        yAchsis = [];
    for (var key in bigData){
        xAchsis.push(bigData[key].date);
        yAchsis.push(bigData[key].humidity);
    }
    showValues(yAchsis,"humid");
    plotting(xAchsis,yAchsis,'Luftfeuchtigkeit');

}

function showBoth(){
    document.getElementById("maxValue").innerHTML = "<--->";
    document.getElementById("minValue").innerHTML = "<--->";
    document.getElementById("averageValue").innerHTML = "<--->";
    if(document.getElementById("graphContainer") !== null)
    {
        clearDiv();
    }
    var xAchsis = [],
        yAchsis = [];
    for (var key in bigData){
        xAchsis.push(bigData[key].date);
        yAchsis.push(bigData[key].humidity);
    }
    plotting(xAchsis,yAchsis,'Luftfeuchtigkeit');

    var xAchsis = [],
        yAchsis = [];
    for (var key in bigData){
        xAchsis.push(bigData[key].date);
        yAchsis.push(bigData[key].temperature);
    }
    plotting(xAchsis,yAchsis,'Temperatur');

}

function clearDiv(){
    document.getElementById('graphContainer').remove();
}


function showValues(array, graph){
    var max = 0;
    var min = 1000;
    var count = 0;

    for (var i = 0; i < array.length; i++){
        if(array[i] > 0){
            max = array[i];
        }
        if (array[i] < min){
            min = array[i];
        }
        count += parseInt(array[i]);
    }
    count /= array.length;


    if (graph == "temp"){
        document.getElementById("maxValue").innerHTML = "Maximale Temperatur: " + max + " °C";
        document.getElementById("minValue").innerHTML = "Minimale Temperatur: " + min + " °C";
        document.getElementById("averageValue").innerHTML = "Durchschnittliche Temperatur: " + count + " °C";
    }

    if (graph == "humid"){
        document.getElementById("maxValue").innerHTML = "Maximale Luftfeuchtigkeit: " + max + " %";
        document.getElementById("minValue").innerHTML = "Minimale Luftfeuchtigkeit: " + min + " %";
        document.getElementById("averageValue").innerHTML = "Durchschnittliche Luftfeuchtigkeit: " + count + " %";
    }


}












