function dataToParams(o) {
    let arr = []
    for (let i in o) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(o[i]))
    }
    return arr.join('&')
}

export default function jsonp(option) {
    let callbackName = 'jsonp_' + ~~(Math.random() * 100) // 随机生成回调函数名称
    option.data.callback = callbackName //注意
    let script = document.createElement('script');
    let flag = option.url.indexOf('?') > -1 ? '&' : '?'
    let queryUrl = option.url + flag + dataToParams(option.data)
    let head = document.getElementsByTagName('head')[0]
    script.src = queryUrl
    head.appendChild(script)
    function complete(){
        window[callbackName] = undefined
        clearTimeout(script.timer);
        head.removeChild(script)
    }


    return  new Promise((resolve, reject) => {
        //回调函数要接口返回后执行
        window[callbackName] = function (json) {
            complete()
            resolve(json)
        }

        script.onerror=function(){
            complete()
            reject({error:'error'})
        }

        //超时处理
        if (option.timer) {
            script.timer = setTimeout(function () {
                complete()
                reject({error:'timeOut'})
            }, option.timer)
        }
    })
    
}