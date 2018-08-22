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
/*This object contains the context of each piece. Inside you will have the following: 
  --Block type
  --Orientation
  --Width of coresponding orientation
  --Height of coresponding orientation
  --An array to understand which positions to draw
  --A check object that contains which positions to check depending on the which direction you want to move
*/
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
//This function creates a new Piece. Currently in this version, its just a block
function createPiece(type, startX = 5, startY = 1) {
  if (type === "block") {
    //check to see if space is available
    if (checkAvailability(startX, startY)) {
      //create the blueprint of the piece
      const piece = {
        type: "block",
        orientation: "default",
        baseline: { x: startX, y: startY },
        color: "cyan",
        index: []
      };
      //set it as the game board's moveable block
      gameBoard.moveableBlock = Object.assign({}, piece);
      //update the game board
      updateBoard(1);
      //then render it
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
function movePiece(direction) {
  //grab the width of the current moveable block
  const width = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].width;
  // const height = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].height;
  //grab the array that holds the spaces that needs to be checked if they are going 
  const availables = piece[gameBoard.moveableBlock.type][gameBoard.moveableBlock.orientation].check[direction]
  //variable to hold if the piece is able to be moved or not
  let passable;
  for (let i = 0; i < availables.length; i++) {
    //Loop over the availabes array to see if you have the see somewhere that is blocked. If it is, break from the loop passing a false value in for passable
    passable = checkAvailability(gameBoard.moveableBlock.baseline.x + availables[i].x, gameBoard.moveableBlock.baseline.y + availables[i].y);
    if (!passable) break;
  }
  if (direction === "down") {
    //If it can't pass then create a new moveable piece and start from the top
    if (!passable) {
      updateBoard(1);
      return createPiece("block");
    }
    //but if it is passable
    if (gameBoard.moveableBlock.baseline.y < 20) {
      //If you haven't reached the bottom... then update the game board by turning the current places of the moveable block to 0
      updateBoard(0);
      //Set the new baseline point
      gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x, y: gameBoard.moveableBlock.baseline.y + 1 }
      //Then from the new baseline point, update the game board again by turning the new positions to 1
      updateBoard(1);
      //Then render the board
      renderBoard();
      if (gameBoard.moveableBlock.baseline.y === 20) {
        //Check again if you reached the bottom of the screen. If you have create a new moveable piece.
        return createPiece("block");
      }
    }
  }
  //If i'm trying to move right...
  if (direction === "right") {
    //If I can't move right anymore then don't do anything
    if(gameBoard.moveableBlock.baseline.x + width > 10) return;
    //If it's blocked...don't do anything
    if(!passable) return;
    //If I can move then update the board, set the new baseline, update the board again then render
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x+1, y: gameBoard.moveableBlock.baseline.y};
    updateBoard(1);
    renderBoard();
   }
   //If i'm trying to move left...
  if (direction === "left") {
    //If i'm at the far left...don't do anything
    if(gameBoard.moveableBlock.baseline.x === 1) return;
    //If it's blocked...don't do anything
    if(!passable) return;
        //If I can move then update the board, set the new baseline, update the board again then render
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x-1, y: gameBoard.moveableBlock.baseline.y};
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


//renders the board
function renderBoard() {
  for (let i = 1; i <= 20; i++) {
    for (let j = 0; j < 10; j++) {
      //clear drawing
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = "white";
      document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid white";
      if (gameBoard[`row${i}`][j]) {
        //re-renders
        document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.backgroundColor = gameBoard.moveableBlock.color;
        document.querySelector(`#row${i}`).querySelectorAll(".col")[j].style.border = "1px solid black";
      }
    }
  }
}

//where the game starts
function gameStart() {
  createPiece("block")
  const render = setInterval(function () {
    movePiece("down");
    renderBoard();
  }, 1200)

}

//addEventlisteners and call functions
//eventlisteners for the buttons created to emulate gameboard
down.addEventListener("click", e => {
  movepiece("down");
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
// a.addEventListener("click", displayTest)
// b.addEventListener("click", displayTest)

document.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") {
    movePiece("down");
  }
  if (e.key === "ArrowLeft") {
    movePiece("left");
  }
  if (e.key === "ArrowRight") {
    movePiece("right");
  }
  if (e.key === "a") {}
  if (e.key === "z") {}
  renderBoard();
})
//Start the game
gameStart();


