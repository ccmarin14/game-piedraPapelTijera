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
    $players.style.display = "flex";
    if (e.target.parentElement.classList.contains("setOne")) {
        you = 0;
    } else if (e.target.parentElement.classList.contains("setTwo")) {
        you = 1;
    } else if (e.target.parentElement.classList.contains("setThree")) {
        you = 2;
    } else if (e.target.parentElement.classList.contains("setFour")) {
        you = 3;
    } else if (e.target.parentElement.classList.contains("setFive")) {
        you = 4;
    } 
    $player[you].classList.add("active");
    setTimeout(function() {
        computerSelect();
    },1000);
}

const computerSelect = () => {
    let aleatorio = Math.floor(Math.random() * 5);
    $computer[0].classList.remove("none");
    $computer[aleatorio + 1].classList.add("active");
    house = aleatorio;
    displayResult();
}

const displayResult = () => {
    let $active = document.querySelectorAll(".active");
    let result = calculateResult(you,house);
    if (result == "match") {
        $result.firstElementChild.innerHTML = "MATCHED";
    } else if (result == "win") {
        $result.firstElementChild.innerHTML = "YOU WIN";
        $active[0].classList.add("win");
        addScore();
    } else if (result == "lose") {
        $result.firstElementChild.innerHTML = "YOU LOSE";
        contador = 0;
        localStorage.setItem("score", contador);
        $score.children[1].innerHTML = contador;
        $active[1].classList.add("win");
    }
    $result.style.display = "inline";
}

const addScore = () => {
    contador = parseInt(contador) + 1;
    localStorage.setItem("score", contador);
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
}

const calculateResult = (you,house) => {
    let result;
    if (house == you) {
        result = "match"
    } else {
        switch (you) {
            case 0:
                result = (house == 2 || house == 4) ? "win" : "lose";
                break;
            case 1:
                result = (house == 0 || house == 3) ? "win" : "lose";
                break;
            case 2:
                result = (house == 1 || house == 4) ? "win" : "lose";
                break;
            case 3:
                result = (house == 2 || house == 0) ? "win" : "lose";
                break;
            case 4:
                result = (house == 3 || house == 1) ? "win" : "lose";
                break;
        }
    }
    return result;
}