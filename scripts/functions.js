const toggleRules = () => {
    if ($containerRules.style.display == "flex") {
        $containerRules.style.display = "none";
        $containerSelect.style.opacity = "1";
        $header.style.opacity = "1";
        $buttonRules.style.display = "inline-block";
        $selection.forEach(element => {
            element.childNodes[1].style.pointerEvents = "all"
        });
    } else {
        $containerRules.style.display = "flex";
        $containerSelect.style.opacity = "0.5";
        $containerSelect.pointerEvents = "all";
        $header.style.opacity = "0.5";
        $buttonRules.style.display = "none";
        $selection.forEach(element => {
            element.childNodes[1].style.pointerEvents = "none"
        });
    }
}

const startGame = async(e) => {
    $containerSelect.style.display = "none";
    $buttonRules.style.display = "none";
    $players.style.display = "flex";
    if (e.target.parentElement.classList.contains("setOne")) {
        you = 0;
    } else if (e.target.parentElement.classList.contains("setTwo")) {
        you = 1;
    } else if (e.target.parentElement.classList.contains("setThree")) {
        you = 2;
    }
    $player[you].classList.add("active");
    setTimeout(function() {
        computerSelect();
    },1000);
}

const computerSelect = () => {
    let aleatorio = Math.floor(Math.random() * 3);
    $computer[0].classList.remove("none");
    $computer[aleatorio + 1].classList.add("active");
    house = aleatorio;
    calculateResult();
}

const calculateResult = () => {
    let $active = document.querySelectorAll(".active");
    if (you == house) {
        $result.firstElementChild.innerHTML = "MATCHED";
    } else if ((you == 0 && house == 2) || (you == 1 && house == 0) || (you == 2 && house == 1)) {
        $result.firstElementChild.innerHTML = "YOU WIN";
        $active[0].classList.add("win");
        addScore();
    } else if ((house == 0 && you == 2) || (house == 1 && you == 0) || (house == 2 && you == 1)) {
        $result.firstElementChild.innerHTML = "YOU LOSE";
        contador = 0;
        $score.children[1].innerHTML = contador;
        $active[1].classList.add("win");
    }
    $result.style.display = "inline";
}

const addScore = () => {
    contador += 1;
    $score.children[1].innerHTML = contador;
}

const playAgain = () => {
    let $active = document.querySelectorAll(".active");

    $active[0].classList.remove("win");
    $active[1].classList.remove("win");
    $computer[house + 1].classList.remove("active");
    $player[you].classList.remove("active");
    $computer[0].classList.add("none");
    $result.style.display = "none";
    $players.style.display = "none";
    $containerSelect.style.display = "flex";
    $buttonRules.style.display = "inline-block";
}