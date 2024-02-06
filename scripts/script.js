//Varaibles
let body = document.body;
let x = 3;
let y = 3;
let interval = "";
let plateau = document.querySelector(".plateau");
let direction = "";
let serpent = [];
let fruitX = "";
let fruitY = "";
let couleurmode = "serpentvert";
let mauvaisecouleurmode = "serpentnoir";

////Vitesse////
let vitesse = 200;
let facile = document.querySelector(".facile");
let moyen = document.querySelector(".moyen");
let difficile = document.querySelector(".difficile");
let extreme = document.querySelector(".extreme");
let menuniveaux = document.querySelector(".niveaux");
let niveauxchoisi = "facile";

facile.addEventListener("click", () => {
  vitesse = 200;
  menuniveaux.innerText = "Niveau facile";
  niveauxchoisi = "facile";
  updatehightscore();
});
moyen.addEventListener("click", () => {
  vitesse = 100;
  menuniveaux.innerText = "Niveau moyen";
  niveauxchoisi = "moyen";
  updatehightscore();
});
difficile.addEventListener("click", () => {
  vitesse = 80;
  menuniveaux.innerText = "Niveau difficile";
  niveauxchoisi = "difficile";
  updatehightscore();
});
extreme.addEventListener("click", () => {
  vitesse = 50;
  menuniveaux.innerText = "Niveau extême";
  niveauxchoisi = "extreme";
  updatehightscore();
}); ///Je pense qu'on peut faire un objet ici ///

//Local storage//
let highScoreaffichage = document.querySelector(".highScore");
let highScore = 0;

function updatehightscore() {
  switch (niveauxchoisi) {
    case "facile":
      highScore = localStorage.getItem("high-score-facile");
      break;
    case "moyen":
      highScore = localStorage.getItem("high-score-moyen");
      break;
    case "difficile":
      highScore = localStorage.getItem("high-score-difficile");
      break;
    case "extreme":
      highScore = localStorage.getItem("high-score-extreme");
      break;
  }
  highScoreaffichage.innerText = `Meilleur score ${highScore}`;
}
updatehightscore();

/////Start/////
function start() {
  plateau.innerHTML += "<div class=serpent></div>";
  plateau.innerHTML += "<div class=serpent></div>";

  x = 3;
  y = 3;
  serpent = document.querySelectorAll(".serpent");

  serpent[0].classList.add(couleurmode);
  serpent[0].classList.remove(mauvaisecouleurmode);
  serpent[1].classList.add(couleurmode);
  serpent[1].classList.remove(mauvaisecouleurmode);

  serpent[0].style.gridColumn = x;
  serpent[0].style.gridRow = y;
  serpent[1].style.gridColumn = x - 1;
  serpent[1].style.gridRow = y;
  creerfruit();
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
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowDown" && direction !== "up") {
    myStop();
    direction = "down";
    interval = setInterval(() => {
      y = y + 1;
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowRight" && direction !== "left") {
    myStop();
    direction = "right";
    interval = setInterval(() => {
      x = x + 1;
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowLeft" && direction !== "right") {
    myStop();
    direction = "left";
    interval = setInterval(() => {
      x = x - 1;
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  }
});

////Serpent////

function creerserpent() {
  let newSerpent = document.createElement("div");
  newSerpent.classList.add("serpent", "invisibility", couleurmode);
  newSerpent.classList.remove(mauvaisecouleurmode);

  plateau.appendChild(newSerpent);
  setTimeout(() => {
    newSerpent.classList.remove("invisibility");
  }, vitesse);
  positionserpent();
  return newSerpent;
}

function sortieSerpent() {
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

  serpent[0].style.gridColumn = x;
  serpent[0].style.gridRow = y;
}

function serpentSeMordLaQueue() {
  for (let i = serpent.length - 1; i > 0; i--) {
    if (
      serpent[0].style.gridColumn === serpent[i].style.gridColumn &&
      serpent[0].style.gridRow === serpent[i].style.gridRow
    ) {
      gameover();
    }
  }
}

////Fruits////

function creerfruit() {
  let fruit = document.querySelector(".fruit");

  fruitX = Math.floor(Math.random() * (48 - 1) + 1);
  fruitY = Math.floor(Math.random() * (25 - 1) + 1);

  fruit.style.gridColumn = fruitX;
  fruit.style.gridRow = fruitY;
}

let point = document.querySelector(".points");
let conterpoint = 0;

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
    highScoreaffichage.innerText = `Meilleur score ${highScore}`;
    switch (niveauxchoisi) {
      case "facile":
        localStorage.setItem("high-score-facile", highScore);
        break;
      case "moyen":
        localStorage.setItem("high-score-moyen", highScore);
        break;
      case "difficile":
        localStorage.setItem("high-score-difficile", highScore);
        break;
      case "extreme":
        localStorage.setItem("high-score-extreme", highScore);
        break;
    }

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

////Reset////
function reset() {
  serpent = document.querySelectorAll(".serpent");

  serpent.forEach((element) => {
    element.remove();
  });
  direction = "";

  start();
}
