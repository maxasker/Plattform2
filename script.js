$(document).ready(getposition)

function getposition(){
$('#loading-image').show();
navigator.geolocation.getCurrentPosition(onSuccess, onFail, {});
}

function onSuccess(position){
    var timenow = new Date($.now()).toLocaleTimeString().replace(":","").replace(":","");
    var timethen = localStorage.getItem('time');
    var difference = Math.abs(timethen - timenow)
    console.log(difference);
    var longi = position.coords.longitude;
    var lati = position.coords.latitude;
    var longi = Math.round(longi);
    var lati = Math.round(lati);
    var localpos = JSON.parse(localStorage.getItem("position"))
    var pos = [
  {
    latitude: lati,
    longi: longi
  }
];
    if((JSON.stringify(pos) != JSON.stringify(localpos)) || (difference > 6000)){
        var JSONpos = JSON.stringify(pos);
        var longi = position.coords.longitude;
        var lati = position.coords.latitude;
        localStorage.setItem("position", JSONpos);
        console.log("det va inte samma")
        getweather(position, lati, longi);
}else if(JSON.stringify(pos) == JSON.stringify(localpos)){
        console.log("det va samma data");
        getweathernoreq(position);
}
    
}

function getweathernoreq(position){
    console.log("hej, ska hämta localstuff");
    var data = (localStorage.getItem("positiondata"));
    var data = JSON.parse(data)
    var temperature = data.main.temp - 272.15;
    console.log(data);
    $('#loading-image').hide();
    document.getElementById("currentcity").innerHTML = "Du befinner dig i " + data.name;
    document.getElementById("currenttemp").innerHTML = "Temperatur(c): " + temperature.toFixed(2);
    document.getElementById("currentweather").innerHTML = data.weather[0].description;
    console.log(data.weather[0].icon);
    document.getElementById('weathericon').src="http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
}


function getweather(position, lati, longi){
    var apirequest = "http://api.openweathermap.org/data/2.5/weather?lat=" + lati.toString() + "&lon=" + longi.toString() + "&APPID=3415ab8f955516cc21874850f56da8d6";
    console.log(apirequest);
    
	$.ajax({
		url: apirequest,
		dataType: "JSON",
	}).done(function(data){
		var timenow = new Date($.now()).toLocaleTimeString().replace(":","").replace(":","");
        localStorage.setItem('time', timenow);
        localStorage.setItem('positiondata', JSON.stringify(data));
        getweathernoreq(position);
	}).fail(function(data){
        $('#loading-image').hide();
        alert("Tyvärr gick det inte att hämta vädret");
    });

}

function onFail(){
  alert("Vi kunde tyvärr inte hämta din plats just nu.");
}


