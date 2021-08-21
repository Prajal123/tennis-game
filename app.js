var canvas=document.querySelector('canvas');
var ctx=canvas.getContext('2d');
 canvas.height=innerHeight-22;
canvas.width=innerWidth-22;

const user={
    x:0,
    height:100,
    y:canvas.height/2-50,
    width:10,
    color:"white",
    score:0

}

const com={
    x:canvas.width-10,
    height:100,
    y:canvas.height/2-50,
    width:10,
    color:"white",
    score:0
}

const net={
    x:canvas.width/2-1,
    y:0,
    width:2,
    height:10,
    color:"White",
}
function drawRect(x,y,a,b,color){
    ctx.font="40px Consolas";
    ctx.fillStyle=color;
    ctx.fillRect(x,y,a,b);
}
function drawText(text,x,y,color){
    ctx.fillStyle=color;
    ctx.fillText(text,x,y);
}

function drawCircle(x,y,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

function drawNet(){
    for(let i=0;i<=canvas.height;i+=15){
        drawRect(net.x,net.y+i,net.width,net.height,net.color);
    }
}

const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    speed:5,
    velocityX:5,
    velocityY:5,
    color:"white",
}


function render(){
    drawRect(0,0,canvas.width,canvas.height,"black");
    drawText(user.score,canvas.width/4,canvas.height/5,"white");
    drawText(com.score,3*canvas.width/4,canvas.height/5,"white");
    drawNet();
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}

function game(){
    update();
    render();
}
const framePerSecond=50;
setInterval(game,1000/framePerSecond);

function collision(b,p){
  p.top=p.y;
p.bottom=p.y+p.height;
p.left=p.x;
p.right=p.x+p.width;

b.top=b.y-b.radius;
b.left=b.x-b.radius;
b.right=b.x+b.radius;
b.bottom=b.y+b.radius;

return b.right>p.left && b.top<p.bottom && b.left<p.right && b.bottom>p.top;
}

function update(){
    let comLevel=.1;
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    if(ball.y+ball.radius>canvas.height || ball.y-ball.radius<=0){
        ball.velocityY=-ball.velocityY;
    }
    com.y+=(ball.y-(com.y+com.height/2))*comLevel;

    let player=(ball.x<canvas.width/2)?user:com;

    if(collision(ball,player)){
  let collidePoint=(ball.y-(player.y+player.height/2));
    collidePoint=collidePoint/(player.height/2);
    let angleRad=(Math.PI/4)*collidePoint;
    let direction=(ball.x<canvas.width/2)?1:-1;
    ball.velocityX=direction*ball.speed*Math.cos(angleRad);
    ball.velocityY=ball.speed*Math.sin(angleRad);
    ball.speed+=.1;
    }
  
  if(ball.x-ball.radius<0){
      com.score++;
      reset();
  }else if(ball.x+ball.radius>canvas.width){
      user.score++;
      reset();
  }
}

function reset(){
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;
    ball.speed=5;
    ball.velocityX=-ball.velocityX;
}
canvas.addEventListener("mousemove",movepaddle);

function movepaddle(e){
    let rect=canvas.getBoundingClientRect();
    user.y=e.clientY-rect.top-user.height/2;
}


// window.addEventListener("keydown",function(e){
//     if(e.key=="ArrowUp" ){
//         if(ball.x<canvas.width/2){
//         if(user.y<0){
//            user.y-=0;
//         }else{
//            user.y-=10;
//         }   
//     }else if(ball.x>canvas.width/2){
       
//             if(com.y<0){
//                com.y-=0;
//             }else{
//                com.y-=10;
//             }  
    
// }
// }
//        else if(e.key=="ArrowDown" ){
//         if(ball.x<canvas.width/2){
//         if(user.y+100>canvas.height){
//            user.y+=0;
//         }else{
//            user.y+=10;
//         }   
//     }else if(ball.x>canvas.width/2){
       
//             if(com.y+100>canvas.height){
//                com.y+=0;
//             }else{
//                com.y+=10;
//             }  
    
// }
// }
// });

