$(document).ready(function () {

	getFileExplorerContent();

});

function getFileExplorerContent() {
	$.ajax({
		type: "POST",
		url: "/files",
		success: function(result) {
			console.log(result);
		}
	});
}