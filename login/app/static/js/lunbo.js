// 获取非行内样式
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, false)[attr];
    }
    return ele.currentStyle[attr];
}

function move($ele, targetObj, time = 200, callback) {

    if (typeof $ele === 'string') {
        $ele = document.querySelector($ele);
    }
    // 确保是dom对象以后, 在清除定时器
    clearInterval($ele.timer);

    // 获取每个属性的速度
    var speedObj = {};
    for (var attr in targetObj) {
        // 获取初始值
        var attrVal = getStyle($ele, attr);
        if (attr == 'opacity') {
            attrVal *= 100;
        }
        attrVal = parseFloat(attrVal);

        var speed = (targetObj[attr] - attrVal) / (time / 10);
        speedObj[attr] = speed.toFixed(2) - 0;
    }

    $ele.timer = setInterval(_ => {

        var flag = true;

        for (var attr in targetObj) {
            // 根据不同属性获取初始值
            var attrVal = getStyle($ele, attr);
            if (attr == 'opacity') {
                attrVal *= 100;
            }
            attrVal = parseFloat(attrVal);
            var speed = speedObj[attr];
            var target = targetObj[attr];
            attrVal += speed;

            if ((speed >= 0 && attrVal >= target) || (speed <= 0 && attrVal <= target)) {
                attrVal = target;
            } else {
                flag = false
            }
            if (attr == 'opacity') {
                $ele.style[attr] = attrVal / 100;
            } else {
                $ele.style[attr] = attrVal + 'px';
            }
        }
        if (flag) {
            clearInterval($ele.timer);
            if (typeof callback == 'function') {
                callback($ele);
            }
        }
    }, 10)
}

var swiper = (function () {
    var $liAll = document.querySelectorAll('#box li');
    var $tipAll = document.querySelectorAll('#box2 li');
    var $prevBtn = document.querySelector('.left-btn');
    var $nextBtn = document.querySelector('.right-btn');
    var timer = null;
    var showIndex = 0;
    return {
        init() {
            this.event();
            this.autoPlay();
        },
        event() {
            var _this = this;
            $prevBtn.onclick = function () {
                _this.showImage(--showIndex);
                _this.autoPlay(showIndex);
            }
            $nextBtn.onclick = function () {
                _this.showImage(++showIndex);
                _this.autoPlay(showIndex);
            }
            for (var i = 0; i < $tipAll.length; i++) {
                $tipAll[i].index = i;
                $tipAll[i].onmouseenter = function () {
                    _this.showImage(this.index);
                    _this.autoPlay(this.index);
                }
            }
        },
        showImage(index=0) {
            if (index >= $tipAll.length) {
                index = 0;
                showIndex = index;
            }
            if(index < 0){
                index = 5;
                showIndex = index;
            }
            for (var i = 0; i < $tipAll.length; i++) {
                $tipAll[i].className = ''
                move($liAll[i], { opacity: 0 }, 500, function (ele) {
                    ele.className = ''
                });
            }
            $tipAll[index].className = 'set';
            $liAll[index].className = 'act';
            move($liAll[index], { opacity: 100 }, 500);
        },
        autoPlay(index = 0) {
            showIndex = index;
            clearInterval(timer);
            timer = setInterval(_ => {
                showIndex++;
                this.showImage(showIndex);
            }, 2000)
        }
    }
}())