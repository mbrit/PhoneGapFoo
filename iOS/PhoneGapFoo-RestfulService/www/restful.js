var registerArgs = {
	username: ko.observable(""),
	firstName: ko.observable(""),
	lastName: ko.observable(""),
	email: ko.observable(""),
	password: ko.observable(""),
	confirm: ko.observable("")
}

function initialize() {
		
	$("#registerbutton").click(function() {
		handleRegister();
	});
		
	// bind the form...
	ko.applyBindings(registerArgs, $("#registerform")[0]);
		
}

function handleRegister() {

	// show...
	var args = ko.toJS(registerArgs);
	args.apiKey = "e5b868c4-8e03-4e8b-84b9-20be67fceaff";
	
	// disable the button...
	$("#registerbutton").attr("disabled", true);

	//  make the call with jQuery...
    $.ajax({
        type: "POST",
        data: JSON.stringify(args),
        url: "https://streetfoo.apphb.com/Handlers/HandleRegister.ashx",
		success: function (data) {

			console.log(JSON.stringify(data));
			if(data.isOk)
				navigator.notification.alert("New user created: " + data.userId);
			else
				navigator.notification.alert("Error: " + data.error);
		
        },
        error: handleAjaxFailure,
        complete: function() {

			// put the button back...
			$("#registerbutton").attr("disabled", false);

        }
    });
	
}

function handleAjaxFailure(err) {
	console.log(JSON.stringify(err));
	navigator.notification.alert("The server call failed.");
}

