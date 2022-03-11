let count = 0;

const anim = document.querySelector(".anim");
anim.src = "./background_elements/ezgif.gif";

//fontion principale

function Moustique(x, y, Xdir, Ydir) {
  let mosquito1 = document.createElement("span"); // on cree un span vide,
  document.body.appendChild(mosquito1); // on le colle au body
  mosquito1.innerHTML =
    '<img class="mosquito" src="./image/eeeee.gif" alt="moustique " />'; // je met dedans mon image
  let mosquito = mosquito1.querySelector(".mosquito"); // je selectionne mon image /!\ attention au nom de classes, il faut selectionner la class à l'intérieur du span

  this.x = x;
  this.y = y;
  this.Xdir = Xdir;
  this.Ydir = Ydir;
  this.move = function () {
    // met a jour
    mosquito.style.top = this.x + "px";
    mosquito.style.left = this.y + "px";
  };
  this.update = () => {
    if (this.x > window.innerHeight - mosquito.width || this.x < 5) {
      this.Xdir = -this.Xdir;
    }
    let plusoumoins = Math.random() < 0.5 ? -1 : 1;
    this.x += this.Xdir;
    if (this.y > window.innerWidth - mosquito.width || this.y < 5) {
      this.Ydir = -this.Ydir;
    }
    this.y += this.Ydir;

    this.move();
  };

  // tuer des moustiques _______________________________________________________________________________________
  const score = document.querySelector("h1");

  mosquito.addEventListener("click", () => {
    new Audio("./Sons/smash.mp3").play();
    console.log("splaaash");

    count++;
    console.log(count);
    mosquito.remove();

    let tapette = document.querySelector(".tapette");
    tapette.style.visibility = "hidden";

    let splash = document.querySelector(".splash");
    splash.style.visibility = "visible";
    score.textContent = count;

    function reset() {
      tapette.style.visibility = "visible";
      splash.style.visibility = "hidden";
    }

    setTimeout(reset, 1000);
  });
}

// generate Arrow of mosquitos and pud them in a new spans
let arrMosquito = [];
function ArrOfmosquitos(nb) {
  let rand = Math.floor(Math.random() * nb + 3);
  for (let i = 0; i < rand; i++) {
    let xx = Math.random() * (innerHeight - 100) + 10;
    let yy = Math.random() * (innerWidth - 10) + 10;
    let xxdir = Math.random() * 10 + 5;
    let yydir = Math.random() * 10 + 5;
    arrMosquito[i] = new Moustique(xx, yy, xxdir, yydir);
  }
  setInterval(() => {
    arrMosquito.forEach((mos) => {
      mos.update();
    });
  }, 35);
}
ArrOfmosquitos(10);

//pour injecter le tableau  et jouer toutes les 20ms ___________________________________________________________________________________________________________________________________________
// peut faire la vitesse

//mouse move pour la souris et le controle son gauche droite ____________________________________________________________________________________________
window.addEventListener("mousemove", (e) => {
  let droite = document.querySelector(".droite");
  let gauche = document.querySelector(".gauche");

  let tapette = document.querySelector(".tapette");
  let splash = document.querySelector(".splash");
  let X = e.pageX - 100;
  let Y = e.pageY - 100;

  if (e.pageX > window.innerWidth / 2) {
    // droite.pause();
    // gauche.play();
  } else if (e.pageX < window.innerWidth / 2) {
    // droite.play();
    // gauche.pause();
  }

  tapette.style.left = X + "px";
  tapette.style.top = Y + "px";
  splash.style.left = X + "px";
  splash.style.top = Y + "px";
});
const message = document.querySelector(".message");
// BONUS: __________________________________________________________;
const bonus = document.querySelector(".bonus");

bonus.addEventListener("click", () => {
  progressBar = document.querySelector("h3");
  setTimeout(killAll, 1000);
  bonus.remove();
  message.remove();
  progressBar.style.visibility = "hidden";
  new Audio("./Sons/woosh.mp3").play();
  let explosion = document.createElement("span"); // on cree un span vide,
  document.body.appendChild(explosion); // on le colle au body
  explosion.innerHTML =
    '<img class="tornado" src="./image/tornado.gif" alt="" />';
});

// les heures qui défilent
let nb = Math.floor(Math.random() * 9 + 2);
let randomCount2 = Math.floor(Math.random() * 300 + 160);
let randomCount3 = Math.floor(Math.random() * (480 - 250) + 250);
let randomCount1 = Math.floor(Math.random() * 100 - 70) + 50;

let counter = 0;
let minutes = 0;
let heures = 0;
let prog = 360;

const horloge = document.querySelector("h2");
let intervalId = setInterval(() => {
  counter++;
  console.log(counter);
  progressBar = document.querySelector("h3");
  prog--;
  progressBar.style.width = prog + "px";
  minutes = counter % 60;
  //console.log(` 0${heures} : ${minutes} eee  *${counter}`);
  if (minutes === 0) {
    heures++;
  }
  if (counter === 360) {
    progressBar.style.visibility = "hidden";
    bonus.style.visibility = "hidden";

    message.remove();
  }
  if (counter === 479) {
    new Audio("./Sons/routine.mp3").play();
  }

  if (minutes <= 9) {
    horloge.textContent = ` 0${heures} : 0${minutes}`;
  } else horloge.textContent = ` 0${heures} : ${minutes}`;

  if (counter === randomCount1) {
    ArrOfmosquitos(Math.floor(Math.random() * 9 + 2));
  }

  if (counter === randomCount2) {
    ArrOfmosquitos(Math.floor(Math.random() * 8 + 2));
  }
  if (counter === randomCount3) {
    ArrOfmosquitos(Math.floor(Math.random() * 7 + 2));
  }

  if (counter === 480) {
    //clearInterval(intervalId);
    clearspan = document.querySelectorAll(".mosquito");
    let mosLeft = clearspan.length;
    killAll();
    horloge.remove();

    score = document.querySelector("h1");
    let finalScore = score.innerHTML;
    score.style.visibility = "hidden";
    const png = document.querySelector(".png");
    png.src = ".";
    const final = document.createElement("span"); // on cree un span vide,
    document.body.appendChild(final);

    final.innerHTML =
      '<img class="final" src="./background_elements/background.gif" alt="final" />';

    let Scorefinal = document.createElement("span");
    document.body.appendChild(Scorefinal);
    Scorefinal.classList.add("Scorefinal");

    if (finalScore < mosLeft * 3) {
      Scorefinal.textContent =
        " You killed < " +
        finalScore +
        " >mosquitos during this night and you missed <" +
        mosLeft +
        "> you are going to douiller today ";
    } else {
      Scorefinal.textContent =
        " You killed < " +
        finalScore +
        "> mosquitos during this night and you missed < " +
        mosLeft +
        "> you will probably have a nice day ";
    }
  }
}, 125);

// pour jeudi :
//appuyer sur la tapette, et supprimer tous les spans
// pour l'animation finale : la mettre par dessus en hidden avec de l'opacité peut etre, et à 8h et changer la proprieté
function killAll() {
  clearspan = document.querySelectorAll(".mosquito");
  clearspan.forEach((el) => {
    el.remove();
  });
}
