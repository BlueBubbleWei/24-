/**
 * Created by weiyumei on 2017/5/10.
 */
//翻页
$("#fanye").click(function () {
    $(this).fadeOut(1000);
    $(".first").fadeOut(1000);
});
//点击是否播放音乐
var musicSwitch=true;
function play_music(){
    if ($('#mc_play').hasClass('on')){
        $('#mc_play audio').get(0).pause();
        $('#mc_play').attr('class','stop');
        audio.pause();
        musicSwitch=false;
        console.log('musicSwitch'+musicSwitch)
          /*audio.currentTime = 0;
        //切换音乐
        audio.src = "music/tap.mp3";
        audio.play();//播放停止音乐*/
    }else{
        $('#mc_play audio').get(0).play();
        $('#mc_play').attr('class','on');
        musicSwitch=true;
        audio.play();
    }
}
//播放音乐
function just_play(){
    $('#mc_play audio').get(0).play();
    $('#mc_play').attr('class','on');
}

//判断是否是微信环境
function is_weixn(){
    return false;
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
//    微信分享
function share(result){
    $.ajax({
        type:'get',
        url:shareUrl,
        dataType: 'json',
        withCredentials: true,
//            data:{'url':url},
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        success:function(data){
            wx.config({//微信配置
                debug:false,
                appId: data.appId,
                nonceStr: data.nonceStr,
                signature: data.signature,
                timestamp: parseInt(data.timestamp),
                jsapi_ticket:data.jsapi_ticket,
//                    url:data.url,
                jsApiList: [//选择分享的接口
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                ]
            });
            wx.ready(function(){
                var dataForWeixin = {
                    imgUrl:'images/chunfen/chunfen.png',
                    title:"春分转鸡蛋",
                    desc:'到春分啦！',
                    link: url+'#/?value='+result.id
                };
                wx.onMenuShareTimeline({//分享到朋友圈
                    imgUrl:dataForWeixin.imgUrl, // 分享图标
                    title:dataForWeixin.title, // 分享标题
                    desc: dataForWeixin.desc, // 分享描述
                    link: dataForWeixin.link, // 分享链接
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({//分享到朋友圈
                    imgUrl:dataForWeixin.imgUrl, // 分享图标
                    title:dataForWeixin.title, // 分享标题
                    desc: dataForWeixin.desc, // 分享描述
                    link: dataForWeixin.link, // 分享链接
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            });

        },
        error:function(data){
            alert('未知错误');
        }
    });
}