const $buttonRules = document.getElementById("rules");
const $buttonScores = document.getElementById("scores");
const $containerRules = document.querySelector(".containerRules");
const $containerSelect = document.querySelector(".containerSelect");
const $containerScores = document.querySelector(".containerScores");
const $selection = document.querySelectorAll(".selection");
const $header = document.querySelector(".header");
const $close = document.querySelector(".close");
const $username = document.querySelector(".username");
const $atras = document.querySelector(".atras");
const $guardar = document.querySelector(".guardar");


$buttonRules.addEventListener("click", toggleRules);
$close.addEventListener("click", toggleRules);

const $players = document.querySelector(".players");
const $player = document.querySelectorAll(".player");
const $computer = document.querySelectorAll(".computer");

$containerSelect.addEventListener("click", startGame);

const $result = document.querySelector(".result");
const $score = document.querySelector(".containerScore");
const $again = document.querySelector(".again");

let you = 0;
let house = 0;
let rows = [];
let contador = (localStorage.getItem("score")) ? localStorage.getItem("score") : 0;
let contadorAux = 0;
let indexRegistry;
$score.children[1].innerHTML = contador;

$again.addEventListener("click", playAgain);

$guardar.addEventListener("click",()=>{ UpdateRegistry(indexRegistry)});

getRegistry();
