window.addEventListener("load",
    function () {

        //Canvas details
        var draw_width = 800;
        var draw_height = 600;
        var isLive = true;
        var currentLevel = 1;
        var currentLife = 5;
        var colour = "#" + ((1 << 24) * Math.random() | 0).toString(16);

        //Canvas elements
        var robots = [{
            x: 200,
            y: 100,
            speedY: 2,
            w: 40,
            h: 40
        },
        {
            x: 340,
            y: 0,
            speedY: 2,
            w: 40,
            h: 40
        },
        {
            x: 480,
            y: 100,
            speedY: 3,
            w: 40,
            h: 40
        },
        {
            x: 630,
            y: 100,
            speedY: -5,
            w: 40,
            h: 40
        }
        ];

        var doggo = {
            x: 10,
            y: 260,
            speedX: 2,
            isMoving: false,
            w: 40,
            h: 40
        };

        var tree = {
            x: 720,
            y: 260,
            w: 60,
            h: 40
        }

        var moveDoggo = function () {
            doggo.isMoving = true;
        }

        var stopdoggo = function () {
            doggo.isMoving = false;
        }

        //Getting the canvas and context
        var canvas = document.getElementById("draw");
        var ctx = canvas.getContext("2d");

        //Event listeners for Doggos
        canvas.addEventListener('mousedown', moveDoggo);
        canvas.addEventListener('mouseup', stopdoggo);
        canvas.addEventListener('touchstart', moveDoggo);
        canvas.addEventListener('touchend', stopdoggo);

        //Game's rules
        var logic = function () {
            if (checkCollision(doggo, tree)) {
                alert('Level Up');
                currentLevel += 1;
                currentLife += 1;
                doggo.speedX += 1;
                doggo.x = 10;
                doggo.y = 260;
                doggo.isMoving = false;
                for (var ab = 0; ab < robots
                    .length; ab++) {
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

            robots.forEach(function (element, index) {
                if (checkCollision(doggo, element)) {
                    if (currentLife === 0) {
                        alert('Game Over');
                        for (var ab = 0; ab < robots.length; ab++) {
                            if (robots[ab].speedY > 1) {
                                robots[ab].speedY -= (currentLevel - 1);
                            } else {
                                robots[ab].speedY += (currentLevel - 1);
                            }
                        }
                        currentLevel = 1;
                        currentLife = 6;
                        doggo.speedX = 1;
                        colour = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                    }
                    if (currentLife > 0) {
                        currentLife -= 1;
                        colour = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                    }
                    doggo.x = 10;
                    doggo.y = 260;
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
            ctx.font = "15px Black Ops One";
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillText("Level : " + currentLevel, 10, 15);
            ctx.fillText("Life : " + currentLife, 10, 35);
            ctx.fillText("Score : " + doggo.speedX, 10, 55);
            ctx.fillStyle = colour;
            ctx.fillRect(doggo.x, doggo.y, doggo.w, doggo.h);
            ctx.fillStyle = "rgb(255,120,70)";
            robots.forEach(function (element, index) {
                ctx.fillRect(element.x, element.y, element.w, element.h);
            });

            ctx.fillStyle = "rgb(1,107,29)";
            ctx.fillRect(tree.x, tree.y, tree.w, tree.h);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillText("tree", tree.x + 9, tree.y + 25);
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
        }
        step();
    });
console.log(isLive);