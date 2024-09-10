const cells = document.querySelectorAll(".cell");
let state = document.querySelector(".status");
let score1 = document.querySelector(".score1");
let score2 = document.querySelector(".score2");
let reset = document.querySelector(".reset");
let resetscore = document.querySelector(".resetscore");
let marker = "X";
let scr1 = 0;
let scr2 = 0;
const wincons = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let board = ["", "", "", "", "", "", "", "", ""];

resetscore.addEventListener("click" , () => {
    scr1 = 0;
    scr2 = 0;
    score1.innerHTML = `Score : ${scr1}`;
    score2.innerHTML = `Score : ${scr2}`;
    restartgame();
});

startgame();

function startgame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellclicked);
    reset.addEventListener("click", restartgame);
  });
}

function cellclicked() {
  const cellindex = this.getAttribute("cellindex");
  if (board[cellindex] !== "") {
    return;
  } else {
    board[cellindex] = marker;
    this.innerHTML = marker;
    switchplayer();
    checkwinner();
  }
}

function checkwinner() {
  let round = false;
  let mark = "";

  for (let i = 0; i < wincons.length; i++) {
    let con = wincons[i];
    let con1 = board[con[0]];
    let con2 = board[con[1]];
    let con3 = board[con[2]];
    console.log(con1);
    if (con1 === con2 && con2 === con3 && con3 === "X") {
      round = true;
      mark = "X";
      scr1++;
      break;
    } else if (con1 === con2 && con2 === con3 && con3 === "O") {
      round = true;
      mark = "O";
      scr2++;
      break;
    } else {
      continue;
    }
  }

  if (round) {
    cells.forEach((cell) => {
      cell.setAttribute("disabled", true);
    });
    if (mark === "X") {
      state.innerHTML = "Player 1 Wins!";
      state.classList.remove("hidden");
      score1.innerHTML = `Score : ${scr1}`;
    } else {
      state.innerHTML = "Player 2 Wins!";
      state.classList.remove("hidden");
      score2.innerHTML = `Score : ${scr2}`;
    }
  } else {
    let drflag = true;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        drflag = false;
      }
    }
    if (drflag) {
      state.innerHTML = "It's A draw!";
      state.classList.remove("hidden");
    }
  }
}

function switchplayer() {
  if (marker === "X") {
    marker = "O";
  } else {
    marker = "X";
  }
}

function restartgame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.removeAttribute("disabled");
  });
  board = ["", "", "", "", "", "", "", "", ""];
  marker = "X";
  state.classList.add("hidden");
}
