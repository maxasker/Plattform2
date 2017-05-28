window.addEventListener("load", archivesearch);

if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", "Ingen användare vald");
    $("#username").text("Ingen användare vald");
} else{$("#username").text((localStorage.getItem("user")));}

if (localStorage.getItem("favoritemovie") === null) {
    localStorage.setItem("favoritemovie", "Ingen favorit vald");
    $("#favoritetitle").text("Ingen favorit vald");
} else{$("#favoritetitle").text((localStorage.getItem("favoritemovie")));}

function archivesearch(){
    if (localStorage.getItem("archive") === "[]"){
        $('<p>').text("Tyärr har du inte lagt till någon film än :(").appendTo($('#movies'));   
    }else{listarchivedmovies();};
}

function listarchivedmovies(){
    item = localStorage.getItem("archive");
    idlist = $.parseJSON(item);
    for (i = 0; i < idlist.length; i++) {
    $.ajax({
		url: "http://www.omdbapi.com/?apikey=9d8c329f&i=" + idlist[i],
		dataType: "JSON"
	}).done(function(data){
        showsearchresult(data);
	}).fail(function(data){
        console.log("Något gick fel :(, försök igen senare.");
	});
}
    
}

function showsearchresult(data){
    $('<div class="moviepresent" id="' + data.imdbID + '">').appendTo($('#movies'));
    $('<a class="removiearchive" id="archive-' + data.imdbID + '">').text("Ta bort ifrån arkiv").appendTo($('#' + data.imdbID));
    $('<p class="movietitle2">').text(data.Title + " (" + data.Year + ")" + " (" + data.Runtime +")").appendTo($('#' + data.imdbID));
    $("#"+data.imdbID).css("background-image", "url("+ data.Poster +")");
    $("#archive-" + data.imdbID).click(removefromarch);
}

function removefromarch(){
    var idmessy = this.id;
    var removeid = idmessy.replace("archive-", "");
    var item = localStorage.getItem("archive");
    var idlist = $.parseJSON(item);
    idlist = jQuery.grep(idlist, function(value) {
    return value != removeid;
});
    alert("Filmen är nu borttagen ifrån ditt arkiv");
    var archive = JSON.stringify(idlist);
    localStorage.setItem("archive", archive);
    $("#"+removeid).remove();
}
