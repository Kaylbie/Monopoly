let gameloop = new GameLoop();
let gamesettings ;
let linkedlist;
let playersJs;

window.onload = function() {
    gamesettings = new GameSettings();
    linkedlist = new LinkedList();
    playersJs= new Players();
    gamesettings.firstload();
}

window.onresize = function() {
    
}

function startGame() {
    gameloop.start();
}
function settings() {
    gamesettings.start();
}
function back() {
    gamesettings.back();
}
function add() {
    gamesettings.add();
    gamesettings.load();
    //linkedlist.append("Start", "normal", "0", 200);
    //linkedlist.append("Laukelis", "normal", "0", 75);
    //linkedlist.append("Pavadinimas", "normal", "0", 200);
    //linkedlist.append(200);
    //console.log(linkedlist.toArray());
}
function deleteall(){
    gamesettings.deleteall();
}
function preset1() {
    gamesettings.preset1();
    gamesettings.load();
}
function save() {
    gamesettings.save();
    gamesettings.load();
}
function remove() {
    gamesettings.remove();
    gamesettings.load();
}
function csvform() {
    gamesettings.csvform();
}
function quitgame(){
    gameloop.quitgame();
}
function roll(){
    gameloop.roll();
}