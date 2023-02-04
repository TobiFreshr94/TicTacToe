let SpielerAmZug;
let WinningStatus;
let sound = new Audio('win.mp3');
let round;
let multiplayerWinsA = 0;
let multiplayerWinsB = 0;
let multiplayerDraw = 0;

function StartGame() {
    FieldClean();
    SpielerAmZug = Math.round(Math.random()) + 1;
    GameInProgress = true;
    resultarea.innerHTML = "Spieler " + SpielerAmZug + " ist am Zug";
    round = 0;
}

function FieldClean() {
    field1.innerHTML = "";
    field2.innerHTML = "";
    field3.innerHTML = "";
    field4.innerHTML = "";
    field5.innerHTML = "";
    field6.innerHTML = "";
    field7.innerHTML = "";
    field8.innerHTML = "";
    field9.innerHTML = "";
}

function ZugSpielen(field) {


    const images = [
        "img/donut.png",
        "img/gingerbread.png"
    ];

    if (GameInProgress == true) {
        if (field.innerHTML == "") {
            field.innerHTML = SpielerAmZug;
            round = round + 1
            const image = new Image();
            image.src = images[SpielerAmZug - 1];
            field.appendChild(image);

            const cell1 = document.getElementById("field1");
            const cell2 = document.getElementById("field2");
            const cell3 = document.getElementById("field3");
            const cell4 = document.getElementById("field4");
            const cell5 = document.getElementById("field5");
            const cell6 = document.getElementById("field6");
            const cell7 = document.getElementById("field7");
            const cell8 = document.getElementById("field8");
            const cell9 = document.getElementById("field9");

            if ((cell1.innerHTML.includes(SpielerAmZug) && cell2.innerHTML.includes(SpielerAmZug) && cell3.innerHTML.includes(SpielerAmZug)) ||
                (cell4.innerHTML.includes(SpielerAmZug) && cell5.innerHTML.includes(SpielerAmZug) && cell6.innerHTML.includes(SpielerAmZug)) ||
                (cell7.innerHTML.includes(SpielerAmZug) && cell8.innerHTML.includes(SpielerAmZug) && cell9.innerHTML.includes(SpielerAmZug)) ||
                (cell1.innerHTML.includes(SpielerAmZug) && cell4.innerHTML.includes(SpielerAmZug) && cell7.innerHTML.includes(SpielerAmZug)) ||
                (cell2.innerHTML.includes(SpielerAmZug) && cell5.innerHTML.includes(SpielerAmZug) && cell8.innerHTML.includes(SpielerAmZug)) ||
                (cell3.innerHTML.includes(SpielerAmZug) && cell6.innerHTML.includes(SpielerAmZug) && cell9.innerHTML.includes(SpielerAmZug)) ||
                (cell1.innerHTML.includes(SpielerAmZug) && cell5.innerHTML.includes(SpielerAmZug) && cell9.innerHTML.includes(SpielerAmZug)) ||
                (cell3.innerHTML.includes(SpielerAmZug) && cell5.innerHTML.includes(SpielerAmZug) && cell7.innerHTML.includes(SpielerAmZug))) {
                resultarea.innerHTML = "Spieler " + SpielerAmZug + " hat gewonnen!";
                if (SpielerAmZug == 1) {
                    multiplayerWinsA = multiplayerWinsA + 1;
                    fieldSiege1.innerHTML = multiplayerWinsA;
                } else {
                    multiplayerWinsB = multiplayerWinsB + 1;
                    fieldSiege2.innerHTML = multiplayerWinsB;
                }
                sound.play();
                GameInProgress = false;

            } else if (round >= 9) {
                resultarea.innerHTML = "Unentschieden! <br> Klicke Neues Spiel starten";
                multiplayerDraw = multiplayerDraw + 1;
                fieldUnentschieden.innerHTML = multiplayerDraw;
                GameInProgress = false;
            } else {
                if (SpielerAmZug == 1) {
                    SpielerAmZug = 2;
                } else {
                    SpielerAmZug = 1;
                }
                resultarea.innerHTML = "Spieler " + SpielerAmZug + " ist am Zug";
            }

        } else if (round >= 9) {
            resultarea.innerHTML = "Unentschieden! <br> Klicke Neues Spiel starten";
            GameInProgress = false;
        } else {
            resultarea.innerHTML = "Feld bereits belegt! <br> Spieler " + SpielerAmZug + " ist am Zug";
        }
    }
}



