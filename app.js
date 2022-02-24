const word = ["c", "r", "o", "w", "n"];
const msg = document.querySelector(".msg");
let guess = [];
let score = 0;

function buttonPress(key) {
  if (guess.length < 5) {
    guess.push(key.innerHTML);
    console.log(guess);
  }
  if (guess.length == 5) {
    for (let i = 0; i < word.length; i++) {
      if (guess[i] == word[i]) {
        document.querySelector(`#${guess[i]}`).classList.add("green");
        score = score + 1;
      }
      if (guess[i] != word[i]) {
        document.querySelector(`#${guess[i]}`).classList.add("red");
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
}
