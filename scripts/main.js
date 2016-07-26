/*VAGUE PLAN?
    - few base types of locations with set options (farm: pigshitfarm, shitfield, etc; factory: shitprocessing, shitbnurning)
    - intown establishment prices rising regardless of types (1a +2b = 3; 3a = 3)
*/

/*TODO
    - save corruption issue (?)
    - system to create multiple towns/nodes
    - logistics + market
*/

/*TOC 
    - DOM assignments
    - Gamestate
    - Main game loop
    - functions
    - listeners
*/

// DOM elements

var moneyDisp  = document.getElementById('money'),
    workerDisp = document.getElementById('workers'),
    moneyBtn   = document.getElementById('btn1'),
    workerBtn  = document.getElementById('btn2'),
    interBtn   = document.getElementById('interPrice'),
    resetBtn   = document.getElementById('reset');

// STATE (GENERATION IF NEW GAME)

var gameState = JSON.parse(localStorage.getItem("save")) || {
    lastTick: Date.now(),
    currentTick: Date.now(),
    money: 0,
    workers : 0,
    internPrice : 10
};

// MAIN TICK "LOOP"

function tick() {
    gameState.currentTick = Date.now();
    
    var tickGap = gameState.currentTick - gameState.lastTick;
    
    if (tickGap > 1000) {
        console.log('tick');
        gameState.money += gameState.workers;
        gameState.lastTick += 1000;
        updateDisplay();
        increaseIntern();
    }   
    
    localStorage.setItem("save", JSON.stringify(gameState));
    setTimeout(tick, tickGap > 2000 ? 0 : 500);
}

tick();

// FUNCTIONS BIACH

function updateDisplay() {
    moneyDisp.innerHTML  = prettyNumbers(gameState.money);
    workerDisp.innerHTML = prettyNumbers(gameState.workers);
    interBtn.innerHTML   = prettyNumbers(gameState.internPrice);
}

function increaseIntern(){
    if(gameState.workers < 10){
        gameState.internPrice = gameState.internPrice;
    }
    else{
        gameState.internPrice = gameState.workers * 1.2;
        updateDisplay();
    }
}

function prettyNumbers(input){
    var output = Math.ceil(input);
	return output;
}

// LISTENERS

moneyBtn.addEventListener('click', function() {
   gameState.money += 1; 
   updateDisplay();
});

workerBtn.addEventListener('click', function() {
   
   if(gameState.money >= gameState.internPrice){
       gameState.workers += 1; 
       gameState.money -= gameState.internPrice;
       increaseIntern();
   }
   updateDisplay();
});

resetBtn.addEventListener('click', function() {
    gameState = {
        lastTick: Date.now(),
        currentTick: Date.now(),
        money: 0,
        workers : 0,
        internPrice : 10
    };
    updateDisplay();
});

//if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
//localStorage.removeItem("save")


function Farm(n) {
    this.name = n;
    this.farmer = 0;
    this.produce = 0;
}