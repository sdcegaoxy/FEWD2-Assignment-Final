(function($) {

    $.fn.gcarousels = function( options ) {
		var settings = $.extend({
		// These are the defaults.
                datasource:"",
				menumargin:"0",
				menutextalign:"center",
				topmenufloat:"left",
                submenufloat:"none",
		}, options );
        
        console.log(imageCarousels);
        $("#gcarousels").html(getCarouselsHtml(settings.datasource));
        
		return this;
    }
}(jQuery));



function getCarouselsHtml(data){
	var html="";
	$.each( data, function( i,obj ) {
   		html=html+"<li><img src=\""+obj.imageUrl+"\" /><span></span></li>";
	});
	html="<ul>"+html+"</ul>"
	return html;
}