if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", "Ingen användare vald");
    $("#username").text("Ingen användare vald");
} else{$("#username").text((localStorage.getItem("user")));}

if (localStorage.getItem("archive") === null) {
    var archivejson = [];
    var archive = JSON.stringify(archivejson);
    localStorage.setItem("archive", archive)
}


if (localStorage.getItem("favoritemovie") === null) {
    localStorage.setItem("favoritemovie", "Ingen favorit vald");
    $("#favoritetitle").text("Ingen favorit vald");
} else{$("#favoritetitle").text((localStorage.getItem("favoritemovie")));};

$("#search").on("click", function(){
    var value = $("#moviesearch").val();
	$.ajax({
		url: "http://www.omdbapi.com/?type=movie&plot=full&s=" + value,
		dataType: "JSON"
	}).done(function(data){
        showsearchresult(data);
	}).fail(function(data){
        alert("Något gick fel :(, försök igen senare.");
	});
});

function showsearchresult(data){
    $( ".moviepresent" ).remove();
    $( ".movieposter" ).remove();
    for (var i = 0; i < data["Search"].length; i++) {
    $('<div class="moviepresent" id="' + i + '">').appendTo($('#movies'));
    
    $("#"+i).css("background-image", "url("+ data["Search"][i].Poster +")");
    $('<a class="favoritemovie" id="favorite-' + data["Search"][i].imdbID + '">').text("Favoritfilm").appendTo($('#' + i));
    
    $('<a class="archivemovie" id="archive-' + data["Search"][i].imdbID + '">').text("Arkiv").appendTo($('#' + i));
    $('<p class="movietitle" id="title-' + data["Search"][i].imdbID + '">').text(data["Search"][i].Title + " (" + data["Search"][i].Year + ")").appendTo($('#' + i));
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
    var idmessy = this.id;
    var id = idmessy.replace("favorite-", "");
    var title = $("#title-" + id).text();
    alert("Detta är nu din nya favoritfilm!");
    $("#favoritetitle").text(title);
    localStorage.setItem("favoritemovie", title);
    
}