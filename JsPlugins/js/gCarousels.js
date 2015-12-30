(function($) {

    $.fn.gcarousels = function( options ) {
		var settings = $.extend({
		// These are the defaults.
                datasource:"",
				width:"90%",
			    height:"90%",
				menumargin:"0",
				menutextalign:"center",
				topmenufloat:"left",
                submenufloat:"none",
			    descheight:"2em",
		}, options );
		
        
		var pwidth=$("#gcarousels").width();
		var pheight=$("#gcarousels").height();
		var img_width=pwidth*parseFloat(settings.width)/100;
		var img_height=pheight*parseFloat(settings.height)/100;
		
		
//		console.log(imageCarousels);
//		console.log("#gcarousels width="+img_width);
//		console.log("#gcarousels height="+img_height);
//		
        $("#gcarousels").html(getCarouselsHtml(settings,img_width,img_height));
		
		var topmargin=img_height-parseFloat(settings.descheight)*16;
		console.log("img_height="+img_height);
		console.log("settings.deschegiht="+settings.descheight);
		console.log("topmargin="+topmargin);
		
		$("#gcarousels").css("overflow","hidden");
		$("#gcarousels,ul,li,img").css("margin","0px"); 
		$("#gcarousels,ul,li,img").css("padding","0px"); 
		$("#gcarousels li").css("list-style","none");
		$("#gcarousels li").css("float","left");
		$("#gcarousels ul").css("width","1000px");
		$("#gcarousels li").css("width",img_width);
		$("#gcarousels li").css("height",img_height);
		
		$("#gcarousels span").css("text-align","center");
		$("#gcarousels span").css("width",img_width);
		$("#gcarousels span").css("height",settings.descheight);
        $("#gcarousels span").css("margin-top",topmargin);
		 $("#gcarousels span").css("padding-top",parseFloat(settings.descheight)/4+"em");
		$("#gcarousels span>a:nth-child(1)").css("float","left");
		$("#gcarousels span>a:nth-child(2)").css("float","right");
		
		
		
		$("#gcarousels span").css("background-color","gray");
		$("#gcarousels span").css("opacity","0.6");
		$("#gcarousels span").css("filter","alpha(opacity=60)");/* For IE8 and earlier */
		
		
		running(img_width);
		initlizeMouseEvent();
   
		return this;
    }
}(jQuery));



function getCarouselsHtml(data,img_width,img_height){
	var html="";
	$.each( data.datasource, function( i,obj ) {
   		html=html+"<li style=\"background-image:url("+obj.imageUrl+")\"><a target=\"_blank\" href=\""+obj.targeturl+"\">"+
//				  "<img src=\""+obj.imageUrl+"\" width=\""+
//					img_width+"\" height=\""+img_height+"\"/>"+
				  "</a><span style=\"display:none\">"+
				  "<a href=\"#\">&lt;&lt;Prev</a>"+
					obj.desc+
					"<a href=\"#\">Next&gt;&gt;</a></span></li>";
	});
	html="<ul>"+html+"</ul>"
	html=html+"<div id=\"gcarousels_nav\"><div>"
	return html;
}

function running(width){
	var $ul=$("#gcarousels>ul");
	setInterval(function(){  
                    $ul.animate({  
                            'margin-left':'-'+ width+'px'  
                        },  
                        'slow',  
                        function(){  
                            $ul.css({'margin-left':0}).  
                                children('li').  
                                last().  
                                after(  
                                    $ul.children('li').first()  
                                );  
                        });  
                    },20000
     );  
}

function caculateHegiht(settings){
	var objlen=settings.datasource.length;
	var boxheight=settings.height;
	var lineheight
}

function initlizeMouseEvent(){
	//on mouse over ul show desc
	//on mouse over ul show nav button
	//response mouse click nav event

	
	$( "#gcarousels" ).bind({
		  mouseover: function() {
			$("#gcarousels span").show();
			$("#gcarousels span").css("display","block");
			  
		  },
		  mouseout: function() {
			$("#gcarousels span").hide();
	}});
	
	
	$( "#gcarousels span>a:nth-child(1)" ).bind({
		  click: function() {
			 
			  $("#gcarousels>ul").css({'margin-left':0}).  
                                children('li').  
                                first().  
                                before(                              														$("#gcarousels>ul").children('li').last()  
                                ); 
			  
		  }});
	
		$( "#gcarousels span>a:nth-child(2)" ).bind({
		  click: function() {
			$("#gcarousels>ul").css({'margin-left':0}).  
                                children('li').  
                                last().  
                                after(                              														$("#gcarousels>ul").children('li').first()  
                                );  
		  }});
}