//selecting elements
const up = document.getElementById("up_button");
const right = document.getElementById("right_button");
const down = document.getElementById("down_button");
const left = document.getElementById("left_button");
const b = document.getElementById("b");
const a = document.getElementById("a");
const screen = document.getElementById("screen");
const test = document.getElementById("test_display");

//helps set which color should be used for the newly created block. Will be updated later on
let colorIndex = 0;
//Array that holds the colors for the newly created blocks
const color = ["cyan", "blue", "magenta", "gray", "green", "yellow", "red"];
//This is the game board that holds all the information that needed to be updated to be rendered.
const gameBoard = {
  //Each row holds an array that switches its elements values between 1 and 0 so the game knows what needs to be rendered and what doesn't
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
  //The is a short hand itterable to streamline what needs to rendered instead of having to search through every row for "1"'s to help with optimization. This also holds the color it should be rendered as
  inUse: [],
  //This array holds all the blocks that are playable and as the input is taken they will be moved
  moveableBlock: []
}

//define functions
//This function creates a new Piece. Currently in the version just a block
function createPiece(type) {
  if (type === "block") {
    if (!checkAvailability(5, 1)) {
      //if the space provided is empty, put the newly created block (using the updateBoard function) at the current location
      const block = updateBoard(5, 1, 1);
      //add an object that tracks the newly created piece to the moveableBlock array
      gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
      renderBoard();
    }
  }
}
//moveBlock function tracks when an input is passed in and moves the piece accordingly 
function moveBlock(direction) {
  //loop over the moveableBlock array to move each block based on direction
  gameBoard.moveableBlock.forEach(function (block) {
    if (direction === "down") {
      if (checkAvailability(block.x, block.y + 1)) {
        //If space below is occupied remove from the moveableBlock array and go to the next
        gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
        return createPiece("block");
      }
      if (!checkAvailability(block.x, block.y + 1)) {
        //If there is a space below, remove the old position and add the new position using updateBoard
        updateBoard(block.x, block.y, 0);
        gameBoard.inUse.splice(block.index, 1);
        gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
        updateBoard(block.x, block.y + 1, 1);
        //If the block is at the end create a new piece
        if (block.y === 19) {
          return createPiece("block");
        }
        //if it isn't at the end of the screen increase by one and add to the new position to the moveableBlock array
        if (block.y < 19) {
          block.y = block.y + 1;
          gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
        }
      }
    }
    //When you press the right button (or the right arrow key) move the block to the right
    if (direction === "right") {
      if (block.x < 10) {
        if (!checkAvailability(block.x + 1, block.y)) {
          updateBoard(block.x, block.y, 0);
          gameBoard.inUse.splice(block.index, 1);
          gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
          updateBoard(block.x + 1, block.y, 1);
          block.x++;
          gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
        }
      }
    }
    //When you press the left button (or the left arrow key) move the block to the left
    if (direction === "left") {
      if (block.x > 1) {
        if (!checkAvailability(block.x - 1, block.y)) {
          updateBoard(block.x, block.y, 0);
          gameBoard.inUse.splice(block.index, 1);
          gameBoard.moveableBlock.splice(gameBoard.moveableBlock.indexOf(block), 1);
          updateBoard(block.x - 1, block.y, 1);
          block.x--;
          gameBoard.moveableBlock.push({ x: block.x, y: block.y, index: block.index });
        }
      }
    }
  });
}

//Checks if a space is available
function checkAvailability(x, y) {
  return (gameBoard[`row${y}`][x - 1] === 1) ? true : false;
}
//updates block to new position
function updateBoard(x, y, fill) {
  gameBoard[`row${y}`][x - 1] = fill;
  if (fill) {
    const blockObject = { x, y, color: color[colorIndex] };
    gameBoard.inUse.push(blockObject);
    gameBoard.inUse[gameBoard.inUse.length - 1].index = gameBoard.inUse.length - 1;
    return blockObject
  }
}
//cleans the board
function clearBoard() {
  for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < 10; j++){
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = "white";
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid white";
    }
  }
}
//re renders the board
function renderBoard() {
  clearBoard();
  gameBoard.inUse.forEach(function (piece) {
    document.querySelector(`#row${piece.y}`).querySelectorAll(".col")[piece.x - 1].style.backgroundColor = piece.color
    document.querySelector(`#row${piece.y}`).querySelectorAll(".col")[piece.x - 1].style.border = "1px solid black";
  })
}

//function used to allow functionality to keyboard
function keyboardControl(e) {
  if (e.key === "ArrowDown") {
    moveBlock("down");
    renderBoard();
  }
  if (e.key === "ArrowLeft") {
    moveBlock("left");
    renderBoard();
  }
  if (e.key === "ArrowRight") {
    moveBlock("right");
    renderBoard();
  }
  if (e.key === "a") {
    // moveBlock("right");
    // renderBoard();
  }
  if (e.key === "z") {
    // moveBlock("right");
    // renderBoard();
  }
}

//where the game starts
function gameStart() {
  createPiece("block")
  const render = setInterval(function () {
    moveBlock("down");
    renderBoard();
  }, 1200)

}

//addEventlisteners and call functions
//eventlisteners for the buttons created to emulate gameboard
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


