//Create variables here
var dog, happyDog, db, foods,foodStock;
var dogImgA,dogImgB;
function preload()
{
	dogImgA=loadImage("images/dogImg.png");
  dogImgB=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  db=firebase.database()
  db.ref("food").on("value",(data)=>
  {
    foods=data.val()
  })

  foodStock=20

  dog=createSprite(300,400,50,50);
  dog.scale=0.19
  imageMode(CENTER);
  dog.addImage("ABC",dogImgA);
  dog.addImage("BCD",dogImgB);
  dog.changeImage("ABC",dogImgA);
}


function draw() {  
background(46, 139, 87);
console.log(foods);
fill("black")
textSize(19)
text("press up arrow to feed",100,100)
text("Food Stock Left"+" : " +foods,170,240)

if(keyWentDown(UP_ARROW)&&foodStock!==0)
{
  foodStock+=(-1);
  dog.changeImage("BCD",dogImgB);
  db.ref("/").update({
    food:foodStock
  })
  
}
if(keyWentUp(UP_ARROW))
  {
    dog.changeImage("ABC",dogImgA)
  }
if(foodStock===0 )
{
  text("PRESS R TO RESTART",200,200);
  if(keyDown("r"))
  {
  db.ref("/").set({
    food:20
  })
  foodStock=20
}
}
  drawSprites();
  
}



