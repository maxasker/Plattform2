$(document).ready(function() {
    getmedia();
});

$(document).ready(function() {
  $('#media-form').on("submit", function(e){
    e.preventDefault();
    $('#media-form').ajaxSubmit(function(data) {
    console.log(data);
    var data2 = $.parseJSON(data);
    if (data2.success == true){
        console.log("YAY")
        getmedia();
    };
    
    });
  });
});


function getmedia(){
    $.ajax({
		url: "server.php?action=getMedia&type=audio",
		dataType: "JSON"
	}).done(function(data){
		console.log(data);
        updatemedia(data);
	}).fail(function(data){
        console.log("something went wrong");
	});
}

function updatemedia(data){
    for (var i = 0; i < data["files"].length; i++){
        if (data["files"][i]["type"] == "photo"){
    $('<div class="imagediv"> <img class="mediaphoto" src="' + data["files"][i]["path"] + '"></div>').appendTo($('#showmedia'));
        }
    }
    for (var i = 0; i < data["files"].length; i++){
        if (data["files"][i]["type"] == "video"){
    $('<div class="videodiv"> <video class="mediavideo" src="' + data["files"][i]["path"] + '"></video></div>').appendTo($('#showmedia'));
        }
    }
    for (var i = 0; i < data["files"].length; i++){
        if (data["files"][i]["type"] == "audio"){
    $('<div class="imagediv"> <audio controls class="mediaaudio" src="' + data["files"][i]["path"] + '"></audio></div>').appendTo($('#showmedia'));
        }
    }
}