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
      height: 2,
      width: 2,
      draw: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [{x:2, y:-1},{x:2, y:0}],
        left: [{x:-1, y:-1},{x:-1, y:0}]
      }
    }
  },
  i_block: {
    long: {
      height: 1,
      width: 4,
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
        right: [{x:4, y:0}],
        left: [{x:-1, y:0}],
      }
    },
    tall: {
      height: 4,
      width: 1,
      draw: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }],
      check: {
        down: [{ x: 0, y: 1 }],
        right: [{x:1, y:-3},{x:1, y:-2},{x:1, y:-1},{x:1, y:0}],
        left: [{x:-1, y:-3},{x:-1, y:-2},{x:-1, y:-1},{x:-1, y:0}],
      }
    }
  },
  t_block: {
    north: {
      height: 2,
      width: 3,
      draw: [{ x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [{x:2, y:-1},{x:3, y:0}],
        left: [{x:0, y:-1},{x:-1, y:0}],
      }
    },
    east: {
      height: 3,
      width: 2,
      draw: [{ x: 1, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
        right: [{x:2, y:-1},{x:1, y:-2},{x:1, y:0}],
        left: [{x:-1, y: -2},{x:-1, y:-1},{x:-1, y:0}],
      }
    },
    south: {
      height: 2,
      width: 3,
      draw: [{ x: 1, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }],
      check: {
        down: [{ x: 1, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 0 }],
        right: [{x:3, y:0},{x:3, y:-1}],
        left: [{x:0, y:0},{x:-1, y:-1}],
      }
    },
    west: {
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: -2 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [{x:2, y:0},{x:2, y:-1},{x:2, y:-2}],
        left: [{x:-1, y:-1},{x:0, y:0},{x:0, y:-2}],
      }
    },
  },
  s_left: {
    east: {
      height: 2,
      width: 3,
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 2, y: -1 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
        right: [{x:2, y:0}, {x:3, y:-1}],
        left: [{x:-1, y:0}, {x:0, y:-1}],
      }
    },
    north: {
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
        right: [{x:1, y:-2},{x:2, y:-1},{x:2, y:0}],
        left: [{x:-1, y:-2},{x:-1, y:-1},{x:0, y:0}],
      }
    }
  },
  s_right: {
    west: {
      height: 2,
      width: 3,
      draw: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [{x:2, y:-1},{x:3, y:0}],
        left: [{x:-1, y:-1}, {x:0, y:0}],
      }
    },
    south: {
      height: 3,
      width: 2,
      draw: [{ x: 1, y: -2 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 0 }],
        right: [{x:2, y:-2},{x:2, y:-1},{x:1, y:0}],
        left: [{x:0, y:-2},{x:-1, y:-1},{x:-1, y:0}],
      }
    }
  },
  l_left: {
    north: {
      height: 2,
      width: 3,
      draw: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        right: [{x:1, y:-1},{x:3, y:0}],
        left: [{x:-1, y:-1},{x:-1, y:0}],
      }
    },
    east: {
      height: 3,
      width: 2,
      draw: [{ x: 1, y: -2 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 1, y: -1 }, { x: 0, y: 1 }],
        right: [{x:2, y:-2},{x:1, y:-1},{x:1, y:0}],
        left: [{x:-1, y:-2}, {x:-1, y:-1}, {x:-1, y:0}],
      }
    },
    south: {
      height: 2,
      width: 3,
      draw: [{ x: 2, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }],
      check: {
        down: [{ x: 2, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
        right: [{x:3, y:0},{x:3, y:-1}],
        left: [{x:1, y:0},{x:-1, y:-1}],
      }
    },
    west: {
      height: 3,
      width: 2,
      draw: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: -2 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [{x:2, y:0 },{x:2, y:-1},{x:2, y:-2}],
        left: [{x:-1, y:0},{x:0, y:-1},{x:0, y:-2}],
      }
    },
  },
  l_right: {
    north: {
      height: 2,
      width: 3,
      draw: [{ x: 2, y: -1 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
      check: {
        down: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
        right: [{x:3, y:0},{x:3, y:-1}],
        left: [{x:1, y:-1}, {x:-1, y:0}],
      }
    },
    east: {
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
        right: [{x:1, y:-2},{x:1, y:-1},{x:2, y:0}],
        left: [{x:-1, y:-2}, {x:-1, y:-1}, {x:-1, y:0}],
      }
    },
    south: {
      height: 2,
      width: 3,
      draw: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }],
      check: {
        down: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
        right: [{x:1, y:0},{x:3, y:-1}],
        left: [{x:-1, y:0},{x:-1, y:-1}],
      }
    },
    west: {
      height: 3,
      width: 2,
      draw: [{ x: 0, y: -2 }, { x: 1, y: -2 }, { x: 1, y: -1 }, { x: 1, y: 0 }],
      check: {
        down: [{ x: 0, y: -1 }, { x: 1, y: 1 }],
        right: [{x:2, y:-2},{x:2, y:-1},{x:2, y:0}],
        left: [{x:-1, y:-2},{x:0, y:-1},{x:0, y:0}],
      }
    }
  }
}

//define functions
//This function creates a new Piece. Currently in this version, its just a block
function createPiece(type, orientation) {
  if (type === "block") {
    const startX = 5;
    const startY = 2;
    //check to see if space is available
    if (checkAvailability(startX, startY)) {
      //create the blueprint of the piece
      const piece = {
        type: type,
        orientation: orientation,
        baseline: { x: startX, y: startY },
        color: "cyan",
      };
      //set it as the game board's moveable block
      gameBoard.moveableBlock = Object.assign({}, piece);
      //update the game board
      updateBoard(1);
      //then render it
      renderBoard();
    }
  }
  if (type === "sq_block") {
    const startX = 5;
    const startY = 2;
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: { x:5, y: 2 },
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
   }
  if (type === "i_block") {
    const startX = 5;
    const startY = (orientation === "tall")? 4 : 1;
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: {x:startX, y:startY},
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
  }
  if (type === "t_block") {
    const startX = (orientation === "north" || orientation === "south") ? 4 : 5;
    const startY = (orientation === "north" || orientation === "south") ? 2 : 3;
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline:{x:startX, y:startY},
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
   }
  if (type === "s_left") {
    const startX = 5;
    const startY = (orientation === "east") ? 2 : 3; 
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: {x:startX, y:startY},
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
  }
  if (type === "s_right") {
    const startX = 5;
    const startY = (orientation === "west") ? 2 : 3;
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: {x:startX, y:startY},
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
  }
  if (type === "l_left") { 
    const startX = 5
    const startY = (orientation === "west" || orientation === "east") ? 3 : 2;
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: {x:startX, y:startY},
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
  }
  if (type === "l_right") {
    const startX = 5;
    const startY = (orientation === "west" || orientation === "east") ? 3 : 2;
    if (checkAvailability(startX, startY)) {
      const piece = {
        type: type,
        orientation: orientation,
        baseline: {x:startX, y:startY},
        color: "cyan",
      };
      gameBoard.moveableBlock = Object.assign({}, piece);
      updateBoard(1);
      renderBoard();
    }
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
      return createPiece("block", "default");
    }
    if (gameBoard.moveableBlock.baseline.y < 20) {
      updateBoard(0);
      gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x, y: gameBoard.moveableBlock.baseline.y + 1 }
      updateBoard(1);
      renderBoard();
      if (gameBoard.moveableBlock.baseline.y === 20) {
        return createPiece("block", "default");
      }
    }
  }
  if (direction === "right") {
    if(gameBoard.moveableBlock.baseline.x + width > 10) return;
    if(!passable) return;
    updateBoard(0);
    gameBoard.moveableBlock.baseline = { x: gameBoard.moveableBlock.baseline.x+1, y: gameBoard.moveableBlock.baseline.y};
    updateBoard(1);
    renderBoard();
   }
  if (direction === "left") {
    if(gameBoard.moveableBlock.baseline.x === 1) return;
    if(!passable) return;
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
  createPiece("l_right", "south")
  const render = setInterval(function () {
    movePiece("down");
    renderBoard();
  }, 1200)

}

//addEventlisteners and call functions
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


