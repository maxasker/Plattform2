if (localStorage.getItem("favoritemovie") === null) {
    localStorage.setItem("favoritemovie", "Ingen favorit vald");
    $("#favoritetitle").text("Ingen favorit vald");
} else{$("#favoritetitle").text((localStorage.getItem("favoritemovie")));}

if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", "Ingen användare vald");
    $("#username").text("Ingen användare vald");
} else{$("#username").text((localStorage.getItem("user")));}

$("#namechange").on("click", function(){
    var value = $("#moviesearch").val();
	localStorage.setItem("user", value);
    $("#username").text(localStorage.getItem("user"));
});