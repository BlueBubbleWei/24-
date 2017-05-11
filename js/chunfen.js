/**
 * Created by weiyumei on 2017/5/11.
 */
var timer;

var current=0;
var score=0;
var audio=document.getElementById('musicfx');
var shareUrl="http://120.24.180.249/game/WechatTokenValidate.jsp";
window.onload=function () {
    if(document.readyState=="complete"){//判断文档是否加载完成
        just_play();//播放音乐;
        if(is_weixn()){
            if(musicSwitch){
                just_play();//播放音乐
                //旋转鸡蛋
                rotateEgg();
                share();//微信分享
            }
        }
//      再来一次
        document.getElementById("again").onclick=function () {
            document.getElementById("hitTop").style.display="none";
            //播放游戏开始音乐
            if(musicSwitch){
                audio.currentTime = 0;
                audio.src = "music/tap.mp3";
                audio.play();
            }
            // 旋转鸡蛋
            rotateEgg();
        }
        //点击鸡蛋计算分数
        document.getElementById('dan').onclick = function(){
            //结束时更新音乐
            if(musicSwitch){
                audio.pause();
                audio.currentTime = 0;
                //切换音乐
                audio.src = "music/err.mp3";
                audio.play();//播放停止音乐
            }
            clearInterval(timer);
            if(score<10){
                score+=90;
                document.getElementById("number").innerHTML="您竖鸡蛋得了"+score+"分，真棒！";
            }else if(score<20){
                score+=70;
                document.getElementById("number").innerHTML="您竖鸡蛋得了"+score+"分，加油！";
            }else if(score<30){
                score+=40;
                document.getElementById("number").innerHTML="您竖鸡蛋得了"+score+"分，继续努力哦！";
            }
            document.getElementById("hitTop").style.display="block";
        };
    }
};
function rotateEgg() {
//     更新音乐
    if(musicSwitch){//音乐开着
        audio.pause();
        audio.currentTime = 0;
//      切换音乐
        audio.src = "music/tap.mp3";
        audio.play();
    }
//   旋转鸡蛋
    timer=setInterval(function () {
        current = (current+6)%360;
        score=Math.round(current*0.27);
        document.getElementById('dan').style.transform = 'rotate('+current+'deg)';
    },10);
}