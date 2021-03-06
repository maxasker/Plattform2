$('#loading-image').hide();
$(document).ready(function() {
  $('#media-form').on("submit", function(e){
    e.preventDefault();
    $('#loading-image').show();
    $('#media-form').ajaxSubmit(function(data) {
    $('#loading-image').hide();
    var data2 = $.parseJSON(data);
    if (data2.success == true){
        $("#media-form")[0].reset();
        alert("Upload successful");
    }else{
     alert("Något gick fel :(, försök igen senare.");      
    };
    });
  });
});

$("#photo").on("click", function(){
    $(".media").remove();
    $('').appendTo($('#showmedia'));
    getmedia("photo");
});

$("#video").on("click", function(){
    $(".media").remove();
    getmedia("video");
});

$("#audio").on("click", function(){
    $(".media").remove();
    getmedia("audio");
});

function getmedia(mediatype){
    $('#loading-image').show();
    $.ajax({
		url: "server.php?action=getMedia&type="+mediatype,
		dataType: "JSON"
	}).done(function(data){
        $('#loading-image').hide();
        updatemedia(data);
	}).fail(function(data){
        $('#loading-image').hide();
        console.log("Något gick fel :(, försök igen senare.");
	});
}


function updatemedia(data){
    $("#showmedia").empty();
    for (var i = 0; i < data["files"].length; i++){
        if (data["files"][i]["type"] == "photo"){
    $('<div class="media col-md-6 col-xs-12 col-sm-6 col-lg-3"><h2>'+data["files"][i]["title"]+'</h2> <img class="img-responsive mediaphoto" src="' + data["files"][i]["path"] + '"></div>').appendTo($('#showmedia'));
        }
    }
    for (var i = 0; i < data["files"].length; i++){
        if (data["files"][i]["type"] == "video"){
    $('<div class="media img-thumbnail col-md-6 col-xs-12 col-sm-6 col-lg-3"><h2>'+data["files"][i]["title"]+'</h2><video controls type="video/mp4" class="mediavideo" src="' + data["files"][i]["path"] + '"></video></div>').appendTo($('#showmedia'));
        }
    }
    for (var i = 0; i < data["files"].length; i++){
        if (data["files"][i]["type"] == "audio"){
    $('<div class="media col-md-6 col-xs-12 col-sm-6 col-lg-3"><h2>'+data["files"][i]["title"]+'</h2>  <audio controls class="mediaaudio" src="' + data["files"][i]["path"] + '"></audio></div>').appendTo($('#showmedia'));
        }
    }
}