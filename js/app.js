///CREATE SURVEYS

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

	for (var i = 0; i < children.length; i++) {
			//get current question
			var question = $(children[i]).children('.question').val();
			//this is an array of matches
			var questionNumber = "question"+(i+1);
			survey.set(questionNumber, question);
			var responses = $(children[i]).find('.response');	
			var responseValues = [];
			for (var j = 0; j < responses.length; j++) {
				responseValues.push($(responses[j]).val());
			};
			survey.set(questionNumber + "Responses", responseValues);

	};

	
	survey.set("title", $("#surveyName").val());
	survey.save();

	$.ajax({
                    dataType: 'jsonp',
                    data: { name: "Michelle", formID:"6", phoneNumber:"+19782890617"},                      
                    jsonp: 'callback',
                    url: 'http://localhost:9000/textme',                     
                    success: function(data) {
                        console.log('success');
                        console.log(JSON.stringify(data));
                    }
                });
}

///GENERATE SURVEYS FOR USER AND ACCEPT INPUT
var query = new Parse.Query("Survey");
var QuestionObjects = {};
query.find({
  success: function(results) {
  	QuestionObjects = {};
  	for (var l = 0; l < results.length; l++) {

		QuestionObjects[results[l].id] = {};
		QuestionObjects[results[l].id]["id"] = results[l].id;	
	  	QuestionObjects[results[l].id]["title"] = results[l].attributes.title;
	  	QuestionObjects[results[l].id]["questions"] = [];
	  	//loop through all results
	  	//create local objects with parse ID, title, questions, question answers, name, phoneNumber

	  	var questionKeys = Object.keys(results[l].toJSON());
	  	for (var i = 0; i < questionKeys.length; i++) {
	  		if(questionKeys[i].indexOf("question")>=0 && questionKeys[i].indexOf("Responses")<0){
	  			QuestionObjects[results[l].id]["questions"].push(questionKeys[i]);
	  		}

	  	}
	  	//get question responses
	  	for (var i = 0; i < QuestionObjects[results[l].id]["questions"].length; i++) {
	  		QuestionObjects[results[l].id]["question" + (i+1) + "Responses"] = results[0].attributes["question" + (i+1) + "Responses"];
	  	}  	

	  	};
	
	  	displaySurveyList();
  },

  error: function(error) {
    // error is an instance of Parse.Error.
  }
});

function displaySurveyList(){
	var listOfSurveys = Object.keys(QuestionObjects);
	for (var i = 0; i < listOfSurveys.length; i++) {	
		debugger;
		$("#takeSurveyList").append("<li class='surveyListItem' data-id='"+ QuestionObjects[listOfSurveys[i]]["id"]+"'>"+QuestionObjects[listOfSurveys[i]]["title"]+"</li>");
	};
}

function displayIndividualSurvey(){

}

$(document.body).on('click', '.surveyListItem' ,function(){
	$("#takeSurveyList").hide();
	console.log("you clicked on: " + $(this).data("id") );
	var theSurveyClickedOn = QuestionObjects[$(this).data("id")];
	debugger;
});
