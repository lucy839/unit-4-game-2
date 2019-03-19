// Audio
var x = document.getElementById("myAudio"); 
document.getElementById("myAudio").loop = true;
x.volume = 0.2;

// Global variables
var win =0 ;
var attack;
var defend;
var myname="";
var myDef = "";
var YourDefender;
var attackcharacter;
var attackerHP;
var attackerAP;
var attackerCAP;
var defendcharacter;
var defenderHP;
var defenderAP;
var defenderCAP;
var defenderFN="";
var YourCharacter;
var myChar = "";
var win = 0;
var firstPick = 0;
var defeated;
var characters={
    kenobi:{
        nickname: "kenobi",
        fullname: "Obi-Wan Kenobi",
        health: 120,
        attack: 8,
        counterAttack: 24,
        defeated: false
    },
    skywalker:{
        nickname: "skywalker",
        fullname: "Luke Skywalker",
        health: 100,
        attack: 10,
        counterAttack: 5,
        defeated: false
    },
    sidious: {
        nickname:"sidious",
        fullname: "Darth Sidious",
        health:  150,
        attack: 10,
        counterAttack:20,
        defeated: false
    },
    maul:{
        nickname:"maul",
        fullname: "Darth Maul",
        health: 180,
        attack: 12,
        counterAttack: 25,
        defeated: false
    }
};

// get ready
function getReady(){
    $(".attackButton").hide();
    $("#yourChar").hide();
    $(".enemy").hide();
    $(".defender").hide();
    $(".youDefeated").hide();
    $(".report").hide();
}

// Choose my character
function myCharacter(){
    // when picture is clicked...
    $(".firstRow").click(function(){  
        // instuction and title will be hidden and music will start to play
        $(".instruction").hide();
        $(".title").hide();
        x.play();  
        // my character and enemies will show
        $("#yourChar").show();    
        $(".enemy").show();
        // chosen character's data will be imported
        if (myChar == "") {     
            $(this).appendTo("#yourChar");
            myChar = $(this);
            YourCharacter = $(myChar).attr("value");
        }
        if (YourCharacter == characters[YourCharacter].nickname && firstPick == 0) {
            attackerHP = characters[YourCharacter].health;
            attackerAP = characters[YourCharacter].attack;
            attackerCAP = characters[YourCharacter].counterAttack;
            attackerFN = characters[YourCharacter].fullname;
            attack = characters[YourCharacter];
            firstPick = 1;
        }
        // importing not chosen characters as enemies and highlighted as red
        for (var i = 0; i < 4; i++) {
            $("._" + [i]).not(myChar).appendTo("#enemies" + [i]);
            $("._" + [i]).not(myChar).css({"background-color": "red", "border": "5px solid black", "color" : "black"});
        }
        // characters displayed will be hidden
        $("#picRow").hide();
    });
}

//Choose my defender
function myDefender(){
    // if my defender is not chosed, choose from enemy and import the data to defender
    if (myDef == "" ) {
        $(".enemies").click(function(){
            $(".defender").show();
            $(".message").empty();
            if($("#defender").children().length === 0  && characters[$(this).children().attr("value")].defeated === false){
                $(this).appendTo("#defender");
                myDef = $(this);
                YourDefender = $(myDef).children().attr("value");
            }
            if (YourDefender == characters[YourDefender].nickname) {
                defenderHP = characters[YourDefender].health;
                defenderAP = characters[YourDefender].health;
                defenderCAP = characters[YourDefender].counterAttack;
                defenderFN = characters[YourDefender].fullname;
                defend = characters[YourDefender];
                characters[YourDefender].defeated = true;
            }
            // ready to attack!
            $(".attackButton").show(); 
        });
    }
}

// attack with updated report, win, and lose
function game(){
    $(".attackButton").click(function(){
        $(".report").show();
        if ($("#defender").children().length == 0) {
            $(".noEnemy").html("No enemy here.");
        } else if (!(attackerHP < 1) || !(defenderHP < 1)) {
            attackerHP = (attackerHP - defenderCAP);
            var newAttackerHP = $("."+YourCharacter);
            $(newAttackerHP).text(attackerHP);
            $(".youAttacked").html("You attacked " + defenderFN + " for " + attackerAP + " damage.");
            defenderHP = (defenderHP - attackerAP);
            var newDefenderHP = $("."+YourDefender);
            $(newDefenderHP).text(defenderHP);
            $(".attackedBack").html(defenderFN + " attacked you back for " + defenderCAP + " damage.");
            if( defenderHP <= 0 ){
                $(".message").text("You defeated! You can choose another enemy!");
                $(".youDefeated").show();
                $(newDefenderHP).text("0");
                attackerAP += 10;
                attack.attack = attackerAP;
                attackerHP *= 2;
                attack.health = attackerHP;
                $(".youAttacked").empty();
                $(".attackedBack").empty();
                $(".youDefeated").append(myDef);
                $("#defender").empty();
                $(".attackButton").hide();
                myDef=="";  
                win++;
            } else if (attackerHP < 0){
                $(".youAttacked").empty();
                $(".attackedBack").empty();
                var reset = confirm("You died! Do you want to restart?");
                if (reset === false){
                    alert("Good Bye!");
                    getReady();
                    $(".restart").show();
                    $(".restartmsg").show();
                    $("#defender").hide();
                }else {
                    location.reload(true);
                }
            }
            if(win >= 3){
                $(".youAttacked").empty();
                $(".attackBack").empty();
                var reset = confirm("You won! Do you want to restart?");
                if (reset === false){
                    alert("Good Bye!");
                    getReady();
                    $(".restart").show();
                    $(".restartmsg").show();
                    $("#defender").hide();
                }else {
                    location.reload(true);
                }
            }
        }
    });
}

// restart the game
function restart(){
    $(".restart").click (function(){
        location.reload(true);
        });
}

// Actual game!
$(document).ready(function() {
    getReady();
    $(".restartmsg").hide();
    $(".restart").hide();
    myCharacter();
    myDefender();
    game();
    restart();
});

