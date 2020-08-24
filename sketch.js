var dog, database;
var bedroomImg, gardenImg, restroomImg, dogImg, happyDogImg;
var changeState, readState, gameState;
var button1, button2;
var food, foodStock, foodObj;
var fedTime, lastFed, currentTime

function preload() {
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  restroomImg = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);
  textSize(20);
  fill(255);

    
  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(250, 350, 20, 20);
  dog.addImage("dog", dogImg);
  dog.addImage("happy", happyDogImg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  button1 = createButton("Feed The Dog");
  button1.position(725, 100);
  button1.mousePressed(feedDog);

  button2 = createButton("Add Food");
  button2.position(725, 125);
  button2.mousePressed(addFood);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  getState();

}

function draw() {  
  currentTime = hour();

  if (currentTime === (lastFed + 1)) {
    updateState("Playing");
    foodObj.garden();
} else if (currentTime === (lastFed + 2)) {
    updateState("Sleeping");
    foodObj.bedroom();
}else if (currentTime === (lastFed + 3)) {
    updateState("Bathing");
    foodObj.restroom();
} else {
    updateState("Hungry");
    foodObj.display();
}

  fill(255, 255, 255);
  textSize(15);

  if(gameState!="Hungry"){
    button1.hide();
    button2.hide();
    dog.visible = false;
  }else{
    button1.show();
    button2.show();  
    dog.visible = true;
   }

  if (lastFed > 12) {
    text("Last Fed: " + lastFed%12 + " PM", 350, 30);
  } else if (lastFed === 0) {
    text("Last Fed : 12 AM", 350, 30);
  } else if (lastFed === 12) {
    text("Last Fed : 12 PM", 350, 30);
  } else {
    text("Last Fed: " + lastFed + "AM", 350, 30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });

  drawSprites();
}

function readStock(data) {
  food = data.val();
  foodObj.updateFoodStock(food);
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update ({
    Food: x
  });
}

function feedDog() {
  dog.changeImage("happy", happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
    gameState: "hungry"
  })
}

function addFood() {
  food++;
  database.ref('/').update({
    Food: food
  })
}

function getState() {
  readState = database.ref('gameState');
  readState.on("value", function(data) {
    gameState = data.val();
  });
}

function updateState(state){
  database.ref('/').update({
    gameState:state
  })
}