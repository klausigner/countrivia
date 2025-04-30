// Tracks the score and questions index
let currentScore = 0;
let currentQuestion = 0;

// Variables storing all HTML references
const startCard = document.getElementById("startCard");
const startBtn = document.querySelector(".startBtn");
const quizEnd = document.getElementById("quizEnd");
const restartBtn = document.querySelector(".restartBtn");
const questionTitle = document.getElementById("questionTitle");

// Array holding each question containers
const questionContainers = [
    document.getElementById("questionOne"),
    document.getElementById("questionTwo"),
    document.getElementById("questionThree"),
    document.getElementById("questionFour")
];

// Array that represents correct answers
const correctAnswers = [
    "B. Germany",
    "A. Nigeria",
    "B. Japan",
    "A. USA"
];

// Starts the game
startBtn.addEventListener("click", function() {
    startCard.classList.add("hide");
    questionContainers[currentQuestion].classList.remove("hide");
});

// A function that determines what happens after an answer button is clicked
function handleAnswerClick(event) {
    // Attaches a target to know which answer button was clicked
    const button = event.target;
    // Removes space from the texts in the answer buttons to match 
    const selectedText = button.innerText.trim();

    // Checks if the answer to the question is correct and adds 1 to the score if it is
    if (selectedText === correctAnswers[currentQuestion]) {
        currentScore++;
    }

    // Creates and stores a variable indicating current question
    const container = questionContainers[currentQuestion];
    const buttons = container.querySelectorAll(".answerBtn");

    // After answering, all buttons are disabled and the color changes so the player can’t click again 
    buttons.forEach(function(btn) {
        btn.disabled = true;
        btn.style.backgroundColor = "#5A5A5A";
    });

    // Create a next question button that will appear after an answer button is clicked
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("nextBtn");
    // Adds either the "Next Question" or "Check Score" button depending on how many questions are left
    nextBtn.textContent = currentQuestion < questionContainers.length - 1 ? "Next Question" : "Check Score";
    container.appendChild(nextBtn);

    // What happens if the next answer button is clicked
    nextBtn.addEventListener("click", function() {
        // Hides current question
        container.classList.add("hide");
        // Increases the question index and loads the next question
        currentQuestion++;
        
        // Unhides the question if the current index is less than the length of the question array
        if (currentQuestion < questionContainers.length) {
            questionContainers[currentQuestion].classList.remove("hide");
            // Keeps the question hidden and shows the end quiz screen if the current index is not less than the length of the question array which also shows the score
        } else {
            quizEnd.classList.remove("hide");
            questionTitle.innerHTML = `Your score is <span>${currentScore}/4</span>`;
        }
    });
}

// Attach answer button listeners
questionContainers.forEach(function(container) {
    // Creates a variable that stores all answer buttons
    const buttons = container.querySelectorAll(".answerBtn");
    // Initiates the handleAnswerClick function
    buttons.forEach(function(button) {
        button.addEventListener("click", handleAnswerClick);
    });
});

// Restarts the game when the restart game button is clicked
restartBtn.addEventListener("click", function() {
    window.location.reload();
});