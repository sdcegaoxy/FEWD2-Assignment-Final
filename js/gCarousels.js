(function($) {

    $.fn.gcarousels = function( options ) {
		var settings = $.extend({
		// These are the defaults.
		datasource: " ",
		menumargin:"5",
		menupadding:"0",
		menuborder:"1",
		menutextalign:"center",
		topmenufloat:"left",
        submenufloat:"none",
		padview:{
					initwidth:400},				  
		mobileview:{
					initwidth:400
				}
		}, options );
 
		
 
		
		
		return this;
    }
}(jQuery));

