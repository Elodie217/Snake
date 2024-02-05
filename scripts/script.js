//Local storage//
let highScoreaffichage = document.querySelector(".highScore");
let highScore = localStorage.getItem("high-score");
highScoreaffichage.innerText = highScore;

//Varaibles
let body = document.body;
let x = 3;
let y = 3;
let interval = "";
let plateau = document.querySelector(".plateau");
let direction = "";
let serpent = [];

let vitesse = 200;

/////Start*/
function start() {
  plateau.innerHTML += "<div class=serpent></div>";
  plateau.innerHTML += "<div class=serpent></div>";

  x = 3;
  y = 3;
  serpent = document.querySelectorAll(".serpent");
  serpent[0].style.gridColumn = x;
  serpent[0].style.gridRow = y;
  serpent[1].style.gridColumn = x - 1;
  serpent[1].style.gridRow = y;
}

start();

/////Déplacement//////
function myStop() {
  clearInterval(interval);
}

document.addEventListener("keydown", (event) => {
  let nomTouche = event.key;

  if (nomTouche == "ArrowUp" && direction !== "down") {
    myStop();
    direction = "up";

    interval = setInterval(() => {
      y = y - 1;
      mouvementserpent();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowDown" && direction !== "up") {
    myStop();
    direction = "down";
    interval = setInterval(() => {
      y = y + 1;
      mouvementserpent();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowRight" && direction !== "left") {
    myStop();
    direction = "right";
    interval = setInterval(() => {
      x = x + 1;
      mouvementserpent();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowLeft" && direction !== "right") {
    myStop();
    direction = "left";
    interval = setInterval(() => {
      x = x - 1;
      mouvementserpent();
      mangerfruit();
    }, vitesse);
  }
});

////Serpent////

//////////////////
function creerserpent() {
  let newSerpent = document.createElement("div");
  newSerpent.classList.add("serpent", "invisibility");
  plateau.appendChild(newSerpent);
  setTimeout(() => {
    newSerpent.classList.remove("invisibility");
  }, vitesse);
  positionserpent();
  return newSerpent;
}

function mouvementserpent() {
  if (x <= 48 && x > 0 && y <= 25 && y > 0) {
    positionserpent();
  } else {
    gameover();
  }
}

function positionserpent() {
  for (let i = serpent.length - 1; i > 0; i--) {
    serpent = document.querySelectorAll(".serpent");
    serpent[i].style.gridColumn = serpent[i - 1].style.gridColumn;
    serpent[i].style.gridRow = serpent[i - 1].style.gridRow;
  }

  // Réglage du premier élément du corps du serpent à la position actuelle du serpent
  serpent[0].style.gridColumn = x;
  serpent[0].style.gridRow = y;
}

/////////////////

////Fruits////
let fruitX = "";
let fruitY = "";

function creerfruit() {
  let fruit = document.querySelector(".fruit");

  fruitX = Math.floor(Math.random() * (48 - 1) + 1);
  fruitY = Math.floor(Math.random() * (25 - 1) + 1);

  fruit.style.gridColumn = fruitX;
  fruit.style.gridRow = fruitY;
}

creerfruit(); // A mettre dans une fonction start //

let point = document.querySelector(".points");
let conterpoint = 0;
// let highScoreaffichage = document.querySelector(".highScore");
// let highScore = 0;

function mangerfruit() {
  if (x == fruitX && y == fruitY) {
    creerfruit();
    conterpoint++;
    point.innerText = conterpoint;
    meilleurScore();
    creerserpent();
  }
}

function meilleurScore() {
  if (conterpoint > highScore) {
    highScore = conterpoint;
    highScoreaffichage.innerText = highScore;
    localStorage.setItem("high-score", highScore);
  }
}

////Game Over////
function gameover() {
  myStop();
  alert("T'es mort !");
  reset();
  conterpoint = 0;
  point.innerText = conterpoint;
}

function reset() {
  serpent = document.querySelectorAll(".serpent");

  serpent.forEach((element) => {
    element.remove();
  });
  direction = "";

  start();
  mouvementserpent();
}
