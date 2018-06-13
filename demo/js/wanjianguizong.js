//常用函数
//获取样式
function getStyle(obj,sName){
	return obj.currentStyle?obj.currentStyle[sName]:getComputedStyle(obj,false)[sName];
}
//end
//获取绝对位置
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {left:l,top:t};
}
//end
function findInArr(arr,cName){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==cName){
            return true
        }
    }
    return false
}
//class获取兼容写法
function getByClass(obj,sName){
	var eClass=[];
	if(obj.getElementsByClassName){
		eClass=obj.getElementsByClassName(sName);
	}else{
		var aEle=obj.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			var aName=aEle[i].className.split(' ');
			if(findInArr(aName,sName)){
				eClass.push(aEle[i]);
			}
		}
	}
	return eClass
}
//end
//加载图片函数
function loadImages(json, fn){
	var total=0;	//所有的
	var count=0;	//完成的
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
				if(count==total){
					fn(images);
				}
			};
		})(name);
	}
}
//end
//设置rem
function setRem(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth*0.1+'px';
}
//end
//json2url
function json2url(json){
	json.t=Math.random();
	var arr = [];
	for(var i in json){
		arr.push(i+'='+encodeURIComponent(json[i]));
	}
	return arr.join('&');
}
//end
//url2json
function url2json(url){
	var json = {};
	var arr = url.split('&');
	for(var i=0;i<arr.length;i++){
		var arr2 = arr[i].split('=');
		json[arr2[0]]=arr2[1];
	}
	return json;
}
function getUrl(){
	var json={};
	var str=location.search.substring(1);
	var arr=str.split('&');
	for(var i=0;i<arr.length;i++){
		var arr1=arr[i].split('=');
		json[arr1[0]]=arr1[1];
	}
	return json;
}
//ajax
function ajax(json){
	json = json||{};
	if(!json.url)return;
	json.data=json.data||{};
	json.type=json.type||'get';
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
		break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
		break;
	}
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				json.success&&json.success(oAjax.responseText);
			}else{
				json.error&&json.error(oAjax.status);
			}
		}
	};
}
//jsonp
function jsonp(json){
	json = json||{}
	if(!json.url)return;
	json.data=json.data||{};
	json.cbName=json.cbName||'cb';
	json.data[json.cbName] = 'show'+Math.random();
	json.data[json.cbName] = json.data[json.cbName].replace('.','');
	var arr = [];
	for(var i in json.data){
		arr.push(i+'='+encodeURIComponent(json.data[i]));
	}
	var sDate = arr.join('&');
	var oS = document.createElement('script');
	window[json.data[json.cbName]] = function (json2){
		json.success&&json.success(json2);
		oH.removeChild(oS);
	}
	oS.src=json.url+'?'+sDate;
	var oH = document.getElementsByTagName('head')[0];
	oH.appendChild(oS);	
}
//end
//运动css3版本
function moveC3(obj, json, options){
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'ease-out';
	obj.style.WebkitTransition=options.time+'ms all '+options.type;
	for(var name in json){
		if(name=='transform'){
			obj.style.WebkitTransform=json[name];
			obj.style.transform=json[name];
		}
		else{
			obj.style[name]=json[name];
		}
	}
	function fnEnd(){
		obj.style.WebkitTransition='none';
		obj.removeEventListener('webkitTransitionEnd', fnEnd, false);
		options.end && options.end();
	}
	obj.addEventListener('webkitTransitionEnd', fnEnd, false);
}

function move(obj, json, options)
{
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'ease-out';	
	obj.style.WebkitTransition=options.time+'ms all '+options.type;	
	obj.style.MozTransition=options.time+'ms all '+options.type;	
	obj.style.MsTransition=options.time+'ms all '+options.type;	
	obj.style.OTransition=options.time+'ms all '+options.type;
	obj.style.transition=options.time+'ms all '+options.type;	
	for(var name in json)
	{
		if(name=='transform')		
		{
			obj.style.WebkitTransform=json[name];
			obj.style.MozTransform=json[name];
			obj.style.msTransform=json[name];
			obj.style.OTransform=json[name];
			obj.style.transform=json[name];
		}
		else						
		{
			obj.style[name]=json[name];
		}
	}
	
	function fnEnd()
	{
		obj.style.WebkitTransition='none';
		obj.removeEventListener('webkitTransitionEnd', fnEnd, false);
		options.end && options.end();
	}
	obj.addEventListener('transitionend', fnEnd, false);
}
//运动通用版本
function startMove(obj,json,options){
	clearInterval(obj.timer);	
	options=options || {};
	options.type=options.type || 'ease-out';
	options.time=options.time || 800;	
	var count=Math.floor(options.time/30);
	var start={};
	var dis={};	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));		
		dis[name]=json[name]-start[name];
	}
	var n=0;	
	obj.timer=setInterval(function(){
		n++;		
		for(var name in json){			
			switch(options.type){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}			
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';	
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.end && options.end.call(obj);	
		}
	},30);
}

//class操作

function addClass(obj,sClass){
	//var re = /\bsClass\b/;
	var re = new RegExp('\\b'+sClass+'\\b');
	if(obj.className.search(re)==-1){
		obj.className+=' '+sClass;
		obj.className=obj.className.replace(/^\s+|\s+$/g,'');
	}
}
function removeClass(obj,sClass){
	//var re = /\bbox\b/g;
	var re = new RegExp('\\b'+sClass+'\\b','g');
	obj.className=obj.className.replace(re,'');
	obj.className=obj.className.replace(/^\s+|\s+$/,'').replace(/\s+/g,' ');
	if(obj.className==''){
		obj.removeAttribute('class');
	}
}

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
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');
        if(arr2[0]==sName){
            return arr2[1];
        }
    }
}

function removeCookie(sName){
    addCookie(sName,1,-1);
}