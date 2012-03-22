function initialize() {
	
	$("#refreshbutton").click(refreshView);
	$("#setbutton").click(handleSet);
	$("#clearbutton").click(handleClear);
	
	// refresh the view...
	refreshView();
	
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
