
var questionID, question, choiceA, choiceB, choiceC, choiceD, userChoice, questions, numQuestions, qInfo,
current = 0,
score = 0,
points = [];

var defaultQuestions = [
    {
        question: "koko",
        choiceA: "here",
        choiceB: "there",
        choiceC: "no",
        choiceD: "why",
        correct: "A"
    },
    {
        question: "neko",
        choiceA: "there",
        choiceB: "person",
        choiceC: "dog",
        choiceD: "cat",
        correct: "D"
    },
    {
        question: "arigatou",
        choiceA: "this",
        choiceB: "when",
        choiceC: "Thank-you",
        choiceD: "sorry",
        correct: "C"
    },
    {
        question: "inu",
        choiceA: "dog",
        choiceB: "cat",
        choiceC: "horse",
        choiceD: "baby",
        correct: "A"
    },
    {
        question: "Konbanwa",
        choiceA: "Hello",
        choiceB: "Good Morning",
        choiceC: "Good Evening",
        choiceD: "Goodbye",
        correct: "C"
    }];

var elQuiz = document.getElementById("quiz");
var elQuizStatus = document.getElementById("quizStatus");

var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var elChoices = document.getElementsByName('choices');

//  quiz
populateQuestions();
renderQuestion();
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions(){
    // starting qs
    questions = defaultQuestions;
    // if local storage contains questions, add to starting qs
    if(localStorage.getItem("questions")){
        var storedQuestions = JSON.parse(localStorage.getItem("questions"));
        for(var i = 0; i < storedQuestions.length; i++){
            questions.push(storedQuestions[i]);
        }
    }
    numQuestions = questions.length;
}

function populateQuestionInfo(){
    question = questions[current].question;
    qInfo = questions[current];
    choiceA = qInfo.choiceA;
    choiceB = qInfo.choiceB;
    choiceC = qInfo.choiceC;
    choiceD = qInfo.choiceD;
    correct = qInfo.correct;
}

function renderQuestion(){
    questionID = current + 1;
    elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
    populateQuestionInfo();
    elQuestion.innerHTML = question;
    elChoiceA.innerHTML = choiceA;
    elChoiceB.innerHTML = choiceB;
    elChoiceC.innerHTML = choiceC;
    elChoiceD.innerHTML = choiceD;
}

function gradeQuestion(){
    if(getUserChoice()){
        if(userChoice == questions[current].correct){
            score++;
            points[current] = 1;
        }
        else{
            points[current] = 0;
        }

        if(current == questions.length-1){
            endGame();
        }
        else{
            // next question
            current++;
            renderQuestion();
        }
    }
}

function getUserChoice(){
    for (var i = 0, length = elChoices.length; i < length; i++)
    {
        if (elChoices[i].checked)
        {
            userChoice = elChoices[i].value;

            // clear radio input for next question
            elChoices[i].checked = false;

            return true;
        }
    }
    // didn't select answer
    alert("Please select an answer");
    return false;
}

function endGame(){
    elQuiz.innerHTML = "<h2>Your Score: " + score + " out of " + numQuestions + "</h2>";
    for(var i = 0; i < points.length; i++){
        var summary = document.createElement("p");
        if(points[i] == 0){
            summary.innerHTML = "Question #" + (i+1) + ": INCORRECT";
            summary.style.color = "red";
        }
        else{
            summary.innerHTML = "Question #" + (i+1) + ": CORRECT!";
            summary.style.color = "green";
        }
        elQuiz.appendChild(summary); 
    }
    document.getElementById("options").style.display = "block";

}