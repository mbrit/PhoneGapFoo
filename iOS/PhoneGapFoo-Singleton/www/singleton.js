function showContact(id) {

    console.log("Looking for: " + id);

    // load the contact up...
    var args = new ContactFindOptions();
    args.multiple = true;
    var contacts = navigator.contacts.find(["*"], function(result) { 
        
        // what happened?
        console.log("Success! Found " + result.length + " contact(s).");
        
        // clunky - need to walk the lot as contacts.find is too wooly a function...
        var found = null;
        for(var index in result) {
            
            console.log(result[index].id);
            
            // bind...
            if(result[index].id == id) {
                found = result[index];
                break;
            }

        }

        if(found != null) {

            // show the view...
            ko.applyBindings(found, $("#contactsingleton")[0]);
            showView("contact");

        } else
            navigator.notification.alert("Contact not found.");

    }, function(err) {
        handleError(err);
    }, args);

}