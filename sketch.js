
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var bananaG, stoneG
  var score
  var ground
  var start = 0;
  var play = 1;
  var end = 2;
  var win = 3;
  var gameState = start;
  var score,deaths;

function preload(){
  
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

  }



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(50,200,1,1);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.11;
  monkey.setCollider("circle",0,0,300)
  //monkey.debug = true;

  
  ground = createSprite(300,340,800,10);
  
  bananaG = new Group();
  stoneG = new Group();
  
  score = 0;
  deaths= 0;
}
  

function draw() {
  
  background(220);
  
  drawSprites();
  
  if(gameState === start){
    
    monkey.visible = false;
    ground.visible = false;
    
    textSize(18);
    
    fill("blue");
    stroke("red");
    text("1.Catch bananas from the monkey to score points.",0,160);
    
    fill("red");
    stroke("yellow");
    text("2.Difficulty of game increase after every 5 points.",1,200);
    
    fill("blue");
    stroke("yellow");
    text("3.If you touch a rock, deaths increase by 1.If ",1,240);
    text("death count becomes 3 the game ends.",15,260);
    
    fill("purple");
    stroke("yellow");
    text("4.Score 30 points to win. ",1,300);
    
    
    textSize(20);
    
    fill("black");
    stroke("black");
    text("Read instructions before playing:",5,120);
    
    textSize(30)
    
    fill("black");
    stroke("yellow");
    text("Press enter to start",70,60);
    
    
  }
  
  if(keyDown("enter")&& gameState === start){
    
    gameState = play;
    
  }
  
  if(gameState === play){
    
  bananas();
  rock();
    
  ground.velocityX = -4.6;
    
  monkey.visible = true;
  ground.visible = true;
    
  textSize(18);
  fill("red");
  stroke("black");
  text("Score: "+score,1,20);
    
  fill("blue");
  text("Deaths : "+deaths,310,20);
    
  if(ground.x < 0 ){
    
    ground.x = 300;
    
  }
  
  monkey.collide(ground);
    
  // console.log(monkey.y);
  
  if(keyDown("space")&& monkey.y > 300){
    
    monkey.velocityY = -14;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.7;
    
  if(monkey.isTouching(bananaG)){
    
    score = score + 1;
    bananaG.destroyEach();
  }
    
  if(monkey.isTouching(stoneG)){
    
    deaths = deaths + 1;
    stoneG.destroyEach();
    
  }
    
    if(score === 30){
      
      gameState = win;
      banana.visible = false;
      obstacle.visible = false;
      
    }
    
    if(deaths === 3){
      
      gameState = end;
      obstacle.visible = false;
      banana.visible = false;
      
    }
  
  
  }else if(gameState === win){
    
    ground.visible = false;
    monkey.visible = false;
    
    textSize(70);
    fill("brown");
    stroke("yellow");
    strokeWeight(15);
    text("YOU WON",30,200);
    
    textSize(20);
    fill("black");
    stroke("red");
    strokeWeight(1);
    text("Press P to play again",100,350);
    
    score = 0;
    deaths = 0;
    
  }else if(gameState === end){
    
    ground.visible = false;
    monkey.visible = false;
    
    textSize(65);
    fill("black");
    stroke("yellow");
    strokeWeight(15);
    text("YOU LOST",30,200);
    
    textSize(25);
    fill("black");
    stroke("orange");
    strokeWeight(1);
    text("Press R to restart",100,350);
    
    score = 0;
    deaths = 0;
    
  } if(keyDown("p")&& gameState === win){
    gameState = start;
    monkey.y = 200
   
   
  }if(keyDown("r")&& gameState === end){
   
   gameState = start;
   monkey.y = 200;
   
  }
  
  
}

function bananas(){
  
  if(frameCount%95 === 0){
    
    banana = createSprite(400,Math.round(random(130,200)),1,1);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX = -(4.6 + score/5);
    
    banana.lifetime = 100;
    
    bananaG.add(banana);
    
    //banana.debug = true;
    banana.setCollider("rectangle",0,0,550,270);
    
    
  }
  
}

function rock(){
  
  if(frameCount%187 ===0){
    
    obstacle = createSprite(400,310,1,1);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.16;
    
    obstacle.velocityX = -(4.6 + score/5);
      
    obstacle.lifetime = 100;
    
    stoneG.add(obstacle);
    
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,190);
    
    
  }
}



