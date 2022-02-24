const word = ["c", "r", "o", "w", "n"];
const msg = document.querySelector(".msg");
let guess = [];
let score = 0;
let rowNr = 0;
const row = document
  .querySelectorAll(`.row`)
  [rowNr].querySelectorAll(`.row .block`);
function buttonPress(key) {
  if (guess.length < 5) {
    guess.push(key.innerHTML);
    console.log(guess);
    addKeyToGrid(key.innerHTML, rowNr);
    if (guess.length > 4) {
      rowNr += 1;
      guess = [];
      console.log(guess);
    }
  }
}

function addKeyToGrid(key, rowNr) {
  document.querySelectorAll(`.row`)[rowNr].querySelectorAll(`.row .block`)[
    guess.length - 1
  ].innerHTML += key;

  if (guess.length == 5) {
    checkKey(rowNr);
  }
}

function checkKey(rowNr) {
  for (let i = 0; i < word.length; i++) {
    if (guess[i] == word[i]) {
      document.querySelector(`#${guess[i]}`).classList.add("green");
      document
        .querySelectorAll(`.row`)
        [rowNr].querySelectorAll(`.row .block`)
        [i].classList.add("green");
      score = score + 1;
    }
    if (guess[i] != word[i]) {
      document.querySelector(`#${guess[i]}`).classList.add("red");
      document
        .querySelectorAll(`.row`)
        [rowNr].querySelectorAll(`.row .block`)
        [i].classList.add("red");
    }
    if (score == 5) {
      msg.innerHTML += "<h1>U GUESSED THE WORD!</h1>";
    }
    if (score < 5 && i == 4) {
      msg.innerHTML = "";
      score = 0;
      console.log("FAIL");
    }
    console.log(score);
  }
}