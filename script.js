let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 24;
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


const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

const directions = ['U', 'D', 'L', 'R']//up down left right ghost random movements

let score = 0;
let lives = 3;
let gameOver = false;

window.onload = function(){
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d")

    laodImages()
    laodMap()

    for(let ghost of ghosts.values()){
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection)

    }


    update()

    document.addEventListener('keyup', movePacman)
    // console.log(walls.size)
}

function laodImages(){
    wallImage = new Image();
    wallImage.src = './assets/image/wall (1).png';

    blueGhostImage = new Image();
    blueGhostImage.src = './assets/image/blueGhost.png';
    orrangeGhostImage = new Image();
    orrangeGhostImage.src = './assets/image/orangeGhost.png';
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


function laodMap(){
    walls.clear();
    foods.clear();
    ghosts.clear();

    for(let r = 0; r < rowCount ; r++){
        for(let c = 0; c < columnCount; c++){
            const row = tileMap[r]
            const tileMapChar = row[c]
            // console.log("Here starts Row",row)
            // console.log( 'Here starts Char',tileMapChar)

            const x = c*tileSize;
            const y = r*tileSize;
            // console.log('This is row', r)
            // console.log('This is col', c)
            // console.log('This is x', x)
            // console.log('This is y', y)

            if(tileMapChar == "X"){
                const wall = new Block(wallImage, x, y, tileSize, tileSize)
                walls.add(wall)
            }
            else if(tileMapChar == "b"){
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize)
                ghosts.add(ghost)
            }
            else if(tileMapChar == "o"){
                const ghost = new Block(orrangeGhostImage, x, y, tileSize, tileSize)
                ghosts.add(ghost)
            }
            else if(tileMapChar == "p"){
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize)
                ghosts.add(ghost)
            }
            else if(tileMapChar == "r"){
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize)
                ghosts.add(ghost)
            }

            else if(tileMapChar == "P"){
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize)
            }

            else if(tileMapChar == " "){
                const food = new Block(null, x + 14, y + 14, 4, 4)
                foods.add(food)
            }
        }
    }
}



function update(){
    if(gameOver){
        return;
    }
    move();
    draw();
    setTimeout(update, 50)
}

function draw(){
    context.clearRect(0, 0, board.width, board.height)
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height)
    for(let ghost of ghosts.values()){
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height)
    }
    for(let wall of walls.values()){
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height)
    }

    context.fillStyle = 'white';
    for(let food of foods.values()){
        context.fillRect(food.x, food.y, food.width, food.height)
    }


    // Scores 

    context.fillStyle = 'white';
    context.font = '14px sans-serif';
    if(gameOver){
        context.fillText('Game Over:' + String(score) , tileSize/2, tileSize/2)
    }

    else{
        context.fillText('x' + String(lives) + ' ' + String(score) , tileSize/2, tileSize/2);
    }
}

function move(){
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    for(let wall of walls.values()){
        if(collision(pacman, wall)){
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }

    for(let ghost of ghosts.values()){

        if(collision(ghost, pacman)){
            lives -= 1;
            if(lives == 0){
                gameOver = true;
                return;
            }
            resetPositions();
        }


        if(ghost.y == tileSize*9 && ghost.direction != 'U' && ghost.direction != 'D'){
            ghost.updateDirection('U')
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        for(let wall of walls.values()){
            if(collision(ghost, wall) || ghost.x <= 0 || ghost.x + ghost.width >= boardWidth){
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection = directions[Math.floor(Math.random() * 4)];
                ghost.updateDirection(newDirection);
            }
        }

    }

    // Check food collision..

    let foodEaten = null;

    for(let food of foods.values()){
        if(collision(pacman, food)){
            foodEaten = food;
            score += 10;
            break;
        }
    }

    foods.delete(foodEaten);

    if(foods.size == 0){
        laodMap()
        resetPositions()
    }


}

// Pacman Moves by pressing keys

function movePacman(e){

    if(gameOver){
        laodMap();
        resetPositions();
        lives = 3;
        score = 0;
        gameOver = false;
        update();
        return;
    }

    
    if(e.code == 'ArrowUp' || e.code == 'KeyW'){
        pacman.updateDirection('U');
    }
    else if(e.code == 'ArrowDown' || e.code == 'KeyS'){
        pacman.updateDirection('D');
    }
    else if(e.code == 'ArrowLeft' || e.code == 'KeyA'){
        pacman.updateDirection('L');
    }
    else if(e.code == 'ArrowRight' || e.code == 'KeyD'){
        pacman.updateDirection('R');
    }

    // Update Pacman Direction Image

    if(pacman.direction == 'U'){
        pacman.image = pacmanUpImage;
    }
    else if(pacman.direction == 'D'){
        pacman.image = pacmanDownImage
    }
    else if(pacman.direction == 'L'){
        pacman.image = pacmanLeftImage
    }
    else if(pacman.direction == 'R'){
        pacman.image = pacmanRightImage;
    }
}

function collision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y; 
}



// Reset All Positions
function resetPositions(){
    pacman.reset()
    pacman.velocityX = 0;
    pacman.velocityY = 0;

    for(let ghost of ghosts.values()){
        ghost.reset()
        const newDirection =  directions[Math.floor(Math.random() *4)];
        ghost.updateDirection(newDirection);
    }
}

class Block{
    constructor(image, x, y, height, width){
        this.image = image;
         this.x = x
         this.y = y;

         this.height = height;
         this.width = width;

         this.startX = x;
         this.startY = y;

         this.direction = 'R';
         this.velocityX = 0;
         this.velocityY = 0;

    }

         updateDirection(direction){
            const prevDirection = this.direction;
            this.direction = direction;
            this.updateVelocity();
            this.x += this.velocityX;
            this.y += this.velocityY;
            for(let wall of walls.values()){
                if(collision(this, wall)){
                    this.x -= this.velocityX;
                    this.y -= this.velocityY;
                    this.direction = prevDirection
                    this.updateVelocity()
                    return;
                }
            }
         }

         updateVelocity(){
            if(this.direction == 'U'){
                this.velocityX = 0;
                this.velocityY = -tileSize/4;
            }
            
            else if(this.direction == 'D'){
                this.velocityX = 0;
                this.velocityY = tileSize/4;
            }

            else if(this.direction == 'L'){
                this.velocityX = -tileSize/4;
                this.velocityY = 0;

            }

            else if(this.direction == 'R'){
                this.velocityX = tileSize/4;
                this.velocityY = 0;

            }

         }

         reset(){
            this.x = this.startX;
            this.y = this.startY;
         }


        }


