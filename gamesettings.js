class GameSettings{
    constructor() {
        this.fps = 60;
        this.players = 3;
        this.winscore = 10000;
        this.startingscore=0;
      
    }
    start() {
        this.toggleScreen('start-screen',false);
        this.toggleScreen('settings-screen',true);
        this.toggleScreen('game-board',true);
        
    }
    save(){
        let score = document.forms["myForm3"]["fwinscore"].value;
        let playersc = document.getElementById("fplayers");
        if(score==""){
            alert("Score must be filled out");
        }
        else if(score<=this.startingscore)
        {
            alert("Score must be bigger than " + this.startingscore);
        }
        else{
            this.winscore=score;
            if(playersc.value!="sel-players")
            {
                this.players=playersc.value;
                this.reloadplayers();
            }
            alert("Win score: " + this.winscore+" Players: "+this.players);
        }
        
    }
    add(){
    let name = document.forms["myForm"]["fname"].value;
    let state=document.getElementById("fstate");
    //let param=document.forms["myForm"]["fparam"].value;
    let value=document.forms["myForm"]["fvalue"].value;
    let position=document.forms["myForm"]["fpos"].value;
    if(linkedlist.size()===16){
        alert("Board full");
        
    }
    else{
        if (name == "") {
            alert("Name must be filled out");
            
          }
          if (state.value == "state-type") {
              alert("Select state");
              
          }
          if (value == "") {
              alert("Value must be filled out");
              
          }
          else{
            if(position=="")
            {
                
                linkedlist.append(name, state.value, value);
                alert("Added");
                
            }
            else{
                if(position>16&&position<0){
                    alert("Wrong position");
                }
                else{
                    if(linkedlist.insert(name, state.value, value, position-0))
                    {
                        alert("Added");
                    }
                    else
                    {
                        alert("Error");
                    }
                    
                }
               
            }
              
          }
    }
    
        //var div = document.createElement("div");
        //div.setAttribute("class", "cell");
        //div.setAttribute("id", "cell2");
        //document.getElementById("main").appendChild(div);
        //var p=document.createElement("p");
        //p.innerHTML="Next";
       // document.getElementById("cell2").appendChild(p);
        //var p=document.createElement("p");
        //p.innerHTML="$200";
        //document.getElementById("cell2").appendChild(p);
        //alert (document.getElementById("childID").parentElement.id);
        //div.style.width = "100px";
        //div.style.height = "100px";
        //div.style.background = "red";
        //div.style.color = "white";
       
    }
    remove(){
        let name = document.forms["myForm2"]["fname"].value;
        let pos = document.forms["myForm2"]["fpos"].value;
        if(name==""&&pos=="")
        {
            alert("Fill name or position");
        }
        else if(name!=""&&pos!=""){
            alert("Fill only name or position");
        }
        else if(name==""&&pos!=""){
            if(pos>16||pos<0)
            {
                alert("Wrong position");
            }
            else{
                linkedlist.removeAt(pos-1);
                alert("Removed");
            }
           
        }
        else if(name!=""&&pos==""){
            let index=1;
            while(index!=-1)
            {
                index=linkedlist.indexOf(name);
                if(index==-1){
                    break;
                }
                else{
                    linkedlist.removeAt(index);
                    alert("Removed at "+(index+1)+" position");
                }   
            } 
        } 
    }
    toggleScreen(id,toggle) {
        let element = document.getElementById(id);
        let display = ( toggle ) ? 'block' : 'none';
        element.style.display = display;
    }
    back(){
        this.toggleScreen('settings-screen',false);
        this.toggleScreen('start-screen',true);
        this.toggleScreen('game-board',false);
    }
    resetcells(){
        for(let i=1; i<=16; i++){
            var div = document.getElementById("name"+i);
            div.innerHTML='-';
            div = document.getElementById("price"+i);
            div.innerHTML='$';
        }
    }
    load(){
        this.resetcells();
        //clear div
        //var divai= document.getElementById("main");
        //divai.innerHTML='';
        let node=linkedlist.getHead();
        //load structure
        for(let i=1; i<=linkedlist.size(); i++){
            var div = document.getElementById("name"+i);
            div.innerHTML=linkedlist.returnname(node);

            div = document.getElementById("price"+i);
            if(linkedlist.returnstate(node)==="Add"){
                div.innerHTML="+$"+linkedlist.returnelement(node);
            }
            else if(linkedlist.returnstate(node)==="Remove"){
                div.innerHTML="-$"+linkedlist.returnelement(node);
            }
            else if(linkedlist.returnstate(node)==="Move"){
                div.innerHTML=linkedlist.returnelement(node);
            }
            else{
                div.innerHTML=linkedlist.returnelement(node);
            }
            
            node=linkedlist.returnnext(node);
        }
        this.loadplayers();
    }
    loadplayers(){

        let playernode=playersJs.getHead();
        for(let i=1; i<=this.players; i++){
            var divai= document.getElementById("player"+playersJs.returnnumber(playernode)).remove();
            var span = document.createElement("span");
            span.setAttribute("class", "dot");
            span.setAttribute("id", "player" + playersJs.returnnumber(playernode));
            document.getElementById("plrbox" + playersJs.returnpos(playernode)).appendChild(span);
            
            playernode=playersJs.returnnext(playernode);
        }
    }
    reloadplayers(){
        var playercount=this.players;
        playersJs.removeAt(0);
        playersJs.removeAt(0);
        playersJs.removeAt(0);
        playersJs.append(1, 0, 0, "red", 1);
        playersJs.append(2, 0, 0, "green", 1);
        playersJs.append(3, 0, 0, "yellow", 1);
        var div= document.getElementById("plrbox1");
        div.innerHTML='';
        let playernode=playersJs.getHead();
        for(let i=1; i<=3; i++){
            var span = document.createElement("span");
            span.setAttribute("class", "dot");
            span.setAttribute("id", "player" + playersJs.returnnumber(playernode));
            document.getElementById("plrbox1").appendChild(span);
            playernode=playersJs.returnnext(playernode);
        }
        if(this.players==1){
            document.getElementById("player3").remove();
            document.getElementById("player2").remove();
            playersJs.removeAt(2);
            playersJs.removeAt(1);
        }
        else if(this.players==2){
            document.getElementById("player3").remove();
            playersJs.removeAt(2);
        }
    }
    returnplayers(){
        return this.players;
    }
    deleteall(){
        while(linkedlist.size()!=0){
            linkedlist.removeAt(0);
        }
        this.load();
        
        console.log(linkedlist.size());
    }
    preset1(){
        if(linkedlist.size()==0)
        {
            linkedlist.append("Start", "Add", 200);
            linkedlist.append("Gatve1", "Remove", 75);
            linkedlist.append("Move2", "Move", 5);
            linkedlist.append("Gatve3", "Remove", 125);
            linkedlist.append("Gatve4", "Add", 150);
            linkedlist.append("Skip5", "Skip", 2);
            linkedlist.append("Gatve6", "Add", 200);
            linkedlist.append("Gatve7", "Remove", 225);
            linkedlist.append("Gatve8", "Add", 250);
            linkedlist.append("Skip9", "Skip", 4);
            linkedlist.append("Gatve10", "Add", 300);
            linkedlist.append("Gatve11", "Remove", 325);
            linkedlist.append("Move12", "Move", 10);
            linkedlist.append("Gatve13", "Add", 375);
            linkedlist.append("Skip14", "Skip", 1);
            linkedlist.append("Move15", "Move", 4);
            alert("Added");
        }
    }
    csvform(){
       // let dataset;
      //  let date1;      
        
           // fetch('./data.json')
            //.then(res => res.json())
           // .then(data => {
             //       dataset=data.name;
              //      date1=dataset;
                

            //});
        
        
        
        //console.log(date1);

    }
    init() {
    }

    resize() {
    }

    update() {
    }

    render() {
    }
    firstload(){
        
        playersJs.append(1, 0, 0, "red", 1);
        playersJs.append(2, 0, 0, "green", 1);
        playersJs.append(3, 0, 0, "yellow", 1);
        this.loadplayers();
    }
    returnwinscore(){
        return this.winscore;
    }
}