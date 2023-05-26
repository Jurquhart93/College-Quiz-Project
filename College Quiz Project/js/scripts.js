//storing all the HTML elements that I need in a variable
const quizContainer = document.querySelector(".main_quiz");
const qTabs = document.querySelectorAll(".main_quiz-tabs div");
const qBox = document.querySelector(".main_quiz-question");
const aBox = document.querySelector(".main_quiz-answers");
const aBoxButtons = aBox.querySelectorAll("button");
const rBox = document.querySelector(".main_quiz-result");
const startBtn = document.querySelector("#start");
const submitBtn = document.querySelector("#submit");
const nextBtn = document.querySelector("#next");

//variables to keep track of the current question and the users score
let currentQuestion = 0;
let score = 0;

//Defining users_anwser in the global scope so
//that it can be used in multiple functions
let users_answer;

//an array with questions and answers
const qanda = [
  {
    question: "Which of the following is a renewable energy source?",
    answers: ["Coal", "Solar", "Natural gas"],
    correctAnswer: "Solar",
  },
  {
    question: "What can we do to reduce plastic waste in the oceans?",
    answers: [
      "Recycle plastic bottles",
      "Dump plastic waste in the ocean",
      "Use plastic bags",
    ],
    correctAnswer: "Recycle plastic bottles",
  },
  {
    question: "What is the largest rainforest in the world?",
    answers: ["Amazon", "Sahara", "Gobi"],
    correctAnswer: "Amazon",
  },
  {
    question: "What is a compost?",
    answers: ["A type of plant", "A type of fertilizer", "A type of soil"],
    correctAnswer: "A type of fertilizer",
  },
  {
    question: "Which of the following is NOT a greenhouse gas?",
    answers: ["Carbon dioxide", "Methane", "Nitrogen"],
    correctAnswer: "Nitrogen",
  },
  {
    question: "What is a carbon footprint?",
    answers: [
      "A mark left by walking in carbon",
      "A measure of the amount of carbon dioxide emitted through human activities",
      "A type of carbonated drink",
    ],
    correctAnswer:
      "A measure of the amount of carbon dioxide emitted through human activities",
  },
];

//hiding the game until the Start Quiz button is clicked
quizContainer.style.display = "none";

//adding an event listener to the start button
//when clicked it will start the game
startBtn.addEventListener("click", () => {
  //hiding the start button after the quiz has started
  startBtn.style.display = "none";
  //showing the quiz by changing the display from none to flex
  quizContainer.style.display = "flex";

  loadQuestion(); //calling the loadQuestion function

  //event listener for when the submit button is clicked, execute the
  //submit() function
  submitBtn.addEventListener("click", () => {
    submit();
  });

  //when the next button is clicked
  //load the next set of question - update currentQuestion by
  //an increment of 1, load another question
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
  });
});

function loadQuestion() {
  //reseting the result boxs inner HTML to be blank
  rBox.innerHTML = "";

  //showing the answers and questions box
  aBox.style.display = "flex";
  qBox.style.display = "flex";

  //setting the background colour of the current/active tab
  qTabs.forEach((tab, index) => {
    if (index === currentQuestion) {
      tab.style.backgroundColor = "aqua";
    } else {
      //making sure only 1 tab has a background colour
      tab.style.backgroundColor = "";
    }
  });

  //putting the code inside an if statement
  //if currentQuestions < array.length then exicute
  //else display the final score
  if (currentQuestion < qanda.length) {
    //everytime a question is loaded, the next button will be hidden until
    //the submit button is clicked
    nextBtn.style.display = "none";
    submitBtn.style.display = "flex";

    //populating the questions box with the question
    //from the array qanda at the position of current question
    qBox.innerHTML = qanda[currentQuestion].question;

    //for each possible answer populate the answers buttons
    //with a possible answer
    qanda[currentQuestion].answers.forEach((answer, i) => {
      // console.log(answer);
      aBoxButtons[i].textContent = ""; //reseting each of the buttons contents
      aBoxButtons[i].textContent = `${answer}`; //updating buttons contents
    });

    //listen for a users click on the answers and store the answer in a variable
    aBoxButtons.forEach((button) => {
      button.addEventListener("click", () => {
        //removing active class from all the buttons
        aBoxButtons.forEach((b) => {
          b.classList.remove("active");
        });

        //adding active class for selected button
        button.classList.add("active");

        //storing users answer in a variable
        users_answer = button.textContent;
        //   console.log(users_answer);
      });
    });

    //checking to see if the current question === 5
    //if it does then change the next buttons text to Finish
    if (currentQuestion === 5) {
      nextBtn.textContent = "Finish";
    }
  } else {
    //declaring the variable to store the users pass mark
    let passMark;

    hideAll(); //calling the hideAll function

    //if statement to check the users score, if 3 or more then
    //pass, else fail
    if (score < 3) {
      passMark = "Unfortunately you failed, better luck next time.";
    } else {
      passMark = "Congratulations, you passed the quiz!!";
    }
    rBox.innerHTML = `Well done on completing the quiz! Your score was ${score}/6. ${passMark}`;
  }
}

function submit() {
  //match the users selection to the correct answer when they hit submit
  //if the users answer === correctAnswer then display correct,
  //else display wrong answer
  if (!users_answer) {
    //   console.log("Please provide an answer.");
    rBox.innerHTML = "Please provide an answer.";
  } else if (users_answer === qanda[currentQuestion].correctAnswer) {
    //   console.log("Correct!");
    rBox.innerHTML = "Correct Result, well done!";
    score++; //incrementing the score by 1 if the answer is correct
    hideButton();
  } else {
    //   console.log("Wrong!");
    rBox.innerHTML = "Sorry, you got that one wrong!";
    hideButton();
  }

  users_answer = ""; //reseting users answer to avoid bugs
}

//functions to hide HTML propertys
//decided to hide so the code couldnt be broken
//by multiple user clicks
function hideButton() {
  qBox.style.display = "none";
  aBox.style.display = "none";
  submitBtn.style.display = "none";
  nextBtn.style.display = "flex";
}

function hideAll() {
  //for each tab set display property to none
  qTabs.forEach((tab) => {
    tab.style.display = "none";
  });

  //setting the display properties to none
  qBox.style.display = "none";
  aBox.style.display = "none";
  submitBtn.style.display = "none";
  nextBtn.style.display = "none";
}

// //////////////////////
// PARALLAX            //
/////////////////////////

// grabbing all the relevent images for the parallax
let text = document.querySelector("#text");
let sun = document.querySelector("#sun");
let mFar = document.querySelector("#mFar");
let mMid = document.querySelector("#mMid");
let mClose = document.querySelector("#mClose");
let grassTop = document.querySelector("#grassTop");
let grassMid = document.querySelector("#grassMid");
let grassBot = document.querySelector("#grassBot");
let treeLeft = document.querySelector("#treeLeft");
let treeRight = document.querySelector("#treeRight");
let bushLeft = document.querySelector("#bushLeft");
let bushRight = document.querySelector("#bushRight");

//adding an event listener for when the user
//scrolls, it will add margins to images to
//give them the illutions of moving back and forward
window.addEventListener("scroll", () => {
  let value = window.scrollY;

  text.style.marginTop = -value * 1.1 + "px";

  treeLeft.style.marginRight = value + 1.1 + "px";
  treeRight.style.marginLeft = value + 1.1 + "px";

  sun.style.marginRight = value + 1.1 + "px";
});
