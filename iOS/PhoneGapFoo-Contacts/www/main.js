function initialize() {
	refreshView();
}

function refreshView() {

    // call the contacts...
    var args = new ContactFindOptions();
    args.multiple = true;
    var contacts = navigator.contacts.find(["*"], function(result) { 
        
		// results...
		console.log(result);

        // what happened?
        console.log("Success! Found " + result.length + " contact(s).");
        
        // model...
        var model = { 
            contacts: result
        };
        ko.applyBindings(model);
        
    }, function(err) {
        console.log("Error!");
        console.log(err);
    }, args);

}