var httpRequest = new XMLHttpRequest();  

function initialize() {
	
	$("#downloadbutton").click(function() {
		handleDownload();
	});

}

function handleDownload() {

	// url...
	var url = $("#url").val().trim();
	if(url.length == 0) {
		navigator.notification.alert("You must provide a URL.");
		return;
	}
	
	// download it...
	console.log("Downloading: " + url);
	$.ajax({
		url: url,
		method: "GET",
		success: handleServerResponse,
		error: handleError
	});

}

function handleServerResponse(data) {

	console.log("Received response from server...");

	// request the persistent file system
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
	
		// got the file system..
		console.log("Got the file system...");

		// if...
		var filename = "foo.html";
		checkForExistence(fs, filename, data, function() {
			console.log("Write handler...");
		});
	
	}, handleError);
}

function checkForExistence(fs, filename, data, writeHandler) {

	console.log("Checking for existence of file: " + filename);
	filename = filename.toLowerCase();

	// args...
	var args = {
		create: true
	};

	// create a directory reader...
	var reader = fs.root.createReader();
	var files = [];
	var exists = false;
	var doRead = function() {
		reader.readEntries(function(entries) {
			
			// walk...
			var changed = false;
			for(var index in entries) {

				// the file...
				var found = entries[index].name.toLowerCase();

				// have we seen it?
				if(!(contains(files, found))) {
					files.push(found);
					changed = true;
				}
				
				// found?
				if(found == filename)  {
					exists = true;
					break;
				}
				
			}
			
			// if...
			if(changed && !(exists))
				doRead();
			else {
					
				// load the entry...
				var args = {
					create: true
				}
				console.log("Getting file entry for: " + filename);
				fs.root.getFile(filename, args, function(entry) {
					
					if(exists) {
					 	entry.remove(function() {
						
							// load the file again (it'll be broken as we deleted it...)
							fs.root.getFile(filename, args, function(entry) {
					 			writeFile(fs, entry, data);
							}, handleError);
							
					 	}, handleError);
					} else 
					 	writeFile(fs, entry, data);
					
				}, handleError);

				return;
			}
			
		});
	};
	
	// kick off the initial read...
	doRead();
	
}

function contains(files, file) {
	for(var index in files) {
		if(files[index] == file)
			return true;
	}
	return false;
}

function writeFile(fs, entry, data) {

	console.log("Creating a writer...");

	// write the file...
	entry.createWriter(function(writer) {
	
		console.log("Writer done.");
	
		writer.write(data);
		console.log("File dumped.");

	}, handleError);
}

function handleError(err) {
	console.log("ERROR:");
	console.log(JSON.stringify(err));
}