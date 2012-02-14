var httpRequest = new XMLHttpRequest();  

// add a listener...
self.addEventListener('message', function(e) {

	//  tell the caller that we're starting...
	var url = e.data.url;
	postStatus("About to start downloading: " + url);
	
	// download the url...
  	httpRequest.open("GET", url, true);  
  	httpRequest.onload = handleResponse;  
  	httpRequest.send(null);
	
}, false);

// send back the status...
function postStatus(status) {
	
	// package...
	var args = { 
		action: "status",
		status: status
	}
	
	// send...
	self.postMessage(args);
	
}

function handleResponse() {
 	
	var output = httpRequest.responseText;  
    if (output)
		postStatus("Read " + output.length + " byte(s).");  
    else
		postStatus("Did not receive a response.");
		
    httpRequest = null;

}
