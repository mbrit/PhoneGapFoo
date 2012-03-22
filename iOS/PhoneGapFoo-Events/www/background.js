function initialize() {

	document.addEventListener("pause", handlePause, false);	// won't fire until it comes *back*...
	document.addEventListener("resume", function() { 
		console.log("Resumed!") 
	}, false);
	document.addEventListener("online", function() { 
		console.log("Online!") 
	}, false);
	document.addEventListener("offline", function() { 
		console.log("Offline!") 
	}, false);
	document.addEventListener("batterystatus", function(e) { 
		console.log("Battery -> level: " + e.level + ", isPlugged: " + e.isPlugged); 
	}, false);
	document.addEventListener("batterylow", function() { 
		console.log("Battery low!") 
	}, false);
	document.addEventListener("batterycritical", function() { 
		console.log("Battery critical!") 
	}, false);

	$("#testbutton").click(handlePause);
	
}

function handlePause() {
    var settings = {
        foo: "bar"
    };
    saveSettings(settings);
}

function writeFile() {

	var filename = "offline.txt";

	// example to write a file...
	console.log("Requesting file system...");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

		// got a file system - now get a file entry...
		console.log("Requesting file...");
		fs.root.getFile(filename, { create: true }, function(entry) {

			// got a file entry, now get a writer...
			console.log("Requesting writer...");
			entry.createWriter(function(writer) {

				// got a writer, so write it...
				console.log("Writing the file...");
				writer.write("Hello, world - ." + new Date());
				
				// log...
				console.log("Done.");
				
			}, handleError);

		}, handleError);

	}, handleError);

}

function handleSet() {
	
	var name = $("#newname").val();
	if(name == null || name.length == 0) {
		alert("Name is required.");
		return;
	}
	
	//  load the previous settings...
	var settings = loadSettings();
	
	// set the new vaue...
	var value =  $("#newvalue").val();
	settings[name] = value;
	
	// save the lot...
	saveSettings(settings);
	
	// log...
	console.log("Set '" + name + "' to '" + value + "'.");
	
}

function loadSettings() {
	
	// load the string...
	var asJson = localStorage.getItem("settings");
	if(asJson != null && asJson.length > 0) 
		return JSON.parse(asJson);
	else
		return {};
	
}

function saveSettings(settings) {
	
	//  set...
	var asJson = JSON.stringify(settings);
	console.log("Committing settings: " + asJson);
	localStorage.setItem("settings", asJson);
	
	// update...
	refreshView();
	
}

function refreshView() {
	
	// load...
	var settings = loadSettings();
	
	// present the settings in a DOM...
	$("#currentsettings").text(JSON.stringify(settings));
	
}

function handleClear() {
	saveSettings({});
	refreshView();
}


function handleError() {
	console.log("An error occured.");
}