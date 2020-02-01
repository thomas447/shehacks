$(document).ready(function () {

	getFileExplorerContent();

});

function getFileExplorerContent() {
	$.ajax({
		type: "POST",
		url: "/files",
		success: function(result) {

			console.log(result);
			html = directoryHTML(result.dir, 0);

			$("#file-explorer").html(html);

		}
	});
}

// Directory HTML computer
function directoryHTML(dir, depth) {

	console.log(dir);
	var dir_arr = dir[2];
	var html = '<div class="directory bg-light" depth = "'+ depth + '"';
	html += 'style = "padding-left: '+ (depth * 20) +'px; ">';

	html += '<div class="dir-header text-light bg-secondary"><span class="dir-span" path="'+ dir[1] +'">'+ dir[0] +'</span></div>' 

	for (var i = 0; i < dir_arr.length; i++) {
		if (dir_arr[i].file != undefined) {	// File
			html += fileHTML(dir_arr[i].file, depth + 1);
		}
		else if (dir_arr[i].dir != undefined) {	// Directory
			html += directoryHTML(dir_arr[i].dir, depth + 1);
		}
		else {
			html += '<div class="empty_dir" depth = "'+depth+'"></div>'
		}
	}

	html += '</div>';

	return html;
}

// File HTML computer
function fileHTML(file_arr, depth) {

	return '<div class="file gray text-dark" style = "margin-left: 20px" depth = "'+ depth +'"><span path = "'+ file_arr[1]+'">'+ file_arr[0] +'</span></div>'

}