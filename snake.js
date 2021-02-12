import { getInputDirection } from "./input.js";

export const SNAKE_INTERVAL = 2;
const snakeBody = [{x: 11, y: 11, rotate: 0}];
let newSegments = 0;


export function update(){
    addSegments()
    const inputDirection = getInputDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    rotateHead(inputDirection)
}


export function print(gameBoard){
    snakeBody.forEach((segment, i)=>{
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if(i === 0){
            snakeElement.classList.add("snake-head");
            snakeElement.style.transform = `rotate(${segment.rotate}deg)`;
        }else{
            snakeElement.classList.add("snake");
        }
        
        gameBoard.appendChild(snakeElement);
    })
}

function rotateHead(currentDirection){
    if(currentDirection.x === 1){
        snakeBody[0].rotate = 270
    }else if(currentDirection.x === -1){
        snakeBody[0].rotate = 90
    }else if(currentDirection.y === -1){
        snakeBody[0].rotate = 180
    }else if(currentDirection.y === 1){
        snakeBody[0].rotate = 0
    }
}


export function expandSnake(amount){
    newSegments +=amount;
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true})
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return equalPositions(segment, position)
    })
  }


function equalPositions(pos1={}, pos2={}){
    return pos1.x === pos2.x && pos1.y === pos2.y
}


function addSegments(){
    for(let i = 0; i< newSegments; i++){ 
        snakeBody.push({...snakeBody[snakeBody.length - 1]} )
    }
    newSegments = 0
}

