// script.js

let quizzes = [];
let currentQuiz = {};

// Event listeners for forms
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    createQuiz();
});

// Show or hide different sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Add a question to the quiz creation form
function addQuestion() {
    const container = document.getElementById('questionsContainer');
    const questionCount = container.children.length;

    const questionTemplate = `
        <div class="question-block">
            <label for="question-${questionCount}">Question ${questionCount + 1}:</label>
            <input type="text" id="question-${questionCount}" placeholder="Enter question text" required>
            <div>
                <label>Answer 1:</label>
                <input type="text" id="answer-${questionCount}-0" required>
            </div>
            <div>
                <label>Answer 2:</label>
                <input type="text" id="answer-${questionCount}-1" required>
            </div>
            <div>
                <label>Answer 3:</label>
                <input type="text" id="answer-${questionCount}-2" required>
            </div>
            <label>Correct Answer (1, 2, or 3):</label>
            <input type="number" id="correct-answer-${questionCount}" min="1" max="3" required>
        </div>
    `;
    container.innerHTML += questionTemplate;
}

// Create a new quiz
function createQuiz() {
    const title = document.getElementById('quizTitle').value;
    const questionElements = document.querySelectorAll('.question-block');
    const quizQuestions = [];

    questionElements.forEach((element, index) => {
        const questionText = element.querySelector(`#question-${index}`).value;
        const answers = [
            element.querySelector(`#answer-${index}-0`).value,
            element.querySelector(`#answer-${index}-1`).value,
            element.querySelector(`#answer-${index}-2`).value
        ];
        const correctAnswer = element.querySelector(`#correct-answer-${index}`).value;

        quizQuestions.push({ questionText, answers, correctAnswer });
    });

    const quiz = { title, questions: quizQuestions };
    quizzes.push(quiz);

    alert('Quiz Created Successfully!');
    document.getElementById('quizForm').reset();
    displayQuizList();
}

// Display list of quizzes
function displayQuizList() {
    const quizList = document.getElementById('quizList');
    quizList.innerHTML = '';
    
    quizzes.forEach((quiz, index) => {
        const quizItem = `<li><a href="#" onclick="takeQuiz(${index})">${quiz.title}</a></li>`;
        quizList.innerHTML += quizItem;
    });
}

// Take quiz function
function takeQuiz(quizIndex) {
    currentQuiz = quizzes[quizIndex];
    document.getElementById('quizTitleDisplay').innerText = currentQuiz.title;

    const quizQuestionsDiv = document.getElementById('quizQuestions');
    quizQuestionsDiv.innerHTML = '';
    
    currentQuiz.questions.forEach((question, index) => {
        let questionHTML = `
            <p>${question.questionText}</p>
            <label><input type="radio" name="question-${index}" value="1">${question.answers[0]}</label><br>
            <label><input type="radio" name="question-${index}" value="2">${question.answers[1]}</label><br>
            <label><input type="radio" name="question-${index}" value="3">${question.answers[2]}</label><br>
        `;
        quizQuestionsDiv.innerHTML += questionHTML;
    });

    showSection('take-quiz');
}

// Submit quiz function
function submitQuiz() {
    let score = 0;
    const totalQuestions = currentQuiz.questions.length;
    const quizAnswersDiv = document.getElementById('quizAnswers');
    quizAnswersDiv.innerHTML = '';

    currentQuiz.questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        const correctAnswer = question.correctAnswer;
        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            score++;
            quizAnswersDiv.innerHTML += `<li>Question ${index + 1}: Correct</li>`;
        } else {
            quizAnswersDiv.innerHTML += `<li>Question ${index + 1}: Incorrect (Correct Answer: ${question.answers[correctAnswer - 1]})</li>`;
        }
    });

    document.getElementById('quizScore').innerText = `Your Score: ${score}/${totalQuestions}`;
    showSection('quiz-results');
}
