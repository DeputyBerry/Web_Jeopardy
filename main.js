// INITIALIZE GAME BOARD ON LOAD

initBoard();

function initBoard(){
    let board = document.getElementById('clue-board');

    // GENERATE 5 ROWS, THEN NEST 6 BOXES IN EACH ROW

    for(let i = 0; i < 5; i++){
        let row = document.createElement('div');
        let boxValue = 200 * (i + 1);
        row.className = 'clue-row';

        for(let j = 0; j < 6; j++){
            let box = document.createElement('div');
            box.className = 'clue-box';
            box.innerHTML = '$' + boxValue;
            // box.appendChild(document.createTextNode('$' + boxValue));
            box.addEventListener('click', getClue, false)
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}

function getClue() {
    console.log('cheeks clapped...')
}