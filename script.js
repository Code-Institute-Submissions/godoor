window.addEventListener("load",
function() {
    //Draw box setup
    var draw_width = 800;
    var draw_height = 600;
    var isLive = true;

    //Levevl setup
    var currentLevel = 1;
    var currentLife = 5;
    var colour = "#" + ((1 << 24) * Math.random() | 0).toString(16);

    //Draw elements
    var robots = [{
    x: 200, 
    y: 100, 
    speedY: 1, 
    w: 40, 
    h: 40 
   },
   {
    x: 300,
    y: 0,
    speedY: 5,
    w: 40,
    h: 40
   },
   {
    x: 430,
    y: 100,
    speedY: 2,
    w: 40,
    h: 40
   },
   {
    x: 550,
    y: 100,
    speedY: -1,
    w: 40,
    h: 40
   }
  ];

  var doggo = {
   x: 10,
   y: 160,
   speedX: 2,
   isMoving: false, 
   w: 40,
   h: 40
  };
  
  var tree = {
   x: 580,
   y: 160,
   w: 60,
   h: 40
  }

  //Show canvas elements on the screen  

 var draw = function() {
   
   ctx.clearRect(0, 0, draw_width,
    draw_height);

  
   ctx.font = "15px Black Ops One";
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.fillText("currentLevel : " + currentLevel,
    10, 15);
   ctx.fillText("currentLife : " + currentLife,
    10, 35);
   ctx.fillText("Speed : " + doggo.speedX, 10, 55);


   
   ctx.fillStyle = colour;
   ctx.fillRect(doggo.x, doggo.y,
    doggo.w, doggo.h);
   
  
   ctx.fillStyle =
    "rgb(252,186,3)";
   ctx.fillRect(tree.x, tree.y,
    tree.w, tree.h);
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.fillText("tree", tree.x + 7,
    tree.y + 25);
  };

  var step = function() {

   logic();
   draw();

   if (isLive) {
    window.requestAnimationFrame(
     step);
   }
  };
 
 


}
)