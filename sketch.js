
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground,stop,stopi;


//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop=("sprite_0.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
  
  stopi=loadImage("monkey.png")

  

 
}


//Setup
function setup() {
  //Canvas
  createCanvas(600,590);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2
  
 //Ground
  ground = createSprite(70, 550,800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible=false
  
  //score
  score = 0;
  survialTime = 0;
  
}

//Draw
function draw() {
  
  //Background
  background ("lightgreen")
  
   //displaying survialtime
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 100, 50);
  
  //displaying score
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 300, 100);
  
 //Monkey
  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.round (frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 310) {
       monkey.velocityY = -14;
    }  
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
     monkey.vleocityY = 0
     
     monkey.destroy()
     
     stop=createSprite(200,480,10,10)
     stop.addImage(stopi)
     stop.scale=0.2
     

     
    ground.velocityX = 0

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey has fallen", 100, 240);
       text("Press ctrl+r to restart",130 ,140);
   }
 
  
  
 

  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 150===0) {
    banana = createSprite(200,275,10,10)
    banana.addImage(bananaImage);

    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
    

  }
}

//Obstacles
function obstacles() {
  if (frameCount % 200 === 0){
    obstacle = createSprite(350,550 ,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


