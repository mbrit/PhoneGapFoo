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

function handleError(err) {
    console.log("Error!");
    console.log(err);
}