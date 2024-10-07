const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minutes = document.getElementsByClassName("minutes")[0];
const seconds = document.getElementsByClassName("seconds")[0];
const centiSecond = document.getElementsByClassName("milseconds")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let centiSecCounter = 0;
let lapItem = 0;
let isReset = false;

let sec, centiSec;

let startTime, elapsedTime = 0;

const formatTime = (time) => time < 10 ? `0${time}` : time;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const updateTimeDisplay = () => {
    const totalElapsed = Date.now() - startTime + elapsedTime;
    const totalCentiSecs = Math.floor(totalElapsed / 10); 
    centiSecCounter = totalCentiSecs % 100;
    secCounter = Math.floor(totalCentiSecs / 100) % 60; 
    minCounter = Math.floor(totalCentiSecs / 6000);

    minutes.innerHTML = `${formatTime(minCounter)} :&nbsp;`;
    seconds.innerHTML = `&nbsp;${formatTime(secCounter)} :`;
    centiSecond.innerHTML = `&nbsp;${formatTime(centiSecCounter)}`;
};

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';

        bg.classList.add("animation-bg");
        bg.style.animationPlayState = 'running';

        startTime = Date.now();  

        sec = setInterval(updateTimeDisplay, 10); 
        
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerText = 'Play';
        clearInterval(sec); 

        elapsedTime += Date.now() - startTime; 

        bg.style.animationPlayState = 'paused'; 

        isPlay = false;
    }
    toggleButton();
}



const reset = () => {
    clearInterval(sec);
    secCounter = 0;
    minCounter = 0;
    centiSecCounter = 0;
    lapItem = 0;
    elapsedTime = 0;

    isPlay = false;
    isReset = false;

    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");

    seconds.innerHTML = '&nbsp;00 :';
    centiSecond.innerHTML = '&nbsp;00';
    minutes.innerHTML = '00 :';
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `#${++lapItem}`
    timeStamp.innerHTML = `${formatTime(minCounter)} : ${formatTime(secCounter)} : ${formatTime(centiSecCounter)}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add("hidden");
    lapItem = 0;
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
