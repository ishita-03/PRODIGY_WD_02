// Stopwatch logic: start/pause toggle, lap, reset
let startTime = 0;
let elapsed = 0;
let timerInterval = null;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms){
  const totalSeconds = Math.floor(ms / 1000);
  const hh = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const mm = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const ss = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function updateDisplay(){
  display.textContent = formatTime(elapsed);
}

function startTimer(){
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(()=> {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 200);
  startBtn.textContent = 'Pause';
  startBtn.setAttribute('aria-pressed', 'true');
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer(){
  clearInterval(timerInterval);
  timerInterval = null;
  startBtn.textContent = 'Start';
  startBtn.setAttribute('aria-pressed', 'false');
}

function resetTimer(){
  clearInterval(timerInterval);
  timerInterval = null;
  elapsed = 0;
  updateDisplay();
  startBtn.textContent = 'Start';
  startBtn.setAttribute('aria-pressed', 'false');
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lapsList.innerHTML = '';
}

function recordLap(){
  const li = document.createElement('li');
  const timeText = document.createElement('span');
  timeText.textContent = formatTime(elapsed);

  const idx = document.createElement('span');
  idx.textContent = `Lap ${lapsList.children.length + 1}`;
  idx.style.opacity = '0.7';
  idx.style.fontSize = '0.95rem';
  li.appendChild(idx);
  li.appendChild(timeText);
  lapsList.prepend(li);
  // Keep only last 50 laps just in case
  if(lapsList.children.length > 50) lapsList.removeChild(lapsList.lastChild);
}

// Button events
startBtn.addEventListener('click', () => {
  if(!timerInterval) startTimer();
  else pauseTimer();
});

lapBtn.addEventListener('click', () => {
  if(!timerInterval) return;
  recordLap();
});

resetBtn.addEventListener('click', () => {
  resetTimer();
});

// init
updateDisplay();
