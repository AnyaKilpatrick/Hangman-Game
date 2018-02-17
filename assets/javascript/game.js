//GLOBAL VARIABLES
var win = 0;
var userLetter //pressed key
var image
var audio
var attempts
var wordHolder
var createdUl
var createdLi
var emptyWordHolder = []; //holder for list that will appear inside of empty <div> with id = "emptyspot"
var guessedLetters = []; // list of letters that were pressed
var guessedRightLetters = []; //array of right guessed characters
var AlreadyGuessedLetters = document.getElementById("guessedLetters");
var attemptsLeft = document.getElementById("guessCount");
var imageDiv = document.getElementById("imgForWin");
var wordDiv = document.getElementById("wordForWin");

//GAME OBJECT
var game = {
    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q" ,"r" ,"s", "t", "u", "v", "w", "x", "y", "z"],
    word: ["shire", "thorin","gendalf", "saruman", "ring", "smaug", "dragon", "gollum","smeagol", "bilbo"],
    //computer picks random word from game.word Array
    mainTheme: function (){
        audio = new Audio("assets/audio/main-theme(cut).mp3");
        audio.play();
    },
    restart: function () {
        myWord = game.word[Math.floor(Math.random() * game.word.length)];
        guessedRightLetters = [];
        guessedLetters = [];
        emptyWordHolder = [];
        attempts = 15;
        attemptsLeft.innerHTML = attempts;
        console.log(myWord);
        game.emptyWord();

    },
    //emptyWord function will create a list in an empty <div> with as many <li> as there are characters in the word, and will display each character as "_".
    emptyWord: function () {
        wordHolder = document.getElementById("emptyspot");
        createdUl = document.createElement("ul");
        for (var i = 0; i < myWord.length; i++) {
        createdUl.setAttribute("id", "my-word");
        createdLi = document.createElement("li");
        createdLi.setAttribute("class", "guess");
        createdLi.innerHTML = "_";
        emptyWordHolder.push(createdLi);
        wordHolder.appendChild(createdUl);
        createdUl.appendChild(createdLi);
        }
    },
    // checkUserGuess function will look for the right key to reveal the character
    checkUserGuess: function () {
        var donotrepeat = guessedRightLetters.indexOf(userLetter);
        for (var j = 0; j < myWord.length; j++) {
            if (myWord[j] === userLetter) {
                emptyWordHolder[j].innerHTML = userLetter;
                if (donotrepeat === -1){
                    guessedRightLetters.push(userLetter); //push right letter into the array of right letters
                }
            } 
        }
    },
    questionImage: function () {
        image = document.createElement("IMG");
        image.setAttribute("src", "assets/images/question.png");
        image.setAttribute("width", "100%");
        image.setAttribute("height", "auto");
        image.setAttribute("alt", "Word");
        imageDiv.appendChild(image);
    },
    //changes image source and audio depending on what word was guessed before
    pickImage: function () {
        if (wordDiv.outerText === "shire") {
                image.setAttribute("src", "assets/images/shire.jpg");
                audio.setAttribute("src", "assets/audio/Shire.mp3");
                 //loads new source
                audio.play();
            }
        else if (wordDiv.outerText === "thorin") {
            image.setAttribute("src", "assets/images/thorin.png");
            audio.setAttribute("src", "assets/audio/thorin.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "gendalf") {
            image.setAttribute("src", "assets/images/gendalf.png");
            audio.setAttribute("src", "assets/audio/gendalf.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "saruman") {
            image.setAttribute("src", "assets/images/saruman.png");
            audio.setAttribute("src", "assets/audio/saruman.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "gollum") {
            image.setAttribute("src", "assets/images/gollum.png");
            audio.setAttribute("src", "assets/audio/gollum.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "smeagol") {
            image.setAttribute("src", "assets/images/gollum.png");
            audio.setAttribute("src", "assets/audio/gollum.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "dragon") {
            image.setAttribute("src", "assets/images/dragon.png");
            audio.setAttribute("src", "assets/audio/smaug.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "ring") {
            image.setAttribute("src", "assets/images/ring.png");
            audio.setAttribute("src", "assets/audio/ring.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "smaug") {
            image.setAttribute("src", "assets/images/smaug.png");
            audio.setAttribute("src", "assets/audio/smaug.mp3");
            audio.load();
            audio.play();
        }
        else if (wordDiv.outerText === "bilbo") {
            image.setAttribute("src", "assets/images/baggins.png");
            audio.setAttribute("src", "assets/audio/bilbo.mp3");
            audio.load();
            audio.play();
        }
    }
};
//start the game

game.restart();
game.mainTheme();

game.questionImage();

document.onkeyup = function(event) {
    userLetter = event.key;
    for (var k=0; k < game.alphabet.length; k++){    //set loop so we can check if pressed key (var userLetter) belongs to alphabet, 
        if (userLetter === game.alphabet[k]) {       // so game will ignore other keys like "Enter","Tab", "Volume" etc
            var IndexForGuessedLetter = myWord.indexOf(userLetter);
            var IndexForAlreadyGuessedList = guessedLetters.indexOf(userLetter);
            console.log (userLetter); //console.log to check if game sensored pressed key
            game.checkUserGuess();
                       
            if (IndexForGuessedLetter === -1 && IndexForAlreadyGuessedList === -1) {  // when wrong key is pressed, 
                attempts-=1;  // we will have minus 1 attempts left (only if this wrong key was pressed the first time);
                attemptsLeft.innerHTML = attempts;         
                guessedLetters.push(userLetter);
                AlreadyGuessedLetters.innerHTML = guessedLetters;  // then it will show up at the page bottom in "guessed letters" section
            };
            if (attemptsLeft.outerText === "-1") { //setting rules for when all 15 attempts were used
                createdUl.removeChild(createdLi);
                wordHolder.removeChild(createdUl);
                while (AlreadyGuessedLetters.hasChildNodes()) {
                    AlreadyGuessedLetters.removeChild(AlreadyGuessedLetters.firstChild);
                }
                game.restart();
            };
            for (var w=0; w<myWord.length; w++){ //setting rules for when word is guessed right or when all attempts were used
                if (guessedRightLetters.length === myWord.length) { 
                    win +=1;
                    document.getElementById("winCount").innerHTML = win;
                    wordDiv.innerHTML = myWord;
                    createdUl.removeChild(createdLi);
                    wordHolder.removeChild(createdUl);
                    while (AlreadyGuessedLetters.hasChildNodes()) {
                        AlreadyGuessedLetters.removeChild(AlreadyGuessedLetters.firstChild);
                    }
                    game.pickImage();
                    game.restart();
                }
            };

        };
    };  
};