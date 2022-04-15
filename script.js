function onClick(event)
{
    const box = event.currentTarget;
    const checkBox = box.querySelector('.checkbox');
    checkBox.src = './images/checked.png';
    
    const boxes = document.querySelectorAll('.choice-grid div');
    for (const box_ of boxes) {
        const checkBox = box_.querySelector('.checkbox');
        if (box_.dataset.questionId === box.dataset.questionId) {
            if (box_.dataset.choiceId !== box.dataset.choiceId) {
                box_.classList.add('opacity');
                box_.classList.remove('selected');
                checkBox.src = './images/unchecked.png';
                setRestartButton();
            } else {
                box_.classList.remove('opacity');
                box_.classList.add('selected');
                checkBox.src = './images/checked.png';
                setAnswer(box_);
            }
        }
    }

    checkIfComplete();
}

function setAnswer(box)
{
    switch (box.dataset.questionId) {
        case 'one':
            selectedBox[0] = box;
            break;
        case 'two':
            selectedBox[1] = box;
            break;
        case 'three':
            selectedBox[2] = box;
            break;
    }
}

function setRestartButton()
{
    const answer = document.querySelector('.answer');
    const button = document.querySelector('button');
    answer.classList.remove('hidden');
    button.classList.remove('hidden');
}

function checkIfComplete()
{
    const answer = document.querySelector('.answer div');
    let ii = 0;
    for (const box of selectedBox) {
        if (box !== undefined) {
            ii++;
        }
    }
    if (ii == 3) {
        for (const box of boxes) {
            box.removeEventListener('click', onClick);
        }
        answer.classList.remove('hidden');
        showAnswer();
    }
}

function buttonClick()
{
    for (const box of boxes) {
        box.classList.remove('opacity');
        box.classList.remove('selected');
        const checkBox = box.querySelector('.checkbox');
        checkBox.src = './images/unchecked.png';
        box.addEventListener('click', onClick);
    }
    selectedBox.splice(0, 3);
    const answerBox = document.querySelector('.answer');
    const answer = document.querySelector('.answer div');
    const button = document.querySelector('button');
    answerBox.classList.add('hidden');
    answer.classList.add('hidden');
    button.classList.add('hidden');
}

function showAnswer()
{
    let ii;
    let max = 0;
    let choiceId = selectedBox[0].dataset.choiceId;
    for (const box1 of selectedBox) {
        ii = 0;
        for (const box2 of selectedBox) {
            if (box1.dataset.choiceId === box2.dataset.choiceId) {
                ii++;
            }
        }
        if (ii > max) {
            max = ii;
            choiceId = box1.dataset.choiceId;
        }
    }
    const title = document.querySelector('.answer h1');
    const contents = document.querySelector('.answer p');
    title.textContent = RESULTS_MAP[choiceId].title;
    contents.textContent = RESULTS_MAP[choiceId].contents;
}

const selectedBox = [];
const boxes = document.querySelectorAll('.choice-grid div');
const button = document.querySelector('button');

for (const box of boxes) {
    box.addEventListener('click', onClick);
}

button.addEventListener('click', buttonClick);