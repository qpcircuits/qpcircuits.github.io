var background = {};

background.colorToRGB = function (color) {
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/g;
	var sColor = color.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return sColorChange.join(",");
	} else {
		return color;
	}
}

background.setBackgroundAndOpacity = function (obj, color, opacity) {
	var rgbaObj = background.colorToRGB(color);
	if (jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) {
		jQuery(obj).children().each(function () {
			if (jQuery(this).css("position") == "static") {
				jQuery(this).css("position", "relative");
			}
		});
		jQuery(obj).css({
			"background": color,
			"opacity": opacity
		});
	} else {
		jQuery(obj).css({
			"background": "rgba(" + background.colorToRGB(color) + "," + opacity + ")"
		});
	}
}

background.hasScrollbar = function () {
	return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

background.getScrollbarWidth = function () {
	var odiv = document.createElement('div'),//����һ��div
	    styles = {
	    	width: '100px',
	    	height: '100px',
	    	overflowY: 'scroll'//�����й�����
	    }, i, scrollbarWidth;
	for (i in styles) odiv.style[i] = styles[i];
	document.body.appendChild(odiv);//��div���ӵ�body��
	scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//���
	odiv.remove();//�Ƴ�������div
	return scrollbarWidth;//���ع���������
};

background.setOnResize = function () {
	if ($(window).width() > 1200) {
		var total = $(window).width();

		$(".main").css({
			left: total * 0.5 - 600
		});

		//$(".topLeft").css({
		//	width: total * 0.5 - 600
		//});

		//$(".topRight").css({
		//	left: total * 0.5 + 600,
		//	width: total * 0.5 - 600
		//});

		//if (background.hasScrollbar()) {
		//	total = total - background.getScrollbarWidth();
		//}

		//$(".topCenter").css({
		//	width: total - $(".topLeft").width() - $(".topRight").width() - $("#m-menu").width()
		//});
	}
	else {
		$(".main").css({
			left: 0
		});

		//$(".topLeft").css({
		//	width: 0
		//});

		//$(".topRight").css({
		//	width: 0
		//});

		//$(".topCenter").css({
		//	width: 1200 - $("#m-menu").width()
		//});
	}

	$(".hid").css({
		width: $(".top").width(),
		left: 600 - $(".top").width() / 2
	});
}