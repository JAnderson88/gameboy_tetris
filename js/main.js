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
  moveableBlock: {}
}

const piece = {
  block: {
    default: {
      width: 1,
      height: 1,
      draw: [{ x: 0, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }],
        right: [{ x: 1, y: 0 }],
        left: [{ x: -1, y: 0 }],
      }
    }
  },
  sq_block: {
    default: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [],
        left: []
      }
    }
  },
  i_block: {
    long: {
      height: {},
      width: {},
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
        right: [],
        left: [],
      }
    },
    tall: {
      height: {},
      width: {},
      draw: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }],
      check: {
        down: [{ x: 0, y: 1 }],
        right: [],
        left: [],
      }
    }
  },
  t_block: {
    north: {
      height: {},
      width: {},
      draw: [{ x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [],
        left: [],
      }
    },
    east: {
      height: {},
      width: {},
      draw: [{ x: 1, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
        right: [],
        left: [],
      }
    },
    south: {
      height: {},
      width: {},
      draw: [{ x: 1, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }],
      check: {
        down: [{ x: 1, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 0 }],
        right: [],
        left: [],
      }
    },
    west: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: -2 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [],
        left: [],
      }
    },
  },
  s_left: {
    east: {
      height: {},
      width: {},
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 2, y: -1 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
        right: [],
        left: [],
      }
    },
    north: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: -1 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [],
        left: [],
      }
    }
  },
  s_right: {
    west: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [],
        left: [],
      }
    },
    south: {
      height: {},
      width: {},
      draw: [{ x: 1, y: -2 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [],
        left: [],
      }
    }
  },
  l_left: {
    north: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [],
        left: [],
      }
    },
    east: {
      height: {},
      width: {},
      draw: [{ x: 1, y: -2 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 1, y: -1 }, { x: 0, y: 1 }],
        right: [],
        left: [],
      }
    },
    south: {
      height: {},
      width: {},
      draw: [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }],
      check: {
        down: [{ x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
        right: [],
        left: [],
      }
    },
    west: {
      height: {},
      width: {},
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: -2 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [],
        left: [],
      }
    },
  },
  l_right: {
    north: {
      height: {},
      width: {},
      draw: [{ x: 2, y: -1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
        right: [],
        left: [],
      }
    },
    east: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [],
        left: [],
      }
    },
    south: {
      height: {},
      width: {},
      draw: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
        right: [],
        left: [],
      }
    },
    west: {
      height: {},
      width: {},
      draw: [{ x: 0, y: -2 }, { x: 1, y: -2 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: -1 }, { x: 1, y: 1 }],
        right: [],
        left: [],
      }
    },
  },
}

//define functions
//This function creates a new Piece. Currently in the version just a block
function createPiece(type, startX = 5, startY = 1) {
  if (type === "block") {
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: "block",
        orientation: "default",
        baseline: { x: startX, y: startY },
        color: color[colorIndex],
        index: []
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
  }
  if (type === "sq_block") { }
  if (type === "i_block") { }
  if (type === "t_block") { }
  if (type === "s_left") { }
  if (type === "s_right") { }
  if (type === "l_left") { }
  if (type === "l_right") { }
}
//moveBlock function tracks when an input is passed in and moves the piece accordingly 
function moveBlock(direction) {
  const width = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].width;
  // const height = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].height;
  const availables = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].check[direction]
  let passable;
  for (let i = 0; i < availables.length; i++) {
    passable = checkAvailability(gameBoard.moveableBlock.baseline.x + availables[i].x, gameBoard.moveableBlock.baseline.y + availables[i].y)
    if (!passable) break
  }
  if (direction === "down") {
    if (!passable) {
      updateBoard(1)
      return createPiece("block");
    }
    if (gameBoard.moveableBlock.baseline.y < 20) {
      updateBoard(0);
      gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x, y: gameBoard.moveableBlock.baseline.y + 1 }
      updateBoard(1);
      renderBoard();
      if (gameBoard.moveableBlock.baseline.y === 20) {
        return createPiece("block")
      }
    }
  }
  if (direction === "right") {
    if(gameBoard.moveableBlock.baseline.x + width > 10) return
    if(!passable) return
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x+1, y: gameBoard.moveableBlock.baseline.y}
    updateBoard(1);
    renderBoard();
   }
  if (direction === "left") {
    if(gameBoard.moveableBlock.baseline.x === 1) return
    if(!passable) return
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x-1, y: gameBoard.moveableBlock.baseline.y}
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
  })
}

//cleans the board
function clearBoard() {
  for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < 10; j++) {
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = "white";
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid white";
    }
  }
}
//renders the board
function renderBoard() {
  clearBoard();
  for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (gameBoard[`row${i}`][j]) {
        document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = gameBoard.moveableBlock.color;
        document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid black";
      }
    }
  }
}

//function used to allow functionality to keyboard
function keyboardControl(e) {
  if (e.key === "ArrowDown") {
    moveBlock("down");
    // renderBoard();
  }
  if (e.key === "ArrowLeft") {
    moveBlock("left");
    // renderBoard();
  }
  if (e.key === "ArrowRight") {
    moveBlock("right");
    // renderBoard();
  }
  if (e.key === "a") {}
  if (e.key === "z") {}
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


