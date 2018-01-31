Bliss.Theme = function() {
};

//Create a function for each one of your javascript/jQuery operations to maintain order!

Bliss.Theme.HandleScroll = function() {
	$(".arrow-down").click(function() {
	    $('html,body').animate({
	        scrollTop: $("#content-wrapper").offset().top - 50},
	        'slow');
	});
};


Bliss.Theme.HeaderScroll = function() {
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if(scroll >= 50){
			$("#header").addClass("header-scroll");
		}else{
			$("#header").removeClass("header-scroll");
		}
	});
};


// Create an instace of your function.
$(function($) {
	Bliss.Theme.HandleScroll();
	Bliss.Theme.HeaderScroll();
});
