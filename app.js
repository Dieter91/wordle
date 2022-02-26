const msg = document.querySelector(".msg");
let guess = [];
let score = 0;
let rowNr = 0;
let row;
let block;
let keyColor;
const word = targetWords[Math.floor(Math.random() * targetWords.length)];
console.log(word);
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
    const options = {
      method: "GET",
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${guess.join("")}`,
      headers: {
        "x-rapidapi-host": "random-words5.p.rapidapi.com",
        "x-rapidapi-key": "f159d4d5bemsh9c99b9de5d4b8f4p11ceffjsn37218a22100a",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        checkKey(rowNr);
        rowNr += 1;
        guess = [];
      })
      .catch(function (error) {
        alert("word doesnt exist");
      });
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
    block = document
      .querySelectorAll(`.row`)
      [rowNr].querySelectorAll(`.row .block`)[i];
    keyColor = document.querySelector(`#${guess[i]}`);
    if (word.indexOf(guess[i]) > -1 && guess[i] != word[i]) {
      keyColor.classList.add("yellow");
      block.classList.add("yellow");
      console.log(word.indexOf(guess[i]));
    }
    if (guess[i] == word[i]) {
      keyColor.classList.add("green");
      block.classList.add("green");

      score = score + 1;
      console.log(score);
    }
    if (guess[i] != word[i]) {
      keyColor.classList.add("red");
      block.classList.add("red");
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
