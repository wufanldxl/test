//面向对象——写法
/*
方法：原来散开的，把函数装json里面
属性：原来散开的，把变量装json里面
*/
function ZQuery(arg)
{
	this.elements=[];		//存元素
	this.domString='';		//待创建的字符串
	
	//arg——function、string、object
	switch(typeof arg)
	{
		case 'function':
			//ready——DOMContentLoaded、onreadystatechange
			addReady(arg);
			break;
		case 'string':
			if(arg.indexOf('<')==-1)
			{
				this.elements=getEle(arg);
				this.length=this.elements.length;
			}
			else
			{
				this.domString=arg;
			}
			break;
		case 'object':
			this.elements.push(arg);
			this.length=this.elements.length;
			break;
	}
}

function _addEv(name)
{
	ZQuery.prototype[name]=function (fn)
	{
		//给所有选中的元素加fn
		for(var i=0;i<this.elements.length;i++)
		{
			addEvent(this.elements[i], name, fn);
		}
	};
}

//事件
//var arr=['click', 'mouseover', 'mouseout'];
var arr='click|mouseover|mouseout|dblclick|mousedown|mouseup|mousemove|keydown|keyup|focus|blur|change|input|load|error|scroll|resize|contextmenu|mouseenter|mouseleave'.split('|');
for(var i=0;i<arr.length;i++)
{
	_addEv(arr[i]);
}

//hover、toggle
ZQuery.prototype.hover=function (fnOver, fnOut)
{
	//this==$(xxx)
	
	this.mouseenter(fnOver);
	this.mouseleave(fnOut);
};

//计数、%
ZQuery.prototype.toggle=function ()
{
	var _args=arguments;
	//var count=0;
	var _this=this;
	
	for(var i=0;i<this.elements.length;i++)
	{
		(function (count, index){
			//this.elements[i].count=0;
			addEvent(_this.elements[i], 'click', function (ev){
				_args[count%_args.length].call(_this.elements[index], ev);
				
				count++;
			});
		})(0, i);
	}
};

//------------------------------------------------

ZQuery.prototype.removeClass=function (sClass)
{
	var re=new RegExp('\\b'+sClass+'\\b', 'g');
	
	for(var i=0;i<this.elements.length;i++)
	{
		var obj=this.elements[i];
		
		obj.className=obj.className.replace(re, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
		
		if(!obj.className)
		{
			obj.removeAttribute('class');
		}
	}
};
ZQuery.prototype.addClass=function (sClass)
{
	var re=new RegExp('\\b'+sClass+'\\b');
	
	for(var i=0;i<this.elements.length;i++)
	{
		var obj=this.elements[i];
		
		if(!re.test(obj.className))
		{
			if(obj.className)
			{
				obj.className+=' '+sClass;
			}
			else
			{
				obj.className=sClass;
			}
		}
	}
};

//------------------------------------------------

ZQuery.prototype.eq=function (n)
{
	return $(this.elements[n]);
};
ZQuery.prototype.get=function (n)
{
	return this.elements[n];
};

//------------------------------------------------

ZQuery.prototype.index=function ()
{
	var obj=this.elements[this.elements.length-1];
	
	//同级元素
	var arr=obj.parentNode.children;
	
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==obj)
		{
			return i;
		}
	}
};

ZQuery.prototype.animate=function (json, time, type)
{
	for(var i=0;i<this.elements.length;i++)
	{
		move(this.elements[i], json, {time: time, type: type});
	}
};

//------------------------------------------------

ZQuery.prototype.appendTo=function (str)
{
	var aParent=getEle(str);
	
	for(var i=0;i<aParent.length;i++)
	{
		var oTmp=document.createElement('div');
		oTmp.innerHTML=this.domString;
		
		while(oTmp.childNodes.length>0)
		{
			aParent[i].appendChild(oTmp.childNodes[0]);
		}
	}
};

ZQuery.prototype.remove=function ()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].parentNode.removeChild(this.elements[i]);
	}
};

//------------------------------------------------

ZQuery.prototype.each=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		fn.call(this.elements[i], i, this.elements[i]);
	}
};

//------------------------------------------------

ZQuery.prototype.css=function (name, value)
{
	if(arguments.length==2)		//设置
	{
		//this.elements.style[name]=value;
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].style[name]=value;
		}
	}
	else						//获取 || 批量
	{
		if(typeof name=='string')	//获取
		{
			//return this.elements[0].style[name];		//行间
			return getStyle(this.elements[0], name);
		}
		else						//批量
		{
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					this.elements[i].style[j]=name[j];
				}
			}
		}
	}
};

ZQuery.prototype.attr=function (name, value)
{
	if(arguments.length==2)			//设置
	{
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].setAttribute(name, value);
		}
	}
	else
	{
		if(typeof name=='string')	//获取
		{
			return this.elements[0].getAttribute(name);
		}
		else						//批量
		{
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					this.elements[i].setAttribute(j, name[j]);
				}
			}
		}
	}
};

//
function addReady(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else
	{
		document.attachEvent('onreadystatechange', function (){
			if(document.readyState=='complete')
			{
				fn();
			}
		});
	}
}

function getByClass(oParent, sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}
	else
	{
		var result=[];
		var re=new RegExp('\\b'+sClass+'\\b');
		var aEle=oParent.getElementsByTagName('*');
		
		for(var i=0;i<aEle.length;i++)
		{
			if(re.test(aEle[i].className))
			{
				result.push(aEle[i]);
			}
		}
		
		return result;
	}
}

//[div, div, div]	->	'.box'
function _getByStr(aParent, str)
{
	var aChild=[];	//结果
	
	for(var i=0;i<aParent.length;i++)
	{
		//aParent[i]->str
		switch(str.charAt(0))
		{
			case '#':	//ID
				var obj=document.getElementById(str.substring(1));
				
				aChild.push(obj);
				break;
			case '.':	//class
				var arr=getByClass(aParent[i], str.substring(1));
				
				//aChild=aChild.concat(arr);
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:	//tag
				//div	li.box	li#li1	input[xxx=xx]	li:eq(10)
				
				//li.box
				if(/^[a-z0-9]+\.[\w\-]+$/i.test(str))
				{
					//li.box
					var aStr=str.split('.');
					//aStr[0]='li'		标签
					//aStr[1]='box'		class
					
					//第一步、先用标签选
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二步、class筛选
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					
					for(var j=0;j<arr.length;j++)
					{
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//li#li-1
				else if(/^[a-z0-9]+#[\w\-]+$/i.test(str))
				{
					//li#li-1
					var aStr=str.split('#');
					//aStr[0]='li'		标签
					//aStr[1]='li-1'	id
					
					//第一步、用标签选
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二步、用id筛选
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//input[xxx=xx]
				else if(/^[a-z0-9]+\[.+=.+\]$/i.test(str))
				{
					//input[value=abc]
					var aStr=str.split(/\[|=|\]/g);
					//aStr[0]='input'		标签
					//aStr[1]='value'		名字
					//aStr[2]='abc'			值
					//aStr[3]=''			空的
					
					//第一步、用标签选一次
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二步、用属性筛选
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//li:eq(10)	li:first	li:contains(张三)
				else if(/^[a-z0-9]+:[a-z]+(\(.+\))?$/i.test(str))
				{
					//li:eq(10)
					var aStr=str.split(/:|\(|\)/g);
					//aStr[0]='li'	标签
					//aStr[1]='eq'	伪类名
					//aStr[2]='10'	伪类参数(可以没有)
					//aStr[3]=''	空的
					
					//第一步、用标签选
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二步、用伪类筛
					switch(aStr[1])
					{
						case 'eq':
							aChild.push(arr[parseInt(aStr[2])]);
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'last':
							aChild.push(arr[arr.length-1]);
							break;
						case 'odd':
							/*for(var j=0;j<arr.length;j++)
							{
								if(j%2==1)
								{
									aChild.push(arr[j]);
								}
							}*/
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
						case 'even':
							/*for(var j=0;j<arr.length;j++)
							{
								if(j%2==0)
								{
									aChild.push(arr[j]);
								}
							}*/
							for(var j=0;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
					}
				}
				
				//div
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
					break;
				}
		}
	}
	
	return aChild;
}

function getEle(str)
{
	//var arr=str.split(' ');
	//var arr=str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ').split(' ');
	//var arr=str.replace(/^\s+|\s+$/g, '').split(/\s+/g);
	var arr=str.match(/\S+/g);
	
	//前一次的结果，就是下一次的父级
	//alert(arr);
	var aParent=[document];
	var aChild=[];
	
	for(var i=0;i<arr.length;i++)
	{
		aChild=_getByStr(aParent, arr[i]);
		//前一次的结果，就是下一次的父级
		aParent=aChild;
	}
	
	return aChild;
}

//
function addEvent(obj, name, fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(name, fn, false);
	}
	else
	{
		//把this弄好了
		obj.attachEvent('on'+name, function (){
			fn.call(obj, event);
		});
	}
}

function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}


function $(arg)
{
	return new ZQuery(arg);
}

function move(obj, json, options)
{
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'ease-out';
	
	var count=Math.round(options.time/30);
	var n=0;
	
	var start={};
	var dis={};
	
	for(var name in json)
	{
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		//
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*(a*a*a);
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur*100+')';
				obj.style.opacity=cur;
			}
			else
			{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			options.end && options.end();
		}
	}, 30);
}


$.fn=ZQuery.prototype;

$.fn.extend=function (json)
{
	for(var i in json)
	{
		ZQuery.prototype[i]=json[i];
	}
};














