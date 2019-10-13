// VARIABLES for array of preloaded buttons, number of gifs to retrieve, and rating

// NOTE to TAs grading this: I labeled my array "gifReactions" instead of "topics" (as the Instructions said).

// Note to self: The unbind() Method is an inbuilt method in jQuery which is used to remove any selected event handlers.

var gifReactions = ["Wow!", "Thank You", "Really?", "Happy", "Angry"];
var numberOfGIFs = 10;
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
// (indexOf of -1 means that the input was not already in the array, so the word is pushed to the array)
function addButton(reaction){
	if(gifReactions.indexOf(reaction) === -1) {
		gifReactions.push(reaction);
		$("#button-container").empty();
		renderButtons();
	}
}

// Code to retrieve images from Giphy and display them and their ratings in a new empty div
function populateGifContainer(reaction){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + reaction + 
		"&api_key=SEQHdoXfuKPwb6tBQwuuE1c7bj6E53vO&rating=" + acceptableRating + "&limit=" + numberOfGIFs,
		method: "Get"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
		});
		// This code animates the gif or reverts to still image on click
		$("#gif-container").addClass("double-horizontal-rule");
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
