let modeprairie = document.querySelector(".modeprairie");
let modenuit = document.querySelector(".modenuit");
let backgroundphoto = document.querySelector("body");
let backgroundcolor = document.querySelectorAll(".backgroundcolor");
let logo = document.querySelector(".logo");
let pomme = document.querySelector(".pomme");
let pommeplateau = document.querySelector(".fruit");
let bcgplateau = document.querySelector(".plateau");
let couleurserpent = document.querySelectorAll(".serpent");
let couleurhover = document.querySelectorAll(".couleurhover");
let borderpopup = document.querySelector(".reglePopUp");
let nommode = document.querySelector(".mode");
let scorescouleurs = document.querySelectorAll(".pointsstyle");

couleurserpent.forEach((element) => {
  element.classList.add("serpentvert");
});

couleurhover.forEach((element) => {
  element.classList.add("couleurclairehover");
  element.classList.remove("couleursombrehover");
});

///////Mode Prairie///////

modeprairie.addEventListener("click", () => {
  nommode.innerText = "Prairie";

  backgroundcolor.forEach((element) => {
    element.style.backgroundColor = "#72c65d";
  });

  backgroundphoto.style.backgroundImage = "url(medias/2.png)";
  logo.src = "medias/logoclair2.png";
  pomme.src = "medias/pommerouge.png";
  pommeplateau.style.backgroundImage = "url(medias/pommerouge.png)";
  bcgplateau.style.backgroundColor = "#72c65dbf";

  scorescouleurs.forEach((element) => {
    element.style.color = "#177400";
    element.style.textShadow = "1px 2px 20px #ffffff";
  });

  couleurhover.forEach((element) => {
    element.classList.add("couleurclairehover");
    element.classList.remove("couleursombrehover");
  });

  couleurserpent.forEach((element) => {
    element.classList.add("serpentvert");
    element.classList.remove("serpentnoir");
  });

  couleurmode = "serpentvert";
  mauvaisecouleurmode = "serpentnoir";
  borderpopup.style.border = "2px solid #177400";
});

///////Mode Nuit///////

modenuit.addEventListener("click", () => {
  nommode.innerText = "Nuit";

  backgroundcolor.forEach((element) => {
    element.style.backgroundColor = "#1E494D";
  });

  backgroundphoto.style.backgroundImage = "url(medias/peaudeserpent.png)";
  logo.src = "medias/logosombre2.png";
  pomme.src = "medias/pommedore.png";
  pommeplateau.style.backgroundImage = "url(medias/pommedore.png)";
  bcgplateau.style.backgroundColor = "rgb(30 73 77 / 76%)";

  scorescouleurs.forEach((element) => {
    element.style.color = "#ffffff";
    element.style.textShadow = "1px 2px 20px black";
  });

  couleurhover.forEach((element) => {
    element.classList.remove("couleurclairehover");
    element.classList.add("couleursombrehover");
  });

  couleurserpent.forEach((element) => {
    element.classList.remove("serpentvert");
    element.classList.add("serpentnoir");
  });

  couleurmode = "serpentnoir";
  mauvaisecouleurmode = "serpentvert";
  borderpopup.style.border = "2px solid black";
});
