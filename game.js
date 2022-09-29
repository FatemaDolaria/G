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
    
    /*let q0 = data.results[0].question;
    let q1 = data.results[1].question;
    let q2 = data.results[2].question;
    let q3 = data.results[3].question;
    let q4 = data.results[4].question;
    let q5 = data.results[5].question;
    let q6 = data.results[6].question;
    let q7 = data.results[7].question;
    let q8 = data.results[8].question;
    let q9 = data.results[9].question;

    let c_a1 = data.results[0].correct_answer;

    let ic_a11 = data.results[0].incorrect_answers[1];
    let ic_a12 = data.results[0].incorrect_answers[2];
    let ic_a13 = data.results[0].incorrect_answers[3]; */


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


/*let questions = [
    {
        question: 'q',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5', 
        answer: '2',
    },
    {
        // question: q1,
        // choice1: c_a1,
        // choice2: ic_a11,
        // choice3: ic_a12,
        // choice4: ic_a13, 
        // answer: c_a1,
    },
    {
        question: 'q2',
        choice1: 'c_a1',
        choice2: 'ic_a11',
        choice3: 'ic_a12',
        choice4: 'ic_a13', 
        answer: 'c_a1',
    },
    {
        question: 'q1',
        choice1: 'c_a1',
        choice2: 'ic_a11',
        choice3: 'ic_a12',
        choice4: 'ic_a13', 
        answer: 'c_a1',
    },
    {
        question: 'q3',
        choice1: 'c_a1',
        choice2: 'ic_a11',
        choice3: 'ic_a12',
        choice4: 'ic_a13', 
        answer: 'c_a1',
    } 
]*/

var SCORE_POINTS = 100
const MAX_QUESTIONS = 4

incrementScore = num => {
    score +=num
    scoreText.InnerText = scoreText
}

getNewQuestion = () => {
    if (availableQuestions.length===0 || questionCounter>MAX_QUESTIONS) {
        localStorage.setitem('mostRecentScore', score)

        return window.location.assign('/end.html')
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