$(document).ready(function() {

    // Set global variables that will need to be accessed in multiple parts of the code.
    var words = ["japan", "germany", "uzbekistan", "lebanon", "nigeria", "singapore", "bangladesh", "ireland", "madagascar", "ethiopia", "canada", "belize", "mauritania", "vanuatu", "uruguay", "belgium", "latvia", "mozambique", "panama", "turkey"];
    var blankString = "______________________"
    var validLetters = "abcdefghijklmnopqrstuvwxyz";
    var wins = 0;
    var losses = 0;
    var guessesRemaining = 10;

    function shuffle() {
        for (var i = 0; i < words.length; i++) {
            var temp = words[i];
            var randomNumber = Math.floor(Math.random() * words.length);
            words[i] = words[randomNumber];
            words[randomNumber] = temp;
        };
        console.log(words);
    };

    shuffle();

    var nextWord = words.length - 1;
    var currentWord = words[nextWord];
    var blankPart = blankString.substring(0, currentWord.length);


    // Set a reset function that will update or reset (each as necessary) info each time you win or lose.
    function resetPage() {
        nextWord = nextWord + 1;
        if (nextWord === words.length) {
            shuffle();
            nextWord = 0;
        };
        currentWord = words[nextWord];
        blankPart = blankString.substring(0, currentWord.length);
        $("#blankWord").text(blankPart);
        guessesRemaining = 10;
        $("#guessesRemaining").text(guessesRemaining);
        $("#incorrectGuesses").text("");
        $("#losses").text("Losses: " + losses);
        $("#wins").text("Wins: " + wins);
    };

    resetPage();

    
    document.onkeyup = function(event) {

        var pressedKey = event.key;
        pressedKey = pressedKey.toString().toLowerCase();
        var letterPresent = false;

        for (var i = 0; i < currentWord.length; i++) {
            if (pressedKey == currentWord[i]) {
                blankPart = blankPart.slice(0, i) + currentWord[i] + blankPart.slice(i+1, blankPart.length);
                $("#blankWord").text(blankPart);
                letterPresent = true;
            };
        };

        var incorrectText = document.getElementById("incorrectGuesses").textContent;

        if (letterPresent === false && validLetters.includes(pressedKey) && !(incorrectText.includes(pressedKey)) ) {
            $("#incorrectGuesses").append(pressedKey + ", "); 
            guessesRemaining = guessesRemaining - 1;
            $("#guessesRemaining").text(guessesRemaining);
        };  

        if (guessesRemaining < 1) {
            alert('You Lose! The correct word was "' + currentWord + '."');
            losses = losses + 1;
            resetPage();            
        };
        
        if (blankPart.includes("_") === false) {
            setTimeout(function () {
                alert('You win! The correct word was "' + currentWord + '."');
                wins = wins + 1;
                resetPage();
            }, 100);

            
        };
    };
});