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
    if (age === 'above' || age === 'below') {
        document.getElementById('age-verification').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        startTimer();
        loadQuestion();
    } else {
        alert('Please select your age group to continue!');
    }
}

function startTimer() {
    timeLeft = 30; // Reset timer for each question
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time\'s up for this question!');
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
                startTimer(); // Start timer for next question
            } else {
                endQuiz();
            }
        }
    }, 1000);
}

function createCoinAnimation(isPositive, clickPosition) {
    const coin = document.createElement('div');
    coin.className = 'coin-animation';
    coin.textContent = isPositive ? '+100' : '-100';
    coin.style.color = isPositive ? 'gold' : 'red';
    
    // Set initial position
    coin.style.left = `${clickPosition.x}px`;
    coin.style.top = `${clickPosition.y}px`;
    
    // Calculate target position (coin counter element)
    const coinCounter = document.getElementById('coin-count');
    const counterRect = coinCounter.getBoundingClientRect();
    const moveX = counterRect.left - clickPosition.x + (counterRect.width / 2);
    const moveY = counterRect.top - clickPosition.y + (counterRect.height / 2);
    
    // Set custom properties for animation
    coin.style.setProperty('--moveX', `${moveX}px`);
    coin.style.setProperty('--moveY', `${moveY}px`);
    
    document.body.appendChild(coin);

    setTimeout(() => {
        document.body.removeChild(coin);
    }, 800); // Reduced to match animation duration
}

function updateCoinCount(amount) {
    const coinCount = document.getElementById('coin-count');
    const currentCoins = parseInt(coinCount.textContent);
    const newAmount = currentCoins + amount;
    coinCount.textContent = newAmount;
    coinCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        coinCount.style.transform = 'scale(1)';
    }, 200);
}

function checkAnswer(selected, event) {
    const question = questions[currentQuestion];
    clearInterval(timer);
    
    const clickPosition = {
        x: event.clientX,
        y: event.clientY
    };

    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        if (button.textContent === selected) {
            if (selected === question.correct) {
                button.style.backgroundColor = '#28a745';
                createCoinAnimation(true, clickPosition);
                updateCoinCount(100);
                // Removed alert for correct answer
            } else {
                button.style.backgroundColor = '#dc3545';
                buttons.forEach(btn => {
                    if (btn.textContent === question.correct) {
                        btn.style.backgroundColor = '#28a745';
                    }
                });
                createCoinAnimation(false, clickPosition);
                updateCoinCount(-100);
                alert('Not the right answer!'); // Updated alert message
            }
        }
    });

    buttons.forEach(button => {
        button.disabled = true;
    });

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            startTimer();
        } else {
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
        optionsContainer.innerHTML += `<button class="option-btn" onclick="checkAnswer('${option}', event)">${option}</button>`;
    });

    document.querySelector('.description h3').textContent = question.description.title;
    document.querySelector('.description p').textContent = question.description.text;
}

function endQuiz() {
    clearInterval(timer);
    const finalScore = document.getElementById('coin-count').textContent;
    document.getElementById('final-score').textContent = finalScore;
    
    // Hide quiz container and show completion screen
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-complete').style.display = 'block';
}

function playAgain() {
    // Reset game state
    currentQuestion = 0;
    document.getElementById('coin-count').textContent = '0';
    timeLeft = 30;
    
    // Hide completion screen and show quiz
    document.getElementById('quiz-complete').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    
    // Start the quiz
    loadQuestion();
    startTimer();
}