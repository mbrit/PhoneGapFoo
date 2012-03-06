function initialize() {
	refreshView();
}

function refreshView() {

	// show...
	$.mobile.showPageLoadingMsg();

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
		var theList = $("#thelist");
        ko.applyBindings(model, theList[0]);

		// set up the links...
		var links = theList.find(".detaillink");
		console.log("Binding " + links.length + " links...");
		links.click(function() {
			handleItemClick(this);
		});

		// hide...
		$.mobile.hidePageLoadingMsg();
        
    }, function(err) {

		// hide...
		$.mobile.hidePageLoadingMsg();

        console.log("Error!");
        console.log(err);

    }, args);

}       

function handleItemClick(item) {

	// selected...
	var selected = $(item).data("id");
	showItem(selected);
	
}
