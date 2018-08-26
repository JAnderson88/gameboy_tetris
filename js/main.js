//selecting elements
const up = document.getElementById("up_button");
const right = document.getElementById("right_button");
const down = document.getElementById("down_button");
const left = document.getElementById("left_button");
const b = document.getElementById("b");
const a = document.getElementById("a");
const screen = document.getElementById("screen");
const test = document.getElementById("test_display");

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
  //This array holds all the blocks that are playable and as the input is taken they will be moved
  moveableBlock: {}
}

//Below is the resources to make the blocks a different color
//ColorIndex sets the index in the color array
let colorIndex = 0;
//The color array holds all the possible colors
const colorArray = ["cyan", "blue", "magenta", "gray", "green", "yellow", "red"]

//colorBoard is similar to gameBoard and I think you can take a guess what it does if you undestand what gameBoard is for. You should by now.
const colorBoard = {
  row1: ["white","white","white","white","white","white","white","white","white","white"],
  row2: ["white","white","white","white","white","white","white","white","white","white"],
  row3: ["white","white","white","white","white","white","white","white","white","white"],
  row4: ["white","white","white","white","white","white","white","white","white","white"],
  row5: ["white","white","white","white","white","white","white","white","white","white"],
  row6: ["white","white","white","white","white","white","white","white","white","white"],
  row7: ["white","white","white","white","white","white","white","white","white","white"],
  row8: ["white","white","white","white","white","white","white","white","white","white"],
  row9: ["white","white","white","white","white","white","white","white","white","white"],
  row10: ["white","white","white","white","white","white","white","white","white","white"],
  row11: ["white","white","white","white","white","white","white","white","white","white"],
  row12: ["white","white","white","white","white","white","white","white","white","white"],
  row13: ["white","white","white","white","white","white","white","white","white","white"],
  row14: ["white","white","white","white","white","white","white","white","white","white"],
  row15: ["white","white","white","white","white","white","white","white","white","white"],
  row16: ["white","white","white","white","white","white","white","white","white","white"],
  row17: ["white","white","white","white","white","white","white","white","white","white"],
  row18: ["white","white","white","white","white","white","white","white","white","white"],
  row19: ["white","white","white","white","white","white","white","white","white","white"],
  row20: ["white","white","white","white","white","white","white","white","white","white"]
} 

/*This object contains the context of each piece. Inside you will have the following: 
  --Block type
  --Orientation
  --Width of coresponding orientation
  --Height of coresponding orientation
  --An array to understand which positions to draw
  --A check object that contains which positions to check depending on the which direction you want to move
*/
const piece = {
  sq_block: {
    default: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 2,
      draw: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [{ x: 2, y: -1 }, { x: 2, y: 0 }],
        left: [{ x: -1, y: -1 }, { x: -1, y: 0 }]
      }
    }
  },
  i_block: {
    long: {
      startX: 5,
      startY: 1,
      height: 1,
      width: 4,
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
        right: [{ x: 4, y: 0 }],
        left: [{ x: -1, y: 0 }],
      }
    },
    tall: {
      startX: 5,
      startY: 4,
      height: 4,
      width: 1,
      draw: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }],
      check: {
        down: [{ x: 0, y: 1 }],
        right: [{ x: 1, y: -3 }, { x: 1, y: -2 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
        left: [{ x: -1, y: -3 }, { x: -1, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 0 }],
      }
    }
  },
  t_block: {
    north: {
      startX: 4,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [{ x: 2, y: -1 }, { x: 3, y: 0 }],
        left: [{ x: 0, y: -1 }, { x: -1, y: 0 }],
      }
    },
    east: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 1, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
        right: [{ x: 2, y: -1 }, { x: 1, y: -2 }, { x: 1, y: 0 }],
        left: [{ x: -1, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 0 }],
      }
    },
    south: {
      startX: 4,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 1, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }],
      check: {
        down: [{ x: 1, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 0 }],
        right: [{ x: 3, y: 0 }, { x: 3, y: -1 }],
        left: [{ x: 0, y: 0 }, { x: -1, y: -1 }],
      }
    },
    west: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: -2 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 2, y: -2 }],
        left: [{ x: -1, y: -1 }, { x: 0, y: 0 }, { x: 0, y: -2 }],
      }
    },
  },
  s_left: {
    east: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 2, y: -1 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
        right: [{ x: 2, y: 0 }, { x: 3, y: -1 }],
        left: [{ x: -1, y: 0 }, { x: 0, y: -1 }],
      }
    },
    north: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [{ x: 1, y: -2 }, { x: 2, y: -1 }, { x: 2, y: 0 }],
        left: [{ x: -1, y: -2 }, { x: -1, y: -1 }, { x: 0, y: 0 }],
      }
    }
  },
  s_right: {
    west: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [{ x: 2, y: -1 }, { x: 3, y: 0 }],
        left: [{ x: -1, y: -1 }, { x: 0, y: 0 }],
      }
    },
    south: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 1, y: -2 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 0 }],
        right: [{ x: 2, y: -2 }, { x: 2, y: -1 }, { x: 1, y: 0 }],
        left: [{ x: 0, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 0 }],
      }
    }
  },
  l_left: {
    north: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [{ x: 1, y: -1 }, { x: 3, y: 0 }],
        left: [{ x: -1, y: -1 }, { x: -1, y: 0 }],
      }
    },
    east: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 1, y: -2 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 1, y: -1 }, { x: 0, y: 1 }],
        right: [{ x: 2, y: -2 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
        left: [{ x: -1, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 0 }],
      }
    },
    south: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }],
      check: {
        down: [{ x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
        right: [{ x: 3, y: 0 }, { x: 3, y: -1 }],
        left: [{ x: 1, y: 0 }, { x: -1, y: -1 }],
      }
    },
    west: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: -2 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 2, y: -2 }],
        left: [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }],
      }
    },
  },
  l_right: {
    north: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 2, y: -1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
        right: [{ x: 3, y: 0 }, { x: 3, y: -1 }],
        left: [{ x: 1, y: -1 }, { x: -1, y: 0 }],
      }
    },
    east: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [{ x: 1, y: -2 }, { x: 1, y: -1 }, { x: 2, y: 0 }],
        left: [{ x: -1, y: -2 }, { x: -1, y: -1 }, { x: -1, y: 0 }],
      }
    },
    south: {
      startX: 5,
      startY: 2,
      height: 2,
      width: 3,
      draw: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
        right: [{ x: 1, y: 0 }, { x: 3, y: -1 }],
        left: [{ x: -1, y: 0 }, { x: -1, y: -1 }],
      }
    },
    west: {
      startX: 5,
      startY: 3,
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -2 }, { x: 1, y: -2 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: -1 }, { x: 1, y: 1 }],
        right: [{ x: 2, y: -2 }, { x: 2, y: -1 }, { x: 2, y: 0 }],
        left: [{ x: -1, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      }
    }
  }
}

let points = 0;

//define functions
//This function creates a new Piece. Currently in this version, its just a block
function createPiece(type, orientation, startX, startY) {
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: { x: startX, y: startY },
        //We reference both colorArray and colorIndex to set the moveable blocks color
        color: colorArray[colorIndex],
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
}

function movePiece(direction) {
  const width = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].width;
  const availables = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].check[direction]
  let passable;
  for (let i = 0; i < availables.length; i++) {
    passable = checkAvailability(gameBoard.moveableBlock.baseline.x + availables[i].x, gameBoard.moveableBlock.baseline.y + availables[i].y);
    if (!passable) break;
  }
  if (direction === "down") {
    if (!passable) {
      updateBoard(1);
      removeRows();
      const { type, orientation, startX, startY } = getRandomPiece();
      //Increment the colorIndex to change colors
      colorIndex = (colorIndex >= colorArray.length -1) ? 0 : colorIndex + 1;
      return createPiece(type, orientation, startX, startY)
    }
    if (gameBoard.moveableBlock.baseline.y < 20) {
      updateBoard(0);
      gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x, y: gameBoard.moveableBlock.baseline.y + 1 }
      updateBoard(1);
      renderBoard();
      if (gameBoard.moveableBlock.baseline.y === 20) {
        removeRows();
        const { type, orientation, startX, startY } = getRandomPiece();
        colorIndex = (colorIndex >= colorArray.length -1) ? 0 : colorIndex + 1;
        return createPiece(type, orientation, startX, startY)
      }
    }
  }
  if (direction === "right") {
    if (gameBoard.moveableBlock.baseline.x + width > 10) return;
    if (!passable) return;
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x + 1, y: gameBoard.moveableBlock.baseline.y };
    updateBoard(1);
    renderBoard();
  }
  if (direction === "left") {
    if (gameBoard.moveableBlock.baseline.x === 1) return;
    if (!passable) return;
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x - 1, y: gameBoard.moveableBlock.baseline.y };
    updateBoard(1);
    renderBoard();
  }
}

//Checks if a space is available
function checkAvailability(x, y) {
  return (gameBoard[`row${y}`][x - 1] === 1) ? false : true;
}

//updates block to new position
function updateBoard(fill) {
  const bx = gameBoard.moveableBlock.baseline.x
  const by = gameBoard.moveableBlock.baseline.y
  piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].draw.forEach(block => {
    gameBoard[`row${by + block.y}`][bx + block.x - 1] = fill
    if(fill === 0){
      colorBoard[`row${by + block.y}`][bx + block.x - 1] = "white";
    }
    if(fill === 1){
      colorBoard[`row${by + block.y}`][bx + block.x - 1] = gameBoard.moveableBlock.color;
    }
  })
}

//renders the board
function renderBoard() {
  for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < 10; j++) {
      //clear drawing
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = "white";
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid white";
      if (gameBoard[`row${i}`][j]) {
        //re-renders
        document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = colorBoard[`row${i}`][j];
        document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid black";
      }
    }
  }
}

//function to rotate the piece
function rotatePiece() {
  const orientations = Object.keys(piece[gameBoard.moveableBlock.type]);
  let index = orientations.indexOf(gameBoard.moveableBlock.orientation);
  index = (index >= orientations.length - 1) ? 0 : index + 1;
  const availables = piece[gameBoard.moveableBlock.type][orientations[index]].draw
  let passable;
  for (let i = 0; i < availables.length; i++) {
    passable = checkAvailability(gameBoard.moveableBlock.baseline.x + availables[i].x, gameBoard.moveableBlock.baseline.y + availables[i].y);
    if (!passable) break;
  }
  if (passable) { return; }
  updateBoard(0);
  gameBoard.moveableBlock.orientation = orientations[index];
  if (gameBoard.moveableBlock.baseline.y < piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].height) {
    gameBoard.moveableBlock.baseline.y = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].height
  }
  if (gameBoard.moveableBlock.baseline.x + piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].width > 10) {
    gameBoard.moveableBlock.baseline.x--;
  }
  updateBoard(1);
  renderBoard();
}

function getRandomPiece() {
  const types = Object.keys(piece)
  const type = Math.floor(Math.random() * types.length)
  const orientations = Object.keys(piece[types[type]])
  const orientation = Math.floor(Math.random() * orientations.length)
  return {
    type: types[type],
    orientation: orientations[orientation],
    startX: piece[types[type]][orientations[orientation]].startX,
    startY: piece[types[type]][orientations[orientation]].startY
  }
}

//function  to remove arrow when get them all in a line
function removeRows() {
  const rows = Object.keys(gameBoard).slice(0, Object.keys(gameBoard).length - 1);
  const empty = [];
  let temp = [];
  let lines = 0;
  for (let i = 1; i < rows.length; i++) {
    const row = gameBoard[rows[i]].reduce((a, b) => {
      return a += b;
    });
    if (row === 10) {
      lines++
      for (let j = i; j > 1; j--) {
        gameBoard[rows[j]] = [].concat(temp[j - 2]);
      }
      i = 0;
      temp = [].concat(empty);
      continue;
    }
    temp.push(gameBoard[rows[i]])
  }
  scorePoints(lines);
  console.log(points);
}

//How to score points
// 1 Line = 50*(level + 1) points
// 2 Lines = 150*(level + 1) points
// 3 Lines = 350*(level + 1) points
// 4 Lines = 1000*(level + 1) points (aka a Tetris)
function scorePoints(line) {
  if (line === 1) {
    points += 100;
  }
  if (line === 2) {
    points += 300;
  }
  if (line === 3) {
    points += 700;
  }
  if (line === 4) {
    points += 2000;
  }
}

//This function forces the moveable blocks down to the last available blocks
function gravityDrop() {
  updateBoard(0);
  let check = false
  let passable;
  while (!check) {
    const availables = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].check.down;
    for (let i = 0; i < availables.length; i++) {
      passable = checkAvailability(gameBoard.moveableBlock.baseline.x + availables[i].x, gameBoard.moveableBlock.baseline.y + availables[i].y);
      if (!passable) break;
    }
    if (!passable) {
      updateBoard(1)
      renderBoard();
      removeRows();
      const { type, orientation, startX, startY } = getRandomPiece();
      colorIndex = (colorIndex >= colorArray.length -1) ? 0 : colorIndex + 1;
      return createPiece(type, orientation, startX, startY)
    }
    if (gameBoard.moveableBlock.baseline.y < 19) {
      gameBoard.moveableBlock.baseline.y++;
      continue;
    } else {
      gameBoard.moveableBlock.baseline.y = 20;
      updateBoard(1)
      renderBoard();
      removeRows();
      const { type, orientation, startX, startY } = getRandomPiece();
      colorIndex = (colorIndex >= colorArray.length -1) ? 0 : colorIndex + 1;
      return createPiece(type, orientation, startX, startY)
    }
  }
}

function changeColor(){

}

//where the game starts
function gameStart() {
  const { type, orientation, startX, startY } = getRandomPiece();
  colorIndex = (colorIndex >= colorArray.length -1) ? 0 : colorIndex + 1;
  createPiece(type, orientation, startX, startY)
  const render = setInterval(function () {
    movePiece("down");
    renderBoard();
  }, 1200)
}

//addEventlisteners and call functions
up.addEventListener("click", rotatePiece)
down.addEventListener("click", e => {
  movePiece("down");
  renderBoard();
})
left.addEventListener("click", e => {
  movePiece("left");
  renderBoard();
})
right.addEventListener("click", e => {
  movePiece("right");
  renderBoard();
})
a.addEventListener("click", rotatePiece)
// b.addEventListener("click", displayTest)

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    rotatePiece();
  }
  if (e.key === "ArrowDown") {
    movePiece("down");
  }
  if (e.key === "ArrowLeft") {
    movePiece("left");
  }
  if (e.key === "ArrowRight") {
    movePiece("right");
  }
  if (e.key === "a") {
    rotatePiece()
  }
  if (e.key === "z") {
    gravityDrop();
  }
  renderBoard();
})
//Start the game
gameStart();