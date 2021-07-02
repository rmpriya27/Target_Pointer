let boardElement = document.querySelector(".boardArea");
let circleElement= document.getElementById("circle");
let cursor = document.getElementById("pointer");
let pointsElement=document.getElementById("points");
let timerElement=document.getElementById("timer");
let resultElement=document.getElementsByClassName("result");
let restartElement=document.getElementById("restart");
let nextLevel=document.getElementById("next_level");
let prevLevel=document.getElementById("prev_level");


let speed=5;

//to change the speed to next level
function speedUp(){
  speed+=1;
  startGame();
}
//to change the speed to prev level
function speedDown(){
  speed-=1;
  startGame();
}
//to track cursor movement and place cat image in cursor position
function trackCursorMove(e){
  //console.log(e);
  if(e.clientX > (boardElement.clientWidth) || e.clientY >(boardElement.clientHeight)){
    
  } else{
    cursor.setAttribute("style", "top: "+(e.clientY-60)+"px; left: "+(e.clientX-60)+"px;")
  }

}
function randomizeVelocity(v){
  let angle = 2 * Math.PI * Math.random();

  return{
    x: v * Math.cos(angle),
    y: v * Math.sin(angle),
  };
}
//to move cute mouse to some random position
let h = boardElement.clientHeight - 40;
let w = boardElement.clientWidth - 40;


function moveImage() {
  posX += v.x;
  posY += v.y;

  if (posX >= w) {
    //posX -= w;
    v.x=-v.x;
  } else if (posX <= 0) {
    //posX += w;
    v.x=-v.x;
  }
  
  if (posY >= h) {
   // posY -= h;
   v.y=-v.y;
  } else if (posY <= 0) {
    //posY += h;
    v.y=-v.y;
  }

  circleElement.setAttribute("style","top:"+posY +"px;left:"+posX+"px");
}

//calculate the number of clicks on cute mouse
let circleCounter;
function onCircleClick(){ 
  circleCounter+=1;
  let cNote = document.getElementById("cAudio");
  cNote.currentTime=0;
  cNote.play();
  pointsElement.textContent=circleCounter;
}

//play backgroundMusic 
function playBackgroundMusic(){
  let backgroundMusic=document.getElementById("backgroundMusic");
  if(backgroundMusic.currentTime===0){
    backgroundMusic.play();
  }else{
    backgroundMusic.currentTime=0;
    backgroundMusic.pause();  
  }
  
}

function displayResult(){
  for(i=0;i<resultElement.length;i++){
    resultElement[i].style.visibility="visible";
  }
  let resultData=document.getElementById("result_data");
  let resultScore=document.getElementById("result_score");
  let speedData;
  if(circleCounter>8){
    resultData.innerHTML="Wow Congratulations " + userName + "!!!!You are really super fast and accurate!!!!.";
  }else if(circleCounter>0 && circleCounter<=8){
    resultData.innerHTML="Congratulations " + userName + "!!!!! You Won!!!";
  }else{
    resultData.innerHTML="Sorry " + userName + "!!! Better luck next time";
    nextLevel.setAttribute("disabled",true);
  }
  if(speed===5){
    speedData="This is the starting level.....";
  }
  else if(speed>5 && speed<8){
    speedData="You are in the beginner speed levels.....";
  }
  else if(speed>=8 && speed<13){
    speedData="You are in the intermediate speed levels.....";
  }
  else if(speed>=13 && speed<15){
    speedData="You are in the higher speed levels.....";
  }
  else if(speed===15){
    speedData="Hurray!!!! You have reached the maximum speed level.....";
  }
  resultScore.innerHTML="Score: " + circleCounter +"---- Time taken: "+ timerElement.textContent + "<br>"+"Speed Level: "+ speed+"<br>"+speedData;
}

let userName;
function getUserName(){
  userName=prompt("Enter your name:");
  if(userName!=null){
    userName=userName.trim();
  }
  if(userName ==="" || userName===null){
    userName="Anonymous";
  }
}
let posX;
let posY;
let v;
function startGame(){
  circleCounter=0;
  pointsElement.textContent=circleCounter;
  for(i=0;i<resultElement.length;i++){
    resultElement[i].style.visibility="hidden";
  };
  //to disable the previous and next speed level buttons
  if(speed===15){
    nextLevel.setAttribute("disabled",true);
  }else{
    nextLevel.removeAttribute("disabled");
  };
  if(speed===5){
    prevLevel.setAttribute("disabled",true);
  }else{
    prevLevel.removeAttribute("disabled");
  };
  posX = 400;
  posY = 250;
  v = randomizeVelocity(speed);
  let imageMoveId=setInterval(moveImage,1000/16);
  //count down timer
  let timer=0;
  timerElement.textContent = timer;
  let countdown = setInterval(function() {
    timer++;
    timerElement.textContent = timer;
   if (timer >= 15){
    clearInterval(countdown);
    clearInterval(imageMoveId);
    boardElement.removeEventListener("mousemove",trackCursorMove);
    displayResult();
   } 
  }, 1000);
}

//document.addEventListener("DOMContentLoaded", playBackgroundMusic);
document.addEventListener("DOMContentLoaded",getUserName);
circleElement.addEventListener("click",onCircleClick);
boardElement.addEventListener("click",trackCursorMove);
restartElement.addEventListener("click",startGame);
nextLevel.addEventListener("click",speedUp);
prevLevel.addEventListener("click",speedDown);
startGame();