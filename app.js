//Constant Variables

const X_TEXT = "X";
const O_TEXT = "O";

//Other variables
let playing = false;
let flag = true;
let currentPlayer;
let start;
let random;
let count =0;
let restart;
let moves = 0;
let check = 1;
//Null Array to fill X and O
const spaces = [null, null, null, null, null, null, null, null, null];

//Winning Conditions 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Array to add click event on boxes
const boxes = Array.from(document.getElementsByClassName('box'));


/**************************Helper Functions**************************************/

function show(id){
     document.getElementById(id).style.display = 'block';
 }
function setText(id,text){
    document.getElementById(id).innerHTML = text;
}

function hide(id){
    document.getElementById(id).style.display = 'none';
}

/********************************************************************************/

//Some popups to hide at beginning

hide('turn');
hide('options');
hide('gameover-block')

//Function to accept input from radio Buttons
function radioOption(){
    
    var humanX = document.getElementById("humanX");
    var humanO = document.getElementById("humanO");
    var computerX = document.getElementById("computerX");
    
    //Human VS Human
    if(humanX.checked==true && humanO.checked==true ){
        hide('options');
        humanVSHuman();      
    }
    
    //Computer VS Human
    else if(computerX.checked == true && humanO.checked == true ){
        hide('options');
        compVSHuman();
    }
    else{
        alert("No Option Selected");
    }  
}

//start-game
start = document.getElementById("Start-Game").addEventListener('click',startGame);
function startGame(e){
    if(playing === true){
        //Yet nothing added
    }else{
        hide('Start-Game');
        show('options');
        show('turn');
    }
    playing = !playing;
}

//A function use to generate any random number from 0 and 1
function myRandom(){
    random = Math.round((Math.random() *1));
    if(random === 0){
        currentPlayer = O_TEXT;
        setText('turn' , currentPlayer+"'s turn");
    }else{
        currentPlayer = X_TEXT;
        setText('turn' , currentPlayer+"'s turn");
    }
}

//event function box clicked For Human vs Human mode 
function boxClickedForHuman(e){
    const id = e.target.id;
    if(!spaces[id] && flag == true ){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        currentPlayer = currentPlayer == O_TEXT? X_TEXT:O_TEXT;
        setText('turn' , currentPlayer+"'s turn");
        count++;
        winX();
        winO();
    }
};

//event function box clicked For Computer vs Human mode
function boxClickedForComp(e){
    console.log(count);
    currentPlayer = O_TEXT?O_TEXT:X_TEXT;
    const id = e.target.id;
    if(!spaces[id] && flag == true && currentPlayer == O_TEXT && check == 1){
        setText('turn' , "Computer's turn");
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        count++;
        winX();
        winO();
        check = 0;
    } 
    if(check == 0){
        setTimeout(function(){
            setText('turn' , "Your's turn");
            while(moves!=1 && flag == true){
            let position = Math.round((Math.random()*8));
                if(boxes[position].textContent === ""){
                boxes[position].textContent = X_TEXT;
                count++;
                spaces[position] = X_TEXT;
                moves = 1;
                check = 1;
                winX();
                winO();
                }
            }
        }, 1000);
        moves = 0;
    }
};
  
//A Continue button to start a game after taking input from player
const Continue = document.getElementById("continue").addEventListener('click',radioOption);

//A function to start Human vs Human match
function humanVSHuman(){
    myRandom();
    boxes.forEach((box,index) =>{
    box.addEventListener('click', boxClickedForHuman);  
});
}

//A function to start Computer vs Human match
function compVSHuman(){
   currentPlayer = O_TEXT;
   setText('turn' , "Your's turn");
   boxes.forEach((box,index) =>{
        box.addEventListener('click', boxClickedForComp);           
});

}

//A function to display draw 
function draw(){
    if(count >= 9 && flag == true){
        hide('turn');
        setText('gameover', "<p class='text-center' >GAME-OVER <br> Match has been Drawn! </p>");
        show("gameover-block");
        flag = false;
        restart = document.getElementById("Restart-Game").addEventListener('click',reloadPage);
    }
} 

//Function to check X winning conditions
function winX(e){
    
    for (i = 0; i < 8; i++) {
        let c = winningConditions[i];
        
        let q = boxes[c[0]].textContent;
        let r = boxes[c[1]].textContent;
        let s = boxes[c[2]].textContent;
        
       /* console.log(boxes[c[0]]);
        console.log(r);
        console.log(s);*/
        if(q == r && r == s && s == X_TEXT){
            hide('turn');
            setText('gameover', "<p class='text-center' >GAME-OVER <br> Player X wins! </p>" );
            show("gameover-block");
            flag = false;
            restart = document.getElementById("Restart-Game").addEventListener('click',reloadPage);
            break;
        }
    }
    
    draw();
}

//Function to check O winning conditions
function winO(e){
    
    for (i = 0; i < 8; i++) {
        let c = winningConditions[i];
        
        let q = boxes[c[0]].textContent;
        let r = boxes[c[1]].textContent;
        let s = boxes[c[2]].textContent;
        
        if(q == r && r == s && s == "O"){
            hide('turn');
            setText('gameover', "<p class='text-center' >GAME-OVER <br> Player O wins! </p>" );
            show("gameover-block");
            flag = false;
            restart = document.getElementById("Restart-Game").addEventListener('click',reloadPage);
        }
    }
    draw();
}
//A function to reload Page after Game-Over
function reloadPage(){
    location.reload();
}