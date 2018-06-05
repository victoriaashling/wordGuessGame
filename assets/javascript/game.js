$(document).ready(function() {

    // Set global variables that will need to be accessed in multiple parts of the code.
    

    // This is where our words to be guessed originate.
    var words = ["japan", "germany", "uzbekistan", "lebanon", "nigeria", "singapore", "bangladesh", "ireland", "madagascar", "ethiopia", "canada", "belize", "mauritania", "vanuatu", "uruguay", "belgium", "latvia", "mozambique", "panama", "turkey"];
    
    // This variable is necessary to make the shuffle function work. We initialize it at the end of the array index so that it will fire when the page starts (the shuffle function is called within our resetPage function, which will be used to initialize the page as well). This way, we always start with a fresh shuffle. The value is a number.
    var nextWord = words.length - 1;
    
    // This is the word currently being guessed; it changes each time we win or lose.
    var currentWord = words[nextWord];

    // Here we have a string which will allow us to discount non-letter keystrokes (by checking if the currentKeystroke.toLowerCase is included in this string).
    var validLetters = "abcdefghijklmnopqrstuvwxyz";
    
    // We also have a string of underscores longer than any given word to be guessed. The blankPart variable takes this string and cuts it down to length for each new currentWord.
    var blankString = "______________________"
    var blankPart = blankString.substring(0, currentWord.length);
    
    // And a selection of counter variables initialzed for display and later use.
    var wins = 0;
    var losses = 0;
    var guessesRemaining = 8;

    


    // Next, we set up two functions:  one to cycle through the words array, and the other to tick our counters up and down and select a new word each time someone wins or loses.

    
    // This fuction shuffles the words in our array, such that each word is seen once per cycle. I initially wrote the code without this function so that the next word is just a random word, but this means you will see some words twice before you have seen others at all, which I didn't like.
    //  This function works by cycling through the array, pulling out the currently indexed word into a temporary variable, and then swapping it with another word at a random index. Each word will move at least once.
    function shuffle() {
        for (var i = 0; i < words.length; i++) {
            var temp = words[i];
            var randomNumber = Math.floor(Math.random() * words.length);
            words[i] = words[randomNumber];
            words[randomNumber] = temp;
        };
    };


    // Set a reset function that will update or reset (each as necessary) info each time you win or lose.
    function resetPage() {
        // This chunk of code increments nextWord each time you win or lose (which, in turn updates the value of currentWord), and then checks to make sure nextWord hasn't reached the length of the words array; if it has, the words are shuffled and nextWord is set back to the beginning.
        nextWord = nextWord + 1;
        if (nextWord === words.length) {
            shuffle();
            nextWord = 0;
        };
        // These lines get a new currentWord, reset blankPart and display blankPart on the page.
        currentWord = words[nextWord];
        blankPart = blankString.substring(0, currentWord.length);
        $("#blankWord").text(blankPart);
        // These lines either reset or increment the appropriate values.
        guessesRemaining = 8;
        $("#guessesRemaining").text(guessesRemaining);
        $("#incorrectGuesses").text("");
        $("#losses").text("Losses: " + losses);
        $("#wins").text("Wins: " + wins);
    };

    // We initialize the page by calling the resetPage function before any keys are pressed.
    resetPage();

    
    
    // Now that all of that is set up, we're ready to add an event listener.
    document.onkeyup = function(event) {

        // Again, I like to initialize my variables in once place. First we get pressedKey with our event listener, and then we need to make sure that its value is a lower case string (I didn't start by specifying toString, but I was getting an error, so I added it).
        var pressedKey = event.key;
        pressedKey = pressedKey.toString().toLowerCase();

        // The letterPresent variable is initialized to false. This will change if it is found, but remain if not. We need this to know which letters to print to incorrectGuesses.
        var letterPresent = false;

        // We need to search this text content to make sure we don't print the same letter to incorrectGuesses twice, or decrement guessesRemaining if the same key is pressed twice.
        var incorrectText = document.getElementById("incorrectGuesses").textContent;


        // This loop cycles through the current word and determines whether the pressedKey is present. I did it as a for loop in order to catch each instance of the pressedKey, if it was present more than once. It then rewrites blankPart to include the new letter(s) and publishes that to the page. Finally, it sets letterPresent to true, which will ensure that the next if statement (for incorrect guesses) doesn't run.
        for (var i = 0; i < currentWord.length; i++) {
            if (pressedKey == currentWord[i]) {
                blankPart = blankPart.slice(0, i) + currentWord[i] + blankPart.slice(i+1, blankPart.length);
                $("#blankWord").text(blankPart);
                letterPresent = true;
            };
        };

        // This if statement runs if the key pressed is a valid letter, isn't in the word, and isn't already in incorrect text (that is, hasn't been pressed before this round). It updates the guessesRemaining and incorrectGuesses sections of the page.
        if (letterPresent === false && validLetters.includes(pressedKey) && !(incorrectText.includes(pressedKey)) ) {
            // This little if statement lets the first letter be published to incorrectGuesses without a comma, but adds the comma and space between each subsequent letter.
            if ($("#incorrectGuesses").text() === "") {
                $("#incorrectGuesses").append(pressedKey); 
            }
            else {
                $("#incorrectGuesses").append(", " + pressedKey); 
            };
            guessesRemaining = guessesRemaining - 1;
            $("#guessesRemaining").text(guessesRemaining);
        };  
        
        // This is what will happen if you win the game. I included the setTimeout function at the instigation of my dad who was annoyed that the last letter didn't update before the "You win" alert popped up. So this way, the letter has time to populate on the page before the alert does. It also gives the alert the name of the country with an upper case first letter. Finally, it updates the wins value and resets the page.
        if (blankPart.includes("_") === false) {
            setTimeout(function () {
                wordPrint = currentWord.charAt(0).toUpperCase() + currentWord.slice(1, currentWord.length);
                alert('You win! The correct word was "' + wordPrint + '."');
                wins = wins + 1;
                resetPage();
            }, 100);

            
        };

        // This is what happens when you reach 0 guesses without winning. Basically, it tells you that you lost (and what the word was -- how aggravating to not know), updates losses, and resets the page, using our resetPage function.
        if (guessesRemaining < 1) {
            alert('You Lose! The correct word was "' + currentWord + '."');
            losses = losses + 1;
            resetPage();            
        };
    };
});