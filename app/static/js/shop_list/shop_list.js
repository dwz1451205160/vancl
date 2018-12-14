var shop = (function() {
    var $ul = document.querySelector('.shop_carlist');
    return {
        init() {
            
            this.event();
            this.getData();
        },
        event() {
            var _this = this;
            $ul.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName === 'BUTTON') {
                    
                    //获取当前的li
                    var father = target.parentNode;
                    //获取商品数量
                    var count = father.querySelector('#count').value;
                    //把数量添加到商品信息中
                    _this.data[father.index].count = Number(count);
                    console.log(_this.data[father.index]);
                    
                    _this.setItem(_this.data[father.index]);
                    alert('成功加入购物车');

                }
            }

        },
        //获取数据
        getData() {
            sendAjax('json/shop_car.json').then(res => {
                res = JSON.parse(res);
                if(res.code == 0) {
                    //把商品数据存到shop_car对象里
                    this.data = res.data;
                    this.insertData(res.data);
                }else {
                    alert("获取信息失败，请查询网络状态");
                }                       
            });
        },
        //渲染数据
        insertData(data) {
            
            
            console.log(data);
            //循环数组
            for(let i = 0;i < data.length; i++){
                console.log(data);
                var $li = document.createElement('li');
                $li.index = i;
                $li.innerHTML = `
                    <span class='tehui'>特惠价： ￥<i>218.00</i>  充100返100，点击充值</span>
                    <p class='color_l'>颜色：<span>军绿色</span> <span>红色</span> <span>天蓝色</span></p>
                    <p class='size'>尺码：<span>S</span> <span>M</span> <span>L</span></p>
                    <span class = 'img'>${data[i].src}</span>                            
                    数量：<select name="" id="count">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <p class='selected'>已选：军绿色 <i>现在有货</i></p>
                    <button>加入购物车</button>
                    

                `    
                $ul.appendChild($li);
            }
           
            
            
        },
        //把所选的商品数据存储到本地
        setItem(data) {
            //先获取原有数据
            var shopcarList = localStorage.getItem('shopcarList') || '[]';
            shopcarList = JSON.parse(shopcarList);
            //判断购物数据中，是否存在当前商品
            for(var i = 0; i < shopcarList.length;i++){
                if(data.id == shopcarList[i].id) {
                    //此商品已经存在
                    shopcarList[i].count += data.count;
                    break;
                }

            }
            //循环完就说明商品不存在，然后加进去
            if(i == shopcarList.length){
                shopcarList.push(data); 
            }
            
            //再把全部数据存储到本地
            localStorage.shopcarList = JSON.stringify(shopcarList);
            console.log(shopcarList);

        }
    }
}())
shop.init()