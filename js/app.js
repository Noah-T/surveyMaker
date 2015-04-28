$("#createSurvey").click(function(){
	$("#mainForm").append("<input type='text' class='form-control'>" +
		"<div class='row'>" +
			"<div class='col-sm-4 col-sm-offset-4'>" +
				"<input type='text' class='form-control'>" +
			"</div>" +	
			"<div class='col-sm-4'>" +
				"<button class='addResponse'>add response</button>" +
			"</div>" +	
		"</div>");
	$(document.body).on('click', '.addResponse' ,function(e){
		e.preventDefault();
		var functionCaller = $(this).closest('.row');
		addResponse(functionCaller);
		//remove the 'add response' button
		$(this).remove();
	});
});


function addResponse(functionCaller){
	$(functionCaller).after("<div class='row'>" +
			"<div class='col-sm-4 col-sm-offset-4'>" +
				"<input type='text' class='form-control'>" +
			"</div>" +	
			"<div class='col-sm-4'>" +
				"<button class='addResponse'>add response</button>" +
			"</div>" +	
		"</div>");
}

