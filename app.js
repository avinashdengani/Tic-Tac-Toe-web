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
//Null Array to fill X and O
const spaces = [null, null, null, null, null, null, null, null, null];

//Constant for Player's turn
const turn = document.getElementById('turn');

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
hide('Restart-Game');
hide('turn');
hide('options');
hide('gameover');

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
        boxes.forEach((box,index) =>{
        box.addEventListener('click', boxClicked);  
});
    }
    playing = !playing;
}

//A function use to generate any random number from 0 and 1
function myRandom(){
    random = Math.round((Math.random() *1));
    if(random === 0){
        currentPlayer = O_TEXT;
        //console.log(currentPlayer);
        setText('turn' , currentPlayer+"'s turn");
    }else{
        currentPlayer = X_TEXT;
        //console.log(currentPlayer);
        setText('turn' , currentPlayer+"'s turn");
    }
}

//called myRandom function
myRandom();

//Function to run event boxClicked
function boxClicked(e){
    const id = e.target.id;
    if(!spaces[id] && flag == true){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        currentPlayer = currentPlayer == O_TEXT? X_TEXT:O_TEXT;
        setText('turn' , currentPlayer+"'s turn");
        winX();
        winO();
        draw();
    }
};
  

//A Continue button to start a game after taking input from player
const Continue = document.getElementById("continue").addEventListener('click',radioOption);

//A function which will generate X at random location
function generateX(){
    let position = Math.round((Math.random() *8));
   // console.log(position);
    if(boxes[position].textContent === ""){
        boxes[position].textContent = "X";
    }
}

//A function which will generate O at random location
function generateO(){
    let position = Math.round((Math.random() *8));
  //  console.log(position);
   if(boxes[position].textContent === ""){
        boxes[position].textContent = "O";
    }
}

//A function to start Human vs Human match
function humanVSHuman(e){
    //console.log("HumanVSHuman");
    boxClicked;
}

//A function to start Computer vs Human match
function compVSHuman(e){
    //console.log("compVSHuman");
}

//A function to display draw 
function draw(){
    if(count == 9){
        hide('turn');
        setText('gameover', "<p class='text-center' >GAME-OVER <br> Match has been Drawn! </p>" );
        show("gameover");
        flag = false;
        show('Restart-Game');
        restart = document.getElementById("Restart-Game").addEventListener('click',reloadPage);
    }
} 

//Function to check X winning conditions
function winX(e){
    count++;
    for (i = 0; i < 8; i++) {
        let c = winningConditions[i];
        
        let q = boxes[c[0]].textContent;
        let r = boxes[c[1]].textContent;
        let s = boxes[c[2]].textContent;
        
        if(q == r && r == s && s == "X"){
            hide('turn');
            setText('gameover', "<p class='text-center' >GAME-OVER <br> Player X wins! </p>" );
            show("gameover");
            flag = false;
            show('Restart-Game');
            restart = document.getElementById("Restart-Game").addEventListener('click',reloadPage);
        }
    }    
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
            show("gameover");
            flag = false;
            show('Restart-Game');
            restart = document.getElementById("Restart-Game").addEventListener('click',reloadPage);
        }
    }           
}
function reloadPage(){
    location.reload();
}