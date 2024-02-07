let fenetrePopup = document.querySelector(".reglePopUp");
let fondFlou = document.querySelector(".flou");
let croixFermee = document.querySelector(".croixfermee");
let boutonCommentJouer = document.querySelector(".btnCommentJouer");

function ouvrirpopup() {
  fenetrePopup.classList.toggle("invisibility");
  fondFlou.classList.toggle("invisibility");
}
function fermerCroix() {
  fenetrePopup.classList.toggle("invisibility");
  fondFlou.classList.toggle("invisibility");
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
