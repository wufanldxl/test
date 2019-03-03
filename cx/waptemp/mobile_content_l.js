//一些全局的
var cxuid = GetCookieValue("SA_USER_UID");
var cxname = GetCookieValue("SA_USER_NICK_NAME");
var wbuid = GetCookieValue("SA_USER_weibouser[uid]");
var wbname = GetCookieValue("SA_USER_weibouser[name]");
var sUserAgent = navigator.userAgent.toLowerCase();
var CommentLink = 'http://comment.caixin.com/allcomments/m' + entity.id + '.html';

function isFromApp() {
	return !!GetCookieValue("appType");
}

$(function() {
	//一些需要获取dom的
	addMagazineJourContact("author");
	addCommJourContact("Main_Content_Val", "strong");
	addCommJourContact('Main_Content_Val', 'b');
	initShare();

	changeLink();

	//切换头部用户信息按钮
	if ((cxuid && cxname) || (wbuid && wbname)) {
		$('.user-bt').addClass('user-logined').find('a').attr('href', 'http://u.caixin.com/m/userinfo.html');
	} else {
		$('.user-bt').addClass('js-openLoginChooseLayer');
	}

	//切换返回头部返回按钮
	if (history.length <= 1) {
		if (location.host == 'm.database.caixin.com') {
			$('header .back').html('<span><a href="http://m.database.caixin.com/m/" style="color:#fff;">去首页</a></span>')
		} else {
			$('header .back').html('<a href="http://m.caixin.com/m/" style="color:#333;">去首页</a>')
		}

	} else {
		$(".back").click(function() {
			history.back();
		})
	}


	//更换头部logo
	if (location.href.indexOf('database.caixin') != -1) {
		$('.common_top').addClass('common_top_spel');

		$('.logo').attr('href', 'http://m.database.caixin.com/m/');
		$('.logo').css({
			'display': 'block',
			'width': '75px',
			'margin': '0 auto',
			'background': 'none'
		}).find('img').css({
			'width': '100%',
			'vertical-align': 'middle'
		}).show();
		$('header').css({
			'background': '#242424',
			border: 'none'
		})
	}

	//尾部登录状态切换
	var thurl = base64encode(base64encode(window.location.href));
	if (cxuid && cxname) {
		$('.bottomuser').html('<a href="http://u.caixin.com/m/userinfo.html" target="_self">用户中心　</a>');
	} else {
		$('.bottomuser').attr('id', 'bottomLoginBt').text('登录')
	}

	$(".news-login").click(function() {
		openLoginBox();
	});



	/*增加客户端删除提示操作start*/

	if (isFromApp()) {
		SetCookieValue("TIP_BOX_COUNT", 3);
		SetCookieValue("SHOW_TIP_BOX", '1');
	}
	/*增加客户端删除提示操作end*/
	if (sUserAgent.indexOf("iphone os") > 0) {
		var value = GetCookieValue("SHOW_TIP_BOX");
		var count = GetCookieValue("TIP_BOX_COUNT");
		var c = 0;
		if (count != '') {
			c = parseInt(count);
		}
		if (value == '' && c < 3) {
			document.cookie = "SHOW_TIP_BOX=1;path=/;domain=.caixin.com";
			$(".addBox").show();
			c++;
			SetCookieValue("TIP_BOX_COUNT", "" + c);
		}
	}

	// 点击关闭按钮和阴影部分关闭弹出框
	$(".share-pop-mask,.s-p-close").click(function() {
		$(".share-pop-mask").hide();
	});
	$(".share-pop-box").click(function(e) {
		e.stopPropagation()
	});




	//分享
	var isWeixin = navigator.userAgent.match(/MicroMessenger/ig);
	if (isWeixin) {
		$(".wx-share-block").css("display", "inline-block")
	}

	function wxShareShow() {
		$(".tb-share-box").hide();
		$(".wx-share-mask").fadeIn();
		setTimeout(function() {
			$(".wx-share-mask").fadeOut();
			$(".tb-bar").fadeIn();
		}, 3000)
	}


	//底部评论
	if ((cxuid && cxname) || (wbuid && wbname)) {
		$('.tb-bar-l').click(function() {
			location.href = link;
		})
	} else {
		$('.tb-bar-l').addClass('js-openLoginChooseLayer')
	}
	
	//头条输出文章隐藏app下载提醒
	if (location.href.indexOf("utm_source=TouTiao") > 0) {
		$(".appLink").remove()
		$(".ad-banner").remove()
		$(".cxtAdImg").remove()
		$(".ad-media").remove();
		setTimeout(function() {
			$(".cxtAdImg,.course_box,.ke-zeroborder,.zan_box,.reward-pop02,.incubator").hide();
		}, 0)
	}
	
	//第三方
	var curUrl = location.href;
	//qq browser
	if (curUrl.indexOf("QQbrowser") > 0) {
		$(".back").remove();
		$(".caixin-app").remove();
		$(".foot").remove();
		$(".top-box").remove();
	}
});

//底部评论
function creatCommentCont() {
	document.write("<a onclick=" + CommentLink + ">");
	document.write("<em class='tb-bar-m-bg'>&nbsp;</em><em class='cx-pl-num' aid='100' tid='" + srcinfoid +
		"'>0</em><span>条评论</span>");
	document.write("</a>");
}




//tool
function fmtDate(obj) {
	var date = new Date(obj);
	var y = 1900 + date.getYear();
	var m = "0" + (date.getMonth() + 1);
	var d = "0" + date.getDate();
	return y + "年" + m.substring(m.length - 2, m.length) + "月" + d.substring(d.length - 2, d.length) + "日";
}


function initShare() {
	initParam("#djk", "a", 2, "href", "?sourceEntityId=" + entity.id);
	initParam("#news-related-list", "a", 2, "href", "?sourceEntityId=" + entity.id);
	copyElement();
}

function copyElement() {
	var size = $("#news-related-list li");
	for (var i = 0; i < 2; i++) {
		$("#relateNews").append($("#news-related-list li").eq(i).clone());
	}
}

function initParam(elementId, tag, size, attr, tongji) {
	for (var i = 0; i < size; i++) {
		$(elementId + " " + tag).eq(i).attr(attr, $(elementId + " " + tag).eq(i).attr(attr) + tongji);
	}
}

//AD

var isUtm = getQueryString("utm_source");
var isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig)
var ran = Math.round(Math.random() * 1000000000);

function ads_display(id) {
	if (typeof entity != 'undefined' && entity.channel == 176) {
		return false;
	}
	try {
		document.writeln("<scr" + "ipt type='text/javascript' src='//pinggai" + Math.floor(Math.random() * 10) +
			".caixin.com/s?z=caixin&c=" + id + "&slot=" + ran + "'></scr" + "ipt>");
	} catch (e) {}
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2])
	};
	return null;
}

function topAd() {
	//顶部广告
	if (!isUtm) {
		switch (entity.cdesc) {
			// case "视频":
			//   isIos?ads_display(3073):ads_display(3067);
			//   break;
			case "经济":
				isIos ? ads_display(3072) : ads_display(3066);
				break;
			case "金融":
				isIos ? ads_display(3073) : ads_display(3067);
				break;
			case "公司":
				isIos ? ads_display(3074) : ads_display(3068);
				break;
			case "政经":
				isIos ? ads_display(3075) : ads_display(3069);
				break;
			case "世界":
				isIos ? ads_display(3076) : ads_display(3070);
				break;
			case "CNBC/财新":
				isIos ? ads_display(3126) : ads_display(3126);
				break;
			case "数据+":
				isIos ? ads_display(3232) : ads_display(3233);
				break;
			case "中国改革":
				isIos ? ads_display(3463) : ads_display(3465);
				break;
			case "比较":
				isIos ? ads_display(3463) : ads_display(3465);
				break;
			default:
				isIos ? ads_display(3464) : ads_display(3466);

		}
	}
}

function consAd() {
	if (!entity || !entity.fromchannel) return;
	var fromchannel = entity.fromchannel.split(',').sort().toString();
	var adid = 0;

	switch (fromchannel) {
		case '20':
			adid = 3263;
			break;
		case '21':
			adid = 3265;
			break;
		case '15':
			adid = 3264;
			break;
		case '19':
			adid = 3260;
			break;
		case '16,19':
			adid = 3260;
			break;
		case '16,19,22':
			adid = 3260;
			break;
		case '16':
			adid = 3261;
			break;
		case '16,22':
			adid = 3261;
			break;
		case '22':
			adid = 3262;
			break;
	}
	if (entity.ispro != 0) {
		adid = 3262;
	}

	if (adid) {
		ads_display(adid);
	}
}

function newsAd() {
	var vlk = location.href;
	if (entity.fromchannel !== '23' && vlk.indexOf("?utm_source=zjxww&utm_medium=news.zj.com&utm_campaign=Hezuo") < 0) { //第三方合作 不需要显示广告
		if (!isUtm) {
			switch (entity.cdesc) {
				case "视频":
					isIos ? ads_display(1533) : ads_display(1620);
					break;
				case "经济":
					isIos ? ads_display(1546) : ads_display(1576);
					break;
				case "金融":
					isIos ? ads_display(1552) : ads_display(1582);
					break;
				case "公司":
					isIos ? ads_display(1558) : ads_display(1588);
					break;
				case "政经":
					isIos ? ads_display(1564) : ads_display(1594);
					break;
				case "世界":
					isIos ? ads_display(1570) : ads_display(1600);
					break;
				case "财新周刊":
					isIos ? ads_display(1043) : ads_display(1042);
					break;
				case "财新PMI":
					isIos ? ads_display(1169) : ads_display(1170);
					break;
				case "CNBC/财新":
					isIos ? ads_display(3127) : ads_display(3127);
					break;
				case "数据+":
					isIos ? ads_display(3046) : ads_display(3046);
					break;
				default:
					isIos ? ads_display(944) : ads_display(945);
			}
		} else {
			//isIos?ads_display(1749):ads_display(1748);
		}
	}

	$(function() {
		// 判断是否有广告.
		if ($(".news-ad .adsame-banner-box").html()) {
			// 重置广告图片大小为100%宽.
			$(".news-ad .adsame-banner-box").css({
				"width": "100%",
				"height": "auto"
			})
			$(".news-ad .adsame-banner-box img").css({
				"width": "100%",
				"height": "auto",
				"vertical-align": "top"
			})
			var $ad = $(".news-ad .adsame-banner-box").html();

			var tempStr = "<div id='news_ad0' style='position:relative;padding-bottom:24px;'>" + $ad + "</div>";
			if ($(".news-con p").length > 3) {
				//$(tempStr).insertAfter($(".news-con p").eq(2));
			} else {
				// $(".news-con").append(tempStr);
			}
		}

	})
}

function lastAd() {
	if (!isUtm) {
		switch (entity.cdesc) {
			case "视频":
				isIos ? ads_display(1542) : ads_display(1622);
				break;
			case "经济":
				isIos ? ads_display(1548) : ads_display(1578);
				break;
			case "金融":
				isIos ? ads_display(1554) : ads_display(1584);
				break;
			case "公司":
				isIos ? ads_display(1560) : ads_display(1590);
				break;
			case "政经":
				isIos ? ads_display(1566) : ads_display(1596);
				break;
			case "世界":
				isIos ? ads_display(1572) : ads_display(1602);
				break;
			case "数据+":
				isIos ? ads_display(3045) : ads_display(3045);
				break;
			case "CNBC/财新":
				isIos ? ads_display(3128) : ads_display(3128);
				break;
			default:
				isIos ? ads_display(948) : ads_display(949);
		}
	} else {
		isIos ? ads_display(1747) : ads_display(1746);
	}
	setTimeout(function() {
		if ($(".ad-media").find("iframe").attr("src") || $(".ad-media a").html()) {
			$(".ad-media").addClass("ad-media-show");
		}
	}, 2000)



}
