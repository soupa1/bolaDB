var ball;
var database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var bola = database.ref("bola/position");
    bola.on("value", databaseRead, databaseError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("bola/position").set({
        "x": position.x + x,
        "y": position.y + y,
    });
}

function databaseError(){
    console.log("Deu erro!");
}

function databaseRead(dados){
    position = dados.val();
    ball.x = position.x;
    ball.y = position.y;
}