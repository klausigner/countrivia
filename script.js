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
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-one.webp", 
        option: ["A. Belgium", "B. Germany"],
        answer: "B. Germany",
    },

    {      
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-two.webp", 
        option: ["A. Nigeria", "B. Algeria"],
        answer: "A. Nigeria",
    },

    {        
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-three.webp", 
        option: ["A. South Korea", "B. Japan"],
        answer: "B. Japan",
    },

    {       
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-four.webp", 
        option: ["A. USA", "B. Liberia"],
        answer: "A. USA",
    },

    {       
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-five.webp", 
        option: ["A. Uruguay", "B. Argentina"],
        answer: "B. Argentina",
    },

    {      
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-six.webp", 
        option: ["A. Australia", "B. New Zealand"],
        answer: "A. Australia",
    },

    {        
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-seven.webp", 
        option: ["A. Mozambique", "B. Jamaica"],
        answer: "B. Jamaica",
    },

    {        
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-eight.webp", 
        option: ["A. Ghana", "B. Bolivia"],
        answer: "A. Ghana",
    },

    {       
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-nine.webp", 
        option: ["A. Niger", "B. India"],
        answer: "B. India",
    },

    {      
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-ten.webp", 
        option: ["A. Spain", "B. Macedonia"],
        answer: "A. Spain",
    },

    {
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-eleven.webp", 
        option: ["A. Peru", "B. Canada"],
        answer: "B. Canada",
    },

    {
        question: "Which country is represented by this flag and landmark?",
        imgSrc: "quiz-twelve.webp", 
        option: ["A. Brazil", "B. Gabon"],
        answer: "A. Brazil",
    },
];

// Question Number Array
const questionNumberArray = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
];

// Randomize Array
function randomizer(arr) {
    const newArr = [...arr];

    for (let x = newArr.length - 1; x > 0; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [newArr[x], newArr[y]] = [newArr[y], newArr[x]]
    };

    return newArr;
};

let randomizedArray = randomizer(numQuesImgOptAns);

// ✅ Preload all Quiz Images at the Start
const imageCache = [];
randomizedArray.forEach((q) => {
    const img = new Image();
    img.src = q.imgSrc;
    imageCache.push(img);
});

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
    randomizedArray = randomizer(numQuesImgOptAns);

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
    if (index < randomizedArray.length) {
        // Add Question Number
        questionNumber.textContent = questionNumberArray[index];

        // Add Image
        questionImage.src = randomizedArray[index].imgSrc;

        // Add Question
        question.textContent = randomizedArray[index].question;

        // Add Options
        questionCardBtn.forEach((items, i) => {
            items.textContent = randomizedArray[index].option[i];
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
        endGameTitle.innerHTML = `your score is <span>${score}/${randomizedArray.length}</span>`;
    }
};

// Answer Buttons
questionCardBtn.forEach((items) => {
    items.addEventListener("click", () => {
        // If Option is Correct
        if (items.textContent === randomizedArray[index].answer) {
            score++;

            items.classList.add("selected");

            questionCardBtn.forEach((btn) => {
                btn.classList.add("disabled");
            })

            // Next or Check Score Button
            const next = document.createElement("button");
            if (index === randomizedArray.length - 1) {
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
            if (index === randomizedArray.length - 1) {
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