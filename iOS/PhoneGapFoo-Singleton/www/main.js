function initialize() {
	
	// bind...
	$(".navcontacts").click(showContacts);
	
	// update the view...
	refreshView();

    // show the pane...
    showContacts();
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
		var contactsList = $("#contacts");
        ko.applyBindings(model, contactsList[0]);

		// bind the links...
		contactsList.find("a").click(handleItemClick);
        
    }, function(err) {
        console.log("Error!");
        console.log(err);
    }, args);
}

function handleItemClick() {
	var id = $(this).data("id");
	console.log("Clicked on: " + id);
	showContact(id);
}