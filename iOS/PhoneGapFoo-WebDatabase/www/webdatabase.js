var viewModel =  {
	customers: ko.observableArray()
}

function initialize() {

	$("#createtablebutton").click(handleCreateTable);
	$("#addrowbutton").click(handleAddRow);
	$("#selectallbutton").click(handleSelectAll);
	$("#droptablebutton").click(handleDropTable);

	// bind...
	ko.applyBindings(viewModel, $("#results")[0]);

}

function getDatabase() {
	return openDatabase("foo", "1.0", "A description", 2 * (1024 * 1024));
}

function handleCreateTable() {
	
	console.log("Getting database...");
	var db = getDatabase();

	// get a transaction...
	db.transaction(function(tx) {
		
		// now do something...
		tx.executeSql("create table if not exists Customers (customerId unique, firstName, lastName, email)", 
			[], function (tx, results) {

			// tell the user...
			navigator.notification.alert("Created OK.");

		}, handleError);
		
	});
}

function handleAddRow() {
	
	console.log("Getting database...");
	var db = getDatabase();

	// get a transaction...
	db.transaction(function(tx) {
		
		// now do something...
		console.log("Inserting customer...");
		tx.executeSql("insert into Customers (firstName, lastName, email) values (?, ?, ?)", 
			['Matthew', 'Baxter-Reynolds', 'matt@amxmobile.com'], function() {

			// notify...
			navigator.notification.alert("Customer added.");

		}, handleError);
		
	});
	
}

function handleSelectAll() {
	
	console.log("Getting database...");
	var db = getDatabase();

	// get a transaction...
	db.transaction(function(tx) {
		
		// now do something...
		console.log("Selecting data...");
		tx.executeSql("select * from Customers", [], function(tx, results) {

			// tell the user...
			console.log("Retrieved " + results.rows.length + " row(s)...");
			
			// walk...
			viewModel.customers.removeAll();
			console.log(viewModel.customers.length);
			for(var index = 0; index < results.rows.length; index++)
				viewModel.customers.push(results.rows.item(index));

		}, handleError);
		
	});
}

function handleError(tx, err) {
	console.log("A database error occurred: " + err.message);
}

function handleDropTable() {
	
	console.log("Getting database...");
	var db = getDatabase();

	// get a transaction...
	db.transaction(function(tx) {
		
		// now do something...
		tx.executeSql("drop  table if exists Customers", 
			[], function (tx, results) {

			// tell the user...
			navigator.notification.alert("Drop OK.");

		}, handleError);
		
	});
}
