"use strict";
// Targeting DOM Elements
const startGame = document.querySelector(".startGame");
const startGameBtn = document.querySelector(".startGameBtn");

const questionCard = document.querySelector(".questionCard");
const questionNumber = document.querySelector(".questionNumber");
let questionImage = document.querySelector(".questionImage");
const question = document.querySelector(".question");
const btns = document.querySelector(".questionCard > .btns");
const questionCardBtn = document.querySelectorAll(".questionCardBtn");

const endGame = document.querySelector(".endGame");
const endGameTitle = document.querySelector(".endGameTitle");
const endGameBtn = document.querySelector(".endGameBtn");

// Soundtracks
const duringGame = document.getElementById("duringGame");
const afterGame = document.getElementById("afterGame");

// Index and Score Variable Declaration
let index = 0;
let score = 0;

// Array of Questions, Images, Options and Answers
const numQuesImgOptAns = [
    {
        number: "one", 
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-one.webp", 
        option: ["A. Belgium", "B. Germany"],
        answer: "B. Germany",
    },

    {
        number: "two",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-two.webp", 
        option: ["A. Nigeria", "B. Algeria"],
        answer: "A. Nigeria",
    },

    {
        number: "three",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-three.webp", 
        option: ["A. South Korea", "B. Japan"],
        answer: "B. Japan",
    },

    {
        number: "four",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-four.webp", 
        option: ["A. USA", "B. Liberia"],
        answer: "A. USA",
    },

    {
        number: "five",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-five.webp", 
        option: ["A. Uruguay", "B. Argentina"],
        answer: "B. Argentina",
    },

    {
        number: "six",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-six.webp", 
        option: ["A. Australia", "B. New Zealand"],
        answer: "A. Australia",
    },

    {
        number: "seven",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-seven.webp", 
        option: ["A. Mozambique", "B. Jamaica"],
        answer: "B. Jamaica",
    },

    {
        number: "eight",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-eight.webp", 
        option: ["A. Ghana", "B. Bolivia"],
        answer: "A. Ghana",
    },

    {
        number: "nine",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-nine.webp", 
        option: ["A. Niger", "B. India"],
        answer: "B. India",
    },

    {
        number: "ten",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-ten.webp", 
        option: ["A. Spain", "B. Macedonia"],
        answer: "A. Spain",
    },

    {
        number: "eleven",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-eleven.webp", 
        option: ["A. Peru", "B. Canada"],
        answer: "B. Canada",
    },

    {
        number: "twelve",
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-twelve.webp", 
        option: ["A. Brazil", "B. Gabon"],
        answer: "A. Brazil",
    },
];

// Start Game
startGameBtn.addEventListener("click", () => {
    startGame.classList.add("hidden");
    questionCard.classList.remove("hidden");

    duringGame.play();
    duringGame.loop = true;

    afterGame.pause();
    afterGame.currentTime = 0;
    afterGame.loop = false;
});

// Restart Game
endGameBtn.addEventListener("click", () => {
    index = 0;
    score = 0;

    afterGame.pause();
    afterGame.currentTime = 0;
    afterGame.loop = false;

    startGame.classList.remove("hidden");
    endGame.classList.add("hidden");

    quizLogic();
});

// Quiz Logic
function quizLogic() {
    // If There are Still Questions Left
    if (index < numQuesImgOptAns.length) {
        // Add Question Number
        questionNumber.textContent = numQuesImgOptAns[index].number;

        // Add Image
        questionImage.src = numQuesImgOptAns[index].imgSrc;

        // Add Question
        question.textContent = numQuesImgOptAns[index].question;

        // Add Options
        questionCardBtn.forEach((items, i) => {
            items.textContent = numQuesImgOptAns[index].option[i];
        });

        // Enable Buttons
        questionCardBtn.forEach((btns) => {
            btns.classList.remove("disabled");
        })
    }

    // If There are no Questions Left
    else {
        afterGame.play();
        afterGame.loop = true;

        duringGame.pause();
        duringGame.currentTime = 0;
        duringGame.loop = false;

        questionCard.classList.add("hidden");
        endGame.classList.remove("hidden");
        endGameTitle.innerHTML = `your score is <span>${score}/${numQuesImgOptAns.length}</span>`;
    }
};

// Answer Buttons
questionCardBtn.forEach((items) => {
    items.addEventListener("click", () => {
        // If Option is Correct
        if (items.textContent === numQuesImgOptAns[index].answer) {
            score++;

            items.classList.add("selected");

            questionCardBtn.forEach((btn) => {
                btn.classList.add("disabled");
            })

            // Next or Check Score Button
            const next = document.createElement("button");
            if (index === numQuesImgOptAns.length - 1) {
                next.textContent = "Check Score";
            } 

            else {
                next.textContent = "Next";
            }

            next.classList.add("questionCardNextBtn");
            
            next.addEventListener("click", () => {
                index++;
                items.classList.remove("selected");
                quizLogic();
                next.remove();
            });

            questionCard.append(next);
        }

        // If Option is Wrong
        else {
            items.classList.add("selected");

            questionCardBtn.forEach((btn) => {
                btn.classList.add("disabled");
            })

            // Next or Check Score Button
            const next = document.createElement("button");
            if (index === numQuesImgOptAns.length - 1) {
                next.textContent = "Check Score";
            } 

            else {
                next.textContent = "Next";
            }

            next.classList.add("questionCardNextBtn");
            
            next.addEventListener("click", () => {
                index++;
                items.classList.remove("selected");
                quizLogic();
                next.remove();
            });

            questionCard.append(next);
        }
    });
});

// Initialize Quiz Logic
quizLogic();