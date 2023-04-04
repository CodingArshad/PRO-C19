//HUNGRY MOUSE CHASING FOOD 

var road,mouse,cheese,apple,cat;
var roadImg,mouseImg,cheeseImg,appleImg,catImg;
var foodCollection = 0;
var cheeseG,appleG,catG;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
    roadImg = loadImage("road.jpg");
    mouseImg = loadImage("mouse.png")
    cheeseImg = loadImage("cheese.png");
    appleImg = loadImage("apple.png");
    catImg = loadImage("cat.png");
    endImg = loadAnimation("cat_mouse_catch.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    road = createSprite(windowWidth/2,400);
    road.addImage(roadImg);
    road.velocityY = 5;

    mouse = createSprite(width/2.2,height-20,20,20);
    mouse.addAnimation("mouseRunning",mouseImg);
    mouse.scale = 0.3;

    cheeseG = new Group();
    appleG = new Group();
    catG = new Group();
}

function createCat(){
    if (World.frameCount % 530 == 0) {
    var cat = createSprite(Math.round(random(50, width-50),40, 10, 10));
    cat.addImage(catImg);
    cat.scale=0.03;
    cat.velocityY = 6;
    cat.lifetime = 200;
    catG.add(cat);
    }
  }

function createCheese() {
    if (World.frameCount % 170 == 0) {
    var cheese = createSprite(Math.round(random(50, width-50),40, 10, 10));
    cheese.addImage(cheeseImg);
    cheese.scale=0.05;
    cheese.velocityY = 6;
    cheese.lifetime = 200;
    cheeseG.add(cheese);
   }
  }

function createApple() {
    if (World.frameCount % 210 == 0) {
    var apple = createSprite(Math.round(random(50, width-50),40, 10, 10));
    apple.addImage(appleImg);
    apple.scale=0.01;
    apple.velocityY = 6;
    apple.lifetime = 200;
    appleG.add(apple);
    }
  }

function draw() {
    if(gameState===PLAY){
        background(0);
        mouse.x = World.mouseX;

        edges = createEdgeSprites();
        mouse.collide(edges);

        if(road.y > height/1.7){
            road.y = 370;
        }

        createCheese();
        createApple();
        createCat();

        if(cheeseG.isTouching(mouse)){
            cheeseG.destroyEach();
            foodCollection = foodCollection + 10;
        }
        else if(appleG.isTouching(mouse)){
            appleG.destroyEach();
            foodCollection = foodCollection + 5;
        }
        else{
            if(catG.isTouching(mouse)){
                gameState = END;

                mouse.addAnimation("mouseRunning",endImg);
                mouse.x=width/2;
                mouse.y=height/2;
                mouse.scale=1;

                catG.destroyEach();
                cheeseG.destroyEach();
                appleG.destroyEach();

                cheeseG.setVelocityYEach(0);
                appleG.setVelocityYEach(0);
                catG.setVelocityYEach(0);
            }
        }
    drawSprites();
    textSize(20);
    fill(255);
    text("Food: "+ foodCollection,width-150,30);
    }

}