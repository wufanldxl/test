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
	//图片预加载
	function loadImages(json, fn){
			var total=0;	
			var count=0;	
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
	//rem2
	var docW=document.documentElement.clientWidth;
	var docH=document.documentElement.clientHeight;
	document.documentElement.style.fontSize=docW*0.1+'px';
	var rem=docW*0.1;
	//resize
	if(docW/docH>0.5634){			
		document.documentElement.style.fontSize=docW*0.1*((docH*0.5634)/docW)+'px';
		rem=docW*0.1*((docH*0.5634)/docW);
	}
	
	
	//canvas大小
	if($('#p3can')[0]){
		$('#p3can')[0].width=10*rem*2;
		$('#p3can')[0].height=11*rem*2;
		
		var rem2=2*rem;
		var ctx=$('#p3can')[0].getContext('2d');
		loadImages({canimg:'img/candian.png'},function(images){
			function drawImg(){
				ctx.drawImage(img,x,y,width,height);
			}			
			
	//			圆点位置及大小，第0个最大，0、1-6为有内容点位置左上起逆时针，其余无内容的也按逆时针排序
			var posit=[
					{//中间点
						x:4.1875*rem2,
						y:4.46875*rem2,
						w:1.3125*rem2,
						alpha:1,
						name:'超市零售',
						money:'323.59元'
					},
					{//外圈左上起第一个
						x:2.8125*rem2,
						y:0.921875*rem2,
						w:0.40625*rem2,
						alpha:0.8,
						name:'医药健康',
						money:'323.59元'
					},
					{//外圈第二个
						x:0.828125*rem2,
						y:4.140625*rem2,
						w:0.75*rem2,
						alpha:0.9,
						name:'餐饮美食',
						money:'323.59元'
					},
					{//外圈第三个
						x:1.921875*rem2,
						y:8.109375*rem2,
						w:0.59375*rem2,
						alpha:0.8,
						name:'休闲娱乐',
						money:'323.59元'
					},
					{//外圈第四个
						x:7.71875*rem2,
						y:9.5625*rem2,
						w:0.4375*rem2,
						alpha:0.7,
						name:'油气站',
						money:'323.59元'
					},
					{//外圈第五个
						x:7.28125*rem2,
						y:5.6875*rem2,
						w:0.4375*rem2,
						alpha:1,
						name:'其他',
						money:'323.59元'
					},
					{//外圈第六个
						x:7.671875*rem2,
						y:1.75*rem2,
						w:0.90625*rem2,
						alpha:0.9,
						name:'蛋糕饮品',
						money:'323.59元'
					},
					{
						x:3.15625*rem2,
						y:4.546875*rem2,
						w:0.34375*rem2,
						alpha:1
					},
					{
						x:1.859375*rem2,
						y:5.296875*rem2,
						w:0.40625*rem2,
						alpha:0.7
					},
					{
						x:4.53125*rem2,
						y:8.109375*rem2,
						w:0.359375*rem2,
						alpha:0.5
					},
					{
						x:8.875*rem2,
						y:4.375*rem2,
						w:0.34375*rem2,
						alpha:0.3
					}
				];
			function strokeLine(f,t,w,blur,alpha){
				alpha=alpha||1;
				ctx.save();
				ctx.shadowOffsetX=0;
				ctx.shadowOffsetY=0;		
				ctx.shadowColor='#03c9e4';
				ctx.shadowBlur=blur;
				ctx.globalAlpha=alpha;
				ctx.beginPath();
				ctx.moveTo(posit[f].x+posit[f].w/2,posit[f].y+posit[f].w/2);
				ctx.lineTo(posit[t].x+posit[t].w/2,posit[t].y+posit[t].w/2);
				ctx.lineWidth=w;
				ctx.strokeStyle='#03c9e4';
				ctx.stroke();
				ctx.restore();
			}
			
			
			function startStroke(){
				ctx.clearRect(0,0,$('#p3can')[0].width,$('#p3can')[0].height);
				strokeLine(0,1,1,10);
				strokeLine(0,3,1,10);
				strokeLine(0,4,1,10);
				strokeLine(0,6,1,10);
				
				strokeLine(1,2,1,10,0.7);
				strokeLine(1,6,1,10,0.7);
				strokeLine(1,7,1,5,0.3);
				strokeLine(1,8,1,10,0.7);
				
				strokeLine(2,3,1,10,0.7);
				strokeLine(2,6,1,10,0.5);
				strokeLine(2,8,1,5,0.3);
				
				strokeLine(3,4,1,10,0.7);
				strokeLine(3,5,1,10,0.3);
				strokeLine(3,8,1,5,0.3);
				
				strokeLine(4,5,1,10,0.7);
				strokeLine(4,9,1,10,0.3);
				strokeLine(4,10,1,10,0.3);
				
				strokeLine(5,6,1,10,0.7);
				strokeLine(5,10,1,10,0.3);
				
				strokeLine(7,0,1,5,0.2);
				strokeLine(7,8,1,5,0.2);
				
				strokeLine(8,9,1,5,0.3);
				
				strokeLine(10,6,1,5,0.2);
				
				
				for(var i=0;i<posit.length;i++){
					ctx.save();
					ctx.globalAlpha=posit[i].alpha;
					ctx.drawImage(images.canimg,posit[i].x,posit[i].y,posit[i].w,posit[i].w);				
					ctx.restore();
					if(posit[i].name){
						if(i==0){
							ctx.font='40px simhei';
						}else{
							ctx.font='24px simhei';
						}					
						ctx.textBaseline='top';
						ctx.textAlign='center';
						ctx.fillStyle='#f4d220';
						ctx.fillText(posit[i].name,posit[i].x+posit[i].w/2,posit[i].y+posit[i].w);					
						ctx.fillStyle='#03c9e4';
						if(i==0){
							ctx.fillText(posit[i].money,posit[i].x+posit[i].w/2,posit[i].y+posit[i].w+0.625*rem2);
						}else{
							ctx.fillText(posit[i].money,posit[i].x+posit[i].w/2,posit[i].y+posit[i].w+0.46875*rem2);
						}
						
					}
				}
			}
			startStroke();
			
			var bc=true;
			$('#p3can')[0].addEventListener('touchstart',function(ev){
				if(bc){
					var x=ev.targetTouches[0].pageX-$('#p3can').offset().left;
					var y=ev.targetTouches[0].pageY-$('#p3can').offset().top;
					var target=[];
					for(var i=1;i<posit.length-1;i++){
						if(posit[i].name){
							ctx.beginPath();
							ctx.rect(posit[i].x,posit[i].y,posit[i].w,posit[i].w);
							
							if(ctx.isPointInPath(2*x,2*y)){
								bc=false;
								target.push(posit[i].x);
								target.push(posit[i].y);
								target.push(posit[i].w);
								target.push(posit[i].alpha);
								target.push(posit[0].x);
								target.push(posit[0].y);
								target.push(posit[0].w);
								target.push(posit[0].alpha);
								
								var dis0x=target[4]-target[0];
								var dis0y=target[5]-target[1];
								var dis0w=target[6]-target[2];
								var dis0alpha=target[7]-target[3];
								
								var disix=target[0]-target[4];
								var disiy=target[1]-target[5];
								var disiw=target[2]-target[6];
								var disialpha=target[3]-target[7];
								var count = Math.floor(300/30);
								var n=0;
								var timer=setInterval(function(){
									n++;
									var a = n/count;
									posit[0].x=target[4]-dis0x*a;
									posit[0].y=target[5]-dis0y*a;
									posit[0].w=target[6]-dis0w*a;
									posit[0].alpha=target[7]-dis0alpha*a;
									posit[i].x=target[0]-disix*a;
									posit[i].y=target[1]-disiy*a;
									posit[i].w=target[2]-disiw*a;
									posit[i].alpha=target[3]-disialpha*a;
									if(n==count){
										posit.unshift(posit.splice(i,1)[0]);
										posit.splice(i,0,posit.splice(1,1)[0]);
										clearInterval(timer);
										bc=true;
									}
									startStroke();
								},30);							
								break;
							}
						}
					}
				}
			},false);
		});
	}

			
	
	//指纹长按
	$('.finger').on('touchstart',function(ev){
		var st=null;
		st=setTimeout(function(){
			
		},1000)
		$('.finger').on('touchend',function(ev){
			clearTimeout(st);
		});
		ev.preventDefault();
	});
	
	//优惠券金额字体
//	if($('.money span').html().length>4){
//		$('.money span').css('fontSize','0.6875rem');
//	}
	
	//判断是否微信
	var ua=window.navigator.userAgent;
	var uaReg=/MicroMessenger/i;
	if(uaReg.test(ua)){
		$('.finger_box').css('display','none');		
	}
	if(!uaReg.test(ua)){
		$('.btnbox').addClass('app');
		$('.share').hide();
	}
	
	
	//主屏滚动
	if($('.main')[0]){
		var mySwiper = new Swiper('.swiper-container',{
		    loop: false,
			direction : 'vertical'
		});
		//星系轨道
		function startRoll(obj,R,s,time,dic){
			var start = obj.a||s;
			var dis = 360+s-start;
			var count = Math.floor(time/30);
			dic=dic||'+';
			if(dic=='+'){
				var n = 0;
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					n++;
					var a = n/count;
					var cur = start+dis*a;
					
					obj.style.left=R+Math.sin(cur*Math.PI/180)*R+'px';
					obj.style.top=R-Math.cos(cur*Math.PI/180)*R+'px';
					obj.a = cur;
					if(n==count){
						n=0;
					}
				},30);
			}			
			if(dic=='-'){
				var n = count;
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					n--;
					var a = n/count;
					var cur = start+dis*a;
					
					obj.style.left=R+Math.sin(cur*Math.PI/180)*R+'px';
					obj.style.top=R-Math.cos(cur*Math.PI/180)*R+'px';
					obj.a = cur;
					if(n==0){
						n=count;
					}
				},30);
			}
		}
		startRoll($('.in')[0],$('.track1')[0].offsetWidth/2,200,7000);
		startRoll($('.in')[1],$('.track1')[0].offsetWidth/2,160,7000);
		startRoll($('.in')[2],$('.track1')[0].offsetWidth/2,50,7000);
		startRoll($('.in')[3],$('.track1')[0].offsetWidth/2,300,7000);
		startRoll($('.in')[4],$('.track2')[0].offsetWidth/2,180,6000,'-');
		startRoll($('.in')[5],$('.track2')[0].offsetWidth/2,90,6000,'-');
		startRoll($('.in')[6],$('.track3')[0].offsetWidth/2,270,5000);
	}
	//弹窗方法
	function showPop(who){
		/*
		 * whow的值'receive''reg''share'
		 */
		if(who){
			$('.pop').addClass('show_'+who);
		}
	}
//showPop('reg');
	//关闭弹窗
	$('.close').on('click',function(){
		$('.pop')[0].className='pop';
	});
	
	
	//分享
	$('.share').on('click',function(){
		showPop('share');
	});
	
	$('.pop').on('click',function(){
		if($(this).hasClass('show_share')){
			$(this).attr('class','pop');
		}
	});
