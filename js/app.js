Parse.initialize("1kDKNEor4PV2rdxuDZNMvPrAPecBdvKvy9clcEKQ", "QKVPQUDwD5tkEe4HvF82yStWIObsyg2GVHRu66Q3");



$("#handleSubmission").hide();
$("#handleSubmission").click(function(e){
	e.preventDefault();
	prepareAndSubmitForm();
});

$("#createSurvey").click(function(){
	addSurveyName();
	addQuestion();
	//binding for add response
	$(document.body).on('click', '.addResponse' ,function(e){
		e.preventDefault();
		var functionCaller = $(this).closest('.row');
		addResponse(functionCaller);
		//remove the 'add response' button
		var clickedItem = $(this);
		clearButtonsFromRow(clickedItem);
	});
	//binding for add question
	$(document.body).on('click', '.addQuestion' ,function(e){
		e.preventDefault();
		addQuestion();
		//remove the 'add question' button
		var clickedItem = $(this);
		clearButtonsFromRow(clickedItem);
	});
	$(this).hide();
	$("#handleSubmission").show();
});

function addResponse(functionCaller){
	$(functionCaller).after("<div class='row'>" +
			"<div class='col-sm-4 col-sm-offset-4'>" +
				"<input type='text' class='form-control response'>" +
			"</div>" +	
			"<div class='col-sm-2'>" +
				"<button class='addResponse'>add response</button>" +
			"</div>" +	
			"<div class='col-sm-2'>" +
				"<button class='addQuestion'>add question</button>" +
			"</div>" +	
		"</div>");
}

function addSurveyName(){
	$("#mainForm").append("<input id='surveyName' placeholder='Survey name'>");
}

function addQuestion(){
	$("#mainForm").append(
		"<div class='questionWrapper'>" +
			"<input type='text' class='form-control question'>" +
			"<div class='row responseWrapper'>" +
				"<div class='col-sm-4 col-sm-offset-4'>" +
					"<input type='text' class='form-control response'>" +
				"</div>" +	
				"<div class='col-sm-2'>" +
					"<button class='addResponse'>add response</button>" +
				"</div>" +	
				"<div class='col-sm-2'>" +
					"<button class='addQuestion'>add question</button>" +
				"</div>" +	
			"</div>" +
		"</div>");
}

function clearButtonsFromRow(clickedItem){
	$(clickedItem).closest('.row').find('.addResponse').hide();
	$(clickedItem).closest('.row').find('.addQuestion').hide();
}

function prepareAndSubmitForm(){

	var Survey = Parse.Object.extend("Survey");
	var survey = new Survey();

	var children = $("#mainForm").find('.questionWrapper');
	debugger;
	for (var i = 0; i < children.length; i++) {
			//get current question
			var question = $(children[i]).children('.question').val();
			//this is an array of matches
			var questionNumber = "question"+(i+1);
			survey.set(questionNumber, question);
			var responses = $(children[i]).find('.response');	
			var responseValues = [];
			for (var i = 0; i < responses.length; i++) {
				responseValues.push($(responses[i]).val());
			};
			survey.set(questionNumber + "Responses", responseValues);
	};

	
	survey.set("title", $("#surveyName").val());
	survey.save();


}

