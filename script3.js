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
		url: "http://www.omdbapi.com/?i=" + idlist[i],
		dataType: "JSON"
	}).done(function(data){
		console.log(data);
        showsearchresult(data);
	}).fail(function(data){
        console.log("something went wrong");
	});
}
    
}

function showsearchresult(data){
    $('<div class="moviepresent" id="' + data.imdbID + '">').appendTo($('#movies'));
    $('<p class="movietitle">').text(data.Title + " (" + data.Year + ")").appendTo($('#' + data.imdbID));
    $("#"+data.imdbID).css("background-image", "url("+ data.Poster +")");
    $('<a class="removiearchive" id="archive-' + data.imdbID + '">').text("Ta bort ifrån arkiv").appendTo($('#' + data.imdbID));
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
