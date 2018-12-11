var checkInput = {
    phone(str) {
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str);
    },
    password(str) {
        var reg = /^\w{6,12}$/;
        return reg.test(str);
    }
}

var getRegister = (function() {
    return{
        init(ele) {
            this.$ele = document.querySelector(ele);
            this.$form = document.querySelector('.menu');
            this.$inputAll = this.$form.querySelectorAll('input');
            this.$pAll = this.$form.querySelectorAll('p');
            this.$pnumber = this.$form.querySelector('.pnumber');
            this.event();
        },
        event() {
            var _this = this;
            for(let i = 0; i < this.$inputAll.length; i++) {
                this.$inputAll[1].onblur = function() {
                    var $p = this.nextElementSibling;
                    if (checkInput.phone(this.value) == '') {
                       $p.className = "shu";
                       $p.innerHTML = "请填写真实的手机号，并进行验证";
                    }
                }
                this.$inputAll[3].onblur = function () {
                    if (checkInput.password(this.value) == false) {
                        this.nextElementSibling.className = "error";
                        this.nextElementSibling.innerHTML = "密码格式输入错误";
                    } else {
                        this.nextElementSibling.className = "success";
                        this.nextElementSibling.innerHTML = "可用";
                    }
                }
                this.$inputAll[4].onblur = function () {
                    if (this.value == _this.$inputAll[3].value) {
                        this.nextElementSibling.className = "success";
                        this.nextElementSibling.innerHTML = "";
                    } else {
                        this.nextElementSibling.className = "error";
                        this.nextElementSibling.innerHTML = "两次密码输入不一致，请重新输入";
                    }
                }

            }
        }
    }
}())
