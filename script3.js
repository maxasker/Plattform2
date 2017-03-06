window.addEventListener("load", archivesearch);

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
    $("#archive-" + data["Search"][i].imdbID).click(removefromarch);
}

function removefromarch(){
    var removeid = this.id;
    item = localStorage.getItem("archive");
    idlist = $.parseJSON(item);
    idlist.pop
    
    
}