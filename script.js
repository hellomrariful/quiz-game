let timeLeft = 30;
let timer;
let currentQuestion = 0;

const questions = [
    {
        question: "Which Indian state is known as the \"Land of Spices\"?",
        options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
        correct: "Kerala",
        description: {
            title: "The Spice Trade Legacy",
            text: "Kerala has historically been known as the \"Land of Spices\" due to its rich heritage in spice cultivation and trade. The state's unique geographical features and climate make it ideal for growing various spices like cardamom, pepper, cinnamon, and cloves."
        }
    },
    {
        question: "What is 4 ÷ 2?",
        options: ["1", "2", "3", "4"],
        correct: "2",
        description: {
            title: "Basic Division",
            text: "Division is the process of splitting a number into equal parts. In this case, 4 divided by 2 equals 2 because 2 + 2 = 4."
        }
    },
    {
        question: "Which Indian festival marks the end of the harvest season and is celebrated with bonfires?",
        options: ["Pongal", "Lohri", "Baisakhi", "Makar Sankranti"],
        correct: "Lohri",
        description: {
            title: "Lohri Festival",
            text: "Lohri is a popular winter folk festival celebrated primarily in North India. It marks the end of winter and the harvest season, traditionally celebrated by lighting bonfires, singing, dancing, and feasting."
        }
    },
    {
        question: "What is the smallest odd number?",
        options: ["1", "3", "2", "5"],
        correct: "1",
        description: {
            title: "Odd Numbers",
            text: "An odd number is a number that cannot be divided evenly by 2. The smallest odd number is 1, followed by 3, 5, and so on."
        }
    },
    {
        question: "Which Indian city is called the \"City of Pearls\"?",
        options: ["Hyderabad", "Jaipur", "Chennai", "Kolkata"],
        correct: "Hyderabad",
        description: {
            title: "Hyderabad - The City of Pearls",
            text: "Hyderabad earned this nickname due to its centuries-old pearl trading history. The city was once the global center for pearl trading and still maintains a significant presence in the pearl market."
        }
    }
];

function verifyAge(age) {
    if (age === 'above') {
        document.getElementById('age-verification').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        startTimer();
        loadQuestion();
    } else {
        alert('Sorry, you must be 18+ to play this quiz!');
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time\'s up!');
            endQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestion];
    document.querySelector('.question-number').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.querySelector('.question').textContent = question.question;
    
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        optionsContainer.innerHTML += `<button class="option-btn" onclick="checkAnswer('${option}')">${option}</button>`;
    });

    document.querySelector('.description h3').textContent = question.description.title;
    document.querySelector('.description p').textContent = question.description.text;
}

function checkAnswer(selected) {
    const question = questions[currentQuestion];
    if (selected === question.correct) {
        const currentCoins = parseInt(document.getElementById('coin-count').textContent);
        document.getElementById('coin-count').textContent = currentCoins + 1;
        alert('Correct answer!');
    } else {
        alert(`Wrong answer! The correct answer is ${question.correct}`);
    }
    currentQuestion++;
    loadQuestion();
}

function endQuiz() {
    clearInterval(timer);
    const finalScore = document.getElementById('coin-count').textContent;
    alert(`Quiz completed! Your final score: ${finalScore} coins`);
    // You can add more end-quiz logic here
}