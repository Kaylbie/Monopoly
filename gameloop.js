class GameLoop {

    constructor() {
       
        this.loop = true;
        this.playerturn;
    }

    

    toggleScreen(id,toggle) {
        let element = document.getElementById(id);
        let display = ( toggle ) ? 'block' : 'none';
        element.style.display = display;
    }
    start(){
        if(linkedlist.size()!=16)
        {
            alert("Gameboard not ready");
        }
        else{
            this.toggleScreen('start-screen',false);
            this.toggleScreen('game-board',true);
            this.toggleScreen('gameplay-screen', true);
            this.firstload();
            //gamesettings.preset1();
            gamesettings.load();
            this.updatescoreboard();
            this.setactive(playersJs.returnnumber(this.playerturn));
            this.game();
        }
    }
    quitgame(){
        if(confirm("Are you sure you want to quit ?"))
        {
            gamesettings.deleteall();
            this.toggleScreen('start-screen',true);
            this.toggleScreen('game-board',false);
            this.toggleScreen('gameplay-screen', false);
        }
    }
    roll(){
        
        if(playersJs.returnSkip(this.playerturn)==0){
            var roll=1 + Math.floor(Math.random() * 6);
            var nowpos=playersJs.returnpos(this.playerturn);
            let node;
            let list;
            alert("Rolled: "+roll);
            nowpos+=roll;
            if(nowpos>16){
                nowpos-=16;
            }
            playersJs.updateposition(this.playerturn, nowpos);
            gamesettings.loadplayers();
            node=linkedlist.getElementAt(nowpos-1);
            if(linkedlist.returnstate(node)=="Add"){
                
                playersJs.updateAddscore(this.playerturn, linkedlist.returnelement(node));
                alert("+ $"+linkedlist.returnelement(node));
                //console.log(playersJs.returnelement(node));
            }
            else if(linkedlist.returnstate(node)=="Remove"){
                playersJs.updateRemovescore(this.playerturn, linkedlist.returnelement(node));
                alert("- $"+linkedlist.returnelement(node));
            }
            else if(linkedlist.returnstate(node)=="Skip"){
                playersJs.updateskipturn(this.playerturn, linkedlist.returnelement(node));
                alert("Skip "+linkedlist.returnelement(node));
            }
            else if(linkedlist.returnstate(node)=="Move"){
                nowpos+=linkedlist.returnelement(node);
                alert("Move "+linkedlist.returnelement(node));
                if(nowpos>16){
                    nowpos-=16;
                }
                playersJs.updateposition(this.playerturn, nowpos);
                gamesettings.loadplayers();
                list=linkedlist.getElementAt(nowpos-1);
                if(linkedlist.returnstate(list)=="Add"){
                    playersJs.updateAddscore(this.playerturn, linkedlist.returnelement(list));
                    alert("+ $"+linkedlist.returnelement(list));
                }
                else if(linkedlist.returnstate(list)=="Remove"){
                    playersJs.updateRemovescore(this.playerturn, linkedlist.returnelement(list));
                    alert("- $"+linkedlist.returnelement(list));
                }
            }
            
            //playersJs.updatescore(this.playerturn, linkedlist.returnelement(node));
            this.updatescoreboard();
            if(playersJs.returnelement(this.playerturn)>=gamesettings.returnwinscore())
            {
                alert(playersJs.returnColor(this.playerturn)+" won");
                this.gameover();
            }
            else{
                this.setinactive(playersJs.returnnumber(this.playerturn));
                this.playerturn=playersJs.returnnext(this.playerturn);
                this.setactive(playersJs.returnnumber(this.playerturn));
            }
            
        }
        else{
            playersJs.updateSkipTurn(this.playerturn);
            this.setinactive(playersJs.returnnumber(this.playerturn));
            this.playerturn=playersJs.returnnext(this.playerturn);
            this.setactive(playersJs.returnnumber(this.playerturn));
            alert("Skipped");
        }
    }
    gameover(){
        gamesettings.deleteall();
        this.toggleScreen('start-screen',true);
        this.toggleScreen('settings-screen',false);
        this.toggleScreen('game-board',false);
        this.toggleScreen('gameplay-screen',false);
        window.location.reload();
    }
    firstload(){
        this.playerturn=playersJs.getHead();
        var div= document.getElementById("scoreboards");
        div.innerHTML='';
        for(let i=1; i<=3; i++){
            var span = document.createElement("span");
            span.innerHTML='$200';
            span.setAttribute("class", "");
            span.setAttribute("id", "playerscore" + i);
            document.getElementById("scoreboards").appendChild(span);
        }
        if(gamesettings.returnplayers()==1){
            document.getElementById("playerscore3").remove();
            document.getElementById("playerscore2").remove();
        }
        else if(gamesettings.returnplayers()==2){
            document.getElementById("playerscore3").remove(); 
        }
    }
    updatescoreboard(){
        let playernode=playersJs.getHead();
        
        for(let i=1; i<=playersJs.size(); i++){
            var div = document.getElementById("playerscore"+playersJs.returnnumber(playernode));
            div.innerHTML="$"+playersJs.returnelement(playernode);
            playernode=playersJs.returnnext(playernode);
        }
    }
    setactive(number){
        var div= document.getElementById("playerscore"+number);
        div.setAttribute("class", "active");
    }
    setinactive(number){
        var div= document.getElementById("playerscore"+number);
        div.setAttribute("class", "");
    }
    init() {
    }

    resize() {
    }

    update() {
    }

    render() {
    }
}
