//board
let board;
let boardheight = 250;
let boardwidth = 750;
let context;

//dino
let dinoheight = 94;
let dinowidth = 88;
let dinox = 50;
let dinoy = boardheight - dinoheight;
let dinoImg;

let dino = {
    x: dinox,
    y: dinoy,
    width: dinowidth,
    height: dinoheight
}

//cactus
let cactusArray = [];
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardheight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;
let gameOverImage;
let gameOverImageX = 200;
let gameOverImageY = 100;
let gameOverImageWidth = 386;
let gameOverImageHeight = 40;

let resetBtn;
let resetBtnX = 350;
let resetBtnY = 150;
let resetBtnHeight = 68;
let resetBtnWidth = 76;

window.onload = function () {
    if (gameOver) {
        return;
    }
    board = document.querySelector(".board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");//used for drawing on the board
    //example
    // context.fillStyle="green";
    // context.fillRect(dino.x , dino.y , dino.width , dino.height );

    dinoImg = new Image();
    dinoImg.src = "./assets/dino.png";
    dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./assets/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./assets/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./assets/cactus3.png";

    setInterval(cactusPlace, 1000);
    setInterval(() => {
        velocityX--;
    }, 10000);
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDino);
}
function update() {
    if (gameOver) {
        return;
    }
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);
    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoy);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./assets/dino-dead.png";
            dinoImg.onload = function () {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
            reset();
        }
    }
    //score 
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);

    context.fillStyle = "black";
    context.font = "20px cursiv";
    context.fillText("develop by Tarush", 500 , 20);
}
function moveDino(e) {
    if (gameOver) {
        return;
    }
    if ((e.code == "space" || e.code == "ArrowUp") && dino.y == dinoy) {
        //jump
        velocityY = -10;
    }
    // else if ( e.code == "ArrowDown" && dino.y == dinoy)
}
function jump() {
    if (gameOver) {
        return;
    }
    if (dino.y == dinoy) {
        velocityY = -10;
    }
}
function cactusPlace() {
    if (gameOver) {
        return;
    }
    let cactus = {
        x: cactusX,
        y: cactusY,
        height: cactusHeight,
        width: null,
        img: null
    }

    let placeCactusChange = Math.floor(Math.random() * 10) + 1;

    if (placeCactusChange > 9) {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChange > 7) {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChange > 5) {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }
    if (cactusArray.length > 5) {
        cactusArray.shift();
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&  // a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x && // a's top left corner passes b's top right corner
        a.y < b.y + b.height && // a's top left corner doesn't reach b's buttom right corner
        a.y + a.height > b.y; // a's top buttom corner doesn't reach b's top right corner
}
function reset() {
    gameOverImage = new Image();
    gameOverImage.src = "./assets/game-over.png";
    gameOverImage.onload = function () {
        context.drawImage(gameOverImage, gameOverImageX, gameOverImageY, gameOverImageWidth, gameOverImageHeight);
    }
    resetBtn = new Image();
    resetBtn.src = "./assets/reset.png";
    resetBtn.onload = function () {
        context.drawImage(resetBtn, resetBtnX, resetBtnY, resetBtnWidth, resetBtnHeight);
    }
    board.addEventListener("click", function (event) {
        const rect = board.getBoundingClientRect();
        // console.log(event.clientX);
        // console.log(event.clientY);
        // console.log(rect);
        const mouseX = event.clientX- rect.left;
        const mouseY = event.clientY - rect.top;

        // // Check if the mouse click is inside the image area
        if (mouseX > 350 && mouseX < 426 && mouseY > 150 && mouseY < 218) {
            window.location.reload();
        }
    })
}
