var list = [];
var i = 0;
var level = 0;

$(document).keypress(function() {
    setTimeout(selectButton, 300);
});

$(document).click(function(event) {
    var target = $(event.target);

    if (target.attr("type") === "button") {
        animateButton(target);
        playSound(target.attr("id"));
        verification(target.attr("id"));
    }
});

// Fonction de vérification de la séquence
function verification(clickedElementId) {
    if (list[i] === clickedElementId) { 
        console.log("True");
        i++;

        if (i === list.length) {
            console.log("Good job");
            setTimeout(selectButton, 500);
            i = 0;
            level++;
        }
    } else {
        gameOver();
    }
}

// Fonction pour jouer un son
function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

// Fonction d'animation des boutons
function animateButton(button) {
    button.addClass("pressed");
    setTimeout(() => button.removeClass("pressed"), 200);
}

// Fonction pour générer un bouton aléatoire
function getRandomButton() {
    var buttons = ["green", "red", "yellow", "blue"];
    return $("#" + buttons[Math.floor(Math.random() * buttons.length)]);
}

// Fonction de sélection d'un bouton et mise à jour du niveau
function selectButton() {
    $("h1").text("Level " + (level + 1));
    
    var selectedElement = getRandomButton();
    animateButton(selectedElement);
    playSound(selectedElement.attr("id"));

    list.push(selectedElement.attr("id"));
    console.log(list);
}

// Fonction de gestion du Game Over
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    console.log("Game over");
    $("h1").text("Game Over, Press Any Key to Restart");

    list = [];
    i = 0;
    level = 0;
}
