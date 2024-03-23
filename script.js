let timer;
let isRunning = false;
let remainingTime = parseInt(localStorage.getItem('remainingTime')) || 25 * 60; // Inicialmente definido como 25 minutos
let stretchInterval;
let completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || [];

const stretchExercises = [
    "Levante-se e estique os braços acima da cabeça por 10 segundos.",
    "Incline o tronco para os lados, mantendo o alongamento por 15 segundos em cada lado.",
    "Gire os ombros para trás em movimentos circulares por 20 segundos.",
    "Faça uma rotação no pescoço, movendo-o suavemente para a esquerda e para a direita por 10 segundos.",
    "Estique as pernas e toque os dedos dos pés, mantendo a posição por 15 segundos.",
];

function updateTimerDisplay() {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
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
                completeExerciseButton.style.display = 'block';
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

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Atualiza a exibição do temporizador e dos exercícios completados
updateTimerDisplay();
completedExercises.forEach(exercise => {
    addToCompletedExercises(exercise);
});
