let buttonReference = document.querySelectorAll(".button-option");
let popupReference = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let messageReference = document.getElementById("message");

//Winning Patterns
const winningPatterns = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

//Player 'X' will go first
let xTurn = true;
let count = 0;

// Function for disabling all buttons
const disableButtons = () => {
  buttonReference.forEach((element) => (element.disabled = true));
  // Enable popup
  popupReference.classList.remove("hide");
};

// Function for enabling all buttons for new game/restart
const enableButtons = () => {
  buttonReference.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupReference.classList.add("hide");
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Executes when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    messageReference.innerHTML = "Congrats! <br> 'X' Wins";
  } else {
    messageReference.innerHTML = "Congrats! <br> 'O' Wins";
  }
};

const drawFunction = () => {
  disableButtons();
  messageReference.innerHTML = "It's a Draw";
};

// Win Logic
const winChecker = () => {
  // Loop through win patterns
  for (let i of winningPatterns) {
    let [element1, element2, element3] = [
      buttonReference[i[0]].innerText,
      buttonReference[i[1]].innerText,
      buttonReference[i[2]].innerText,
    ];

    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

//Displays X/O on click
buttonReference.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      // Displays X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      // Displays O
      element.innerText = "O";
      element.disabled = true;
    }

    // Increment count on each click
    count += 1;
    if (count == 9) {
      // If all nine are clicked and there was no win then its a draw.
      drawFunction();
    }
    // Check win after every click.
    winChecker();
  });
});

window.onload = enableButtons;
