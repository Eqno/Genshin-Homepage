//music
var audio1 = document.getElementById("bgm1");
var audio2 = document.getElementById("bgm2");
audio1.onended = function() {
	audio2.play();
}
audio2.onended = function() {
	audio2.play();
}
var start = 0;
$(".music").click(function() {
	if (start == 0) {
		audio1.play();
		audio2.play();
		$(this).css("background-image", "url(element/download/bar/music.png)");
		start = 1;
	}
	else {
		if (audio1.muted || audio2.muted) {
			audio1.muted = false;
			audio2.muted = false;
			$(this).css("background-image", "url(element/download/bar/music.png)");
		}
		else {
			audio1.muted = true;
			audio2.muted = true;
			$(this).css("background-image", "url(element/download/bar/music2.png)");
		}
	}
});
//music

//scroll
$(window).scroll(function(event){
	if ($(window).scrollTop())
		$("#bar").css("background", "rgba(17,17,17,0.85)");
	else $("#bar").css("background", "rgba(17,17,17,0.75)");
	$("#bar").css("transform", "translateX(-"+$(window).scrollLeft()+"px)");
});
//scroll

//login
$(".log_in").click(function() {
	$(".login").addClass("login-active");
});
$(".close").click(function() {
	$(".login").removeClass("login-active");
});
//login