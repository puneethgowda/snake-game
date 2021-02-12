import {SNAKE_INTERVAL, update as updateSnake, print as printSnake, getSnakeHead, snakeIntersection} from "./snake.js"
import {update as updateFood, print as printFood} from "./food.js"
import {outsideGrid} from "./grid.js"



let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board")

function main(timestamp){
    if(gameOver){
        return  alert("you lose")
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (timestamp - lastRenderTime) / 1000;
    if(secondsSinceLastRender < (1 / SNAKE_INTERVAL)) return
    lastRenderTime = timestamp;

    update();
    print()
}

window.requestAnimationFrame(main);


function update(){
    updateSnake();
    updateFood();
    checkDeath()
}


function print(){
    gameBoard.innerHTML = ""
    printSnake(gameBoard);
    printFood(gameBoard)
}


function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}