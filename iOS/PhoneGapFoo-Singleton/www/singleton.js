function initialize() {

    // setup...
    $(".navcontacts").click(function() {
       showContacts();
    });

    // show the pane...
    showContacts();

    // update the view...
    refreshContacts();
}

function showLocation() {
    showView("location");
}

function showContacts() {
    showView("contacts");
}

function showView(name) {
    
    console.log("Switching to view: " + name);
    
    // hide them all...
    $(".pane").hide();
    
    // show the one we want...
    $("#" + name).show(); 
    
}
    
function refreshContacts() { 

    console.log("Refreshing contacts...");
    try
    {

    // call the contacts...
    var args = new ContactFindOptions();
    args.multiple = true;
    var contacts = navigator.contacts.find(["*"], function(result) { 
        
        // what happened?
        console.log("Success! Found " + result.length + " contact(s).");
        
        // model...
        var model = { 
            contacts: result
        };
        ko.applyBindings(model, $("#contactslist")[0]);

        // bind...
        $("#contactslist").find("a").click(function() {
            showContact($(this).data("foo"));    
        });
        
    }, function(err) {
        handleError(err);
    }, args);
    
    }
    catch(ex)
    {
        console.log(ex);
    }
    
    console.log("Outside of handler...");
    
}

function handleError(err) {
    console.log("Error!");
    console.log(err);
}

function showContact(id) {

    console.log("Looking for: " + id);

    // load the contact up...
    var args = new ContactFindOptions();
    args.multiple = true;
    var contacts = navigator.contacts.find(["*"], function(result) { 
        
        // what happened?
        console.log("Success! Found " + result.length + " contact(s).");
        
        // clunky - need to walk the lot as find is too wooly a function...
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