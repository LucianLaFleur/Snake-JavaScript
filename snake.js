/*
Created by Learn Web Developement
On Youtube under the account "Code Explained"
Youtube channel link : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the "box" unit, which is 32 pixels for each of the "squares" on our "ground" image
const box = 32;

// load images (path may be different depending on your own file tructures)

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

//  if audio files are not loading, check your paths, they may be different on your computer depending on file structure
//  These assume all files are in a sub-folder called "audio" placed in the current directory
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the initial snake at coordinated x-9 and y-10 in terms of our box-units, which organize space on the playing field

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food image at a random place on the playing field

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//controls for the snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// check for collision with a custom function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas (referring to the HTML tag where all the visuals will be rendered) 

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // use the direction variable "d" to determine which direction the snake is moving in
    // this is where the new head will be generated to create the illusion of movement
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        // increment the score
        score++;
        // play the audio for the food being eaten
        eat.play();
        // generate a new food object
        // NOTE: It appears that food CAN spawn on the snake's body with this method of random generation
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // if food is eaten, we don't remove the tail (which lengthens the snake's body by one)
    }else{
        // if the snake's head isn't on the same box as the food object, remove the tail, maintaining the same body length
        snake.pop();
    }
    
    // add a new Head to the snake
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // check for game over conditions, colliding with the walls or the snake's own body
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        // stop the game
        clearInterval(game);
        // play death sound
        dead.play();
    }
    
    snake.unshift(newHead);
    
//  draw the score, which will be "white" in color, 45 pixels in size, and of the font-family "Changa one"
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);


















