function sleep(time){
	return new Promise((resolve) => setTimeout(resolve, time));
}

//resize
var pos_ci = 0, pos_vi = 0;
$(window).resize(function() {
	var width = $("body").width();
	$(".roles").css("width", width);
	$(".slide").css("left", -pos_ci*width+"px");

});
$(".roles").css("width", $("body").width());
//resize

//c-i-slide
$(".c-i .slide-button-left").click(function() {
	slide_ci(-1);
});
$(".c-i .slide-button-right").click(function() {
	slide_ci(+1);
});
var slide_ci = function(delta) {
	pos_ci += delta;
	var width = $("body").width();
	var count = $(".roles").length;
	if (pos_ci > count - 1) {
		pos_ci = 0;
	}
	if (pos_ci < 0) {
		pos_ci = count - 1;
	}
	$(".c-i .slide").css("left", -pos_ci*width + "px");
};
//c-i-slide

//v-i-slide
$(".v-i .slide-button-left").click(function() {
	slide_vi(-1);
});
$(".v-i .slide-button-right").click(function() {
	slide_vi(+1);
});
var slide_vi = function(delta) {
	pos_vi += delta;
	var old_width = parseInt($(".v-i .pics").css("width").slice(0, -2));
	var width = old_width + 16;
	var count = $(".v-i .pics").length;
	if (pos_vi > count - 3) {
		pos_vi = 0;
	}
	if (pos_vi < 0) {
		pos_vi = count - 3;
	}
	$(".v-i .slide").css("left", -pos_vi*width + "px");
};
//v-i-slide

//g-f-slide
var all = $(".g-f .frame .pics");
var len = all.length;
function slide_move(target) {
	target = (target+len) % len;
	var right_index = (target + 1) % len;
	var left_index = (target-1+len) % len;
	var right = all.filter(":eq("+right_index+")");
	var front = all.filter(":eq("+target+")");
	var left = all.filter(":eq("+left_index+")");
	all.each(function() {
		var self = $(this);
		if (self.is(left)) {
			self.attr("class", "pics pic-left");
		}
		else if (self.is(front)) {
			self.attr("class", "pics pic-front");
		}
		else if (self.is(right)) {
			self.attr("class", "pics pic-right");
		}
		else {
			self.attr("class", "pics pic-back");
		}
	});
	change_point(1);
	index = target;
	change_point(2);
}
$(".g-f .slide-button-left").click(function() {
	slide_move(index-1);
});
$(".g-f .slide-button-right").click(function() {
	slide_move(index+1);
});
//g-f-slide

//page-point
$(".g-f .page-point").click(async function() {
	change_point(1);
	var delta = $(this).index() - index;
	if (Math.abs(delta) >= len/2) {
		delta = (delta>0?-1:1)*len + delta;
	}
	var step = Math.abs(delta)/delta;
	if (delta == 0) return;
	while (delta != 0) {
		slide_move(index + step);
		await sleep(300);
		delta -= step;
	}
	change_point(2);
});
//page-point