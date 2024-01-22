const questions = [
    {
      question: "What is the Jersey number of Virat Kohli?",
      answers: [
        { text: "08", incorrect: false },
        { text: "18", correct: true },
        { text: "28", incorrect: false },
        { text: "38", incorrect: false },
      ],
    },
    {
      question: "Date of Birth of Virat Kohli?",
      answers: [
        { text: "5th November 1988", correct: true },
        { text: "6th December 1987", incorrect: false },
        { text: "7th November 1987", incorrect: false },
        { text: "8th December 1987", incorrect: false },
      ],
    },
    {
      question: "Which year Virat Kohli received the Arjuna Award?",
      answers: [
        { text: "2018", incorrect: false },
        { text: "2017", incorrect: false },
        { text: "2009", incorrect: false },
        { text: "2013", correct: true },
      ],
    },
    {
      question: "What is the favourite shot of Virat Kohli?",
      answers: [
        { text: "Straight Drive", incorrect: false },
        { text: "Flick Shot", incorrect: false },
        { text: "Cover Drive", correct: true },
        { text: "Pull", incorrect: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
   
     const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
  
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++; 
    } else {
      selectedBtn.classList.add("incorrect");
    }
  
    const buttons = Array.from(answerButtons.children);
    buttons.forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
      button.removeEventListener("click", selectAnswer);
    });
  
     currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          nextButton.style.display = "block";
          nextButton.addEventListener("click", showQuestion);
      } else {
          const scoreElement = document.getElementById("score");
          scoreElement.innerHTML = `Congratulations Your Quiz is finished! Your score: ${score}/${questions.length}`;
          scoreElement.style.display = "block"; 
          scoreElement.style.color = "rgb(42, 63, 165)";
      }
  }
  startQuiz();