const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord;
let timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split(""); // splitting each letter or the random word

  //   Fisher-Yates shuffle algorithm
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // getting random number
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  //   Same implementation above code
  //
  //   for (let i = wordArray.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1)); // getting random number
  //     let temp = wordArray[i];
  //     wordArray[i] = wordArray[j];
  //     wordArray[j] = temp;
  //   }

  wordText.innerHTML = wordArray.join(""); // passing shuffled word as word text
  hintText.innerHTML = randomObj.hint; // passing random object's hint
  correctWord = randomObj.word.toLocaleLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxLength", correctWord.length); // setting input max length attribute value to word length
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();
  if (!userWord) return alert("Please enter a word");

  if (userWord !== correctWord) {
    return alert(`Oops! ${userWord} is not the correct word.`);
  }
  alert(`Congratulations! ${userWord.toUpperCase()} is not the correct word.`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
