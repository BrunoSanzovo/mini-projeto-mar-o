let timer;
let isRunning = false;
let remainingTime = parseInt(localStorage.getItem('remainingTime')) || 1 * 10; 
// let remainingTime = 1 * 10; 

let stretchInterval;

// ------------------------- API -----------------------


let stretchExercises = [] // 10 itens
let currentExercise = 0
let offset = 0


function getExercises(){
    fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset, {
      method: 'GET',
      headers: { 'X-Api-Key': 'API key here'},
      contentType: 'application/json',
    })
    .then(response => response.json())
    .then(dados => {
        stretchExercises = dados
        console.log(stretchExercises)
    })
    .catch(error => console.log(error))
  }
  
getExercises()
  
  

// ------------------------- TIMER EXERCICIOS ------------------

let buttonExercise = document.getElementById('showExc');

buttonExercise.addEventListener('click', function() {
    timerExercice();
    displayExercises();
});

function timerExercice(){
    remainingTime = 1 * 5;
    startTimer(remainingTime);
    setTimeout(clearExercices, remainingTime * 1000)
}


// document.getElementById('start').addEventListener('click', startTimer);


let buttonIniciar = document.getElementById('start')
buttonIniciar.addEventListener('click', timerFocus)

function timerFocus(){
    remainingTime = 1 * 10
    startTimer(remainingTime)
}



// -------------------------  ------------------




// ------------------------- exibir exercicios ------------------

function displayExercises(){
    let nameExercise = document.getElementById('nameExc');
    let dificultExercise = document.getElementById('dificultExc');
    let descriptExercise = document.getElementById('descriptExc');
    nameExercise.innerText = stretchExercises[currentExercise].name;
    dificultExercise.innerText = stretchExercises[currentExercise].difficulty;
    descriptExercise.innerText = stretchExercises[currentExercise].instructions;
    if(currentExercise === 9) {
        currentExercise = 0;
        offset += 10;
        getExercises();
        return;
    }
    currentExercise++;
}


function clearExercices() {
    let nameExercise = document.getElementById('nameExc');
    let dificultExercise = document.getElementById('dificultExc');
    let descriptExercise = document.getElementById('descriptExc');
    nameExercise.style.display = 'none';
    dificultExercise.style.display = 'none';
    descriptExercise.style.display = 'none';
}


function updateTimerDisplay() {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const colonDisplay = document.getElementById('colon');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesDisplay.style.fontSize = '100px'; 
    secondsDisplay.style.fontSize = '100px'; 
    colonDisplay.style.fontSize = '100px';
    if (remainingTime === 0) {
        AlertSound()
    }
}



function AlertSound() {
    let audio = new Audio ('./assets/Bell.mp3')
    audio.play()
}


function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            remainingTime--;
            if (remainingTime >= 0) {
                updateTimerDisplay();
            }
            else {
                clearInterval(timer);
                isRunning = false;
                // completeExerciseButton.style.display = 'block';
            }
        }, 1000);
        isRunning = true;
        // showExercise();
    }
}

function pauseTimer() {
    clearInterval(timer);
    clearInterval(stretchInterval);
    isRunning = false;

    localStorage.setItem('remainingTime', remainingTime);
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
}



function resetTimer() {
    clearInterval(timer); 
    clearInterval(stretchInterval); 
    remainingTime = 25 * 60;
    isRunning = false; 
    completedExercises = []; 
    localStorage.removeItem('remainingTime'); 
    localStorage.removeItem('completedExercises'); 
    updateTimerDisplay(); 
    document.getElementById('completed-exercises-list').innerHTML = ''; 
}

document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateTimerDisplay();
