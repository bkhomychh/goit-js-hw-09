const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const btns = [startBtnRef, stopBtnRef];
let intervalId = null;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeAttributes(btns) {
  btns.forEach(btn => {
    btn.disabled = !btn.disabled;
  });
}

function onStartBtnClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  changeAttributes(btns);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  changeAttributes(btns);
}
