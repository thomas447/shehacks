$(document).ready(function() {

	var source = new EventSource("/refresh");

	source.onmessage = function(event) {
		alert(event.data);
		getFileExplorerContent();
	}

});