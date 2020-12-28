var monkey , monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var ground;

var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);  
  
  ground = createSprite(50, 360, 1000, 5);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  console.log(ground.x);

  monkey = createSprite(50, 330, 1, 1);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  edges = createEdgeSprites();
}

function draw() {
  background(250);

  if(ground.x > 0){
    //scrolling ground
    ground.x = ground.width/2;
  }
  
if(World.frameCount % 80 == 0){
   banana = createSprite(400, Math.round(random(100, 200)), 1, 1);
    banana.velocityX = -6;
  banana.addImage(bananaImage);
  banana.scale = 0.1;
    banana.lifetime = 66.6;
    foodGroup.add(banana);
    }
  
  if(World.frameCount % 300 == 0){
    obstacle = createSprite(400, 330, 1, 1);
    obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 1.5;
    obstacle.lifetime = 66.6;
    obstaclesGroup.add(obstacle);
  }
  
  if(obstaclesGroup.isTouching(monkey)){
     obstaclesGroup.velocityX = 0;
    obstaclesGroup.collide(monkey);
     }
  
  if(keyDown("space")){
    monkey.velocityY = -9;
  } 
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  obstaclesGroup.collide(ground);

  drawSprites();
  
  stroke("black");
  textSize(20);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100, 150);
} 