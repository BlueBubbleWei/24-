window.onload=function () {
    var ParenObj=parentDestnation();
    count=0;
    var divList=createDiv(5);
    for(var i=0;i<divList.length;i++){
        startMover(divList[i],divList[i].style.left,divList[i].style.top,ParenObj.parentLeftPos,ParenObj.parentTopPos);
    }
    var createTime=setTimeout(function () {
        var Num=Math.round(Math.random()*40);
        createDiv(Num);
        clearTimeout(createTime);
        alert(count);
    },3000);
}
//计算获胜
function sum() {
    count ++;
    // alert(count)
}
// 创建移动的div集合
function createDiv(Num) {
    var parentNode=document.getElementById("container");
    var divLisit=[];
    for(var i=0; i<Num ;i++){
        var newDiv=document.createElement("div");
        newDiv.setAttribute("class","moveDiv");
        var width=randSize();//设置div的宽高
        var backgroundColor=randBackground();
        var obj=randPosition();
        newDiv.style.width=width+"px";//漂移div的大小
        newDiv.style.height=width+"px";
        newDiv.style.backgroundColor=backgroundColor;
        newDiv.style.left=obj.left+"px";//位置坐标
        newDiv.style.top=obj.top+"px";
        newDiv.addEventListener("click",sum,false);
        divLisit.push(newDiv);
        parentNode.appendChild(newDiv);
    }
    return divLisit;
}
//计算sum
// 生成30-60之间的数作为宽高
function randSize(){
    var Width=Math.random()*30+30;
    // var Height=Math.random()*30+30;
    return Width;
}

// 生成随机色
function randBackground(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    var a=Math.random().toFixed(1);
    return "rgba("+r+','+g+','+b+','+a+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
}
//随机生成小雨点的初始位置
function randPosition() {
    var obj=new Object();
    var parentDest=parentDestnation();
    var TotalHeight=parentDest.TotalHeight;
    var TotalWidth=parentDest.TotalWidth;
    // 获取父div的坐标位置
    var minLeft=parentDest.minLeft;
    var minTop=parentDest.minTop;
    obj.TotalHeight=TotalHeight;
    obj.TotalWidth=TotalWidth;
    obj.top=minTop;
    obj.left=Math.floor(Math.random()*TotalWidth)+minLeft;
    return obj;
}
// 获得父元素的位置信息
function parentDestnation() {
    var obj=new Object();
    // 获取div的宽、高
    var TotalHeight=document.getElementById("container").clientHeight;
    var TotalWidth=document.getElementById("container").clientWidth;
    var minTop=document.getElementById("container").offsetTop;
    var minLeft=document.getElementById("container").offsetLeft;
    obj.parentLeftPos=minLeft+TotalWidth;
    obj.parentTopPos=minTop+TotalHeight;
    obj.TotalHeight=TotalHeight;
    obj.TotalWidth=TotalWidth;
    obj.minTop=minTop;
    obj.minLeft=minLeft;
    return obj;
}

// 向下移动的动画效果
function startMover(obj,ObjWidth,ObjHeight,parentLeftPos,parentTopPos){//不能超过目标值
    //让每一次动画都是全新的
    // if(dom.timer1)clearInterval(dom.timer1);
    var ParentNode=obj.parentNode.nodeName;
    console.log(ParentNode.toString()+'ParentNode')
    var speedLeft=Math.floor(Math.random()*5);
    var speedTop=Math.floor(Math.random()*5);
    var Parent=document.getElementById("container");
    var This=this;
    This.time = setInterval(function(){
       if(speedLeft>5){
            speedLeft=speedLeft-15;
        }else if(speedLeft<=0){
            speedLeft++;
        }
        // console.log(obj.offsetHeight+"obj.offsetHeight"+"===>"+ObjHeight+"ObjHeight"+parentLeftPos+"parentLeftPos")
        if(obj.offsetLeft+obj.offsetLeft >= parentLeftPos){
            speedLeft = -speedLeft;
        }
        console.log("obj.offsetHeight"+obj.offsetHeight+"obj.offsetTop"+obj.offsetTop+"parentLeftPos"+parentLeftPos)
        if(obj.offsetHeight+obj.offsetTop >= parentTopPos){
           var s= Parent.removeChild(obj);
           console.log("removed"+s)
            console.log(123456)
            clearInterval(This.time);
        }else{
            speedTop+=0.01;
            speedLeft+=0.01;
        }
        obj.style.left = obj.offsetLeft+speedLeft+'px';
        obj.style.top = obj.offsetTop+speedTop*1.5+'px';

    },30);

}