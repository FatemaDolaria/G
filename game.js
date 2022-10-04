fetch("https://opentdb.com/api.php?amount=10")
.then((response)=>{
    return response.json();
})
.then((data)=>{
    console.log(data);
    for (i=0; i<10; i++){
        console.log(data.results[i].question);
    }
    let questions = []
    for (i=0; i<10; i++){
        if (data.results[i].type == 'multiple'){
            questions.push({q:data.results[i].question, c1:data.results[i].correct_answer, c2:data.results[i].incorrect_answers[0], c3:data.results[i].incorrect_answers[1], c4:data.results[i].incorrect_answers[2]})
            document.getElementById('progressText').innerHTML = questions[i].q
            document.getElementById('A').innerHTML = questions[i].c1
            document.getElementById('B').innerHTML = questions[i].c2
            document.getElementById('C').innerHTML = questions[i].c3
            document.getElementById('D').innerHTML = questions[i].c4
        }
        else if (data.results[i].type == 'boolean'){
            questions.push({q:data.results[i].question, c1:data.results[i].correct_answer, c2:data.results[i].incorrect_answers})    
        
        document.getElementById('progressText').innerHTML = questions[i].q
        document.getElementById('A').innerHTML = questions[i].c1
        document.getElementById('progressText').innerHTML = questions[i].c2
        }

    }
 
})
    


const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


var SCORE_POINTS = 100
const MAX_QUESTIONS = 10

incrementScore = num => {
    score +=num
    scoreText.InnerText = score
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.InnerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.InnerText = currentQuestion['choice + number']
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()}, 1000)

    })
})

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

startGame()