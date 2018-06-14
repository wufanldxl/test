let urlData = (function () {
    let json = {};
    let str = location.search.substring(1, location.search.length);
    let arr = str.split('&');
    for (let i = 0; i < arr.length; i++) {
        let arr1 = arr[i].split('=');
        json[arr1[0]] = arr1[1];
    }
    return json;
})();

let tongji = function () {
    var _hmt = _hmt || [];
    window._hmt = _hmt;
    let hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?10f98391029d8183955088baed3f1a35";
    let s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}

let getCookie=function(){
    let arr = document.cookie.split('; ');
    let json={};
    for(let i=0;i<arr.length;i++){
        let arr2 = arr[i].split('=');
        json[arr2[0]]=arr2[1];
    }
    
    if(json.appToken){
        document.cookie=`token=${json.appToken}; PATH=/`;
    }
    return json;
};


export {urlData, tongji, getCookie};
