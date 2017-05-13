/**
 * Created by yuwanli on 2017/4/15.
 */
// 音乐
var audio=document.getElementById("musicfx");
if (!is_weixn()){//判断是否在微信环境下
    just_play();
}else{
    just_play();//播放音乐
}
// 游戏边界
var border_x = document.documentElement.clientWidth ;
// common里面common_content占比是0.8, game_pane占比0.86
var border_y = document.documentElement.clientHeight * 0.73 * 0.86 ;
var speed = 1 ;
// 额外加速度
var more_speed = 0.3 ;
// 刷新频率
var fsp = 20 ;
// 虫子圆形半径
var bug_radius = 20 ;

var pips ;
// 初始管道数目
var pip_num = 3 ;
// 管道宽度
var pip_width = 20 ;

// 所有计时器
var intervals  ;

//
var isStop = false ;

// 计数
var count = 0 ;

// 虫子消灭上限，达到上限则成功
var upLimitation = 100 ;

var game_pane = document.getElementById("game-pane") ;
game_pane.width = border_x ;
game_pane.height = border_y ;

var context = game_pane.getContext('2d') ;
$(document).ready(function () {
    //翻页
    $("#fanye").click(function () {
        $(this).fadeOut(1000);
        $(".first").fadeOut(1000);
    });
    //捉虫子
    $(game_pane).on("touchstart", function (event) {
        var pageX = event.touches[0].pageX ;
        var pageY = event.touches[0].pageY ;
        pageY = pageY - document.documentElement.clientHeight * 0.13 ;
        var touchBug = getTouchedBug(pageX, pageY) ;
        if(touchBug){
            removeBug(touchBug) ;
            count++ ;
            $(".score").html(count) ;
            // 每增加10个，速度额外增加0.1
            if(count % 10 == 0){
                speed += more_speed ;
            }
            if(count == upLimitation){
                gamewin() ;
            }
        }
    }) ;
    $('.start-btn').click(function () {
        if($('.start-btn').html() == "开始游戏"){
            $('.start-btn').html("继续游戏") ;
        }else{
            $('.start-btn').html("开始游戏") ;
        }
        play() ;
    }) ;
}) ;
function showFace() {
    init() ;
    initFace() ;
}
function play() {
    //播放游戏开始音乐
    startmusic();
    showFace() ;
    startGame() ;
}
document.getElementById("again").onclick=function () {
    document.getElementById("hitTop").style.display="none";
    play();
}

// 获得触摸位置的虫子, 如果没有则返回null
function getTouchedBug(touchX, touchY) {
    for(var i = 0 ;i < pip_num ;i++){
        var p_bugs = pips.bugs[i] ;
        for(var j = 0 ;j < p_bugs.length ;j++){
            // 虫子圆心的位置和手触摸的位置在一个虫子圆形的半径之内，则认为触摸中了
            if(distance(touchX, touchY, p_bugs[j].x, p_bugs[j].y) <= bug_radius){
                return p_bugs[j] ;
            }
        }
    }
    return null ;
}
// 求两点之间的距离
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) ;
}

// 改变第i个管道的所有虫子的位置
function move(index) {
    if(isStop)
        return ;
    for(var i = 0 ;i < pips.bugs[index].length; i++){
        var bug = pips.bugs[index][i] ;
        bug.y -= speed ;
        if(bug.y < 0){
            // console.log(pips.bugs[index]) ;
            removePipBug(index, i) ;
           gameover() ;
            return ;
        }
    }
    initFace() ;
}

// 移除一个虫子
function removeBug(bug) {
    for(var i = 0 ;i < pip_num ;i++){
        var index = pips.bugs[i].indexOf(bug) ;
        if(index >= 0){
            pips.bugs[i].splice(index, 1) ;
        }
    }
}

// 移除某一个管道中的某一个虫子
function removePipBug(index, i) {
    pips.bugs[index].splice(i, 1) ;
}

// 游戏结束
function stopGame() {
    // context.clearRect(0, 0, border_x, border_y) ;
    for(var i = 0 ;i < intervals.length ;i++){
        clearInterval(intervals[i]) ;
    }
    $('.start-btn').html("继续游戏") ;

    isStop = true ;
}
// 游戏失败提示
function gameoverTip() {
    // 结束时更新音乐
   endMusic();
    //失败
    $("#number").html("您一共捉了"+count+"只虫子，继续努力哦！");
    $('.hitTop').css("display", "block") ;
}
// 闯关成功提示
function gamewinTip() {
    //成功
    $("#number").html("您一共捉了"+count+"只虫子，好棒哦！");
    $('.hitTop').css("display", "block") ;
}
function gameover() {
    stopGame() ;
    gameoverTip() ;
}
// 闯关成功
function gamewin() {
    stopGame() ;
    gamewinTip() ;
}

function startGame() {
    for(var i = 0 ;i < pip_num ;i++){
        intervals.push(setInterval("move("+ i +")", fsp)) ;
    }
    // 每个一段时间底部生成虫子
    for(var i = 0 ;i < pip_num ;i++){
        intervals.push(setInterval("createBottomBug("+ i +")", 500 * randomNum(pip_num, pip_num * 2))) ;
    }
}
// 第index个管道底部生成虫子
function createBottomBug(index) {
    if(isStop)
        return ;
    var bug = bottomBug() ;
    bug.x = pips.pos[index] + Math.random() * pip_width ;
    pips.bugs[index].push(bug) ;
}


// 游戏数据初始化
function init() {
    // 初始化所有变量
    // 存储管道，一个pos位置对应有一组的bug
    pips = new Object() ;
    pips.pos = new Array() ;
    pips.bugs = new Array() ;
    if(intervals){
        stopGame() ;
    }
    intervals = new Array() ;
    isStop = false ;
    count = 0 ;
    more_speed = 0.3 ;

    // 初始化管道的位置
    for(var i = 0 ;i < pip_num ;i++){
        var bottom_pos = Math.floor(border_x / (pip_num + 1) * (i + 1)) ;
        pips.pos.push(bottom_pos) ;
        // 当前pos位置对应的一组bug
        var bs = new Array() ;
        // 随机生成当前管道上虫子的数量, 然后初始化每一个虫子
        for(var j = 0 ;j < randomNum(2, 4); j++){
            var bug = randomBug() ;
            bug.x = bottom_pos + Math.random() * pip_width ;
            bs.push(bug) ;
        }
        pips.bugs.push(bs) ;
    }
}
function createBug(x, y) {
    var bug = new Object() ;
    bug.x = x ;
    bug.y = y ;
    return bug ;
}
// 随机虫子(位置决定， 只有垂直方向的位置)
function randomBug() {
    var bug = new Object() ;
    // 3/4的高度处位置截止
    bug.y = randomNum(Math.floor(border_y / 4), border_y) ;
    return bug ;
}
function bottomBug() {
    var bug = new Object() ;

    bug.y = border_y ;
    return bug ;
}


// low <= x <= up
function randomNum(low, up) {
    up += 1 ;
    return Math.floor(Math.random() * (up - low) + low) ;
}
// 游戏界面初始化
function initFace() {
    context.clearRect(0, 0, border_x, border_y) ;
    for(var i = 0 ;i < pip_num ;i++){
        paint(i) ;
    }
}
// 绘画出某一个管道信息
function paint(index) {
    paintPip(pips.pos[index]) ;
    for(var i = 0 ;i < pips.bugs[index].length; i++){
        paintBug(pips.bugs[index][i]) ;
    }
}
function paintPip(bottom_position) {
    var img = new Image() ;
    img.src = "./images/xiaoman/pip.png" ;
    context.drawImage(img, bottom_position, 0, pip_width, border_y) ;
}
function paintBug(bug) {
    // 使用图片，偶尔会出现不显示图片的情况
    var img = new Image() ;
    img.src = "./images/xiaoman/bug.png" ;
    context.drawImage(img, bug.x - bug_radius, bug.y - bug_radius, bug_radius * 2, bug_radius * 2) ;

}



