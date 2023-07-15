var buttonColors=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];

var started=false;
var level=0;
$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",helpclick);
function helpclick(){
    var userChosenColour=$(this).attr("id");   //get the id of button that is clicked this is current obj
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkanswer(userClickedPattern.length-1);  //size-1 is always last index
    
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber=Math.random();
    randomnumber=randomnumber*4;
    randomnumber=Math.floor(randomnumber);
    var randomChosenColor=buttonColors[randomnumber];
    gamepattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    animatePress(randomChosenColor); 
}



function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}

function checkanswer(currlevel){
    if(gamepattern[currlevel]==userClickedPattern[currlevel]){
        console.log("sucess");
        if(userClickedPattern.length==gamepattern.length){     //all input recieved by program
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").html("GameOver,Press Any Key to Restart");
        startover();
    }
}

function startover(){
    level=0;
    gamepattern=[];
    userClickedPattern=[];
    started=false;
}
