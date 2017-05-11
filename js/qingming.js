var co1_1,col_2,col_3,count=0;
var container=document.getElementById("container");
var Width=container.clientWidth;
var Height=container.clientHeight;
var bottomBlock=document.getElementsByClassName("tomb");
var rightBlock=document.getElementsByClassName("ancestor");
var wdis=parseInt(Width/7);
var hdis=parseInt(Height/7);
// var opacityList=[];
function init() {
    for(var i=0;i<bottomBlock.length;i++){
        if(i==0){
            co1_1=backColor();
            bottomBlock[i].style="width:"+wdis+"px;left:"+(i+1)*wdis+"px;background-color:"+co1_1;
            rightBlock[i].style="height:"+hdis+"px;bottom:"+(i+1)*hdis+"px;background-color:"+co1_1;
        }else if(i==1){
            col_2=backColor();
            bottomBlock[i].style="width:"+wdis+"px;left:"+(i+2)*wdis+"px;background-color:"+col_2;
            rightBlock[i].style="height:"+hdis+"px;bottom:"+(i+2)*hdis+"px;background-color:"+col_2;
        }else if(i==2){
            col_3=backColor();
            bottomBlock[i].style="width:"+wdis+"px;left:"+(i+3)*wdis+"px;background-color:"+col_3;
            rightBlock[i].style="height:"+hdis+"px;bottom:"+(i+3)*hdis+"px;background-color:"+col_3;
        }
    }
}
function backColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    var a=parseFloat(Math.random().toFixed(1));
    // opacityList.push(a);
    var obj =new Object();
    obj.backgorund="rgba("+r+','+g+','+b+','+a+")";//返回颜色值
    obj.flag=3;
    return "rgba("+r+','+g+','+b+','+a+")";
}