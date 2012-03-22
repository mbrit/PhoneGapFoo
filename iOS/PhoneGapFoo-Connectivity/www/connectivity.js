var isOnline = false;

function initialize() {
	$("#callbutton").click(handleCallButton);
	
	// force online initially...
	setOnline(true);
	
	// subscribe...
	document.addEventListener("online", function() {
		setOnline(true);
	}, false);
	document.addEventListener("offline", function() {
		setOnline(false);
	}, false);
}

function handleCallButton() {

	// call...
	var args = {};
	args.apiKey = "e5b868c4-8e03-4e8b-84b9-20be67fceaff";
	
	// disable the button...
	$("#callbutton").attr("disabled", true);

	//  make the call with jQuery...
    $.ajax({
        type: "POST",
        data: JSON.stringify(args),
        url: "https://streetfoo.apphb.com/Handlers/HandleRegister.ashx",
		success: function (data) {
			
			// ok...
			alert("Call OK.");
			setOnline(true);
			
        },
        error: handleAjaxFailure,
        complete: function() {

			// put the button back...
			$("#callbutton").attr("disabled", false);

        }
    });

}

function handleAjaxFailure() {
	
	// set...
	alert("Call failed.");
	setOnline(false);
	
}

function setOnline(mode) {
	isOnline = mode;
	$("#mode").text(isOnline + ", " + navigator.network.connection.type);
}

