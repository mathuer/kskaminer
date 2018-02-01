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

Bliss.Theme.HandleContactForm = function() {
	$(function() {                  
	  $(".contact-button").click(function() {  
	    $(".contact-form").addClass("show-contact-form"); 
	    $(".contact-button").addClass("contact-button-hide");     
	  });
	  $(".close-form").click(function() {  
	    $(".contact-form").removeClass("show-contact-form");
	    $(".contact-button").removeClass("contact-button-hide");   
	  });
	});
	
	$(document).on("submit", ".contact-form form", function(e){
		e.preventDefault();
		$.fancybox.showLoading();
		var form_wrapper = $(this).parent();
		var form = $(this);
		var data = form.serialize();

		$.ajax( {
			type:"POST",
			data: data,
		} )
		.done(function(data){
			try {
			    result = JSON.parse(data);
			} catch(e) {
				console.log(data);
				return;
			}

			if( result["status"] == 0 ){
				$(".errors", form_wrapper).empty();
				$(".errors", form_wrapper).append( result["error_markup"] );
			}else if( result["status"] == 1 ){
				$(".errors", form_wrapper).empty();
				$(".errors", form_wrapper).append( result["error_markup"] );
				form.slideUp();
				setTimeout(function(){
					$(".contact-form").removeClass("show-contact-form");    
				}, 1500)
			}
			$.fancybox.hideLoading();
		});	

	});
};



// Create an instace of your function.
$(function($) {
	Bliss.Theme.HandleScroll();
	Bliss.Theme.HeaderScroll();
	Bliss.Theme.HandleContactForm();
});
