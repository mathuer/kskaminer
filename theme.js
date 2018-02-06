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


Bliss.Theme.HandleHeaderScroll = function() {
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if(scroll >= 1){
			$("#header").addClass("header-scroll");
			 $("#slideshow-wrapper").addClass("scroll");
		}else{
			$("#header").removeClass("header-scroll");
			$("#slideshow-wrapper").removeClass("scroll");
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

Bliss.Theme.HandleColumnTransform = function(){
	if( !$("#content-wrapper .page").length ){
		return;
	}
	
	$(".column-transform").each(function(){
		var column = $(this);
		var class_list = $(this).attr("class").split(" ");

		column_class = class_list[class_list.length-1];
		
		var split = column_class.split("-");
		var col_size = split[split.length-1];
		
					
		column.removeClass( column_class );
		column.addClass( "col-md-" + col_size);


	});
}

Bliss.Theme.HandleLinkBox = function(){
	if( $("#content-wrapper .page-editor").length > 0 ){
		return;
	}
	
	var link_boxes = $(".link-box");
	
	if( !link_boxes.length ){
		return;
	}
	
	link_boxes.each(function(){
		var item = $(this);
		
		var link =item.find("a");
		link.contents().unwrap();
		if( item.hasClass("blank") ){
			item.wrap("<a href='" + link.attr("href") + "' target='_blank'>");			
		}else{
			item.wrap("<a href='" + link.attr("href") + "'>");						
		}
	})
}


// Create an instace of your function.
$(function($) {
	Bliss.Theme.HandleScroll();
	Bliss.Theme.HandleHeaderScroll();
	Bliss.Theme.HandleContactForm();
	Bliss.Theme.HandleColumnTransform();
	Bliss.Theme.HandleLinkBox();
});
