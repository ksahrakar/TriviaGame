// START of Data for the game
var answerChoices = [
    ["George Harrison","John Lennon","Ringo Starr","Paul McCartney"],
    ["John F. Kennedy","Ronald Reagan","Martin Luther King","Bill Gates"],
    ["Dalai Lama","Socrates","Albert Einstein","Walt Whitman"],
    ["Mae West", "Marilyn Monroe", "Kathryn Hepburn", "Gina Lollobrigida"],
    ["Hugh Heffner","Donald Trump", "Plato", "Emily Dickinson"],
    ["Johann Wolfgang von Goethe","Pablo Picasso","Winston Churchill","Mick Jagger"],
    ["Roy Orbison","Jim Morrison","Charles Schulz","Jimmi Hendrix"],
    ["Isaac Asimov","Ray Bradbury","Jonathan Swift","Isaac Newton"],
    ["Wayne Gretzky","Pele","LeBron James","Michael Jordan"],
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
    correctA: [1,0,2,0,2,1,1,2,0,1],
}
// END of Data for the game

var cardCounter=0;
var correctAnswers = 0;
var incorrectAnswers = 0;

// Timer
function timeClock(){
    console.log("Ran Timer")
    var x;
    //if (c=1){
        var startTimer=function(){
            var timeAllowed = 15000;
            x = setInterval(tenth,100);
                function tenth(){
                    if (timeAllowed>=0){
                        var seconds = Math.floor(timeAllowed/1000);
                        var centiSeconds = Math.floor(timeAllowed/100) - (seconds*10);
                        $("#clock").text(seconds+":"+centiSeconds);
                        timeAllowed=timeAllowed-100;
                    } else {clearInterval(x)};   
                }
        };

    // } else {
    //         clearInterval(x);       
    // }

}

// Function to load current card and start timer
function loadCard(x){
    var answerC=[];
    for (i=0;i<4;i++){
        answerC[i] = card.answer[x][i];
    }
    $("#quote").text(card.quote[x]);
    $("#choice1").text(answerC[0]);
    $("#choice2").text(answerC[1]);
    $("#choice3").text(answerC[2]);
    $("#choice4").text(answerC[3]);
    var correct = $(card.correctA[x]);
    //timeClock(1);
    // start clock

}

// Function to stop timer and show wrong and correct answers



// Function to check answer and increment correct/incorrect/unanswered, show pic of answer, and move to next card
function checkAnswer(){
    console.log("ran checkAnswer");
    // stop the clock
    //timeClock(0);
    // show picture of answer
    var src = "assets/images/"+cardCounter+".jpg";
    $(answerImage).attr("src",src);
    // if click correct answer, change text to correct

    // if click incorrect answer, change text to incorrect
    
}

// Start playing
function playGame(){
    if (cardCounter<10){
        loadCard(cardCounter);
    } else {return};
}