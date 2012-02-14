var worker = null;

function initialize() {

	//  set...
	worker = new Worker('downloader.js');
	worker.onerror = handleWorkerError;
	worker.onmessage = handleWorkerMessage;

	// send a message...
	var args = {
		url: "http://www.amazon.co.uk/"
	};
	worker.postMessage(args); // Send data to our worker.

}

function handleWorkerError(e) {
	console.log("Error: " + e);
}

function handleWorkerMessage(e) {

	// what happened?
	var action = e.data.action;
	if(action == "status") {	
		
		// if we got given a status, set it...
		console.log(e.data.status);
		$("#status").text(e.data.status);
		
	}
	else
		console.log("Cannot handle action: " + action);

}
