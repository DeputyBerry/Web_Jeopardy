// Initialize the gameboard on page load

buildCategories()
initCatRow()
initBoard()

document.querySelector('button').addEventListener('click', buildCategories)


function initCatRow(){
    let catRow = document.getElementById('category-row')

    for (let i = 0; i < 6; i++){
        let box = document.createElement('div')
        box.className = ' clue-box category-box'
        catRow.appendChild(box)
    }
}

function initBoard() {
    let board = document.getElementById('game-container')

    // generate 5 rows, then place 6 boxes in each row

    for (let i = 0; i < 5; i++){
        let row = document.createElement('div')
        let boxValue = 200 * (i + 1)
        row.className = 'clue-row'

        for (let j = 0; j < 6; j++){
            let box = document.createElement('div')
            box.className = 'clue-box'
            box.textContent = '$' + boxValue
            // backwards compatible -- box.appendChild(document.createTextNode(boxvalue) )
            box.addEventListener('click', getClue, false)
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function randInt(){
    return Math.floor(Math.random() * (18418) + 1)
}

let catArr = []


function buildCategories(){
    const fetchReq1 = fetch(`https://jservice.io/api/category?&id=${randInt()}`
    ).then(res => res.json())
    const fetchReq2 = fetch(`https://jservice.io/api/category?&id=${randInt()}`
    ).then(res => res.json())
    const fetchReq3 = fetch(`https://jservice.io/api/category?&id=${randInt()}`
    ).then(res => res.json())
    const fetchReq4 = fetch(`https://jservice.io/api/category?&id=${randInt()}`
    ).then(res => res.json())
    const fetchReq5 = fetch(`https://jservice.io/api/category?&id=${randInt()}`
    ).then(res => res.json())
    const fetchReq6 = fetch(`https://jservice.io/api/category?&id=${randInt()}`
    ).then(res => res.json())

    const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6])
    .then(data => {
        console.log(data)
        // setting global variable to returned data
        catArr = data
        setCategories(catArr)
    })
}



function setCategories(catArr){
    let element = document.getElementById('category-row')
    let children = element.children
    for (let i = 0; i < children.length; i++){
        children[i].textContent = catArr[i].title
    }
}

function getClue(e){
    let child = e.currentTarget
    child.classList.add('clicked-box')
    let boxValue = child.innerHTML.slice(1)
    let parent = child.parentNode
    console.log(boxValue)
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
    let cluesList = catArr[index].clues
    let clue = cluesList.find(obj => {
        return obj.value == boxValue
    })
    console.log(clue)
    showQuestion(clue, child, boxValue)
}

function showQuestion(clue, target, boxValue){
    let userAnswer = prompt(clue.question).toLowerCase()
    let correctAnswer = clue.answer.toLowerCase().replace(/<[^>]*>/g, '')
    let possiblePoints = +(boxValue.slice(1))
    target.innerHTML = clue.answer
    target.removeEventListener('click', getClue, false)
}