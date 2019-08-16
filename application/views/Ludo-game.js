var currPos = 0;
var step = 49.5;
var currcolor = "";
var NumOfPaw = "";
var num = 0;
var clicked = false;
var currpawn = "";
var allcolor = ["red", "blue", "green", "yellow"];
var urlParams = new URLSearchParams(window.location.search);
var board_id = urlParams.get('board_id');
var pawnOut = {red:0,blue:0,green:0,yellow:0}
function HaveHover() {
    var count = 0;
    var toKill = "";
    for (var i = 0; i < allcolor.length; i++) {
        for (var n = 1; n <= 4; n++) {
            var firstPawn = document.getElementById(allcolor[i] + "pawn" + n);
            var secondPawn=document.getElementById(currpawn);
            if (firstPawn.style.top==secondPawn.style.top&&firstPawn.style.left==secondPawn.style.left&&currcolor!=allcolor[i]&&currPos+num<44) {
                count++;
                toKill = allcolor[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
}
function Stuck() {
    var text = document.getElementById('player');
    if (onboard[currpawn] == 0||currPos+num>44) {
        if (DontHaveOtherFree()||currPos+num>44) {
            var badtext = document.getElementById('badtext');
            badtext.innerText = "You're stuck, you can't move";
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(Images/dice.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}

function changePlayer() {
    if (num != 6){
        var text = document.getElementById('player');
        switch (text.innerText) {
            case "red":
              text.innerText = text.style.color = "blue";
              $('#playerName').text($('#player-1').val());
              break;
            case "blue":
              text.innerText = "yellow"; text.style.color = "darkgoldenrod";
              $('#playerName').text($('#player-2').val());
              break;
            case "yellow":
              text.innerText = text.style.color = "green";
              $('#playerName').text($('#player-3').val());
              break;
            case "green":
              text.innerText = text.style.color = "red";
              $('#playerName').text($('#player-0').val());
              break;
        }
        socket.emit('change_player', board_id, text.innerText);
    }
    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(Images/dice.gif)";
}

var positions = {
    redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};

var onboard = {
    redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};

function DontHaveOtherFree() {
    var text = document.getElementById('player');
    for (var i = 1; i <=4; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1 || positions[text.innerText + "pawn" + i]+num>=44) return false;
    }
    return true;
}

function CheckForWinner() {
    if (pawnOut[currcolor] == 4) {
        var dice = document.getElementById("dice");
        var player = document.getElementById("player");
        var uselesstext1 = document.getElementById("uselesstext1");
        var uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden";
        uselesstext1.innerText = "";
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the "+currcolor+" player";
    }
}

function stepDown() {
    var doc = document.getElementById(currcolor + "pawn"+NumOfPaw);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr+step)+'px';
    currPos++;
}

function stepUp() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}

function stepLeft() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}

function stepRight() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr + step) + 'px';
    currPos++;
}

var stepsRed = [];
var stepsYellow = [];
var stepsBlue =[];
var stepsGreen =[];

function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}

//Red pawns path
pushSteps(stepDown,stepsRed,4);
pushSteps(stepRight, stepsRed,4);
pushSteps(stepDown, stepsRed,2);
pushSteps(stepLeft, stepsRed,4);
pushSteps(stepDown, stepsRed,4);
pushSteps(stepLeft, stepsRed,2);
pushSteps(stepUp, stepsRed,4);
pushSteps(stepLeft, stepsRed,4);
pushSteps(stepUp, stepsRed,2);
pushSteps(stepRight, stepsRed,4);
pushSteps(stepUp, stepsRed,4);
pushSteps(stepRight, stepsRed,1);
pushSteps(stepDown, stepsRed,5);
//Yellow pawns path

pushSteps(stepUp, stepsYellow,4);
pushSteps(stepLeft, stepsYellow,4);
pushSteps(stepUp, stepsYellow,2);
pushSteps(stepRight, stepsYellow,4);
pushSteps(stepUp, stepsYellow,4);
pushSteps(stepRight, stepsYellow,2);
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepRight, stepsYellow,4);
pushSteps(stepDown, stepsYellow,2);
pushSteps(stepLeft, stepsYellow,4);
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepLeft, stepsYellow,1);
pushSteps(stepUp, stepsYellow,5);

//Blue pawns path
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepDown, stepsBlue,4);
pushSteps(stepLeft, stepsBlue,2);
pushSteps(stepUp, stepsBlue,4,2);
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepUp, stepsBlue,2);
pushSteps(stepRight, stepsBlue,4);
pushSteps(stepUp, stepsBlue,4);
pushSteps(stepRight, stepsBlue,2);
pushSteps(stepDown, stepsBlue,4);
pushSteps(stepRight, stepsBlue,4);
pushSteps(stepDown, stepsBlue,1);
pushSteps(stepLeft, stepsBlue,5);

//Green pawns path
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepUp, stepsGreen,4);
pushSteps(stepRight, stepsGreen,2);
pushSteps(stepDown, stepsGreen,4);
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepDown, stepsGreen,2);
pushSteps(stepLeft, stepsGreen,4);
pushSteps(stepDown, stepsGreen,4);
pushSteps(stepLeft, stepsGreen,2);
pushSteps(stepUp, stepsGreen,4);
pushSteps(stepLeft, stepsGreen,4);
pushSteps(stepUp, stepsGreen,1);
pushSteps(stepRight, stepsGreen, 5);

function ResetPawn(victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    var pawnToMove = document.getElementById(victim);
    switch (victim) {
/*
        case "redpawn1": pawnToMove.style.top = 149 + "px"; pawnToMove.style.left = 442 + "px"; break;
        case "redpawn2": pawnToMove.style.top = 102 + "px"; pawnToMove.style.left = 395 + "px"; break;
        case "redpawn3": pawnToMove.style.top = 55 + "px"; pawnToMove.style.left = 442 + "px"; break;
        case "redpawn4": pawnToMove.style.top = 102 + "px"; pawnToMove.style.left = 490 + "px"; break;
        case "bluepawn1": pawnToMove.style.top = 451 + "px"; pawnToMove.style.left = 490 + "px"; break;
        case "bluepawn2": pawnToMove.style.top = 451 + "px"; pawnToMove.style.left = 395 + "px"; break;
        case "bluepawn3": pawnToMove.style.top = 404 + "px"; pawnToMove.style.left = 442 + "px"; break;
        case "bluepawn4": pawnToMove.style.top = 498 + "px"; pawnToMove.style.left = 442 + "px"; break;
        case "greenpawn1": pawnToMove.style.top = 149 + "px"; pawnToMove.style.left = 93 + "px"; break;
        case "greenpawn2": pawnToMove.style.top = 102 + "px"; pawnToMove.style.left = 140 + "px"; break;
        case "greenpawn3": pawnToMove.style.top = 55 + "px"; pawnToMove.style.left = 93 + "px"; break;
        case "greenpawn4": pawnToMove.style.top = 102 + "px"; pawnToMove.style.left = 47 + "px"; break;
        case "yellowpawn1": pawnToMove.style.top = 451 + "px"; pawnToMove.style.left = 47 + "px"; break;
        case "yellowpawn2": pawnToMove.style.top = 451 + "px"; pawnToMove.style.left = 140 + "px"; break;
        case "yellowpawn3": pawnToMove.style.top = 404 + "px"; pawnToMove.style.left = 93 + "px"; break;
        case "yellowpawn4": pawnToMove.style.top = 498 + "px"; pawnToMove.style.left = 93 + "px"; break;
*/
	case "redpawn1": pawnToMove.style.top = 250 + "px"; pawnToMove.style.left = 550 + "px"; break;
        case "redpawn2": pawnToMove.style.top = 203 + "px"; pawnToMove.style.left = 503 + "px"; break;
        case "redpawn3": pawnToMove.style.top = 156 + "px"; pawnToMove.style.left = 550 + "px"; break;
        case "redpawn4": pawnToMove.style.top = 203 + "px"; pawnToMove.style.left = 598 + "px"; break;

        case "bluepawn1": pawnToMove.style.top = 552 + "px"; pawnToMove.style.left = 598 + "px"; break;
        case "bluepawn2": pawnToMove.style.top = 552 + "px"; pawnToMove.style.left = 503 + "px"; break;
        case "bluepawn3": pawnToMove.style.top = 505 + "px"; pawnToMove.style.left = 550 + "px"; break;
        case "bluepawn4": pawnToMove.style.top = 599 + "px"; pawnToMove.style.left = 550 + "px"; break;

        case "greenpawn1": pawnToMove.style.top = 250 + "px"; pawnToMove.style.left = 201 + "px"; break;
        case "greenpawn2": pawnToMove.style.top = 203 + "px"; pawnToMove.style.left = 248 + "px"; break;
        case "greenpawn3": pawnToMove.style.top = 156 + "px"; pawnToMove.style.left = 201 + "px"; break;
        case "greenpawn4": pawnToMove.style.top = 203 + "px"; pawnToMove.style.left = 155 + "px"; break;

        case "yellowpawn1": pawnToMove.style.top = 552 + "px"; pawnToMove.style.left = 155 + "px"; break;
        case "yellowpawn2": pawnToMove.style.top = 552 + "px"; pawnToMove.style.left = 248 + "px"; break;
        case "yellowpawn3": pawnToMove.style.top = 505 + "px"; pawnToMove.style.left = 201 + "px"; break;
        case "yellowpawn4": pawnToMove.style.top = 599 + "px"; pawnToMove.style.left = 201 + "px"; break;
    }
}

function randomNum() {
  if($('#hdnUserName').val() == $('#playerName').text()) // Player will have access only if it's their turn
  {
    if (!clicked) {
        num = Math.floor((Math.random() * 6) + 1);;
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(Images/" + num + ".jpg)";
        clicked = true;
    }
    if (num != 6&&DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "Unfortunately you're stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
    socket.emit('roll_dice', board_id, num);
  }
  else {
    alert("It's not your turn");
  }

}

function randomMove(Color, paw) {
    var text = document.getElementById('player');
    NumOfPaw = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + NumOfPaw;
    currPos = positions[currpawn];
    if (num + currPos > 44) {
        Stuck();
    }
    else {
        if (clicked) {
            var position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currpawn] === 1 || num === 6) {
                    if (onboard[currpawn] === 0) {
                        var doc = document.getElementById(currpawn);
                        var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
            			/*
                            switch (Color) {
                                case "red":
                                    doc.style.left = 318 + 'px';
                                    doc.style.top = 28 + "px";
                                    break;
                                case "yellow":
                                    doc.style.left = 219 + 'px';
                                    doc.style.top = 523 + "px";
                                    break;
                                case "blue":
                                    doc.style.left = 516 + 'px';
                                    doc.style.top = 325 + "px";
                                    break;
                                case "green":
                                    doc.style.left = 21 + 'px';
                                    doc.style.top = 226 + "px";
                                    break;
                            }
            			*/
                        switch (Color) {
                            case "red":
                                doc.style.left = 424 + 'px';
                                doc.style.top = 137 + "px";
                                break;

                            case "yellow":
                                doc.style.left = 325 + 'px';
                                doc.style.top = 632 + "px";
                                break;

                            case "blue":
                                doc.style.left = 622 + 'px';
                                doc.style.top = 434 + "px";
                                break;

                            case "green":
                                doc.style.left = 127 + 'px';
                                doc.style.top = 335 + "px";
                                break;
                        }
                        onboard[currpawn] = 1;
                    }
                    else {
                        switch (Color) {
                            case "red":
                                for (i = currPos; i < position + num; i++) {
                                    stepsRed[i]();
                                }
                                break;

                            case "yellow":
                                for (i = currPos; i < position + num; i++) {
                                    stepsYellow[i]();
                                }
                                break;

                            case "blue":
                                for (i = currPos; i < position + num; i++) {
                                    stepsBlue[i]();
                                }
                                break;

                            case "green":
                                for (i = currPos; i < position + num; i++) {
                                    stepsGreen[i]();
                                }
                                break;
                        }
                        positions[currpawn] = currPos;
                        var victim = HaveHover();
                        if (victim != false) {
                            ResetPawn(victim);
                        }
                        if (currPos == 44) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; document.getElementById(currpawn).style.visibility = "hidden"; };
                        CheckForWinner();
                        changePlayer();
                    }
                    num = 0;
                    clicked = false;
                    var dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(Images/dice.gif)";
                }
                else Stuck();
            }
        }
    }
    var storePosition = JSON.stringify({position:positions,onboard:onboard});
    pawn_position(storePosition);
}
/* set pawn position for broadcasting */
function pawn_position(storePosition){
	var red_pawn_1= document.getElementById('redpawn1').style;
	var red_pawn_2= document.getElementById('redpawn2').style;
	var red_pawn_3= document.getElementById('redpawn3').style;
	var red_pawn_4= document.getElementById('redpawn4').style;

	var blue_pawn_1= document.getElementById('bluepawn1').style;
	var blue_pawn_2= document.getElementById('bluepawn2').style;
	var blue_pawn_3= document.getElementById('bluepawn3').style;
	var blue_pawn_4= document.getElementById('bluepawn4').style;

	var yellow_pawn_1= document.getElementById('yellowpawn1').style;
	var yellow_pawn_2= document.getElementById('yellowpawn2').style;
	var yellow_pawn_3= document.getElementById('yellowpawn3').style;
	var yellow_pawn_4= document.getElementById('yellowpawn4').style;

	var green_pawn_1= document.getElementById('greenpawn1').style;
	var green_pawn_2= document.getElementById('greenpawn2').style;
	var green_pawn_3= document.getElementById('greenpawn3').style;
	var green_pawn_4= document.getElementById('greenpawn4').style;


	var a =JSON.stringify({red_pawn_1:[red_pawn_1.top,red_pawn_1.left]});
	var pawn_data = JSON.stringify({red_pawn_1:[red_pawn_1.top,red_pawn_1.left],red_pawn_2:[red_pawn_2.top,red_pawn_2.left],red_pawn_3:[red_pawn_3.top,red_pawn_3.left],red_pawn_4:[red_pawn_4.top,red_pawn_4.left],
	blue_pawn_1:[blue_pawn_1.top,blue_pawn_1.left],blue_pawn_2:[blue_pawn_2.top,blue_pawn_2.left],blue_pawn_3:[blue_pawn_3.top,blue_pawn_3.left],blue_pawn_4:[blue_pawn_4.top,blue_pawn_4.left],
	yellow_pawn_1:[yellow_pawn_1.top,yellow_pawn_1.left],yellow_pawn_2:[yellow_pawn_2.top,yellow_pawn_2.left],yellow_pawn_3:[yellow_pawn_3.top,yellow_pawn_3.left],yellow_pawn_4:[yellow_pawn_4.top,yellow_pawn_4.left],
	green_pawn_1:[green_pawn_1.top,green_pawn_1.left],green_pawn_2:[green_pawn_2.top,green_pawn_2.left],green_pawn_3:[green_pawn_3.top,green_pawn_3.left],green_pawn_4:[green_pawn_4.top,green_pawn_4.left]});

	//var pawn_data = JSON.stringify({red_pawn_1:red_pawn_1,red_pawn_2:red_pawn_2,red_pawn_3:red_pawn_3,red_pawn_4:red_pawn_4,blue_pawn_1:blue_pawn_1,blue_pawn_2:blue_pawn_2,blue_pawn_3:blue_pawn_3,blue_pawn_4:blue_pawn_4,yellow_pawn_1:yellow_pawn_1,yellow_pawn_2:yellow_pawn_2,yellow_pawn_3:yellow_pawn_3,yellow_pawn_4:yellow_pawn_4,blue_pawn_1:blue_pawn_1,blue_pawn_2:blue_pawn_2,blue_pawn_3:blue_pawn_3,blue_pawn_4:blue_pawn_4});

	socket.emit('send_data',board_id,pawn_data,storePosition);
}
