
export let highestStreak;
export let currentStreak = 0;
export let speed = 'off';
export function renderHeader(){
  highestStreak = Number(localStorage.getItem('highest')) || 0;
  document.querySelector('.header').innerHTML = `
    <div class="highest-streak">Highest Streak: ${highestStreak}</div>
    <div class="current-streak">Current Streak: ${currentStreak}</div>
    <button class="fast-mode-button ${speed}">Fast Mode</button>
  `;

  document.querySelector('.fast-mode-button').addEventListener('click', (event)=>{
    switchSpeed();
    renderHeader();
  })
}

function saveHighestToStorage(){
  localStorage.setItem('highest', highestStreak);
}

export function increaseCurrentStreak(){
  currentStreak++;
}

export function updateHighestStreak(){
  highestStreak = currentStreak;
  saveHighestToStorage();
}

export function resetCurrentStreak(){
  currentStreak = 0;
}

export function switchSpeed(){
  if(speed === 'off'){
    speed = 'on';
  }
  else{
    speed = 'off';
  }
}