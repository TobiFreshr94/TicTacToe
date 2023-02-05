let SpielerAmZug;
let GameInProgress;
let sound = new Audio('win.mp3');
let round;
let StatisticWinsA = 0;
let StatisticWinsB = 0;
let StatisticDraw = 0;
let images = ["img/donut.png", "img/gingerbread.png"];
let playmode;
let player;
let cells;
let selectedField;
let d;
let t;

function StartGame(playmode) {
    FieldClean();
    cells = [];
    SpielerAmZug = Math.round(Math.random()) + 1;
    GameInProgress = true;
    resultarea.innerHTML = "Spieler " + SpielerAmZug + " ist am Zug";
    round = 0;
    lastClick = 0
    if (playmode == "singleplayer" && SpielerAmZug == 2) {
        d = new Date();
        t = d.getTime();
        lastClick = t;
        setTimeout(SelectFieldComputer, 1000);
        //SelectFieldComputer(); //        setTimeout(SelectFieldComputer, 3000);
        //fieldShort = selectedFieldShort;
        //fieldLong = selectedFieldLong;
        //ZugSpielen(fieldShort, fieldLong, "singleplayer");
    } 
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

function ZugSpielen(field, playmode) {
    
    d = new Date();
    t = d.getTime();
    if ((playmode == "singleplayer" && t - lastClick > 1000) || (playmode == "multiplayer")) {

        if (GameInProgress == true) {
            if ((field.innerHTML == "") || (playmode == "singleplayer" && SpielerAmZug == 2)) {
                field.innerHTML = SpielerAmZug;
                round = round + 1
                let image = new Image();
                image.src = images[SpielerAmZug - 1];
                field.appendChild(image);
                checkFields();

                if ((cells[0].includes(SpielerAmZug) && cells[1].includes(SpielerAmZug) && cells[2].includes(SpielerAmZug)) ||
                    (cells[3].includes(SpielerAmZug) && cells[4].includes(SpielerAmZug) && cells[5].includes(SpielerAmZug)) ||
                    (cells[6].includes(SpielerAmZug) && cells[7].includes(SpielerAmZug) && cells[8].includes(SpielerAmZug)) ||
                    (cells[0].includes(SpielerAmZug) && cells[3].includes(SpielerAmZug) && cells[6].includes(SpielerAmZug)) ||
                    (cells[1].includes(SpielerAmZug) && cells[4].includes(SpielerAmZug) && cells[7].includes(SpielerAmZug)) ||
                    (cells[2].includes(SpielerAmZug) && cells[5].includes(SpielerAmZug) && cells[8].includes(SpielerAmZug)) ||
                    (cells[0].includes(SpielerAmZug) && cells[4].includes(SpielerAmZug) && cells[8].includes(SpielerAmZug)) ||
                    (cells[2].includes(SpielerAmZug) && cells[4].includes(SpielerAmZug) && cells[6].includes(SpielerAmZug))) {
                    resultarea.innerHTML = "Spieler " + SpielerAmZug + " hat gewonnen!";
                    if (SpielerAmZug == 1) {
                        StatisticWinsA = StatisticWinsA + 1;
                        fieldSiege1.innerHTML = StatisticWinsA;
                    } else {
                        StatisticWinsB = StatisticWinsB + 1;
                        fieldSiege2.innerHTML = StatisticWinsB;
                    }
                    sound.play();
                    GameInProgress = false;

                } else if (round >= 9) {
                    resultarea.innerHTML = "Unentschieden! <br> Klicke Neues Spiel starten";
                    StatisticDraw = StatisticDraw + 1;
                    fieldUnentschieden.innerHTML = StatisticDraw;
                    GameInProgress = false;
                } else {
                    if (SpielerAmZug == 1) {
                        lastClick = t;
                        SpielerAmZug = 2;
                    } else {
                        SpielerAmZug = 1;
                    }
                    resultarea.innerHTML = "Spieler " + SpielerAmZug + " ist am Zug";
                    if (playmode == "singleplayer" && SpielerAmZug == 2) {
                        setTimeout(SelectFieldComputer, 1000);
                    }
                }

            } else if (round >= 9) {
                resultarea.innerHTML = "Unentschieden! <br> Klicke Neues Spiel starten";
                GameInProgress = false;
            } else {
                resultarea.innerHTML = "Feld bereits belegt! <br> Spieler " + SpielerAmZug + " ist am Zug";
            }
        }
    }
}

function SelectFieldComputer() {
    let cellsEmpty = [];
    checkFields();
    selectedField = "";
    // Spielstrategie: 
    // 1. Wenn schon zwei in a row, dann nimm die dritte in a row und gewinne selbst
    // 2. Wenn Spieler 1 zwei in a row, dann nimm die dritte und vermeide gegnerischen Sieg
    // 3. Wenn 5 frei, dann nimm die 5
    // 4. sonst nimm irgendein anderes freies Feld
    for (let i = 1; i <= 2; i++) {
        spieler = i;
        if ((cells[0].includes(spieler) && cells[1].includes(spieler) && cells[2] == "")) {
            selectedField = "td#field3.trGame";
        } else if ((cells[1].includes(spieler) && cells[2].includes(spieler) && cells[0] == "")) {
            selectedField = "td#field1.trGame";
        } else if ((cells[0].includes(spieler) && cells[2].includes(spieler) && cells[1] == "")) {
            selectedField = "td#field2.trGame";
        } else if ((cells[3].includes(spieler) && cells[4].includes(spieler) && cells[5] == "")) {
            selectedField = "td#field6.trGame";
        } else if ((cells[4].includes(spieler) && cells[5].includes(spieler) && cells[3] == "")) {
            selectedField = "td#field4.trGame";
        } else if ((cells[3].includes(spieler) && cells[5].includes(spieler) && cells[4] == "")) {
            selectedField = "td#field5.trGame";
        } else if ((cells[6].includes(spieler) && cells[7].includes(spieler) && cells[8] == "")) {
            selectedField = "td#field9.trGame";
        } else if ((cells[7].includes(spieler) && cells[8].includes(spieler) && cells[6] == "")) {
            selectedField = "td#field7.trGame";
        } else if ((cells[6].includes(spieler) && cells[8].includes(spieler) && cells[7] == "")) {
            selectedField = "td#field8.trGame";
        } else if ((cells[0].includes(spieler) && cells[3].includes(spieler) && cells[6] == "")) {
            selectedField = "td#field7.trGame";
        } else if ((cells[3].includes(spieler) && cells[6].includes(spieler) && cells[0] == "")) {
            selectedField = "td#field1.trGame";
        } else if ((cells[0].includes(spieler) && cells[6].includes(spieler) && cells[3] == "")) {
            selectedField = "td#field4.trGame";
        } else if ((cells[1].includes(spieler) && cells[4].includes(spieler) && cells[7] == "")) {
            selectedField = "td#field8.trGame";
        } else if ((cells[4].includes(spieler) && cells[7].includes(spieler) && cells[1] == "")) {
            selectedField = "td#field2.trGame";
        } else if ((cells[1].includes(spieler) && cells[7].includes(spieler) && cells[4] == "")) {
            selectedField = "td#field5.trGame";
        } else if ((cells[2].includes(spieler) && cells[5].includes(spieler) && cells[8] == "")) {
            selectedField = "td#field9.trGame";
        } else if ((cells[5].includes(spieler) && cells[8].includes(spieler) && cells[2] == "")) {
            selectedField = "td#field3.trGame";
        } else if ((cells[2].includes(spieler) && cells[8].includes(spieler) && cells[5] == "")) {
            selectedField = "td#field6.trGame";
        } else if ((cells[0].includes(spieler) && cells[4].includes(spieler) && cells[8] == "")) {
            selectedField = "td#field9.trGame";
        } else if ((cells[4].includes(spieler) && cells[8].includes(spieler) && cells[0] == "")) {
            selectedField = "td#field1.trGame";
        } else if ((cells[0].includes(spieler) && cells[8].includes(spieler) && cells[4] == "")) {
            selectedField = "td#field5.trGame";
        } else if ((cells[6].includes(spieler) && cells[4].includes(spieler) && cells[2] == "")) {
            selectedField = "td#field3.trGame";
        } else if ((cells[4].includes(spieler) && cells[2].includes(spieler) && cells[6] == "")) {
            selectedField = "td#field7.trGame";
        } else if ((cells[6].includes(spieler) && cells[2].includes(spieler) && cells[4] == "")) {
            selectedField = "td#field5.trGame";
        }

        if (selectedField == "") {
            if (document.getElementById("field5").innerHTML.length <= 1) {
                selectedField = "td#field5.trGame";
            } else {
                for (let i = 1; i <= 9; i++) {
                    cellvalue = document.getElementById("field" + i).innerHTML;
                    if (cellvalue.length <= 1) {
                        cellsEmpty.push(i);
                    }
                };
                let randomInt = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)];
                selectedField = "td#field" + randomInt + ".trGame";
            }
        }
    }
    document.querySelector(selectedField).click();
}

function checkFields() {
    cells = [];
    for (let i = 1; i <= 9; i++) {
        cellvalue = document.getElementById("field" + i).innerHTML;
        cells.push(cellvalue);
    };
}
