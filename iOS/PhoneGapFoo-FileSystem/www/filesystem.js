

function initialize() {
	
	$("#writebutton").click(function() {
		handleFileWrite();
	});
	$("#readbutton").click(function() {
		handleFileRead();
	});
}

function handleFileWrite() {	
	
	var filename = getFilename();
	if(filename == null)
		return;
	
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
				navigator.notification.alert("Done.");
				
			}, handleError);

		}, handleError);

	}, handleError);

}

function handleFileRead() {	
	
	var filename = getFilename();
	if(filename == null)
		return;
	
	// example to write a file...
	console.log("Requesting file system...");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

		// got a file system - now get a file entry...
		console.log("Requesting file...");
		fs.root.getFile(filename, { create: true }, function(entry) {

			// got a file entry, now get a reader...
	        var reader = new FileReader();
	        reader.onloadend = function(e) {
	            console.log("Reading file...");
	            $("#contents").html(e.target.result);
	        };
	
			// go...
	        reader.readAsText(entry);

		}, handleError);

	}, handleError);

}

function getFilename() {

	var filename = $("#filename").val().trim();
	if(filename != null && filename.length > 0)
		return filename;
	else
		return null;

}

function handleError(err) {
	console.log("ERROR");
	console.log(err);
}
