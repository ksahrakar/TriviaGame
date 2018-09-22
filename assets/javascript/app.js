// START of Data for the game
var answerChoices = [
    ["George Harrison","John Lennon","Ringo Starr","Paul McCartney"],
    ["John F. Kennedy","Herbert Hoover","Martin Luther King","Bill Gates"],
    ["Dalai Lama","Steve Jobs","Albert Einstein","Walt Whitman"],
    ["Mae West", "Marilyn Monroe", "Audrey Hepburn", "Mick Jagger"],
    ["Hugh Heffner","Sigmund Freud", "Plato", "Emily Dickinson"],
    ["Neil Armstrong","Pablo Picasso","Winston Churchill","Mick Jagger"],
    ["Roy Orbison","Jim Morrison","Charles Schulz","Jimmi Hendrix"],
    ["William Shakespeare","Ray Bradbury","Jonathan Swift","Isaac Newton"],
    ["Wayne Gretzky","Dirty Harry","LeBron James","Michael Jordan"],
    ["Ghandi","Lao Tzu","Buddha","Dalai Lama"]
];

var quotes = [
    "Life is what happens when you're busy making other plans",
    "Those who dare to fail miserably can achieve greatly",
    "If you want to live a happy life, tie it to a goal, not to people or things",
    "You only live once; but if you do it right, once is enough",
    "Love is a serious mental disease",
    "Only put off until tomorrow what you are willing to die having left undone",
    "A friend is someone who gives you total freedom to be yourself",
    "May you live all the days of your life",
    "You miss 100 percent of the shots you never take",
    "The journey of a thousand miles begins with one step"
]

var card = {
    quote: quotes,
    answer: answerChoices,
    pictureURL:["0.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"],
    correctA: [1,0,2,0,2,1,1,2,0,1],
}
// END of Data for the game

// Global variables
var cardCounter=0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var timeAllowed = 15000;
var x;
var ans;


// START of Reset the game
function resetGame(){
    cardCounter=0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timeAllowed = 15000;

    // reset starting position
    $(".checkIcon").css("display","inline-flex");
    $("#icon1").attr("src","./assets/images/wrongAns.png");
    $("#icon2").attr("src","./assets/images/wrongAns.png");
    $("#icon3").attr("src","./assets/images/wrongAns.png");
    $("#icon4").attr("src","./assets/images/rightAns.png");

    // reset picture
    $("#answerImage").attr("src", "assets/images/q.jpg");

    // reset quote
    $("#quote").text("it depends upon what the meaning of the word is is");

    // reset answers
    $("#choice1").text("Ronald Reagan");
    $("#choice2").text("Barrack Obama");
    $("#choice3").text("Harry Truman");
    $("#choice4").text("William Clinton");

    // reset timer
    resetTimer();
    $("#clock").text("15.0");

    // reset score
    $("#rightAnswer").text("0");
    $("#wrongAnswer").text("0");


    // reset start button
    $("#startButton").css("disabled",false);
}
// END of Reset the Game

// Timer Function
var countDown=function(){
    x = setInterval(tenth,100);
    function tenth(){
        if (timeAllowed>=0){
            var seconds = Math.floor(timeAllowed/1000);
            var centiSeconds = Math.floor(timeAllowed/100) - (seconds*10);
            $("#clock").text(seconds+"."+centiSeconds);
            timeAllowed=timeAllowed-100;
        } else {clearInterval(x); return;};  
    }
};  

// Stop Timer
var stopTimer=function(){
    clearInterval(x);
    return;
}

// Reset Timer
var resetTimer=function(){
    timeAllowed = 15000;
    $("#clock").text("15.0");
    return;
}

// Hide start button
function hideStart(){
    $("#startButton").css("display","none");
}
    

// Function to load current card and reset timer
function loadCard(){
    var y = cardCounter;
    // reset all icons and values
    $(".checkIcon").css("display","none");
    $("#icon1").attr("src","./assets/images/wrongAns.png");
    $("#choice1").attr("value",false)
    $("#icon2").attr("src","./assets/images/wrongAns.png");
    $("#choice2").attr("value",false)
    $("#icon3").attr("src","./assets/images/wrongAns.png");
    $("#choice3").attr("value",false)
    $("#icon4").attr("src","./assets/images/wrongAns.png");
    $("#choice4").attr("value",false)

    // reset picture
    $("#answerImage").attr("src", "assets/images/q.jpg");

    // put correct icon next to correct answer
    var answerC=[];
    for (i=0;i<4;i++){
        answerC[i] = card.answer[y][i];
        if (card.correctA[y] == 0){$("#icon1").attr("src","./assets/images/rightAns.png");$("#choice1").attr("value",true)};
        if (card.correctA[y] == 1){$("#icon2").attr("src","./assets/images/rightAns.png");$("#choice2").attr("value",true)};
        if (card.correctA[y] == 2){$("#icon3").attr("src","./assets/images/rightAns.png");$("#choice3").attr("value",true)};
        if (card.correctA[y] == 3){$("#icon4").attr("src","./assets/images/rightAns.png");$("#choice4").attr("value",true)};
    }

    // show new quote
    $("#quote").text(card.quote[y]);

    // show multiple answers for current quote
    $("#choice1").text(answerC[0]);
    $("#choice2").text(answerC[1]);
    $("#choice3").text(answerC[2]);
    $("#choice4").text(answerC[3]);

    // load picture URL to HTML item
    var src= "./assets/images/"+card.pictureURL[y];
    $("#answerImage").attr("src",src);
    $("#answerImage").css("display", "none");

    // Get out of function
    return;
}

// Function to check answer and increment correct/incorrect/unanswered, show pic of answer, and move to next card
function showAnswers(){

    // show picture of answer
    $("#answerImage").css("display", "block");

    // Show answers
    $(".checkIcon").css("display","inline-flex");

    // Determine if response correct or incorrect
    validate();

    // Record score
    $("#rightAns").text(correctAnswers);
    $("#wrongAns").text(incorrectAnswers);
    return;
}

// Function to move forward to next quote with delay
function moveOn(){
    console.log("moving on");
    if (cardCounter<10){
        cardCounter++;
        setTimeout(loadCard,3000);
        resetTimer();
        setTimeout(countDown,2999);   
    } else {return;}
    return;
}

function detectTimeUp(){
    if (timeAllowed<0){
        console.log("time up");
        showAnswers();
        moveOn();
    }
}

function validate(){
    if (timeAllowed>=0){
        if (ans==card.correctA[cardCounter]){
                    correctAnswers++
                } else {
                    incorrectAnswers++; 
                };
    }
}

$(document).ready(function() {
    $("#startButton").on("click",loadCard);
    $("#startButton").on("click",countDown);
    $("#startButton").on("click", hideStart);

    $("li").click(function(){
        ans = $(this).attr("value");
    })

    $(".items").on("click",stopTimer);
    $(".items").on("click",showAnswers);
    $(".items").on("click",moveOn);
    detectTimeUp();

});



