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

const startGame = (e) => {
    $containerSelect.style.display = "none";
    $players.style.display = "flex";
    if (e.target.parentElement.classList.contains("setOne")) {
        $player[0].classList.add("active");
    } else if (e.target.parentElement.classList.contains("setTwo")) {
        $player[1].classList.add("active");
    } else if (e.target.parentElement.classList.contains("setThree")) {
        $player[2].classList.add("active");
    }
    computerSelect();
}

const computerSelect = () => {
    let aleatorio = Math.floor(Math.random() * 3);
    $computer[0].classList.remove("none");
    $computer[aleatorio + 1].classList.add("active");
}