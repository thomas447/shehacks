var source = new EventSource("/refresh");

source.onmessage =  function(event) {
	console.log(event.data);
	getFileExplorerContent();
}


