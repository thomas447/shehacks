$(document).ready(function() {

	var source = new EventSource("/refresh");

	source.onmessage = function(event) {
		console.log("Message Received");
		getFileExplorerContent();
	}

});