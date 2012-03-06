
function changePage(name) {
	console.log("Changing page: " + name);
	$.mobile.changePage($("#" + name));
}