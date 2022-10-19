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

const selectGame = (e) => {
    selectgame = e.target.children[0].value;
    localStorage.setItem("game", selectgame);
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
        computerSelect(localStorage.getItem("game"));
    },1000);
}

const computerSelect = (game) => {
    let cant = (game == 1) ? 3 : 5;
    let aleatorio = Math.floor(Math.random() * cant);
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
        $active[1].classList.add("win");
        contadorAux = contador;
        contador = 0;
        localStorage.setItem("score", contador);
        $score.children[1].innerHTML = contador;
        openSave(contadorAux);
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

const getRegistry = async() => {
    let scores;
    let users;
    await fetch('http://localhost:3000/scores')
        .then((res) => res.json())
        .then((data) => {
            scores = data;
        });
    await fetch('http://localhost:3000/users')
    .then((res) => res.json())
    .then((data) => {
        users = data;
    });
    scores.forEach((element,index) => {
        let data = new Registry(
            users[index].name,
            element.score,
            element.date
        )
        rows.push(data);
    })
}

const orderRegistry = () => {
    rows.sort((a,b) => {
        return b.score - a.score;
    })
}

const viewRegistry = async() => {
    await getRegistry();
    orderRegistry();
    rows.forEach((element,index) => {
        $rows[index].childNodes[3].innerHTML = element.name;
        $rows[index].childNodes[5].innerHTML = element.score;
        $rows[index].childNodes[7].innerHTML = element.date;
    })
    rows = [];
}

const openSave = (contador) => {
    let exec = false;
    indexRegistry = verifyRegistry(contador);
    if (indexRegistry > -1) {
        beforeSave();
        exec = true;
    }
    indexRegistry += 1;
    return exec
}

const beforeSave = () => {
    $again.style.pointerEvents = "none";
    $atras.style.pointerEvents = "none";
    setTimeout(() => {
        $buttonRules.style.display = "none";
        $buttonScores.style.display = "none"
        $header.style.opacity = "0.5";
        $players.style.opacity = "0.5";
        $containerScores.style.display = "block";
    },2000)
}

const UpdateRegistry = async(index) => {
    await updateRegistryScore(index);
    await updateRegistryUser(index,$username);
    contadorAux = 0;
}

const verifyRegistry = (cont) => {
    let index = rows.findIndex(({score}) => score == 0);
    if (index == -1 && cont > 0 && cont != undefined) {
        let valor;
        rows.forEach((element,ind) => {
            valor = valor == null ? element.score : valor;
            if (element.score <= valor) {
                valor = element.score;
                index = ind;
            }
        });
    }
    return (index);
}

const updateRegistryScore = async(index) => {  
    await fetch(`http://localhost:3000/scores/${index}`, {
        method: 'PATCH',
        body: JSON.stringify({
            score: contadorAux,
            date: getDate(),
            userId: index,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}


const updateRegistryUser = async(index,username) => {  
    await fetch(`http://localhost:3000/users/${index}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name: username.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

const getDate = () => {
    let hoy = new Date(Date.now());
    hoy = hoy.toLocaleDateString();
    return hoy;
}
