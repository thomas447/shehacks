$(document).ready(function () {

	getFileExplorerContent();

});

// Mouse Callbacks

function fileMouseEnter(file) {
	console.log("ENTER");
	file.classList.remove(gray);
	file.classList.add('outline-success');
	file.classList.add('text-light');
}

function fileMouseLeave(file) {
	file.classList.add(gray);
	file.classList.remove('outline-success');
	file.classList.remove('text-light');
}

// Displays the File Explorer Content

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

	html += '<div id="dir" class="dir-header text-light bg-secondary"><span class="dir-span" path="'+ dir[1] +'">'+ dir[0] +'</span></div>' 

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

	return '<div id="file" mouseenter="fileMouseEnter(this)" mouseleave="fileMouseLeave(this)" onclick="onClickFile(this)" file = "' + file_arr[0] + '" path = "'+ file_arr[1]+'" class="file gray text-dark" style = "margin-left: 20px" depth = "'+ depth +'"><span>'+ file_arr[0] +'</span></div>'

}