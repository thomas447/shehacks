var currentFilePath = '';

function onClickFile(file) {

	if(file.getAttribute('path') != currentFilePath) {
		currentFilePath = file.getAttribute('path');
		$("#curr_file").html("<-- Editing <b>" + file.getAttribute('file') + "</b>");
		openFileAjax(currentFilePath);
	}
}

function onSave() {



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
		url: 'get_contents',
		data: data,
		success: function(result) {
			console.log(result.content);
			editor.getDoc().setValue(result.content);
		} 
	})

}