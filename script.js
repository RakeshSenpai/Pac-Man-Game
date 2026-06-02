let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 32;
const boardWidth = columnCount*tileSize;
const boardHeight = rowCount*tileSize;
let context;

let blueGhostImage;
let orrangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let scaredGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

window.onload = function(){
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d")

    laodImages()
}


//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];




function laodImages(){
    wallImage = new Image();
    wallImage.src = './assets/image/wall (1).png';

    blueGhostImage = new Image();
    blueGhostImage.src = './assets/image/blueGhost.png';
    orrangeGhostImage = new Image();
    orrangeGhostImage.src = './assets/image/orrangeGhostImage';
    pinkGhostImage = new Image();
    pinkGhostImage.src = './assets/image/pinkGhost.png';
    redGhostImage = new Image();
    redGhostImage.src = './assets/image/redGhost.png';

    
    pacmanUpImage = new Image();
    pacmanUpImage.src = './assets/image/pacmanUp.png';
    pacmanDownImage = new Image();
    pacmanDownImage.src = './assets/image/pacmanDown.png';
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = './assets/image/pacmanLeft.png';
    pacmanRightImage = new Image();
    pacmanRightImage.src = './assets/image/pacmanRight.png';

}