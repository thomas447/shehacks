var currentFilePath = '';
var everythingSaved = true;

function onClickFile(file) {

	if(file.getAttribute('path') != currentFilePath) {
		currentFilePath = file.getAttribute('path');
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

function runFileAjax(filePath) {

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