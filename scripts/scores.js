//const $buttonRules = document.getElementById("rules");
//const $buttonScore = document.querySelector(".button-scores");
const $rows = document.querySelectorAll(".row");

let rows = [];

class Registry {
    constructor(name,score,date){
        this.name = name;
        this.score = score;
        this.date = date;
    }
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
    //console.log(rows);
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

document.body.addEventListener('load',viewRegistry());

