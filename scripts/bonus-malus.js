///////Vitesse///
let vitesse = 200;
let facile = document.querySelector(".facile");
let moyen = document.querySelector(".moyen");
let difficile = document.querySelector(".difficile");
let extreme = document.querySelector(".extreme");

facile.addEventListener("click", () => {
  vitesse = 200;
});
moyen.addEventListener("click", () => {
  vitesse = 100;
});
difficile.addEventListener("click", () => {
  vitesse = 80;
});
extreme.addEventListener("click", () => {
  vitesse = 50;
});

////Malus////
import Nouriture from "./class/Nouriture.js";

let divmalusX = 0;
let divmalusY = 0;

// function creermalus() {
//   let malus = document.createElement("div");
//   malus.classList.add("malus");

//   plateau.appendChild(malus);
//   positionmalus();
// }
// creermalus();

// function positionmalus() {
//   let divmalus = document.querySelector(".malus");

//   divmalusX = Math.floor(Math.random() * (48 - 1) + 1);
//   divmalusY = Math.floor(Math.random() * (25 - 1) + 1);

//   divmalus.style.gridColumn = divmalusX;
//   divmalus.style.gridRow = divmalusY;
// }
let newchampi = new Nouriture("malus");
newchampi.creerNouriture("malus");

setInterval(() => {
  // positionmalus();
  newchampi.positionAleatoire();
  newchampi.positionNourriture("malus");
}, 10000);

function activermalus() {
  let serpent = document.querySelectorAll(".serpent");
  let x = serpent[0].style.gridColumn;
  let y = serpent[0].style.gridRow;
  divmalusX = newchampi.positionX;
  divmalusY = newchampi.positionY;

  if (x == divmalusX && y == divmalusY) {
    console.log("manger champipi");
    console.log(vitesse, "normal");
    vitesse = vitesse / 2;
    console.log(vitesse, "/2");

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
