function initialize() {
	refreshLocation();
}

function refreshLocation() {
	
	// hide...
	$("#refreshbutton").attr("disabled", true);
	
	// run...
	navigator.geolocation.getCurrentPosition(function(location) {
		console.log(JSON.stringify(location));
		revertButton();	
	}, function(err) {
		console.log(JSON.stringify(err));
		revertButton();
	}, args)
	
}

function revertButton() {
	$("#refreshbutton").attr("disabled", false);
}
