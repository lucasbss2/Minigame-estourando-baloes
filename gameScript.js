let timerID = null 
function startGame () {
    let url = window.location.search;
    let game_level = url.replace('?','');
    if (game_level == 1) { 
        time_seconds = 120;
    }
    if (game_level == 2) { 
        time_seconds = 60;
    }
    if (game_level == 3 ) { 
        time_seconds = 30;
    }

document.getElementById('stopwatch').innerHTML = time_seconds;

let balloons_quantity = 80;
create_balloons (balloons_quantity);

document.getElementById('int_balloons').innerHTML = balloons_quantity;
document.getElementById('popped_balloons').innerHTML = 0
stopwatch_counting (time_seconds + 1);
}

function stopwatch_counting (seconds) {
    seconds = seconds - 1;
    if (seconds == -1){
        stop_game(); 
        game_over();
        return false;
    }
    document.getElementById('stopwatch').innerHTML = seconds;
    timerID = setTimeout("stopwatch_counting(" + seconds + ")", 1000);
}
function game_over () {
        avoid_clicking ();
    alert ('Fim de jogo, você não conseguiu estourar todos os balões a tempo.');
} stop_game ();

function create_balloons (balloons_quantity) {
    for (let f = 1; f <= balloons_quantity; f++) {
        let balloon = document.createElement("img");
        balloon.src = 'images/small_blue_balloon.png';
        balloon.style.margin = '12px';
        balloon.id = 'b' + f;
        balloon.onclick = function () { pop (this); }
        document.getElementById('scenario').appendChild (balloon);
    }
}

function pop (e){
    let id_balloon = e.id;
    document.getElementById(id_balloon).setAttribute("onclick","")
    document.getElementById(id_balloon).src = 'images/popped_small_blue_balloon.png';
    points(-1);
}

function points (action) {
    let int_balloons = document.getElementById("int_balloons").innerHTML;
    let popped_balloons = document.getElementById("popped_balloons").innerHTML;
    int_balloons = parseInt (int_balloons);
    popped_balloons = parseInt (popped_balloons);
    int_balloons = int_balloons + action;
    popped_balloons = popped_balloons - action;
    document.getElementById('int_balloons').innerHTML = int_balloons;
    document.getElementById('popped_balloons').innerHTML = popped_balloons;
    game_status (int_balloons);
}

function game_status (int_balloons){
    if (int_balloons == 0) {
        alert ('Parabéns, você estourou todos os balões!');
        stop_game();
    }
}
function stop_game () {
    clearTimeout(timerID);
}
function avoid_clicking () {
    let f = 1; 
    while (document.getElementById ('b'+f) ) { 
        document.getElementById('b' + f).setAttribute('onclick',''); 
        f++;
    }
}