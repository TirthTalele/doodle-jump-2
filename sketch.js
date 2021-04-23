var doodle ,doodle1img ,doodle2img ,pageimg ,page,doodle3img, rocketimg, doodle4img ;
var gamestate="play";
var greenGroup,brownGroup;
var invisibleBlock;

var edges;
function preload(){  
  pageimg = loadImage("back.png");
  doodle1img = loadAnimation("doodle_left-removebg-preview.png");
  doodle2img = loadAnimation("right.png");
  doodle3img = loadAnimation("attack1.png","attack2.png","attack3.png","attack4.png");
   rocketimg = loadAnimation("rocket.png");
   doodle4img = loadAnimation("doodlefly.png");
}
function setup(){
createCanvas(600,800)  
 page= createSprite (300,400,600,800);  
 page.addImage(pageimg);
 page.scale=1.25;
  doodle= createSprite(300,300,50,50);
 doodle.addAnimation("left",doodle1img);
 doodle.addAnimation("right",doodle2img);
 doodle.addAnimation("attack",doodle3img);
 doodle.addAnimation("fly",doodle4img);
 doodle.debug = true;
 doodle.setCollider("rectangle",0,0,100,100)
 doodle.scale = 0.6;
 invisibleBlock= createSprite(300,310,600,10);
 invisibleBlock.visible = false;
  //define Groups
   greenGroup= new Group(); 
  brownGroup= new Group();
  rocketGroup= new Group();
   edges =  createEdgeSprites();
}

function draw(){
  background(0);
  if(gamestate==="play"){
    //reset background
 if (page.y>500){
  page.y=400; 
 }
  page.velocityY = 3;
  doodle.collide(invisibleBlock);
  doodle.collide(edges[0]);
  doodle.collide(edges[1]);
  doodle.collide(edges[2]);
    if(keyDown("right")){
    doodle.x = doodle.x + 8;
    doodle.changeAnimation("right",doodle2img);
    doodle.scale = 0.6;
  }
  if(keyDown("left")){
    doodle.x = doodle.x - 8;
    doodle.changeAnimation("left",doodle1img);
    doodle.scale = 0.6;
  }
  if(keyDown("space")){
    
    doodle.changeAnimation("attack",doodle3img);
    doodle.frameDelay = 10;
    doodle.scale = 0.7;
  }
 
  //doodle comes down
  doodle.velocityY = doodle.velocityY + 0.5;

  if(greenGroup.isTouching(invisibleBlock)){
   
      invisibleBlock.destroy();
            
  }

  if(greenGroup.isTouching(doodle)){
    doodle.velocityY = 0;
    if(keyDown("up")){
      doodle.velocityY = -15;
    }
   
   }

   if(brownGroup.isTouching(doodle)){
    doodle.velocityY = 0;
    if(keyDown("up")){
      doodle.velocityY = -8;
    }
   brownGroup.destroyEach();
        
   }
 /*  if(ghost.isTouching(invisiblegroup)){
     gamestate="end";
     ghost.destroy();
   doorgroup.destroyEach();
   climbergroup.destroyEach();
  invisiblegroup.destroyEach();
   }
   */    
  
  if(rocketGroup.isTouching(doodle)){
 rocketGroup.destroyEach();
 doodle.changeAnimation("fly",doodle4img);
 doodle.velocityY = -25;
// page.velocityY = 5;



  }
  
  }
  
  
  SpawnRocket();
  SpawnGreen();
  SpawnBrown();
  drawSprites(); 
 if (gamestate==="end"){
  stroke("yellow"); 
   fill("yellow");
   textSize(30);
   text("Game Over", 230,250) 
                                
 }
  
}
//generate/spawn the green platform
function SpawnGreen(){
  
if(frameCount%60===0){
  green= createSprite(300,-10,50,10);
  green.shapeColor = "green";
//  green.addImage( doorImg);
  green.velocityY =2 ;
  green.x=Math.round(random (100,500));
  green.depth=doodle.depth;
  doodle.depth++;
  green.lifetime=1000;
  
 greenGroup.add(green);
   
}  
}
function SpawnBrown(){
  
  if(frameCount%90===0){
    brown= createSprite(300,-10,50,10);
    brown.shapeColor = "brown";
  //  green.addImage( doorImg);
  brown.velocityY =2 ;
  brown.x=Math.round(random (100,500));
  brown.depth=doodle.depth;
  brown.depth++;
  brown.lifetime=1000;
    
   brownGroup.add(brown);  
  }  
  
} 
function SpawnRocket(){
  
  if(frameCount%120===0){
    rocket= createSprite(300,-10,50,10);
    //green.shapeColor = "green";
    rocket.addAnimation( rocketimg);
  rocket.velocityY =2 ;
  rocket.x=Math.round(random (100,500));
  rocket.depth=doodle.depth;
  rocket.depth++;
  rocket.lifetime=1000;
    
  rocketGroup.add(rocket);
     
  }  
  }

