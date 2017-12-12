function testFunction() {
/*  $("#missileNo1").offset({left:  $("#missileNo1").offset().left+1});
    if ($("#missileNo1").offset().left > 470) {
        return;
    } else {
      setTimeout(testMoveMissile(), 2000);  
    }
*/
    $("#gameBoard").append("<img id='testRaider' class='raiders' src='./resources/images/raider.jpg'>");
    $("#testRaider").offset({left: 360});
    let startPosition = $("#testRaider").offset().left;
    moveTestRaider();
    
    function moveTestRaider() {
        startPosition = startPosition - 40;
        if (startPosition > 140) {
        $("#testRaider").offset({left: startPosition});
        setTimeout(function() { moveTestRaider() }, 1000);
        };
    };   
};


// end game function
let gameOver = false;

function endGame() {
    $("#gameBoard").css("display", "none");
    let endGameDisplay = "<div id='endGameDisplay'>What the Frack?<br />You killed "+raidersKilled+" raiders<br />You rescued "+rescueCounter+" Hostages</div>";
    if ($("#endGameDisplay").length) {
        return;
    } else {
       $(document.body).append(endGameDisplay);
    };
};
// end end game functions


// start send hostage function
let rescueCounter = 0;
let hostageCounter = 0;
function sendHostage(topPosition, leftPosition) {
  hostageCounter++;
  let hostageId = "hostageNo"+hostageCounter;
  let $hostage = "<img id="+hostageId+" class='hostages' src='./resources/images/astronaut.jpg'>";
  $("#gameBoard").append($hostage);
  $("#"+hostageId).offset({top: topPosition, left: leftPosition});
  let currentHostageLeftpositon = $("#"+hostageId).offset().left;
  let currentHostageTopPosition = $("#"+hostageId).offset().top;
  moveHostage($("#"+hostageId));
    
 function moveHostage(currentHostage) {
  let currentViporLeftPosition = $("#vipor").offset().left;
  let currentViporTopPosition = $("#vipor").offset().top;
  currentHostageLeftpositon = currentHostageLeftpositon - 4;
  currentHostageTopPosition = currentHostage.offset().top;
  currentHostage.offset({left: currentHostageLeftpositon});
  if ((currentHostageLeftpositon - currentViporLeftPosition) < 90 &&
       (currentHostageTopPosition - currentViporTopPosition) < 15) {
      currentHostage.remove();
      rescueCounter++;
      return;
  } else
   if (currentHostageLeftpositon > 70) {
     setTimeout(function() { moveHostage(currentHostage);}, 100);
   } else
    if (currentHostageLeftpositon <= 70) {
        endGame();
        return;
    }
  };
};

// end send hostagefunction

// start gamefunction here
function startGame() {
    $("#instructionsBox").css("display", "none");
    $("#gameBoard").css("visibility", "visible");
    setInterval(generateRaiders, 5000);
};
// end start game function


// all raider functions here

// generate raider function here
const topStartPositionsArray = [50, 160, 270, 380, 490, 600];
let raiderCounter = 0;

function generateRaiders() {
    if (gameOver) {
        return;
    } else {
    let leftStartPosition = 720;
    let tempStartArray = topStartPositionsArray;
    let startArray = [];
    let numberOfRows = Math.floor((Math.random()*3)+1);
    for (let i=0; i<numberOfRows; i++) {
        raiderCounter++;
        let raiderId = "raiderNo"+raiderCounter;
        let $raider = "<img id="+raiderId+" class='raiders' src='./resources/images/raider.jpg'>";
        let tempStartIndex = Math.floor(Math.random()*6);
        let randomTopStartPosition = tempStartArray[tempStartIndex];
        startArray.push(randomTopStartPosition);
        if (startArray[i]===startArray[i-1] || startArray[i]===startArray[i-2]) {
            //console.log("matching raiders detected");
            setTimeout(function() {
              //console.log("function fired");
              $("#gameBoard").append($raider);
              $("#"+raiderId).offset({top: randomTopStartPosition, left: leftStartPosition});
              let currentRaiderTopPosition = $("#"+raiderId).offset().top;
              let currentRaiderLeftPosition = $("#"+raiderId).offset().left;
              moveRaider($("#"+raiderId), currentRaiderLeftPosition);                
             }, 2500);
        } else {
         $("#gameBoard").append($raider);
         $("#"+raiderId).offset({top: randomTopStartPosition, left: leftStartPosition});
         let currentRaiderTopPosition = $("#"+raiderId).offset().top;
         let currentRaiderLeftPosition = $("#"+raiderId).offset().left;
         moveRaider($("#"+raiderId), currentRaiderLeftPosition);
        }
     };
    };

        function moveRaider(currentRaider, leftPosition) {
            //console.log(currentRaider.offset().left);
            if (gameOver || currentRaider.length === 0) {
                return;
            } else {
             leftPosition = leftPosition - 40;
             currentRaider.offset({left: leftPosition});
             if (currentRaider.offset().left > 70) {
                  setTimeout(function() {
                  moveRaider(currentRaider, leftPosition);
                }, 1000);
             } else if(currentRaider.offset().left <= 70 && currentRaider.offset().left > 0) {
               endGame();
               gameOver = true;
               return;
             }               
            }
        };
};
// end generate raider function


// end all raider functions


// move vipor functions here

function moveViporRight() {
    let currentRightPosition = $("#vipor").offset().left;
    if (currentRightPosition < 710) {
       $("#vipor").offset({left: currentRightPosition + 25});
    };
};

function moveViporLeft() {
    let currentRightPosition = $("#vipor").offset().left;
     if (currentRightPosition > 10) {
       $("#vipor").offset({left: currentRightPosition - 25});
    };
};

function moveViporUp() {
    let currentViporPosition = $("#vipor").offset().top;
    if (currentViporPosition === 50) {
        $("#vipor").offset({top: 600});
    } else {
      $("#vipor").offset({top: currentViporPosition-110});  
    }
};

function moveViporDown() {
    let currentViporPosition = $("#vipor").offset().top;
    if (currentViporPosition === 600) {
        $("#vipor").offset({top: 50});
    } else {
        $("#vipor").offset({top: currentViporPosition+110});
    }
};
// end move vipor functions

let raidersKilled = 0;
let missileCounter = 0; 
function fireMissile() {
    missileCounter++; 
    missileId = "missileNo"+missileCounter;
    let missile = "<img id="+missileId+" class='missiles' src='./resources/images/missile.png'>"
    $("#gameBoard").append(missile);
    let currentViporTopPosition = $("#vipor").offset().top;
    let currentViporLeftPosition = $("#vipor").offset().left;
    $("#"+missileId).offset({top: currentViporTopPosition+5, left: currentViporLeftPosition});
    let missileStartPosition = $("#"+missileId).offset().left;
    moveMissile($("#"+missileId));
    
    function moveMissile(firedMissile) {
    let hitRaider = false;
    missileStartPosition++;
    firedMissile.offset({left: missileStartPosition});
    //console.log("missile: "+ firedMissile.offset().top+" raider: "+$(".raiders").offset().top);
    $(".raiders").each(function() {
           if ((missileStartPosition - $(this).offset().left > -20) &&
               (missileStartPosition - $(this).offset().left < 50) &&
               (firedMissile.offset().top - $(this).offset().top) <= 5 &&
                (firedMissile.offset().top - $(this).offset().top) >0) {
             raidersKilled++;
             let explosionId = "explosionNo"+raidersKilled;
             $(this).replaceWith("<img id="+explosionId+" class='explosions' src='./resources/images/explosion.png'>");
             $("#"+explosionId).offset({top: firedMissile.offset().top, left: firedMissile.offset().left});
             if (Math.random() <= .25 ) {
                sendHostage(firedMissile.offset().top, firedMissile.offset().left);
             };
             firedMissile.remove();
             setTimeout(function() {
                $("#"+explosionId).remove();
             }, 500);
             hitRaider = true;
             return false;
           }
    });
    if (missileStartPosition < 780 && hitRaider === false) {
        setTimeout(function() {moveMissile(firedMissile) }, 10);   // the moveMissile() function had to be called by an anonymous
     } else {                                                      // function here because when called without one, the setTimeout
       firedMissile.remove();                                      // executed instantly, as many times as needed to make the 
       return;                                                     // missile reach 479 pixels, making the movement appear to
     };                                                            // happen instantaneously.
    };
    
};


// Global objects and variables here //
const missilePositionObject = {55: "", 165: "", 275: "", 385: "", 495: "", 605: ""};

let keyPressObject = {38: false, 40: false, 32: false, 39: false, 37: false};

// End global objects and variables here //
$(document).keyup(function(event) {
    keyPressObject[event.which] = (event.type == 'keydown');
});
$(document).ready(function() {
    $("#gameBoard").css("visibility", "hidden");
    $(document).keydown(function(event) {
    keyPressObject[event.which] = (event.type == 'keydown');
    if (keyPressObject[38] && keyPressObject[32]) {
        moveViporUp();
        fireMissile();
    } else
    if (keyPressObject[40] && keyPressObject[32]) {
        moveViporDown();
        fireMissile();   
    } else
    if (keyPressObject[39] && keyPressObject[32]) {
        moveViporRight();
        fireMissile();
    } else
    if (keyPressObject[37] && keyPressObject[32]) {
        moveViporLeft();
        fireMissile();
    } else
    if (keyPressObject[39]) {
        moveViporRight();
    } else
    if (keyPressObject[37]) {
        moveViporLeft();
    }
    if (keyPressObject[38]) { 
       moveViporUp();
    } else
    if (keyPressObject[40]) {
       moveViporDown();
    } else
    if (keyPressObject[32]) {
        fireMissile();
    };
  });
});
