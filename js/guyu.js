/**
 * Created by john5 on 2017/4/17.
 */
var B = 0.56;
var Hight=document.getElementById("box").clientHeight;
var Width=document.getElementById("box").clientWidth;
console.log(Hight+"====>"+Width)
var canvasW =Width;
var canvasH = canvasW/B;
if(canvasH > Hight) canvasH = Hight;
var canvasObj = $('#canvas');
canvasObj.css('margin-top',(Hight-canvasH)/2);
canvasObj.attr('width',canvasW);
canvasObj.attr('height',canvasH);
var ca=document.getElementById("canvas");

var ctx=ca.getContext("2d");
var bj1=new Image();

var player=new Image();
var tu=new Array();

// bj1.src="images/guyu/bj.jpg";
player.src="images/guyu/ren.png";
var playerWidth =123*B;
var playerHeight =213*B;

var h=20;
var gk=1;
var sudu=10;
var zl=100;
var chi=0;
var shi=0;
var fs=0;
var sm=1;
var bj=bj1;
function object(){
    this.x=0;
    this.y=0;
    this.l=11;
    this.image=new Image();
}

var sprite=new object();
//sprite.x=(canvasW - playerWidth)/2;
sprite.x=0;
sprite.y=canvasH-playerHeight;
//sprite.y=canvasH-playerHeight;

sprite.image=player;

addListener(ca,"mousemove",m);

var beginTime = new Date();
var gameTime = 15;
var remainTime;
function checkTime()
{
    var nowTime = new Date();
    remainTime = gameTime-parseInt((nowTime.getTime()-beginTime.getTime())/1000);
    document.getElementById('m').innerHTML = "剩余时间："+remainTime;
}
var range = canvasW - 60*B;
function chansheng(){
    if(shi%h==0){
        for(var j=2*chi;j<2*(chi+1);j++){
            tu[j]=new object();
            var i=Math.round(Math.random()*range);
            if(j==2*chi+1)
            {
                while(Math.abs(i-tu[2*chi].x)<30){
                    i=Math.round(Math.random()*range);
                }
            }
            var k=Math.round(Math.random()*zl);
            if(k < 90){
                tu[j].image.src="images/guyu/1.png";
                tu[j].q = 1;
            }else if(k < 97){
                tu[j].image.src="images/guyu/2.png";
                tu[j].q = 2;
            }else{
                tu[j].image.src="images/guyu/3.png";
                tu[j].q = 3;
            }
            tu[j].x=i;
            tu[j].y=-Math.round(Math.random()*300);
        }
        chi++;
        if(chi==10) chi=0;
    }
    shi++;
}


function sudukongzhi(){
    if(remainTime > 10){
        h=5;
        sudu=30;
    }else if(remainTime > 5){
        h=5;
        sudu=50;
    }else{
        h=5;
        sudu=60;
    }
}
function draw(){
    sudukongzhi();
    chansheng();
    for(var i=0;i<tu.length;i++){
        if(jianche(sprite,tu[i])) {
            if(tu[i].q == 1){
                fs+=1;
            }else if(tu[i].q == 2){
                fs+=5;
            }else{
                fs+=10;
            }
            tu[i].y+=200;
        }else if(!jianche(sprite,tu[i])){
            //ctx.drawImage(tu[i].image,tu[i].x,tu[i].y,60*B,60*B);
            tu[i].y+=sudu;
        }
        ctx.drawImage(tu[i].image,tu[i].x,tu[i].y,60*B,60*B);
    }
}

function jianche(a,b){
    var c=a.x-b.x;
    var d=a.y-b.y;
    if(c < b.image.width*B && c>-a.image.width*B  && d<b.image.height*B && d>-a.image.height*B){
        return true;
    }else{
        return false;
    }
}
function addListener(element,e,fn){
    if(element.addEventListener){
        element.addEventListener(e,fn,false);
    } else {
        element.attachEvent("on" + e,fn);
    }
}

function m(event){
    sprite.x=event.clientX-playerWidth/2;
    if(sprite.x+playerWidth>=canvasW) sprite.x=canvasW-playerWidth;
    else if(sprite.x<=playerWidth/2) sprite.x=0;
}

function stop()
{
    clearInterval(interval);
}
interval = setInterval(function(){
    ctx.clearRect(0,0,canvasW,canvasH);
    ctx.drawImage(bj,0,0,canvasW,canvasH);
    ctx.drawImage(sprite.image,sprite.x,sprite.y,playerWidth,playerHeight);
    draw();
    document.getElementById("f").innerHTML="得分"+fs;
    checkTime();
    if(remainTime==0) {stop()}
},100);
