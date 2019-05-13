var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

var cWidth = cnv.width = window.innerWidth-10;
var cHeight = cnv.height = window.innerHeight-20;


var bgImg = new Image();
var playerImg = new Image();
var goombaImg = new Image();

bgImg.src = "images/mariobg.png";
playerImg.src = "images/mario.png";
goombaImg.src = "images/goomba.png";


var player = {
    x : 15,
    y : cHeight-110,
    w : 75,
    h : 75,
    canJump : true,
    xVelocity : 0,
    yVelocity : 0
}


var objects = [];
objects[0]={
    x : cWidth-110,
    y : cHeight-90,
    w : 50,
    h : 50,
    speed : 0 
}

var controller = {
    moveLeft : false,
    moveUp : false,
    moveRight : false,
    keyListener : function(event){
        var keyState = (event.type == 'keydown') ? true : false ;

        switch (event.keyCode) {
            case 37:
            controller.moveLeft = keyState;
            break;
            
            case 38:
            controller.moveUp = keyState;
            break;
            
            case 39:
            controller.moveRight = keyState;
            break;
        }
    }

}




document.addEventListener('keydown', controller.keyListener);
document.addEventListener('keyup', controller.keyListener);



function draw(){

    if(controller.moveLeft){
        player.xVelocity -= 0.5;
    }

    if(controller.moveRight){
        player.xVelocity += 0.5;
    }

    if(controller.moveUp && player.canJump == true){
        player.yVelocity -= 25;
        player.canJump = false;

    }


    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.95;
    player.yVelocity *= 0.95;
    player.yVelocity += 1.3;


    if(player.y > cHeight-110){
        player.y = cHeight-110;
        player.yVelocity = 0; 
        player.canJump = true;
    }


    ctx.drawImage(bgImg, 0, 0 , cWidth, cHeight);
    ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);

    for (let i = 0; i < objects.length; i++) {
        ctx.drawImage(goombaImg, objects[i].x, objects[i].y, objects[i].w, objects[i].h);
        
        objects[i].x--;

        if(objects[i].x === cWidth/2){
            objects.push({
                x : cWidth-110,
                y : cHeight-90,
                w : 50,
                h : 50 
            });
        }
        
        
    }
    




    requestAnimationFrame(draw);
}

draw();