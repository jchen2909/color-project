import {highestStreak, currentStreak, renderHeader, increaseCurrentStreak, updateHighestStreak, resetCurrentStreak } from "./header.js";

renderHeader();
renderGameBoard();

function renderGameBoard(){
  let gameBoardHTML = '';
  for(let i = 0; i < 7; i++){
    gameBoardHTML += `
    <div class="tile tile${i}" data-icon-id="${i}"></div>
    `
  }
  document.querySelector('.game-board').innerHTML = gameBoardHTML;
  const correct = Math.floor(Math.random()*7);

  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  for(let i = 0; i < 7; i++){
    if(correct == i){
      continue;
    }
    document.querySelector(`.tile${i}`).style.backgroundColor =  `rgb(${red}, ${green}, ${blue})`
    document.querySelector(`.tile${i}`).innerHTML = `
      <img class="icons hidden wrong-icon${i}" src="creative-wrong-icon-3d-render-png.webp">
    `
  }

  
  const sign = Math.random() > 0.5 ? -1 : 1;
  let alter = 20 * sign;
  const dice = Math.random();

  if(dice < 1/3){
    if(red + alter < 0 || red + alter > 255){
      alter *= -1;
    }
    red += alter;
  }
  else if(dice < 2/3){
    if(green + alter < 0 || green + alter > 255){
      alter *= -1;
    }
    green += alter;
  }
  else{
    if(blue + alter < 0 || blue + alter > 255){
      alter *= -1;
    }
    blue += alter;
  }

  document.querySelector(`.tile${correct}`).innerHTML = `
    <img class="icons hidden correct-icon" src="checkmark-png-line-29.png">
  `
  document.querySelector(`.tile${correct}`).style.backgroundColor =  `rgb(${red}, ${green}, ${blue})`;
  document.querySelector(`.tile${correct}`).classList.add('correct');
  

  document.querySelectorAll('.tile').forEach((element)=>{
    element.addEventListener('click', ()=>{
      let time;
      if(document.querySelector('.fast-mode-button').classList.contains('off')){
        time = 1500;
      }
      else{
        time = 500;
      }
      if(element.classList.contains('correct')){
        increaseCurrentStreak();

        if(currentStreak > highestStreak){
          updateHighestStreak();
        }

        document.querySelector('.correct-icon').classList.remove('hidden');

        setTimeout(()=>{
          renderHeader();
          renderGameBoard();
        }, time);
        
      }
      else{
        resetCurrentStreak();
        const id = element.dataset.iconId;
        document.querySelector(`.wrong-icon${id}`).classList.remove('hidden');
  
        document.querySelector('.correct-icon').classList.remove('hidden');
        

        setTimeout(()=>{
          renderHeader();
          renderGameBoard();
        }, time)
        
      }
    })
  })
}