/**
 * Created by weiyumei on 2017/5/11.
 */
var num=0;
var amount;
var count=0;
var audio=document.getElementById("musicfx");
$(document).ready(function () {
    // 音乐
    if (!is_weixn()){//判断是否在微信环境下
        just_play();
    }else{
        if(musicSwitch){
            just_play();//播放音乐
            share();//微信分享
        }
    }
    //翻页
    $("#fanye").click(function () {
        $(this).fadeOut(1000);
        $(".first").fadeOut(1000);
        //开始游戏
        StartGame();
    });
    //收麦子
    $('#changWeather').on('click','.maizi',function () {
        var index=$(this).attr("index");
        $(".maizi")[index].remove();
        for(var i=index;i< $(".maizi").length;i++){
            $('.maizi').eq(i).attr("index",parseInt( $('.maizi').eq(i).attr("index"))-1);
        }
        amount--;
        count++;
    });
    //重新开始
    $("#again").click(function () {
        $("#hitTop").css("display","none");
        //播放游戏开始音乐
        startmusic();
        //开始游戏
        StartGame();
    });

    //开始游戏
    function StartGame(){
        num=Math.round((Math.random()*20))+10;
        amount=num;
        createMaizi();
        var timer=setInterval(function () {//不断刷新
            position();
            num-=2;
            if(num<=0){
                clearInterval(timer);
                //失败事件
                endMusic();
                $("#number").html("您一共收了"+count+"斤麦子，继续努力哦！");
                $('.hitTop').css("display", "block") ;
            }else if(amount<=0){
                clearInterval(timer);
                //成功事件
                endMusic();
                $("#number").html("您一共收了"+count+"斤麦子，好棒哦！");
                $('.hitTop').css("display", "block") ;
            }

        },1000);
    }

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
        return obj;
    }
    function shoumaizi() {
        console.log(123)
        var index=$(this).attr("index");
        $(".maizi")[index].remove();
        for(var i=index;i< $(".maizi").length;i++){
            $('.maizi').eq(i).attr("index",parseInt( $('.maizi').eq(i).attr("index"))-1);
        }
        amount--;
        count++;
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