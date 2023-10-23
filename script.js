const questions = [
    {
        question: "What's the longest river in Africa?",
        answers: [
            { text: "Orange River", correct: false},
            { text: "Zambezi River", correct: false},
            { text: "Nile River", correct: true},
            { text: "Niger River", correct: false},
        ]
    },

    {
        question: "What's the tallest mountain in Africa?",
        answers: [
            { text: "Mt Kenya", correct: false},
            { text: "Mt Meru", correct: false},
            { text: "Mt Stanley", correct: false},
            { text: "Mt Kilimanjaro", correct: true},
        ]
    },

    {
        question: "What's the largest country in Africa?",
        answers: [
            { text: "South Africa", correct: false},
            { text: "Algeria", correct: true},
            { text: "DRC Congo", correct: false},
            { text: "South Sudan", correct: false},
        ]
    },

    {
        question: "Whats the most populated country in Africa?",
        answers: [
            { text: "Mozambique", correct: false},
            { text: "Egypt", correct: false},
            { text: "Nigeria", correct: true},
            { text: "Libya", correct: false},
        ]
    },

    {
        question: "How many countries are in Africa?",
        answers: [
            { text: "45", correct: false},
            { text: "54", correct: false},
            { text: "55", correct: true},
            { text: "60", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//variable to store the question index and score
let currentQuestionIndex = 0;
let score = 0;

//function
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

//function to display the questions
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //display answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//function to resetstate
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//function for select answer
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

//calls the startQuiz function
startQuiz();
