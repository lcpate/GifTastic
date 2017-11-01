

var topics = ["Carolina Panthers", "Atlanta Falcons", "Pittsburgh Steelers", "Washington Redskins", "Seattle Seahawks", "Kansas City Chiefs"];

function displayTeams (){
	

		var team = $(this).attr("data-name");
		console.log ('team ', team)

		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YumuHyK51v32US9X2c1t8jtLqEyx1C7Z&q=" + team + "&limit=10&offset=0&rating=PG&lang=en"


		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);

			var results = response.data;

				for (var i = 0; i < results.length; i++) {

					if(results[i].rating !== "r" && results[i].rating !== "pg-13"){
						var newDiv = $("<div>");

						var rating = results[i].rating;
						var p = $("<p>").text("Rating: " + rating);
						

						var image = $("<img>");
						image.attr("data-state", "still")
						image.attr("class", "gif");
						image.attr("data-still", results[i].images.fixed_height_still.url);
						image.attr("data-animate", results[i].images.fixed_height.url);
						image.attr("src", $(image).attr("data-still"));
						

						newDiv.append(p);
						newDiv.append(image);

						$("#results").prepend(newDiv);

					}
					
				}
		})	
			
	
}; 


	//animating the gifs 
 function playGifs() {
    var state = $(this).attr("data-state");
      	if (state === "still") {          
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	    } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	        }
};


// Creating Buttons for array and new ones
function renderButtons(){
	$("#teamBtn").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");

		a.addClass("team");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#teamBtn").append(a);

	}
}

$("#add-team").on("click", function(event){
	event.preventDefault();

	var newTeam = $("#team-input").val().trim();

	topics.push(newTeam);

	renderButtons();

	$("#team-input").val("");
	
});



$(document).on("click", ".team", displayTeams);
$(document).on("click", ".gif", playGifs);

renderButtons();


