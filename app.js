let word;
const msg = document.querySelector(".msg");
let guess = [];
let score = 0;
let rowNr = 0;
let row;

function getWord() {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    params: { wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": "f159d4d5bemsh9c99b9de5d4b8f4p11ceffjsn37218a22100a",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      word = response.data.split("");
      console.log(word);
    })
    .catch(function (error) {
      console.error(error);
    });
}

getWord();
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
  row[guess.length - 1].innerHTML += key.toUpperCase();

  if (key == "enter" && guess.length == 5) {
    checkKey(rowNr);
  }
}
//Check if keys are correct
function checkKey(rowNr) {
  for (let i = 0; i < word.length; i++) {
    if (word.indexOf(guess[i]) != -1 && guess[i] != word[i]) {
      document.querySelector(`#${guess[i]}`).classList.add("yellow");
      document
        .querySelectorAll(`.row`)
        [rowNr].querySelectorAll(`.row .block`)
        [i].classList.add("yellow");
    }
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
    if (score < 5 && i == 4) {
      msg.innerHTML = "";
      score = 0;
    }
    if (score == 5) {
      msg.style.display = "flex";
      msg.innerHTML +=
        "<h1>U GUESSED THE WORD!🥳🥳🥳</h1> <button class='replay'>CLICK HERE TO PLAY AGAIN</button>";
      document.querySelector(".replay").addEventListener("click", function () {
        location.reload();
      });
    }
    if (score != 5 && rowNr == 5) {
      msg.style.display = "flex";
      msg.innerHTML +=
        "<h1>You have lost... 😭😭😭</h1> <button class='replay'>CLICK HERE TO PLAY AGAIN</button>";
      document.querySelector(".replay").addEventListener("click", function () {
        location.reload();
      });
    }
  }

  //see if key occurs in word
}
