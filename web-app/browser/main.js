// import R from "./common/ramda.js";
// import Json_rpc from "./Json_rpc.js";

//Snake game, based on the old snake.io that was on every old (legendarily undestructable) nokia phone.
//The snake moves around a board to eat the apple and gets longer each time.
//This is based on an x,y axis where they determine movement as below:
//+x -> right
//-x -> left
//+y -> down
//-y -> up




//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
//snake head starting position
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

//game over variable default
var gameOver = false;

//score
var score;

window.onload = function()
{
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // setting speed of snake
    setInterval(update, 1000/5); //200 milliseconds
}


function update()
{
    if (gameOver) 
    {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //conditions for snake to eat apple and get longer
    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score = score + 1;
    }

    for (let i = snakeBody.length-1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length)           //if there are snake body parts in the array
    {
        snakeBody[0] = [snakeX, snakeY];    //send body part that's right after head to the position of the head
    }

    //painting on the functions
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //GAME OVER CONDITIONS
    //game over ff snake goes out of bounds
    if (snakeX < 0 || snakeX > columns*blockSize || snakeY < 0 || snakeY > rows*blockSize)
    {
        gameOver = true;
        alert("Game Over");
        window.location.reload();           //reload page to restart game after game over
    }
    //game over if snake eats itself, i.e. snake parts overlap
    for (let i = 0; i < snakeBody.length; i++)
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) 
        {
            gameOver = true;
            alert("Game Over");
            window.location.reload();      //reload page to restart game after game over
        }
    }
}
//setting conditions for movement of snake

function changeDirection(e)            //making sure that arrow keys and letters work even if caps lock is on
{
    if ((e.code == "ArrowUp"||e.key == "w"||e.key == "W") && velocityY != 1)      //snake can't go down while its moving up
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if ((e.code == "ArrowDown"||e.key == "s"||e.key == "S") && velocityY != -1)         //snake can't go up while its moving down
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if ((e.code == "ArrowLeft"||e.key == "a"||e.key == "A") && velocityX != 1)         //snake can't go right while it's moving left
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if ((e.code == "ArrowRight"||e.key == "d"||e.key == "D") && velocityX != -1)      //snake can't go left while its moving right
    {
        velocityX = 1;
        velocityY = 0;
    }
}

//randomly place apple after snake eats it
function placeFood()
{
    //(0-1) * columns -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

