let body = document.body;
let serpent = document.querySelector(".serpent");
let x = 3;
let y = 3;
let interval = "";

serpent.style.gridColumn = x;
serpent.style.gridRow = y;

function myStop() {
  clearInterval(interval);
}

document.addEventListener("keydown", (event) => {
  let nomTouche = event.key;

  switch (nomTouche) {
    case "ArrowUp":
      myStop();

      interval = setInterval(() => {
        y = y - 1;
        mouvementserpent();
      }, 100);

      break;
    case "ArrowDown":
      myStop();

      interval = setInterval(() => {
        y = y + 1;
        mouvementserpent();
      }, 100);

      break;
    case "ArrowRight":
      myStop();

      interval = setInterval(() => {
        x = x + 1;
        mouvementserpent();
      }, 100);

      break;
    case "ArrowLeft":
      myStop();

      interval = setInterval(() => {
        x = x - 1;
        mouvementserpent();
      }, 100);

      break;
  }
});

function mouvementserpent() {
  if (x <= 48 && x > 0 && y <= 25 && y > 0) {
    serpent.style.gridColumn = x;
    serpent.style.gridRow = y;
  } else {
    gameover();
  }
}

////Fruits////
function creerfruit() {
  let fruit = document.querySelector(".fruit");

  let fruitX = Math.floor(Math.random() * (48 - 1) + 1);
  let fruitY = Math.floor(Math.random() * (25 - 1) + 1);

  fruit.style.backgroundColor = "red";
  fruit.style.gridColumn = fruitX;
  fruit.style.gridRow = fruitY;
}
creerfruit();

////Game Over////
function gameover() {
  myStop();
  alert("T'es mort !");
  reset();
}

function reset() {
  x = 3;
  y = 3;
  mouvementserpent();
}
