function testMoveMissile() {
/*    $("#missileNo1").offset({left:  $("#missileNo1").offset().left+1});
    if ($("#missileNo1").offset().left > 470) {
        return;
    } else {
      setTimeout(testMoveMissile(), 2000);  
    }
*/
    console.log($("#vipor").offset().top)
}

// move vipor functions here
function moveViporUp() {
    let currentViporPosition = $("#vipor").offset().top;
    if (currentViporPosition === 42) {
        $("#vipor").offset({top: 658});
    } else {
      $("#vipor").offset({top: currentViporPosition-60});  
    }
}

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
        if (missileStartPosition === $(this).offset().left &&
            (firedMissile.offset().top - $(this).offset().top) < 10) {
            raidersKilled++;
            let explosionId = "explosionNo"+raidersKilled;
            $(this).replaceWith("<img id="+explosionId+" class='explosions' src='./resources/images/explosion.png'>");
            $("#"+explosionId).offset({top: firedMissile.offset().top, left: firedMissile.offset().left});
            firedMissile.remove();
            setTimeout(function() {
                $("#"+explosionId).remove();
            }, 500);
            hitRaider = true;
            return false;
        };
    });
    if (missileStartPosition < 479 && hitRaider === false) {
        setTimeout(function() {moveMissile(firedMissile) }, 10);   // the moveMissile() function had to be called by an anonymous
     } else {                                                      // function here because when called without one, the setTimeout
       firedMissile.remove();                                      // executed instantly, as many times as needed to make the 
       return;                                                     // missile reach 479 pixels, making the movement appear to
     };                                                            // happen instantaneously.
    };
    
};


// Global objects and variables here //

let keyPressObject = {38: false, 40: false, 32: false}

// End global objects and variables here //

$(document).ready(function() {
    $(document).keydown(function(event) {
    keyPressObject[event.which] = (event.type == 'keydown');
    if (keyPressObject[38] && keyPressObject[32]) {
        moveViporUp();
        fireMissile();
    } else
    if (keyPressObject[40] && keyPressObject[32]) {

        fireMissile();   
    } else
    if (keyPressObject[38]) { 
       moveViporUp();
    } else
    if (keyPressObject[40]) {

    } else
    if (keyPressObject[32]) {
        fireMissile();
    };
});
});