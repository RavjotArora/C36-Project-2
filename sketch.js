var dog,sadDog,happyDog;
var milk, milkImg;
var foodS;
var database;
var readStock;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkImg = loadImage("Milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  foodStock = database.ref("Food")
  foodStock.on("value", readStock);

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  milk = new Food(50,200,50,50);
 
  feed = createButton("feed the Dog");
  feed.position(700,185);
  feed.mousePressed(feedDog)

  addfood= createButton("Add Food");
  addfood.position(800,185);
  addfood.mousePressed(addFood)
}

function draw() {
  background(46,139,87);
  drawSprites();

  milk.display();
}

//function to read food Stock
function readStock(data){
 foodS = data.val();
 milk.updatefoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  if(milk.getfoodStock()<=0){
    milk.updatefoodStock(milk.getfoodStock()*0)
  }else{
    milk.updatefoodStock(milk.getfoodStock()-1)
  } 

} 

//function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
  Food:foodS
})
}
