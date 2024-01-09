let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#reset");
let turnO = true; //player x,playerO
let newgame = document.querySelector("#newGame");
let msg = document.querySelector("#msg");
let message = document.querySelector(".message");

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  enableBoxes();
  message.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO == true) {
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "rgb(58, 125, 183)";
      turnO = true;
    }
    box.disabled = true;
    if (box.disabled == true) {
      box.style.backgroundColor = "turquoise";
    }
   
    checkWinner();
  });
});
const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `🎉Congratulations, Winner is ${winner}`;
  msg.style.color='yellow'
  message.classList.remove("hide");
  disabledBoxes();
};
const checkWinner = () => {
  let movesCount = 0; // Initialize moves count
  
  for (let box of boxes) {
    if (box.innerText !== "") {
      movesCount++; // Increment count for each non-empty box
    }
  }
  if (movesCount === 9) {
    msg.innerText = `Congratulations, the match is tied`;
    message.classList.remove("hide");
  }
  for (let pattern of winpatterns) {
    // console.log(pattern);
    let pos1Val = boxes[pattern[0]].innerText; // boxes[0].innerText => 'X'
    let pos2Val = boxes[pattern[1]].innerText; // boxes[4].innerText => 'X'
    let pos3Val = boxes[pattern[2]].innerText; // boxes[8].innerText => 'X'
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }

  }
 

};

newgame.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);