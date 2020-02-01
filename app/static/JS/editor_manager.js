var currentFilePath = '';
var currentFile = null;

// Button Callbacks

function onClickFile(file) {

	if(file.getAttribute('path') != currentFilePath) {
		currentFilePath = file.getAttribute('path');
		
		if (currentFile != null) {
			currentFile.classList.remove('bg-success');
			currentFile.classList.remove('text-light');
			currentFile.classList.add('gray');
		} 

		currentFile = file;
		currentFile.classList.add('bg-success');
		currentFile.classList.add('text-light');
		currentFile.classList.remove('gray');

		$("#curr_file").html("<-- Editing <b>" + file.getAttribute('file') + "</b>");
		openFileAjax(currentFilePath);
	}
}

function onSave() {

	var textContent = editor.getDoc().getValue();

	var data = {
		path: currentFilePath,
		mode: 'SAVE',
		content: textContent
	}

	saveFileAjax(data);
}

function onRefresh() {
	if (currentFilePath != '') {
		openFileAjax(currentFilePath);
	}
	getFileExplorerContent();
}

function onRun() {
	if (currentFilePath != '') {
		runFileAjax(currentFilePath);
	}
}

// Ajax Calls

function runFileAjax(filePath) {
		
	var data = {
		path : filePath
	}

	$.ajax({
		type: 'POST',
		url: '/run',
		data: data,
		success: function(result) {
			$("#console").html(result.output);
		}
	}) 
}

function saveFileAjax(data) {
	$.ajax({
		type: 'POST',
		url: '/update_file',
		data: data
	})
}

function openFileAjax(filePath) {
		
	if (filePath == '') {
		return;
	}

	var data = {
		path: filePath 
	}

	$.ajax({
		type: 'POST',
		url: '/get_contents',
		data: data,
		success: function(result) {
			editor.getDoc().setValue(result.content);
		} 
	})

}