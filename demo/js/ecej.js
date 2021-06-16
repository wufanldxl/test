/*
 *公用库和方法主要包含JQ插件和常用方法
 *需要jQ库
 *v1.0
 * */

function ecej(){
    this.ua=window.navigator.userAgent;
    this.isIos=/iphone/i.test(this.ua);
    this.isAndroid=/android/i.test(this.ua);
    this.isWx=/MicroMessenger/i.test(this.ua);
}


//获取url上的参数
function getUrl(){
    var json={};
    var str=location.search.substring(1,location.search.length);
    var arr=str.split('&');
    for(var i=0;i<arr.length;i++){
        var arr1=arr[i].split('=');
        json[arr1[0]]=arr1[1];
    }
    return json;
}

//cookie
function addCookie(sName,sValue,iDay){
    if(iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=sName+'='+sValue+'; PATH=/; EXPIRES='+oDate.toGMTString();
    }else{
        document.cookie=sName+'='+sValue+'; PATH=/';
    }
}
function getCookie(sName){
    var arr = document.cookie.split('; ');    
    if(sName){
        for(var i=0;i<arr.length;i++){
            var arr2 = arr[i].split('=');        
            if(arr2[0]==sName){
                return arr2[1];
            } 
        }        
    }else{
        var json={};
        for(var i=0;i<arr.length;i++){
            var arr2 = arr[i].split('=');
            json[arr2[0]]=arr2[1];
        } 
        return json;
    }
}
function removeCookie(sName){
    addCookie(sName,1,-1);
}

function loadImages(json, fn, spFn){
    var total=0;    //所有的
    var count=0;    //完成的
    var speed=0;
    var images={};
    for(var name in json){
        total++;
        var url=json[name];                 
        var oImg=new Image();                   
        oImg.src=url;                   
        (function (name){
            oImg.onload=function ()
            {
                images[name]=this;
                count++;
                speed=count/total;
                spFn&&spFn(speed);
                if(count==total){
                    fn&&fn(images);
                }
            };
        })(name);
    }
}

//自定义input的placeholder(jq插件)

(function($){
    $.fn.inputTip=function(){
        this.each(function(index,element){
            var inputW=$(this).width();
            var inputH=$(this).height();
            var inputPosi=$(this).css('position');
            
            var _this=$(this);
            var oSpan=document.createElement('span');
            $(oSpan).css({
                'width':inputW+'px',
                'height':inputH+'px',
                'padding':_this.css('padding'),
                'color':_this.css('color'),
                'fontSize':_this.css('fontSize'),
                'lineHeight':inputH+'px',
                'position':'absolute'
            });
            if(this.offsetParent.tagName=='BODY'){
                $(oSpan).css({
                    top:_this.offset().top+'px',
                    left:_this.offset().left+'px'
                });
            }else{
                $(oSpan).css({
                    top:this.offsetTop+'px',
                    left:this.offsetLeft+'px'
                });
            }
            $(oSpan).text(_this.attr('placeholder'));
            $(this).attr('placeholder','');
            $(this).after(oSpan);
            
            $(oSpan).on('click',function(){
                element.focus();
                $(this).hide();
            });
            $(this).on('blur',function(){
               if($(this).val()==''){
                   $(oSpan).show();
               }
            });
            $(this).on('focus',function(){
                $(oSpan).hide();
            });
            if($(this).val()==''){
                $(oSpan).show();
            }
        });
    }
})(jQuery);
