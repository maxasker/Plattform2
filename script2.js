localStorage.clear();
if (localStorage.getItem("archive") === null) {
    var archivejson = [];
    var archive = JSON.stringify(archivejson);
    localStorage.setItem("archive", archive)
}

$("#search").on("click", function(){
    var value = $("#moviesearch").val();
	$.ajax({
		url: "http://www.omdbapi.com/?type=movie&s=" + value,
		dataType: "JSON"
	}).done(function(data){
		console.log(data);
        showsearchresult(data);
	}).fail(function(data){
        console.log("something went wrong");
	});
});

function showsearchresult(data){
    $( ".moviepresent" ).remove();
    $( ".movieposter" ).remove();
    for (var i = 0; i < data["Search"].length; i++) {
    $('<div class="moviepresent" id="' + i + '">').appendTo($('#movies'));
    $('<p class="movietitle">').text(data["Search"][i].Title + " (" + data["Search"][i].Year + ")").appendTo($('#' + i));
    $("#"+i).css("background-image", "url("+ data["Search"][i].Poster +")");
    $('<a class="favoritemovie" id="favorite-' + data["Search"][i].imdbID + '">').text("Favoritfilm").appendTo($('#' + i));
    
    $('<a class="archivemovie" id="archive-' + data["Search"][i].imdbID + '">').text("Arkiv").appendTo($('#' + i));
        
    $("#archive-" + data["Search"][i].imdbID).click(archivefunc);
    $("#favorite-" + data["Search"][i].imdbID).click(favoritefunc);
    
}
    
}

function archivefunc(){
    var idmessy = this.id;
    var id = idmessy.replace("archive-", "");
    var archivestring = localStorage.getItem("archive");
    var jsonarchive = $.parseJSON(archivestring);
    if ($.inArray(id, jsonarchive)){
    jsonarchive.push(id);
    var archive = JSON.stringify(jsonarchive);
    localStorage.setItem("archive", archive);
    alert("Filmen är nu tillagd i ditt arkiv!");
    }else{alert("Finns redan i ditt arkiv");
    }
}

function favoritefunc(){
    alert("HEJ");   
}