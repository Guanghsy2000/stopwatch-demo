//创建表盘

var deg = Math.PI / 6 //度数
var r = 140  //表盘半径

for (i = 0; i < 12; i++) {
    var time_top = Math.sin(deg * i) * r + 165 //时间点的top值,140为表盘中间位置的距离,这个值为,表盘长度减去时间点长度/2
    var time_left = Math.cos(deg * i) * r + 165//时间点的left值
    var time = `<div class="time" 
    style="left:${time_left}px;top:${time_top}px;"></div>`

    $('#dial').append(time)
}

//秒表时间展示

var ms = 0 //毫秒
var s = 0 //秒
var m = 0 //分
var h = 0 //时
var timeHtml = ''
var SignHtml = ''

var timeSetInterval 

//显示
function timeShow(){
    ms = Number(ms)
    s = Number(s)
    m = Number(m)
    h = Number(h)
    ms += 1
    //用三元运算符判断各时间
    ms < 10 ? ms = "0" + ms : ms = ms;
    ms > 99 ? (ms = 0, s += 1) : ms = ms;
    s < 10 ? s = "0" + s : s = s;
    s > 59 ? (s = 0, m += 1) : s = s;
    m < 10 ? m = '0' + m : m = m
    m > 59 ? (m = 0, h += 1) : m = m
    h >= 24 ? (alert('哥哥(姐姐)!,我这是秒表,这都一天了'), h = 0) : h = h;
    var c = s * 6 + 90
    $('.second').css('transform',`rotate(${c}deg)`)
    timeHtml = `<h1>${h}:${m}:${s}:${ms}</h1>`  
    $('.time-show').html(timeHtml)
}



// 按下打表
$('.operation-sign').click(function () {
    startSign()
})
$('.sign').click(function(){
    startSign()
})

// 按下开始键开始计数
$('.operation-start').click(function () {
    startTime()
})
$('.start').click(function(){
    startTime()
})


// 按下重置
$('.operation-reset').click(function () {
    startReset()
})
$('.reset').click(function(){
    startReset()
})



// 按钮动画
function hidden(element) {
    $(element).animate({
        top: '20px'
    }, 500)

}

function show(element1) {
    $(element1).animate({
        top: '1px'
    }, 500)
}

//打表
function startSign(){
    if(ms == 0 && s == 0 && m == 0 && h == 0){
        alert('还没开始计时呀!!!')
    }else{
        hidden('.sign .btn-i1')
        show('.sign .btn-i1')
        SignHtml = `<h1 class="animated bounceInRight">${$('.time-show').text()}</h1>`
        $('.exit').prepend(SignHtml)
    }   
}   
//开始计时
function startTime(){
    hidden('.start .btn-i1')
    show('.start .btn-i1')
    // $('.operation-start').text(`停止`)
    if($('.operation-start').text() == '开始'){
        $('.operation-start').text(`停止`)
        
        timeSetInterval = setInterval(function(){
            timeShow()
        },10)    
    }else if($('.operation-start').text() == '停止'){
        $('.operation-start').text('开始')
        clearInterval(timeSetInterval)
    }
}

//重置
function startReset(){
    if(ms == 0 && s == 0 && m == 0 && h == 0){
        alert('已经清零')
    }else{
        hidden('.reset .btn-i1')
        show('.reset .btn-i1')
        ms = 0 //毫秒
        s = 0 //秒
        m = 0 //分
        h = 0 //时
        timeHtml = `<h1>${h}:0${m}:0${s}:0${ms}</h1>`
        $('.second').css('transform',`rotate(90deg)`)
        $('.time-show').html(timeHtml)
        $('.exit').html('')
    }   
}