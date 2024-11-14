/* IMPROVEMENT IN PROGRESS... */

var quizQuestionCorrect = 0;
var quizQuestions = 0;

$(document).ready(function () {
	$(".navQuestion, .quizPanel, .quizCorrect, .quizFail, .quizContinue").hide();
	quizQuestions = $(".quizPanel").length;

	//start quiz
	$(".quizPlayGame").click(function (e) {
		e.preventDefault();
		$(".quizIntroPanel").hide();
		$($(".quizPanel")[0]).show();
		$(".navQuestion").show();
	});

	//click an option
	$(".question").click(function () {
		$("input:not(:checked)").parent().removeClass("quizSelected");
		$("input:checked").parent().addClass("quizSelected");
	});

	//click validate button
	$(".quizValidate").click(function (e) {
		e.preventDefault();
		quizValidate(this);
	});

	//click continue button
	$(".quizContinue").click(function (e) {
		e.preventDefault();
		quizContinue(this);
	});
});

function quizValidate(element) {
	//find checkbox inputs
	var checkboxButtons = $(element)
		.parent(".quizValidationLayer")
		.parent(".quizPanel")
		.find("input");
	var isCorrect = "0";
	var isError = "0";
	if ($(checkboxButtons).length > 0) {
		//check if there are multiple correct anwers
		var isCorrectDoubleNum = $(element)
			.closest(".quizPanel")
			.find(".question input[data-value='1']").length;
		var isCorrectDoubleChecker = 0;

		$(checkboxButtons).each(function (index, element) {
			//for each checkbox
			if ($(this).is(":checked")) {
				if ($(this).attr("data-value") == "1") {
					isCorrectDoubleChecker++;
					if (isCorrectDoubleNum == isCorrectDoubleChecker) {
						isCorrect = "1";
					}
				} else {
					isError = "1";
					isCorrect = "0";
				}
				if ($(this).attr("data-value") == "1" && isError == "1") {
					$(this).parent().addClass("thisCorrect");
				}
			} else {
				if ($(this).attr("data-value") == "1") {
					$(this).parent().addClass("thisCorrect");
					isCorrect = "0";
				} else {
					//isError = "1";
				}
			}
		});
	}

	if (isError == "1") {
		isCorrect = "0";
		//show error msg
		$(element).parent(".quizValidationLayer").children(".quizFail").show();
		var errorMsg = "";
		$(element)
			.parent(".quizValidationLayer")
			.siblings(".quizResponses")
			.children(".question")
			.children("input[data-value=1]")
			.siblings("label")
			.each(function () {
				errorMsg += $(this).text() + "<br>";
			});
		$(element)
			.parent(".quizValidationLayer")
			.children(".quizFail")
			.html(
				"ERROR<br> <small>Sorry, this wasn't the correct answer.<br>The correct answer is:</small><br> " +
					errorMsg
			);
	}

	if (isCorrect == "1") {
		//show correct msg
		$(element)
			.parent(".quizValidationLayer")
			.children(".quizCorrect")
			.show()
			.html("CORRECT<br> <small>Your answer is correct!</small>");
		quizQuestionCorrect += 1;
	} else {
		/*
        //show error msg
        $(element).parent(".quizValidationLayer").children('.quizFail').show();
        var errorMsg = '';
        $(element).parent(".quizValidationLayer").siblings('.quizResponses').children('.question').children('input[data-value=1]').siblings('label').each(function() {
            errorMsg += $(this).text() + '<br>';
        });
        $(element).parent(".quizValidationLayer").children('.quizFail').html(
            'ERROR<br> <small>Sorry, this wasn\'t the correct answer.<br>The correct answer is:</small><br> ' + errorMsg
        );
        */
	}

	//hide validate button
	$(element).hide();
	//show continue button
	$(element).parent(".quizValidationLayer").children(".quizContinue").show();
	//disable the checkboxes for this question
	$(element)
		.parent(".quizValidationLayer")
		.siblings(".quizResponses")
		.children(".question")
		.children("input")
		.attr("disabled", true);
}

function showErrorMsg() {
	//show error msg
	$(element).parent(".quizValidationLayer").children(".quizFail").show();
	var errorMsg = "";
	$(element)
		.parent(".quizValidationLayer")
		.siblings(".quizResponses")
		.children(".question")
		.children("input[data-value=1]")
		.siblings("label")
		.each(function () {
			errorMsg += $(this).text() + "<br>";
		});
	$(element)
		.parent(".quizValidationLayer")
		.children(".quizFail")
		.html(
			"ERROR<br> <small>Sorry, this wasn't the correct answer. The correct answer is:</small><br> " +
				errorMsg
		);
}

//go to next question
function quizContinue(element) {
	var currentPanel = $(element)
		.parent(".quizValidationLayer")
		.parent(".quizPanel");
	var nextPanel = $(currentPanel).next(".quizPanel");
	if ($(nextPanel).length > 0) {
		$(currentPanel).hide();
		$(nextPanel).show();
		changeSelectedQuestion(nextPanel);
	} else {
		$(currentPanel).hide();
		$(".navQuestion").hide();
		$(".quizPanelResult").show();
		$(".quizTextResult")
			.delay(2000)
			.html(
				"You have " +
					((quizQuestionCorrect * 100) / quizQuestions).toFixed(0) +
					"%" +
					" correct answers !"
			);
	}
}

//highlight selected question
function changeSelectedQuestion(pos) {
	var x = pos.index() - 3;
	//$('.navQuestion').children('span').removeClass('quizActiveQuestion').eq(x).addClass('quizActiveQuestion');
	$(".navQuestion")
		.children("span")
		.removeAttr("class")
		.eq(x)
		.addClass("quizActiveQuestion");
}
