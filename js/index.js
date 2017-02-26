/**
 * Created by Administrator on 2017/2/15.
 */
$(function () {
    var liNum = 5 * 5 * 5;


    init();

    function init() {
        for (var i = 0; i < liNum; i++) {
            var $li = $('<li></li>');
            var x = (Math.random() - 0.5) * 3000;
            var y = (Math.random() - 0.5) * 3000;
            var z = (Math.random() - 0.5) * 3000;
            $li.css({
                'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
            });
            $('#main').append($li);
        }
        setTimeout(function () {
            Grid();
            $('#styleBtn').css({
                'transform':'scale(1)',
                'opacity':'1'
            })
        }, 300);
        $('#styleBtn li').click(function () {
            var index = $(this).index();
            switch (index) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    Helix();
                    break;
                case 3:
                    Grid();
                    break;
            }
        })
    }

    //网格
    function Grid() {
        var tx = 300, ty = 300, tz = 500;//水平 垂直间隔
        var firstX = -2 * tx;//第一个li水平偏移量
        var firstY = -2 * ty;//第一个li垂直偏移量
        var firstZ = -2 * tz;//第一个li垂直偏移量
        $('#main li').each(function (i) {
            var iX = (i % 25) % 5;//x方向，要增加的倍数
            var iY = parseInt((i % 25) / 5);//y方向，要增加的倍数
            var iZ = parseInt(i / 25);//y方向，要增加的倍数
            $(this).css({
                'transform': 'translate3d(' + (firstX + iX * tx) + 'px,' + (firstY + iY * ty) + 'px,' + (firstZ + iZ * tz) + 'px)',
                'transition': '4s ease-in-out'
            });
        })
    }

    //螺旋
    function Helix() {
        var roY = 10, tY = 10;
        var midli = Math.floor($('#main li').length / 2);
        var firsttY = -10*midli;
        $('#main li').each(function (i) {
            $(this).css({
                'transform': 'rotateY(' + roY * i + 'deg) translateY(' + (firsttY + tY * i) + 'px) translateZ(1200px)'
            });
        })
    }

    //拖拽 滚轮 功能
    (function () {
        var nowX, lastX, minusX = 0, nowY, lastY, minusY = 0;
        var roX = 0, roY = 0, tz = -1500;
        var timer1, timer2;
        $(document).mousedown(function (ev) {
            ev = ev || window.event;

            lastX = ev.clientX;
            lastY = ev.clientY;

            clearInterval(timer1);
            $(this).on('mousemove', function (ev) {
                ev = ev || window.event;

                nowX = ev.clientX;//鼠标的X坐标
                nowY = ev.clientY;//鼠标的Y坐标

                minusX = nowX - lastX;
                minusY = nowY - lastY;


                roY += minusX * 0.2;
                roX -= minusY * 0.2;
                $('#main').css({
                    'transform': 'translateZ(' + tz + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                })
                lastX = nowX;
                lastY = nowY;
            })
            return false;
        }).mouseup(function () {
            $(this).off('mousemove');
            timer1 = setInterval(function () {//鼠标移动操作后的缓动
                minusX *= 0.95;
                minusY *= 0.95;
                if (Math.abs(minusX) < 0.1 && Math.abs(minusY) < 0.1) {
                    clearInterval(timer1)
                }
                roY += minusX * 0.2;
                roX -= minusY * 0.2;
                $('#main').css({
                    'transform': 'translateZ(' + tz + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                })
            }, 13)
        }).mousewheel(function (ev, d) {//滚轮事件//d---鼠标滚动触发时上滚为+1，下滚为-1
            clearInterval(timer2);
            tz += d * 80;
            tz = Math.min(0, tz);
            tz = Math.max(-4000, tz);
            $('#main').css({
                'transform': 'translateZ(' + tz + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            })
            timer2 = setInterval(function () {//鼠标滚轮滚动操作后的缓动
                d *= 0.90;
                if (Math.abs(d) < 0.01) {
                    clearInterval(timer2)
                }

                tz += d * 80;
                tz = Math.min(0, tz);
                tz = Math.max(-4000, tz);
                $('#main').css({
                    'transform': 'translateZ(' + tz + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                })
            }, 13)
        })
    })()
})

