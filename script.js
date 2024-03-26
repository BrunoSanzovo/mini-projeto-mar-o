let timer;
let isRunning = false;
let remainingTime = parseInt(localStorage.getItem('remainingTime')) || 1 * 10; // Inicialmente definido como 25 minutos
let stretchInterval;
let completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || [];


// ------------------------- API ------------------


let stretchExercises = [] // 10 itens
let currentExercise = 0
let offset = 0


function getExercises(){
    fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset, {
      method: 'GET',
      headers: { 'X-Api-Key': 'YA665kE9/flpbq+9GR3qTQ==sfiekgLFv0pmoEeg'},
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

// Pasamos una función anónima que llamará a las funciones timerExercice y displayExercises
buttonExercise.addEventListener('click', function() {
    timerExercice();
    displayExercises();
});

function timerExercice(){
    remainingTime = 1 * 5;
    startTimer(remainingTime);
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



function updateTimerDisplay() {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const colonDisplay = document.getElementById('colon');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesDisplay.style.fontSize = '80px'; 
    secondsDisplay.style.fontSize = '80px'; 
    colonDisplay.style.fontSize = '80px';
    if (remainingTime === 0) {
        AlertSound()
    }
}


function AlertSound() {
    let audio = new Audio ('./assets/Bell.mp3')
    audio.play()
}




function addToCompletedExercises(exercise) {
    const completedExercisesList = document.getElementById('completed-exercises-list');
    const li = document.createElement('li');
    li.textContent = exercise;
    const img = document.createElement('img');
    img.src = 'assets/tarefaicon01.jpeg';
    img.alt = 'checkmark';
    img.className = 'task-img';
    li.appendChild(img);
    completedExercisesList.appendChild(li);

    // Adiciona classe automaticamente para destacar exercícios concluídos após 20 segundos
    setTimeout(() => {
        li.classList.add('completed');
    }, 4 * 60 * 1000); // 4 minutos
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            remainingTime--;
            if (remainingTime >= 0) {
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                // completeExerciseButton.style.display = 'block';
            }
        }, 1000);
        isRunning = true;
        showExercise();
    }
}

function pauseTimer() {
    clearInterval(timer);
    clearInterval(stretchInterval);
    isRunning = false;

    // Salva os dados no localStorage ao pausar o temporizador
    localStorage.setItem('remainingTime', remainingTime);
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
}



function showExercise() {
    let index = 0;
    stretchInterval = setInterval(() => {
        const currentExercise = stretchExercises[index];
        addToCompletedExercises(currentExercise);
        index = (index + 1) % stretchExercises.length;
    }, 5 * 60 * 1000); // 5 minutos
}

function resetTimer() {
    clearInterval(timer); // Limpa o temporizador
    clearInterval(stretchInterval); // Limpa o intervalo de alongamento
    remainingTime = 25 * 60; // Reinicia o tempo restante para o valor inicial
    isRunning = false; // Define o estado de execução como falso
    completedExercises = []; // Limpa a lista de exercícios concluídos
    localStorage.removeItem('remainingTime'); // Remove os dados do localStorage
    localStorage.removeItem('completedExercises'); // Remove os dados do localStorage
    updateTimerDisplay(); // Atualiza a exibição do temporizador
    document.getElementById('completed-exercises-list').innerHTML = ''; // Limpa a lista de exercícios completados
}

document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Atualiza a exibição do temporizador e dos exercícios completados
updateTimerDisplay();
completedExercises.forEach(exercise => {
    addToCompletedExercises(exercise);
});