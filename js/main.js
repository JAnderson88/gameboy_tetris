//selecting elements
const up = document.getElementById("up_button")
const right = document.getElementById("right_button")
const down = document.getElementById("down_button")
const left = document.getElementById("left_button")
const b = document.getElementById("b")
const a = document.getElementById("a")
const screen = document.getElementById("screen")
const test = document.getElementById("test_display")


//define functions
function displayTest(e){
  // console.log(e)
  if (e.key === "ArrowUp"  || 
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "a" ||
      e.key === "z")
  {
    test.textContent = e.key
    return
  }
  test.textContent = e.target.id
}



//addEventlisteners and call functions
up.addEventListener("click", displayTest)
down.addEventListener("click", displayTest)
left.addEventListener("click", displayTest)
right.addEventListener("click", displayTest)
a.addEventListener("click", displayTest)
b.addEventListener("click", displayTest)

document.addEventListener("keydown", displayTest)

