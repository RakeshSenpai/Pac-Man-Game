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
}