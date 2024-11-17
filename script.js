const firstMode = document.querySelector(".first-mode");
const secondMode = document.querySelector(".second-mode");
const thirdMode = document.querySelector(".third-mode");
const startButton = document.querySelector(".start");
const launchPage = document.querySelector(".launch");
const gamePage = document.querySelector(".game");
const exampleNumber = document.querySelector(".number");
const answer = document.querySelector(".answer");
const nextNumber = document.querySelector(".next");
const cancelNumber = document.querySelector(".cancel");
const buttonsContainer = document.querySelector(".buttons");
const timer = document.querySelector(".timer");
const correct = document.querySelector(".correct");
const mistake = document.querySelector(".mistakes");
const results = document.querySelector(".results");
const timeText = document.querySelector(".time-text");
const correctText = document.querySelector(".correct-text");
const mistakeText = document.querySelector(".mistake-text");
const arrowBack = document.querySelector('.arrow-back');
const rightAnswer = document.querySelector('.right-answer');
const firstExample = document.querySelector(".first-example");
const secondExample = document.querySelector(".second-example");
const supNumder = document.querySelector(".sup-number");
const supAnswer = document.querySelector(".sup-answer ");

const firstModeArr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const secondModeArr = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
const thirdModeArr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
const modes = [firstMode, secondMode, thirdMode];

let chosenArr = null;
let numberIndex = 0;
let correctCounter = 0;
let mistakeCounter = 0;
let seconds = +timer.textContent.slice(-2);
let minutes = +timer.textContent.slice(0,2);

// Функция перемешивания массива
function shuffle(arr){
	for(let i = 0; i < arr.length; i++){
		const randomIndex = Math.floor(Math.random() * arr.length);
		const temp = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// Функция форматирования времени
function format(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

// Функция таймера
function timerStart() {
  timerId = setInterval(() => {
    if (seconds == 59) {
      seconds = 0;
      minutes += 1;
    } else {
      seconds++;
    }
    timer.textContent = `${format(minutes)}:${format(seconds)}`;
  }, 1000);
}

// Менять режим
function setActiveMode(activeMode) {
  modes.forEach(mode => {
    if (mode === activeMode) {
      mode.classList.add("active");
    } else {
      mode.classList.remove("active");
    }
  });
};

firstMode.addEventListener("click", () => setActiveMode(firstMode));
secondMode.addEventListener("click", () => setActiveMode(secondMode));
thirdMode.addEventListener("click", () => setActiveMode(thirdMode));

// Менять режим примера
function toggleExample(isFirstExample) {
  firstExample.classList.toggle("active", isFirstExample);
  secondExample.classList.toggle("active", !isFirstExample);
  answer.style.width = isFirstExample ? "110px" : "55px";
}

firstExample.addEventListener("click", () => toggleExample(true));
secondExample.addEventListener("click", () => toggleExample(false));

// Кнопка старт
startButton.addEventListener("click", () => {
  launchPage.classList.add("hidden");
  gamePage.classList.remove("hidden");

  if (firstMode.classList.contains("active")) {
    chosenArr = [...firstModeArr];
  } else if (secondMode.classList.contains("active")) {
    chosenArr = [...secondModeArr];
  } else if (thirdMode.classList.contains("active")) {
    chosenArr = [...thirdModeArr];
  }

  if (firstExample.classList.contains("active")) {
    supAnswer.classList.add("hidden");
    supNumder.classList.remove("hidden");
  } else {
    supAnswer.classList.remove("hidden");
    supNumder.classList.add("hidden");
    chosenArr = chosenArr.map(item => Math.pow(item, 2));
  }

  shuffle(chosenArr);
  exampleNumber.textContent = `${chosenArr[numberIndex]}`;
  timerStart();
});

// Следующий
nextNumber.addEventListener("click", () => {
  const correctAnswer = firstExample.classList.contains("active")
  ? Math.pow(chosenArr[numberIndex], 2)
  : Math.sqrt(chosenArr[numberIndex]);

  if (parseInt(answer.value) == correctAnswer) {
    correctCounter++;
    correct.textContent = correctCounter;

    setTimeout(() => {
      if (numberIndex == (chosenArr.length - 1)) {
        finish();
        resetData();
        return;
      }
  
      numberIndex += 1;
      exampleNumber.textContent = `${chosenArr[numberIndex]}`;
      answer.value = "";
    }, 1);
  } else {
    answer.classList.add("error");
    rightAnswer.textContent = correctAnswer;

    mistakeCounter++;
    mistake.textContent = mistakeCounter;

    chosenArr.push(chosenArr[numberIndex]);
    console.log(chosenArr);

    setTimeout(() => {
      if (numberIndex == (chosenArr.length - 1)) {
        finish();
        resetData();
        return;
      }

      numberIndex += 1;
      exampleNumber.textContent = `${chosenArr[numberIndex]}`;
      answer.value = "";
      answer.classList.remove("error");
      rightAnswer.textContent = "";
    }, 800)
  }
});

// Функция завершения игры
function finish() {
  clearInterval(timerId);
  gamePage.classList.add("hidden");
  launchPage.classList.remove("hidden");
  results.classList.remove("hidden");
  timeText.textContent = `Время: ${format(minutes)}:${format(seconds)}`;
  correctText.textContent = `Правильно: ${correctCounter}`;
  mistakeText.textContent = `Неправильно: ${mistakeCounter}`;
}

// Функция сброса данных
function resetData() {
  seconds = 0;
  minutes = 0;
  timer.textContent = `${format(minutes)}:${format(seconds)}`;

  correctCounter = 0;
  mistakeCounter = 0;
  correct.textContent = correctCounter;
  mistake.textContent = mistakeCounter;

  chosenArr = [];
  numberIndex = 0;
  answer.value = "";

  answer.classList.remove("error");
  rightAnswer.textContent = "";
}

// Запись ответа
buttonsContainer.addEventListener("click", (event) => {
  const element = event.target.closest(".number-button");

  if (secondExample.classList.contains("active") && answer.value.length == 2) {
    return
  } else if (answer.value.length == 4) {
    return;
  }

  answer.value += element.textContent;
});

// Удаление символа
cancelNumber.addEventListener("click", () => {
  answer.value = answer.value.slice(0, -1);
});


// Стрелка вернуться Назад
arrowBack.addEventListener("click", () => {
  clearInterval(timerId);
  gamePage.classList.add("hidden");
  launchPage.classList.remove("hidden");
  results.classList.add("hidden");

  resetData();
});