document.write('<script type="text/javascript" src="https://files.caixin.com/webjs/common/caixinlog.js"></script>')
(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-27956240-1', 'auto');
ga('send', 'pageview');
ga('set', 'userId', cxuid);


document.write('<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-WLLF3V" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>')
(function(w, d, s, l, i) {
	w[l] = w[l] || [];
	w[l].push({
		'gtm.start': new Date().getTime(),
		event: 'gtm.js'
	});
	var f = d.getElementsByTagName(s)[0],
		j = d.createElement(s),
		dl = l != 'dataLayer' ? '&l=' + l : '';
	j.async = true;
	j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
	f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-WLLF3V');

! function(e, t, n, g, i) {
	e[i] = e[i] || function() {
		(e[i].q = e[i].q || []).push(arguments)
	}, n = t.createElement("script"), tag = t.getElementsByTagName("script")[0], n.async = 1, n.src = ('https:' ==
		document.location.protocol ? 'https://' : 'http://') + g, tag.parentNode.insertBefore(n, tag)
}(window, document, "script", "assets.growingio.com/2.1/gio.js", "gio");
gio('init', '872f3eaac31f373e', {
	'setImp': 'false'
});

//custom page code begin here
(function() {
	var cxname = getCookie("SA_USER_NICK_NAME");
	if (cxuid && cxname) {
		gio('setUserId', cxuid);
	}

	(function() { //当天文章统计
		var pubDateArr = location.pathname.match(/\d{4}-\d{2}-\d{2}/);
		if (pubDateArr) {
			var pubDate = pubDateArr[0];
			var nowDate = new Date().toISOString().slice(0, 10);
			if (pubDate == nowDate) {
				setTimeout(function() {
					gio('track', 'todayarticle', {
						todayarticleid: srcinfoid + '',
						viewtime: nowDate,
						viewuser: GetCookieValue("SA_USER_UID") || "0"
					});
				}, 2000);
			}
		}
	})();

})();
//custom page code end here

gio('send');

document.write('<noscript><iframe src="//api.growingio.com/nojs/872f3eaac31f373e/pv" height="0" width="0" style="hidden:true;visibility:true"></iframe></noscript>')
//艾瑞统计代码 add 20170427
(function(G, D, s, c, p) {
	c = { //监测配置
		UA: "UA-caixin-000001", //客户项目编号,由系统生成
		NO_FLS: 0,
		WITH_REF: 1,
		URL: 'http://file.caixin.com/webjs/common/iwt-min.js' //iwt.js的URL位置，请客户自行托管JS文件，只需修改此值
	};
	G._iwt ? G._iwt.track(c, p) : (G._iwtTQ = G._iwtTQ || []).push([c, p]), !G._iwtLoading && lo();

	function lo(t) {
		G._iwtLoading = 1;
		s = D.createElement("script");
		s.src = c.URL;
		t = D.getElementsByTagName("script");
		t = t[t.length - 1];
		t.parentNode.insertBefore(s, t);
	}
})(this, document);
