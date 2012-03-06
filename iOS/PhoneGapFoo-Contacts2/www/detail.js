function showItem(id) {

	// set...
	console.log("Showing item with ID: " + id);
	$("#thelist").data("selectedId", id);
	
	// show...
	$.mobile.showPageLoadingMsg();
	
	// load the contacts again... PhoneGap and Ripple do not help us here...
	var args = new ContactFindOptions();
    args.multiple = true;
    navigator.contacts.find(["*"], function(contacts) { 

		// walk...
		var found = null;
		for(var index in contacts) {
			if(contacts[index].name.formatted == id) {
				found = contacts[index];
				break;
			}
		}
		
		// if...
		if(found != null) {
			
			// show...
			ko.applyBindings(found, $("#detail")[0]);
			changePage("detail");
			
		}
		

		// hide...
		$.mobile.hidePageLoadingMsg();

    }, function(err) {

		// hide...
		$.mobile.hidePageLoadingMsg();

        console.log("Error!");
        console.log(err);

    }, args);

}