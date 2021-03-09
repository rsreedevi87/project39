var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rabit, rabit_running, rabit_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  rabit_running =   loadAnimation("p1.png","p2.png","p3.png","p4.png","p6.png");
  
  rabitC = loadAnimation("p1.png");
  groundImage = loadImage("b.png");  
  
  cloudImage = loadImage("cloud.png");
  
  carrot1 = loadImage("c5.png");
  carrot2 = loadImage("c12.png");
  carrot3 = loadImage("c2.png");
  carrot4 = loadImage("c5.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 400);
  
  rabit = createSprite(100,300,20,50);
  
  rabit.addAnimation("running", rabit_running);

  rabit.scale = 0.8;
  
  ground = createSprite(400,100,800,400);
  ground.addImage("ground",groundImage);
  ground.x =ground.width/2;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale =1.5;
  gameOver = createSprite(300,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  carrotGroup = new Group();
  score = 0;
}

function draw() {

  background(255);
 
  
  if (gameState===PLAY){
    
    if(carrotGroup.isTouching(rabit)){
      score = score + 2;
    }

   
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && rabit.y >= 159) {
      rabit.velocityY = -12;
    }
  
    rabit.velocityY = rabit.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = 500;
    }
  
    rabit.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    spawnCarrots();
    if(obstaclesGroup.isTouching(rabit)){
        gameState = END;
    }
    camera.position.x = displayWidth/4;;
   camera.position.y = displayHeight/4;

  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    rabit.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    carrotGroup.setVelocityXEach(0);
    //change the rabit animation
  //  rabit.changeAnimation("collided",rabit_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    carrotGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  textSize(35);
  fill("white");
  text("Score: "+ score, 300,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = 3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = rabit.depth;
    rabit.depth = rabit.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnCarrots() {
  if(frameCount % 30 === 0) {
    var carrot = createSprite(500,285,10,40);
  
    carrot.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
  
    switch(rand) { 
      case 1: carrot.addImage(carrot1);
              break;
      case 2: carrot.addImage(carrot2);
              break;
      case 3: carrot.addImage(carrot3);
              break;
      case 4: carrot.addImage(carrot4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    carrot.scale = 0.5;
    carrot.lifetime = 300;

    carrot.y = Math.round(random(180,280));
    //add each obstacle to the group
    carrotGroup.add(carrot);
  }
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,365,10,40);
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
  
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstacle.y = Math.round(random(300,370));
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  rabit.changeAnimation("running",rabit_running);
  
 
  
  score = 0;
  
}