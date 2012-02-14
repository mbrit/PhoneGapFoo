var currentLocation = null;

function initialize() {
	refreshLocation();
	
	// wire...
	$("#refreshbutton").click(function() {
		refreshLocation();
	});
	$("#directionsbutton").click(function() {
		handleDirections();
	});
	
}

function refreshLocation() {
	
	// hide...
	console.log("Getting location...");
	$("#refreshbutton").attr("disabled", true);
	
	// run...
	var args = {
		enableHighAccuracy: true
	};
	navigator.geolocation.getCurrentPosition(function(location) {
		
		// set...
		console.log("New location loaded: " + JSON.stringify(location));
		currentLocation = location.coords;
		$("#location").text("lat: " + currentLocation.latitude + ", lon: " + currentLocation.longitude)
		
		// show the form...
		$("#destinationform").show();
		
		// show the button...
		revertButton();	
		
	}, function(err) {
		console.log(JSON.stringify(err));
		revertButton();
	}, args)
	
}

function revertButton() {
	$("#refreshbutton").attr("disabled", false);
}

function handleDirections() {	

	// where?
	var to = $("#destination").val();
	if(to == null || to.length == 0) {
		navigator.notification.alert("You must enter a destination.");
		return;
	}
	
	// where...
	var url = "http://maps.google.com/maps?saddr=" + currentLocation.latitude +  "," + currentLocation.longitude + 
	 	"&daddr=" + to;
	document.location = url;

}