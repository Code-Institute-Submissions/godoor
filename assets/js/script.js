// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

window.addEventListener("load",
    function () {

        //Canvas details
        var draw_width = 480;
        var draw_height = 360;
        var isLive = true;
        var currentLevel = 0;
        var currentLife = 3;
        var colour = "#" + Math.floor(Math.random()*16777215).toString(16);
        

        //Canvas elements
        var robots = [{
            x: 90,
            y: 100,
            speedY: 4,
            w: 30,
            h: 30
        },
        {
            x: 180,
            y: 0,
            speedY: 3,
            w: 30,
            h: 30
        },
        {
            x: 275,
            y: 100,
            speedY: 4,
            w: 30,
            h: 30
        },
        {
            x: 370,
            y: 50,
            speedY: 3,
            w: 30,
            h: 30
        }
        ];

        var doggo = {
            x: 10,
            y: 160,
            speedX: 3,
            isMoving: false,
            w: 30,
            h: 30
        };

        var door = {
            x: 430,
            y: 160,
            w: 40,
            h: 30
        };

        var moveDoggo = function () {
            doggo.isMoving = true;
        };

        var stopDoggo = function () {
            doggo.isMoving = false;
        };

        //Getting the canvas and context
        var canvas = document.getElementById("draw");
        var ctx = canvas.getContext("2d");

        //Event listeners for Doggos move
        canvas.addEventListener('mousedown', moveDoggo);
        canvas.addEventListener('mouseup', stopDoggo);
        canvas.addEventListener('touchstart', moveDoggo);
        canvas.addEventListener('touchend', stopDoggo);

        //Game's rules
        var logic = function () {
            if (checkCollision(doggo, door)) {
                alert('Level Up');
                currentLevel += 1;
                currentLife += 1;
                doggo.speedX += 1;
                doggo.x = 10;
                doggo.y = 160;
                doggo.isMoving = false;
                for (var ab = 0; ab < robots.length; ab++) {
                    if (robots[ab].speedY > 1) {
                        robots[ab].speedY += 1;
                    } else {
                        robots[ab].speedY -= 1;
                    }
                }
            }

            if (doggo.isMoving) {
                doggo.x = doggo.x + doggo.speedX;
            }
        

            robots.forEach(function (element) {
                if (checkCollision(doggo, element)) {
                    if (currentLife === 0) {
                        alert('Game Over. Your score is: '  + currentLevel);
                        for (var ab = 0; ab < robots.length; ab++) {
                            if (robots[ab].speedY > 1) {
                                robots[ab].speedY -= (currentLevel + 1);
                            } else {
                                robots[ab].speedY += (currentLevel + 1);
                            }
                        }
                        currentLevel = 0;
                        currentLife = 6;
                        doggo.speedX = 2;
                        colour = "#" + Math.floor(Math.random()*16777215).toString(16);
                    }
                    if (currentLife > 0) {
                        currentLife -= 1;
                        colour = "#" + Math.floor(Math.random()*16777215).toString(16);
                    }
                    doggo.x = 10;
                    doggo.y = 160;
                    doggo.isMoving = false;
                }
                element.y += element.speedY;

                //Checking borders
                if (element.y <= 10) {
                    element.y = 10;
                    element.speedY *= -1;
                } else if (element.y >= draw_height - 50) {
                    element.y = draw_height - 50;
                    element.speedY *= -1;
                }
            });
        };

        //Display the game on the canvas
        var draw = function () {
            ctx.clearRect(0, 0, draw_width, draw_height);
            ctx.font = "11px Black Ops One";
            ctx.fillStyle = "rgb(232, 175, 2)";
            ctx.fillText("Level : " + currentLevel, 10, 15);
            ctx.fillText("Life : " + currentLife, 10, 35);
            ctx.fillText("Speed : " + doggo.speedX, 10, 55);
            ctx.fillStyle = colour;
            ctx.fillRect(doggo.x, doggo.y, doggo.w, doggo.h);
            ctx.fillStyle = "rgb(191, 0, 0)";
            robots.forEach(function (element) {
                ctx.fillRect(element.x, element.y, element.w, element.h);
            });

            ctx.fillStyle = "rgb(232, 175, 2)";
            ctx.fillRect(door.x, door.y, door.w, door.h);
            ctx.fillStyle = "rgb(11,88,193)";
            ctx.fillText("door", door.x + 5, door.y + 20);
        };

        //'Animation' check'
        var step = function () {
            logic();
            draw();
            if (isLive) {
                window.requestAnimationFrame(step);
            }
        };

        //Collision check
        var checkCollision = function (rect1, rect2) {
            var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
            var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
            return closeOnWidth && closeOnHeight;
        };
        step();
    });
