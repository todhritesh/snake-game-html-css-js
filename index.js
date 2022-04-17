let inputDir = {
    x: 0,
    y: 0
};
const speed = 7;
let lastPaintTime = 0
let snakeArray = [{
    x: 12,
    y: 12
}, ]
let food = {
    x: 2,
    y: 13
}
let score = 0;
let scoreBox = document.querySelector(".score");
const success = new Audio('./audio/success.mp3')
const failure = new Audio('./audio/failure.mp3')
const game_music = new Audio('./audio/game-music.mp3')

//game logic
const main = (curr_time) => {
    requestAnimationFrame(main)
    if ((curr_time - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = curr_time;

    gameEngine();
}

function isCollide(arr) {
    //collision with body
    for (let i = 1; i < snakeArray.length; i++) {
        if (arr[i].x === arr[0].x && arr[i].y === arr[0].y) {
            return true
        }
    }

    //collision with wall
    if (arr[0].x > 20 || arr[0].x < 0 || arr[0].y > 25 || arr[0].y < 0) {
        return true;
    }
}

function gameEngine() {
    // update
    //if collide
    if (isCollide(snakeArray)) {
        game_music.pause()
        failure.play()
        inputDir = {
            x: 0,
            y: 0
        };
        alert('game over');
        snakeArray = [{
            x: 12,
            y: 12
        }]
        score = 0;
        scoreBox.innerHTML = score
    }

    //if eaten food 
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        success.play();
        score += 1;
        scoreBox.innerHTML = score
        snakeArray.unshift({
            x: snakeArray[0].x + inputDir.x,
            y: snakeArray[0].y + inputDir.y
        })

        let a = 2;
        let b = 19;

        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };

    }

    //moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = {
            ...snakeArray[i]
        };
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;



    //render
    //render snake
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = "";
    snakeArray.forEach((item, i) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = item.y;
        snakeElement.style.gridColumnStart = item.x;
        if (i === 0) {
            snakeElement.classList.add('bg-danger', 'border-danger', 'rounded-3');
        } else {
            snakeElement.classList.add('bg-dark', 'rounded-circle');
        }
        gameBoard.appendChild(snakeElement);
    })

    // render food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('bg-warning', 'rounded-circle');
    gameBoard.appendChild(foodElement);

}

// game logic
requestAnimationFrame(main)
addEventListener('keydown', (e) => {
    game_music.play()
    inputDir = {
        x: 0,
        y: 1
    }
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp")
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;
        default:
            break;
    }
})