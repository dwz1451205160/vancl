const searchInp = (function () {
    return {
        init(ele) {
            this.$searchBox = document.querySelector(ele);
            this.$searchInp = this.$searchBox.querySelector('.search_input');
            this.$searchRes = this.$searchBox.querySelector('.search_result');
            this.event();
        },
        event() {
            const _this = this;
            const $inp = this.$searchInp
            //鼠标进入
            $inp.oninput = function () {
                if (this.value != '') {
                    clearTimeout(this.time);
                    //获取数据，不让立马发送请求，尽量减少请求次数
                    this.time = setTimeout(_ => {
                        _this.getData(this.value);
                    }, 20)

                } else {
                    _this.$searchRes.style.display = 'none';
                }

            }
            //获取焦点
            $inp.onfocus = function () {
                //显示结果栏
                if (this.value != '') {
                    _this.$searchRes.style.display = 'block';
                }

            }
            //失去焦点
            $inp.onblur = function () {
                //隐藏结果栏
                _this.$searchRes.style.display = 'none';
            }

        },
        //获取数据
        getData(val) {
            const _this = this;
            
            sendJsonp('http://page.vanclimg.com/autocompletehandler.ashx', {
                k: val,
                callback: "insertData",
                limit: 13
            })

        },
        //把数据(数组)渲染到列表中
        insertData(data) {
            console.log(data);
            console.log(6666);
            this.$searchRes.innerHTML = '';
            for (var key in data) {
                console.log(data[key]);
                let $li = document.createElement('li');
                if (data[key].count < 0) {
                    data[key].count = 0;
                }
                $li.innerHTML = data[key].name + '  约' + data[key].count + '条';
                this.$searchRes.appendChild($li);
            }
            //显示
            this.$searchRes.style.display = 'block';
            console.log(777);
        }
    }
}())
searchInp.init('.search_box');