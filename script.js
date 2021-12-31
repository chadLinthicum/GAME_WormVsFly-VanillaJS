canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');

// set canvas to be a tab stop (necessary to get events)
canvas.setAttribute('tabindex','0');

// set focus to the canvas so keystrokes are immediately handled
canvas.focus();

//game
let playerScore = 0;
let showingWinScreen = false;

//snake
let snakeHeadX = 0;
let snakeHeadY = 100;
let snakeWidth = 18;
let snakeHeight = 18;
const SNAKE_MOVEMENT = 20;
let snakeSpeed = 150;
let direction = '';
let snakeSkinColor = "#FF69B4";
let snakeEyeSize = 5;
let snakeEyeA = 2;
let snakeEyeB = 11; 
let snakeEyeC = 11;
let snakeEyeColor = 'black';

//apple
let appleX = 20;
let appleY = 0;
const APPLE_WIDTH = 18;
const APPLE_HEIGHT = 18;  






//on page load
window.onload = function () {
  

  setInterval(function() {
    drawEverything();
    moveEverything();
  }, snakeSpeed);

  canvas.addEventListener('keydown', handleKeyPress);
}





function drawEverything () {
  //game board
  var gradient = ctx.createRadialGradient(200, 200, 100, 200, 200, 250);
  gradient.addColorStop(0, "#934B22");
  gradient.addColorStop(1, "#562E17");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width,canvas.height);

  //grid
  grid();

  //snake head  
  colorRect(snakeHeadX,snakeHeadY,snakeWidth,snakeHeight, snakeSkinColor);

  //snake eyes
  if (direction === "up") {
    colorRect(snakeHeadX + snakeEyeA,snakeHeadY + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snakeHeadX + snakeEyeB,snakeHeadY + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (direction === "down") {
    colorRect(snakeHeadX+snakeEyeA,snakeHeadY+snakeEyeC,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snakeHeadX + snakeEyeB,snakeHeadY+snakeEyeC,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (direction === "left") {
    colorRect(snakeHeadX + snakeEyeA,snakeHeadY + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snakeHeadX + snakeEyeA,snakeHeadY + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else if (direction === "right") {
    colorRect(snakeHeadX + snakeEyeC,snakeHeadY + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snakeHeadX + snakeEyeC,snakeHeadY + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  } else {
    colorRect(snakeHeadX + snakeEyeC,snakeHeadY + snakeEyeA,snakeEyeSize,snakeEyeSize,snakeEyeColor);
    colorRect(snakeHeadX + snakeEyeC,snakeHeadY + snakeEyeB,snakeEyeSize,snakeEyeSize,snakeEyeColor);
  }
  
  //apple
  colorRect(appleX,appleY,APPLE_WIDTH,APPLE_HEIGHT,'#FF6259');
}






function moveEverything() {
  snakeMovement ();
  console.log("X = " + snakeHeadX + " Y = " + snakeHeadY);
  
  // //left wall
  if (snakeHeadX < 0) {
    alert("game over");
    direction = '';
    snakeHeadY = 100;
    snakeHeadX = 100;
    } else if (snakeHeadX > 380) {
        alert("game over");
        direction = '';
        snakeHeadY = 100;
        snakeHeadX = 100;
    } else if (snakeHeadY > 380) {
        alert("game over");
        direction = '';
        snakeHeadY = 100;
        snakeHeadX = 100;
    } else if (snakeHeadY < 0) {
        alert("game over");
        direction = '';
        snakeHeadY = 100;
        snakeHeadX = 100;
    } 
  }





function snakeMovement () {
  if (direction === "") {
    return;
  } else if (direction === "up") {
    snakeHeadY += -SNAKE_MOVEMENT;
  } else if (direction === "down") {
    snakeHeadY += SNAKE_MOVEMENT;
  } else if (direction === "left") {
    snakeHeadX += -SNAKE_MOVEMENT;
  } else if (direction === "right") {
    snakeHeadX += SNAKE_MOVEMENT;
  } 
}






function handleKeyPress(event) {
  switch(event.keyCode) {
    case 38:
      if (direction === "down" || direction === "up") {
        return;
      } else {
          direction = "up";
      }
      break;
    case 40:
      if (direction === "up" || direction === "down") {
        return;
      } else {
          direction = "down";
      }
      break;
    case 37:
      if (direction === "right" || direction === "left") {
        return;
      } else {
          direction = "left";
      }
      break;
    case 39:
      if (direction === "left" || direction === "right") {
        return;
      } else {
          direction = "right";
      }
  }
}







function grid() {
  for (var i=19; i<=800; i += 20)
  {
    //vertical lines
    ctx.moveTo(i,0);
    ctx.lineTo(i,805);

    //horizontal lines
    ctx.moveTo(0,i);
    ctx.lineTo(805,i);

    ctx.strokeStyle='black';
    ctx.stroke();
  }
}







function colorRect(leftX, topY, width, height, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height); 
}






function colorCircle(centerX, centerY, radius, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  ctx.fill();
}

