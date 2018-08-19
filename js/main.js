//selecting elements
const up = document.getElementById("up_button");
const right = document.getElementById("right_button");
const down = document.getElementById("down_button");
const left = document.getElementById("left_button");
const b = document.getElementById("b");
const a = document.getElementById("a");
const screen = document.getElementById("screen");
const test = document.getElementById("test_display");

let colorIndex = 0;
const color = ["cyan", "blue", "magenta", "gray", "green", "yellow", "red"];
const gameBoard = {
  row1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row11: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row12: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row13: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row14: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row15: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row16: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row17: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row18: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row19: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  row20: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  inUse: [],
  moveableBlock: []
}

//define functions
function createPiece(type) {
  if (type === "block") {
    if (!checkAvailability(5, 1)) {
      const block = updateBoard(5, 1, 1);
      gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
      renderBoard();
    }
  }
}

function moveBlock(direction) {
  gameBoard.moveableBlock.forEach(function (block) {
    if (direction === "down") {
      if (checkAvailability(block.x, block.y + 1)) {
        gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
        return createPiece("block");
      }
      if (!checkAvailability(block.x, block.y + 1)) {
        updateBoard(block.x, block.y, 0);
        gameBoard.inUse.splice(block.index, 1);
        gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
        updateBoard(block.x, block.y + 1, 1);
        if (block.y === 19) {
          return createPiece("block");
        }
        if (block.y < 19) {
          block.y = block.y + 1;
          try {
            gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    if (direction === "right") {
      if (block.x < 10) {
        updateBoard(block.x, block.y, 0);
        gameBoard.inUse.splice(block.index, 1);
        gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
        updateBoard(block.x+1, block.y, 1);
        block.x++;
        gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
      }
    }
    if (direction === "left") {
      if (block.x > 1) {
        updateBoard(block.x, block.y, 0);
        gameBoard.inUse.splice(block.index, 1);
        gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
        updateBoard(block.x-1, block.y, 1);
        block.x--;
        gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
      }
    }
  });
}

function checkAvailability(x, y) {
  return (gameBoard[`row${y}`][x - 1] === 1) ? true : false;
}

function updateBoard(x, y, fill) {
  gameBoard[`row${y}`][x - 1] = fill;
  if (fill) {
    const blockObject = { x, y, color: color[colorIndex] };
    gameBoard.inUse.push(blockObject);
    gameBoard.inUse[gameBoard.inUse.length - 1].index = gameBoard.inUse.length - 1;
    return blockObject
  }
}

function clearBoard() {
  for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < 10; j++)
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = "white";
  }
}

function renderBoard() {
  clearBoard();
  gameBoard.inUse.forEach(function (piece) {
    document.querySelector(`#row${piece.y}`).querySelectorAll(".col")[piece.x - 1].style.backgroundColor = piece.color
  })
}

function keyboardControl(e){
  if(e.key === "ArrowDown"){
    moveBlock("down");
    renderBoard();
  }
  if(e.key === "ArrowLeft"){
    moveBlock("left");
    renderBoard();
  }
  if(e.key === "ArrowRight"){
    moveBlock("right");
    renderBoard();
  }
  if(e.key === "a"){
    // moveBlock("right");
    // renderBoard();
  }
  if(e.key === "z"){
    // moveBlock("right");
    // renderBoard();
  }
}

function gameStart(){
  createPiece("block")
  const render = setInterval(function () {
    moveBlock("down");
    renderBoard();
  }, 1200)
  
}

//addEventlisteners and call functions
down.addEventListener("click", e => {
  moveBlock("down");
  renderBoard();
})
left.addEventListener("click", e => {
  moveBlock("left");
  renderBoard();
})
right.addEventListener("click", e => {
  moveBlock("right");
  renderBoard();
})
// a.addEventListener("click", displayTest)
// b.addEventListener("click", displayTest)

document.addEventListener("keydown", keyboardControl)
gameStart();


