////Malus////
let divmalusX = 0;
let divmalusY = 0;

function creermalus() {
  let malus = document.createElement("div");
  malus.classList.add("malus");

  plateau.appendChild(malus);
  positionmalus();
}
creermalus();

function positionmalus() {
  let divmalus = document.querySelector(".malus");

  divmalusX = Math.floor(Math.random() * (48 - 1) + 1);
  divmalusY = Math.floor(Math.random() * (25 - 1) + 1);

  divmalus.style.gridColumn = divmalusX;
  divmalus.style.gridRow = divmalusY;
}
setInterval(() => {
  positionmalus();
}, 10000);

function activermalus() {
  if (x == divmalusX && y == divmalusY) {
    vitesse = vitesse / 2;
    setTimeout(function () {
      vitesse = vitesse * 2;
    }, 3000);
    positionmalus();
  }
}

let intervalmalus = setInterval(() => {
  activermalus();
}, 20);
