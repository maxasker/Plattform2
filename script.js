$(document).ready(getposition)

function getposition(){
navigator.geolocation.getCurrentPosition(onSuccess, onFail, {});
}

function onSuccess(position){
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
    if(JSON.stringify(pos) != JSON.stringify(localpos)){
        var JSONpos = JSON.stringify(pos);
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
       console.log('retrievedObject: ', JSON.parse(data));
}

function getweather(position, lati, longi){
    var apirequest = "http://api.openweathermap.org/data/2.5/weather?lat=" + lati.toString() + "&lon=" + longi.toString() + "&APPID=3415ab8f955516cc21874850f56da8d6";
    console.log(apirequest);
    
	$.ajax({
		url: apirequest,
		dataType: "JSON",
	}).done(function(data){
		console.log(data);
        localStorage.setItem('positiondata', JSON.stringify(data));
	}).fail(function(data){
        console.log("nope")
    });

}

function onFail(){
  alert("Vi kunde tyvärr inte hämta din plats just nu.");
}


