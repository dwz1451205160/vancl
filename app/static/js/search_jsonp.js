function sendJsonp(url, data) {
    // 创建script标签
    const $script = document.createElement('script');
    // 拼接url, 解决缓存
    const flag = url.indexOf('?') == -1 ? '?' : '&';
    url += flag;
    for(let i in data) {
        url += `${i}=${data[i]}&`;
    }
    
    url += '_=' + Date.now();
    $script.src = url;
    document.body.appendChild($script);

}