//Class
import Nouriture from "./class/Nouriture.js";
let newpomme = new Nouriture();
newpomme.positionAleatoire();
newpomme.creerNouriture("fruit");

//Varaibles
let body = document.body;
let x = 3;
let y = 3;
let interval = "";
let plateau = document.querySelector(".plateau");
let direction = "";
let serpent = [];
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
});

//Local storage//
let highScoreaffichage = document.querySelector(".highScore");
let highScore = 0;

function updatehightscore() {
  let nomjoueurstocker = "";
  switch (niveauxchoisi) {
    case "facile":
      nomjoueurstocker = localStorage.getItem("joueur-high-score-facile");
      highScore = localStorage.getItem("high-score-facile");
      break;
    case "moyen":
      nomjoueurstocker = localStorage.getItem("joueur-high-score-moyen");
      highScore = localStorage.getItem("high-score-moyen");
      break;
    case "difficile":
      nomjoueurstocker = localStorage.getItem("joueur-high-score-difficile");
      highScore = localStorage.getItem("high-score-difficile");
      break;
    case "extreme":
      nomjoueurstocker = localStorage.getItem("joueur-high-score-extreme");
      highScore = localStorage.getItem("high-score-extreme");
      break;
  }
  highScoreaffichage.innerText = `${nomjoueurstocker} ${highScore}`;

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

  document.querySelector(".commandesJeux").classList.remove("invisibility");
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
    document.querySelector(".commandesJeux").classList.add("invisibility");

    interval = setInterval(() => {
      y = y - 1;
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowDown" && direction !== "up") {
    myStop();
    direction = "down";
    document.querySelector(".commandesJeux").classList.add("invisibility");

    interval = setInterval(() => {
      y = y + 1;
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowRight" && direction !== "left") {
    myStop();
    direction = "right";
    document.querySelector(".commandesJeux").classList.add("invisibility");

    interval = setInterval(() => {
      x = x + 1;
      sortieSerpent();
      serpentSeMordLaQueue();
      mangerfruit();
    }, vitesse);
  } else if (nomTouche == "ArrowLeft" && direction !== "right") {
    myStop();
    direction = "left";
    document.querySelector(".commandesJeux").classList.add("invisibility");

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

let modeprairie = document.querySelector(".modeprairie");
let modenuit = document.querySelector(".modenuit");
modeprairie.addEventListener("click", () => {
  couleurserpent.forEach((element) => {
    element.classList.add("serpentvert");
    element.classList.remove("serpentnoir");
    couleurmode = "serpentvert";
    mauvaisecouleurmode = "serpentnoir";
  });
});
modenuit.addEventListener("click", () => {
  couleurserpent.forEach((element) => {
    element.classList.add("serpentnoir");
    element.classList.remove("serpentvert");
    couleurmode = "serpentnoir";
    mauvaisecouleurmode = "serpentvert";
  });
});

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

let point = document.querySelector(".points");
let conterpoint = 0;

function mangerfruit() {
  let fruitX = document.querySelector(".fruit").style.gridColumn;
  let fruitY = document.querySelector(".fruit").style.gridRow;
  if (x == fruitX && y == fruitY) {
    newpomme.positionAleatoire();
    newpomme.positionNourriture("fruit");
    conterpoint++;
    point.innerText = `${nomjoueur} ${conterpoint}`;
    meilleurScore();
    creerserpent();
  }
}

//////////Mailleur Score ///////////
function meilleurScore() {
  if (conterpoint > highScore) {
    highScore = conterpoint;
    highScoreaffichage.innerText = `${nomjoueur} ${highScore}`;
    let stockagenomjoueur = nomjoueur;

    switch (niveauxchoisi) {
      case "facile":
        localStorage.setItem("joueur-high-score-facile", stockagenomjoueur);
        localStorage.setItem("high-score-facile", highScore);
        break;
      case "moyen":
        localStorage.setItem("joueur-high-score-moyen", stockagenomjoueur);
        localStorage.setItem("high-score-moyen", highScore);
        break;
      case "difficile":
        localStorage.setItem("joueur-high-score-difficile", stockagenomjoueur);
        localStorage.setItem("high-score-difficile", highScore);
        break;
      case "extreme":
        localStorage.setItem("joueur-high-score-extreme", stockagenomjoueur);

        localStorage.setItem("high-score-extreme", highScore);
        break;
    }

    localStorage.setItem("high-score", highScore);

  }
}

////Game Over////
function gameover() {
  myStop();
  affichergameover();
}

////Reset////
function reset() {
  conterpoint = 0;
  point.innerText = conterpoint;

  serpent = document.querySelectorAll(".serpent");

  serpent.forEach((element) => {
    element.remove();
  });
  direction = "";
  newpomme.positionAleatoire();

  start();
}

////////////////Malus///////////////////////////

let divmalusX = 0;
let divmalusY = 0;

let newchampi = new Nouriture("malus");
newchampi.creerNouriture("malus");

setInterval(() => {
  // positionmalus();
  newchampi.positionAleatoire();
  newchampi.positionNourriture("malus");
}, 10000);

function activermalus() {
  divmalusX = newchampi.positionX;
  divmalusY = newchampi.positionY;

  if (x == divmalusX && y == divmalusY) {
    vitesse = vitesse / 2;

    setTimeout(function () {
      vitesse = vitesse * 2;
    }, 3000);
    newchampi.positionAleatoire();
    newchampi.positionNourriture("malus");
  }
}

let intervalmalus = setInterval(() => {
  activermalus();
}, 20);

//////////////////Pop Up////////////////
let fenetrePopup = document.querySelector(".reglePopUp");
let fondFlou = document.querySelector(".flou");
let croixFermee = document.querySelector(".croixfermee");
let boutonCommentJouer = document.querySelector(".btnCommentJouer");

boutonCommentJouer.addEventListener("click", ouvrirpopup);
croixFermee.addEventListener("click", fermerCroix);

function ouvrirpopup() {
  console.log("ouvrir popup");
  fenetrePopup.classList.remove("invisibility");
  fondFlou.classList.remove("invisibility");
}
function fermerCroix() {
  fenetrePopup.classList.add("invisibility");
  fondFlou.classList.add("invisibility");
}

///////////Page d'accueil//////////////

let pagedaccueil = document.querySelector(".pagedaccueil");
let btnStart = document.querySelector(".btnStart");
let inputnom = document.querySelector(".inputnom");
let nomjoueur = null;

btnStart.addEventListener("click", () => {
  nomjoueur = inputnom.value;
  pagedaccueil.classList.add("invisibility");
});

//////////Game Over/////////////

let gameoverpopup = document.querySelector(".gameover");
function affichergameover() {
  gameoverpopup.classList.remove("invisibility");
  let scorefinal = document.querySelector(".scorefinal");
  scorefinal.innerText = `Ton score est de ${conterpoint} points`;
}

let btnrejouer = document.querySelector(".btnrejouer");

btnrejouer.addEventListener("click", () => {
  reset();
  gameoverpopup.classList.add("invisibility");
});
