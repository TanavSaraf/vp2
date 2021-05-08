//Create variables here
var dog, happyDog, db, foods,foodStock;
var dogImgA,dogImgB;
var milk,milkImg,a,i;
var milkGrp;
var gameState="start"
function preload()
{
	dogImgA=loadImage("images/dogImg.png");
  dogImgB=loadImage("images/dogImg1.png");
  milkImg=loadImage("images/Milk.png");
}

function setup() {
	createCanvas(500, 500);
  db=firebase.database()
  db.ref("food").on("value",(data)=>
  {
    foods=data.val()
  })
  milkGrp=[]
  
  
  a=30
  dog=createSprite(300,400,50,50);
  dog.scale=0.19
  imageMode(CENTER);
  dog.addImage("ABC",dogImgA);
  dog.addImage("BCD",dogImgB);
  dog.changeImage("ABC",dogImgA);
  console.log(foods)
  
}


function draw() {  
  background(46, 139, 87);
  console.log(foods);

  if(foods && gameState==="start"){
    foodStock=foods
    for(var i=0;i<foods;i++)
  {
    console.log(foods)
    milk=createSprite(a,190,20,20);
    milk.scale=0.09;
    milk.addImage("asdf",milkImg);
    milkGrp.push(milk)
    a+=20;
  }
  gameState="play"
  }
  fill("black")
  textSize(19)
  text("press up arrow to feed",100,100)
  text("Food Stock Left"+" : " +foods,170,240)

if(keyWentDown(UP_ARROW)&&foodStock!==0 && gameState==="play")
{
  foodStock+=(-1);
  dog.changeImage("BCD",dogImgB);
  db.ref("/").update({
    food:foodStock
  })
  milkGrp[milkGrp.length-1].destroy()
  milkGrp.pop()
  console.log(milkGrp.length)
}
if(keyWentUp(UP_ARROW)&& gameState==="play")
  {
    dog.changeImage("ABC",dogImgA);
  }
if(foods===0 )
{
  text("PRESS R TO RESTART",200,200);
  if(keyDown("r"))
  {
  db.ref("/").set({
    food:20
  })
  
  foodStock=20
  gameState="start";
  a=30
  }
}


  drawSprites();
  
}



