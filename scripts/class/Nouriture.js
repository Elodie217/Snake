export default class Nouriture {
  positionX;
  positionY;

  get positionX() {
    return this.positionX;
  }
  get positionY() {
    return this.positionY;
  }

  positionAleatoire() {
    let randomX = Math.floor(Math.random() * (48 - 1) + 1);
    let randomY = Math.floor(Math.random() * (25 - 1) + 1);

    this.positionX = randomX;
    this.positionY = randomY;
  }

  creerNouriture(classNouriture) {
    let divPlateau = document.querySelector(".plateau");
    let nouriture = document.createElement("div");
    nouriture.classList.add(classNouriture);

    nouriture.style.gridColumn = this.positionX;
    nouriture.style.gridRow = this.positionY;
    divPlateau.appendChild(nouriture);
  }

  positionNourriture(classNouriture) {
    document.querySelector(`.${classNouriture}`).style.gridColumn =
      this.positionX;
    document.querySelector(`.${classNouriture}`).style.gridRow = this.positionY;
  }
}
