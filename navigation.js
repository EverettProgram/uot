
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    document.getElementById("arrowDiv").style.display="none";
  } 
  prevScrollpos = currentScrollPos;
}

var currentQuestion=document.getElementById("question1");

function showNext() {
	if(currentQuestion==document.getElementById("question10")){ //don't allow going next q from q10
		document.getElementById("question10").style.display="block";
	}
	else{
		var nextQuestion = currentQuestion.nextElementSibling;
	  	var submitButton = document.getElementById("submitButton");
	  	currentQuestion.style.display = "none";
	  	nextQuestion.style.display = "block";
	  	currentQuestion=nextQuestion;
	  	if(currentQuestion==document.getElementById("question10")){
	  		submitButton.style.display="block"
	  	}
	}
}

function showPrevious() {
	if(currentQuestion==document.getElementById("question1")){ //don't allow going prev q from q1
		document.getElementById("question1").style.display="block";
	}
	else{
  		var previousQuestion = currentQuestion.previousElementSibling;
	  	currentQuestion.style.display = "none";
	  	previousQuestion.style.display = "block";
	  	currentQuestion=previousQuestion;
	}
}

$(document).ready(function(){
    $('.check').click(function() {
        $('.check').not(this).prop('checked', false);
    });
});
function submit(){

	// initialize variables to track capacity
	var lowCapacity = 0;
	var medCapacity = 0;
	var highCapacity = 0;

/*------------------------------------------------------------------------------*/

	// QUESTION 7 CHECKS
	// take input from question 7
	var form7 = document.getElementById("form7");
	var iPpl = form7.querySelector('input[name = iPplAnswer]').value;
	var ePpl = form7.querySelector('input[name = ePplAnswer]').value;

	// check values and modify variables for inexperienced people
	if (iPpl <= 1) {
		lowCapacity += 1;
	} else if (iPpl > 1 && iPpl < 4) {
		medCapacity += 1;
	} else {
		highCapacity += 1;
	}

	// check values and modify variables for experienced people
	if (ePpl <= 1) {
		lowCapacity += 2.5;
	} else if (ePpl > 1 && ePpl < 4) {
		medCapacity += 2.5;
	} else {
		highCapacity += 2.5;
	}

/*------------------------------------------------------------------------------*/

	// QUESTION 8 CHECKS
	// take input from question 8
	var form8 = document.getElementById("form8");
	var negPT = form8.querySelector('input[name = negPTAnswer]').value;
	var pt = form8.querySelector('input[name = ptAnswer]').value;
	var ft = form8.querySelector('input[name = ftAnswer').value;

	// check values and modify variables for less than part-time
	if (negPT <= 1) {
		lowCapacity += 0.5;
	} else if (negPT > 1 && negPT < 4) {
		medCapacity += 0.5;
	} else {
		highCapacity += 0.5;
	}

	// check values and modify variables for part-time
	if (pt <= 1) {
		lowCapacity += 1;
	} else if (pt > 1 && pt < 4) {
		medCapacity += 1;
	} else {
		highCapacity += 1;
	}

	// check values and modify variables for full-time
	if (ft <= 1) {
		lowCapacity += 2;
	} else if (ft > 1 && ft < 4) {
		medCapacity += 2;
	} else {
		highCapacity += 2;
	}

/*------------------------------------------------------------------------------*/

	// QUESTION 9 CHECKS
	// take input from question 9
	var form9 = document.getElementById("form9");
	var annBudget = form9.querySelector('input[name = budgetAnswer]').value;
	var techBudget = form9.querySelector('input[name = techBudgetAnswer').value;
	var budg = (techBudget/annBudget) * 100; // percent of budget on tech.

	// check values and modify variables for percent of budget on tech.
	if (budg <= 1) {
		lowCapacity += 3;
	} else if (budg > 1 && budg < 3.2) {
		medCapacity += 3;
	} else {
		highCapacity += 3;
	}

/*------------------------------------------------------------------------------*/

	// DETERMINE MAX VARIABLE FOR CAPACITY
	var capacityList = [lowCapacity, medCapacity, highCapacity];
	var maxScore = Math.max.apply(Math, capacityList);

	// list holding feedback based on index
	var scores = [{index:0, feedback: "You are a low capacity org."},
		          {index:1, feedback: "You are a medium capacity org."},
		          {index:2, feedback: "You are a high capacity org."}];

	// display organization's tech. capacity
	for(i = 0; i < scores.length; i++) {
		if(capacityList[i] == maxScore) {
			document.getElementById("answers").innerHTML = scores[i].feedback;
		}
	}
}