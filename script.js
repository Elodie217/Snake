let body = document.body;
let serpent = document.querySelector(".serpent");
let x = 1;
let y = 1;
// serpent.style.gridArea = `1 / 1 / 2 / 2`;
serpent.style.gridColumn = x;
serpent.style.gridRow = y;

document.addEventListener("keydown", (event) => {
  let nomTouche = event.key;

  switch (nomTouche) {
    case "ArrowUp":
      //   serpent.style.gridArea = `1 / 2 / 2 / 3`;
      serpent.style.gridColumn = x;
      serpent.style.gridRow = y - 1;
      break;
    case "ArrowDown":
      //   serpent.style.gridArea = `2 / 1 / 3 / 2`;
      serpent.style.gridColumn = x;
      serpent.style.gridRow = y + 1;
      break;
    case "ArrowRight":
      //   serpent.style.gridArea = `1 / 2 / 2 / 3`;
      serpent.style.gridRow = x + 1;
      serpent.style.gridColumn = y;
      break;
    case "ArrowLeft":
      //   serpent.style.gridArea = `1 / 2 / 2 / 3`;
      serpent.style.gridRow = x - 1;
      serpent.style.gridColumn = y;
      break;
  }
});
