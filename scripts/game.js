const $buttonRules = document.getElementById("rules");
const $buttonScores = document.getElementById("scores");
const $containerRules = document.querySelector(".containerRules");
const $containerSelect = document.querySelector(".containerSelect");
const $selection = document.querySelectorAll(".selection");
const $header = document.querySelector(".header");
const $close = document.querySelector(".close");
const $containerScores = document.querySelector(".containerScores");

$buttonRules.addEventListener("click", toggleRules);
$close.addEventListener("click", toggleRules);

const $players = document.querySelector(".players");
const $player = document.querySelectorAll(".player");
const $computer = document.querySelectorAll(".computer");

$containerSelect.addEventListener("click", startGame);

const $result = document.querySelector(".result");
const $score = document.querySelector(".containerScore");
const $again = document.querySelector(".again");

$again.addEventListener("click", playAgain);

let you = 0;
let house = 0;
let rows = [];
let contador = (localStorage.getItem("score")) ? localStorage.getItem("score") : 0;
$score.children[1].innerHTML = contador;

//await getRegistry();
//orderRegistry();
