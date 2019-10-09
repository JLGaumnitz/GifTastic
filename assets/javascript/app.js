// VARIABLES for Preloaded gifs, number of gifs to retrieve, and rating
var gifReactions = ["Wow!", "Thank You", "Really?", "Happy", "Angry"];
var numberOfGIFs = 12;
var acceptableRating = "PG";

// FUNCTION to render buttons
function renderButtons(){
	for(var i = 0; i < gifReactions.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn-lg");
		newButton.addClass("new-reaction-category");
		newButton.text(gifReactions[i].toUpperCase());
		$("#button-container").append(newButton);
	}
	$(".new-reaction-category").unbind("click");

	$(".new-reaction-category").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		populateGifContainer($(this).text());
	});

}
// FUNCTION to add buttons
function addButton(reaction){
	if(gifReactions.indexOf(reaction) === -1) {
		gifReactions.push(reaction);
		$("#button-container").empty();
		renderButtons();
	}
}

// Code to retrieve images from Giphy and put them in a new empty div
function populateGifContainer(reaction){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + reaction + 
		"&api_key=SEQHdoXfuKPwb6tBQwuuE1c7bj6E53vO&rating=" + acceptableRating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		// This code animates image or reverts to still image on click
		$("#gif-container").addClass("ridged-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

// Code to call functions
$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
        event.preventDefault();
		addButton($("#new-reaction-category").val().trim());
		$("#new-reaction-category").val("");
	});
});
