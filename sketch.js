var footground,fg_img;
var box,box_img;
var obstacleGroup, obstacle1,obstacle2,obstacle3;
var score;
var gameover,gameover_img,restart,restart_img;
var mountains,mount_img;
var jumpSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
fg_img = loadImage("Footground.png");
box_img = loadImage("Box.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png");

gameover_img = loadImage("gameover.png");
restart_img = loadImage("restart.png");
mount_img = loadImage("mountains.png");

jumpSound = loadSound("jump.mp3");

}

function setup() {
  createCanvas(1000,410);
 
 footground= createSprite(500,365)
footground.addImage(fg_img);
footground.x = footground.width/2;
footground.velocityX = -3;

box = createSprite(56,360,50,50);
box.addImage(box_img);

obstacleGroup = new Group();

score = 0;

gameover = createSprite(500,80);
gameover.addImage(gameover_img);
gameover.scale = 0.25;
gameover.visible = false;

restart = createSprite(500,220);
restart.addImage(restart_img);
restart.scale = 0.5;
restart.visible = false;

mountains = createSprite(500,300)
mountains.addImage(mount_img);
mountains.depth = box.depth;
box.depth = box.depth + 1;
mountains.depth = footground.depth;
footground.depth = footground.depth + 1;
}

function draw() {
  background(216, 134, 239);  
 
  
 
if(gameState === PLAY){
  //score increase
  score = score + Math.round(getFrameRate()/60);

//moving ground
  footground.velocityX = -(9 + 3*score/100);

//making the box jump and giving it gravity to come down
if( box.collide(footground)){
  if(keyDown ("space") ){
    jumpSound.play();
   box.velocityY = -8;
 }
}
box.velocityY = box.velocityY + 0.3;

//repositioning the foot ground
if (footground.x < 100){
  footground.x = footground.width/2;
 }

 //spawning the obstacles
 spawn_obstacles();

 //colliding the box and the obstacles
 if(obstacleGroup.isTouching(box)){
   gameState = END;
 }
}
else if (gameState === END) {
//stopping everything
  footground.velocityX = 0;
box.velocityY = 0; 
obstacleGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
gameover.visible = true;
restart.visible = true;

if(mousePressedOver(restart)){
  reset();
}
}

 

 
  

  
  
 

  drawSprites();
  //displaying the score
  textSize(30);
  text("Score: " + score, 800,35);
}

function spawn_obstacles(){
  if(frameCount % 75 === 0) {
    var obstacle = createSprite(1100,285,10,40);
    obstacle.velocityX = -(9 + 3*score/100);
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }

    obstacle.scale = 0.18;
   obstacle.lifetime = 112;
   obstacle.depth = box.depth;
   box.depth = box.depth+1;
   obstacleGroup.add(obstacle); 
  }
}

function reset(){
  gameState = PLAY;
  score = 0;
  gameover.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
}