const word = ["z", "j", "o", "e", "n"];
const msg = document.querySelector(".msg");
let guess = [];
let score = 0;
let rowNr = 0;
let row;

function buttonPress(key) {
  row = document
    .querySelectorAll(`.row`)
    [rowNr].querySelectorAll(`.row .block`);
  if (key != "del" && key != "enter") {
    if (guess.length < 5) {
      guess.push(key.innerHTML);
      addKeyToGrid(key.innerHTML, rowNr);
      console.log(guess);
    }
  } else if (key == "del") {
    deleteKey(rowNr);
  } else if (key == "enter" && guess.length == 5) {
    checkKey(rowNr);
    rowNr += 1;
    guess = [];
  }
}

//delete Key
function deleteKey(rowNr) {
  guess.splice(-1);
  row[guess.length].innerHTML = "";
}
//add key to grid
function addKeyToGrid(key, rowNr) {
  row[guess.length - 1].innerHTML += key;

  if (key == "enter" && guess.length == 5) {
    checkKey(rowNr);
  }
}
//Check if keys are correct
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
      msg.style.display = "flex";
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
