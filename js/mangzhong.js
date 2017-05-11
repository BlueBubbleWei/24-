/**
 * Created by weiyumei on 2017/5/11.
 */
var num=Math.round((Math.random()*20))+10;
var count=num;
// 音乐
var audio=document.getElementById("musicfx");
$(document).ready(function () {
    createMaizi();
    var timer=setInterval(function () {//不断刷新
        position();
        num-=2;
        console.log(num)
        if(num<=0){
            clearInterval(timer);
          //失败事件
            //失败
            $("#number").html("您一共收了"+count+"斤麦子，继续努力哦！");
            $('.hitTop').css("display", "block") ;
        }else if(count<=0){
            clearInterval(timer);
            //成功事件
            $('#changWeather').css("background-image","url(images/mangzhong/raining.gif)");
            $('#changWeather').fadeOut(2000,function () {
                $('#changWeather').fadeIn(1000,function () {
                    $('#changWeather').css("background-image","url(images/mangzhong/nenya.gif)");
                });

            })
        }

    },1000);
    //收麦子
    $('.maizi').click(function () {
        var index=$(this).attr("index");
        $(".maizi")[index].remove();
        for(var i=index;i< $(".maizi").length;i++){
            $('.maizi').eq(i).attr("index",parseInt( $('.maizi').eq(i).attr("index"))-1);
        }
        count--;
    });
    //随机生成LeftTop
    function position() {
        for(var i=0;i<$('.maizi').length;i++){
            var obj=LeftTop();
            $('.maizi').eq(i).css({"left":obj.left+"px","top":obj.top+"px"});
        }
    }
    function LeftTop() {
        var Width=$('#changWeather').width();
        var Height=$('#changWeather').height();
        var obj=new Object();
        obj.left=Math.round(Math.random()*Width);//偏离左边10px
        obj.top=Math.round(Math.random()*Height/2+(Height/2))+10;//偏离左边10px
        if(obj.left>=Width){
            obj.left=Width-4;
        }
        if(obj.top>=Height*5/8){
            obj.top=Height*5/8;
        }else if(obj.top>=Height*5/8){
            obj.top=Height*5/8-50;
        }
        /*else if(obj.top>=Height*2/3){
         obj.top=Height*2/3;
         }else if(obj.top>=Height*7/8){
         obj.top=Height*7/8-20;
         }else{
         obj.top=Height*1/3;
         }*/
        return obj;
    }
    //创建麦子
    function createMaizi() {
        var str='';
        for(var i=0;i<num;i++){
            str+="<div class='maizi' index="+i+"></div>";
        }
        $('#changWeather').append(str);
        position();
    }
});