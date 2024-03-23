const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const completedExercisesList = document.getElementById('completed-exercises-list');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let timer;
let isRunning = false;
let remainingTime = 25 * 60; // Inicialmente definido como 25 minutos
let stretchInterval;
let completedExercises = [];

const stretchExercises = [
    "Faça 100x flexões",
    "Faça 100x abdominais",
    "100x agachamentos",
    "Levante-se e estique os braços acima da cabeça por 10 segundos.",
    "Incline o tronco para os lados, mantendo o alongamento por 15 segundos em cada lado.",
    "Gire os ombros para trás em movimentos circulares por 20 segundos.",
    "Faça uma rotação no pescoço, movendo-o suavemente para a esquerda e para a direita por 10 segundos.",
    "Estique as pernas e toque os dedos dos pés, mantendo a posição por 15 segundos.",
    "Sente-se e estique os braços para frente, mantendo a posição por 20 segundos."
];

// Recupera os dados do localStorage, se houver
let storedRemainingTime = localStorage.getItem('remainingTime');
let storedCompletedExercises = localStorage.getItem('completedExercises');

// Verifica se há dados salvos e atribui-os às variáveis correspondentes
remainingTime = storedRemainingTime ? parseInt(storedRemainingTime) : 25 * 60;
completedExercises = storedCompletedExercises ? JSON.parse(storedCompletedExercises) : [];

// Atualiza a exibição do temporizador e dos exercícios completados
updateTimerDisplay();
updateCompletedExercisesList();

function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function updateCompletedExercisesList() {
    completedExercisesList.innerHTML = ''; // Limpa a lista antes de adicionar os exercícios

    completedExercises.forEach(exercise => {
        addToCompletedExercises(exercise);
    });
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
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

function updateTimer() {
    remainingTime--;
    if (remainingTime >= 0) {
        updateTimerDisplay();
    } else {
        clearInterval(timer);
        completeExerciseButton.style.display = 'block';
    }
}

function showExercise() {
    let index = 0;
    stretchInterval = setInterval(() => {
        const currentExercise = stretchExercises[index];
        addToCompletedExercises(currentExercise);
        index = (index + 1) % stretchExercises.length;
    }, 5 * 60 * 1000); // 5 minutos
}

function completeExercise() {
    const currentExercise = stretchExercises.find(exercise => exercise === exerciseDescription.textContent.replace('Exercício de Alongamento: ', ''));
    if (currentExercise && !completedExercises.includes(currentExercise)) {
        completedExercises.push(currentExercise);
        addToCompletedExercises(currentExercise);
    }
    completeExerciseButton.style.display = 'none';

    // Salva os dados no localStorage ao completar um exercício
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
}

function addToCompletedExercises(exercise) {
    const li = document.createElement('li');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const timeElapsed = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    li.textContent = `${exercise} - Tempo: ${timeElapsed}`;
    const img = document.createElement('img');
    img.src = 'assets/tarefaicon01.jpeg';
    img.alt = 'checkmark';
    img.className = 'task-img';
    li.appendChild(img);
    completedExercisesList.appendChild(li);

    // Adiciona classe automaticamente para destacar exercícios concluídos após 20 segundos
    setTimeout(() => {
        li.classList.add('completed');
    }, 60000);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);

resetButton.addEventListener('click', resetTimer);

function resetTimer() {
    clearInterval(timer); // Limpa o temporizador
    clearInterval(stretchInterval); // Limpa o intervalo de alongamento
    remainingTime = 25 * 60; // Reinicia o tempo restante para o valor inicial
    isRunning = false; // Define o estado de execução como falso
    completedExercises = []; // Limpa a lista de exercícios concluídos
    localStorage.removeItem('remainingTime'); // Remove os dados do localStorage
    localStorage.removeItem('completedExercises'); // Remove os dados do localStorage
    updateTimerDisplay(); // Atualiza a exibição do temporizador
    updateCompletedExercisesList(); // Atualiza a lista de exercícios concluídos
}
