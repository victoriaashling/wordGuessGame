$(document).ready(function() {

    // Set global variables that will need to be accessed but not over-written in any of the code.
    var words = ["hello", "bonjour", "annyeong", "hola"];
    var blankString = "______________________"
    var validLetters = "abcdefghijklmnopqrstuvwxyz";
    var wins = 0;
    var losses = 0;

    // Set a reset function that will update or reset (each as necessary) info each time you win or lose.
    function reset() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        blankPart = blankString.substring(0, currentWord.length);
        $("#blankWord").text(blankPart);
        guessesRemaining = 10;
        $("#guessesRemaining").text(guessesRemaining);
        $("#incorrectGuesses").text("");
        $("#losses").text("Losses: " + losses);
        $("#wins").text("Wins: " + wins);
    };

    reset();

    
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
            reset();            
        };
        
        if (blankPart.includes("_") === false) {
            alert('You win! The correct word was "' + currentWord + '."');
            wins = wins + 1;
            reset();
        };
    };
});