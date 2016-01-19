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
		
        
		var pwidth=$(this).width();
		var pheight=$(this).height();
		var img_width=pwidth*parseFloat(settings.width)/100;
		var img_height=pheight*parseFloat(settings.height)/100;
		
		
        $(this).html(getCarouselsHtml(settings,img_width,img_height));
		
		var topmargin=img_height-parseFloat(settings.descheight)*16;
		console.log("img_height="+img_height);
		console.log("settings.deschegiht="+settings.descheight);
		console.log("topmargin="+topmargin);
 
		setDefaultCSS(this,settings,img_width,img_height,topmargin);
		initlizeMouseEvent(this);
		running(this,img_width);
		
   
		return this;
    }
	
	function setDefaultCSS(obj,settings,img_width,img_height,topmargin){

	
	obj.css("overflow","hidden");
	obj.children("ul").css({
		margin:"0px",
		padding:"0px",
		"width":"1000px"
	});
	
	obj.children("ul").children("li").css({
		margin:"0px",
		padding:"0px",
		"list-style":"none",
		"float":"left",
		"width":img_width,
		"height":img_height
	});
 	
	obj.children("ul").children("li").children("span").css({
		"text-align":"center",
		"width":img_width,
		"height":settings.descheight,
		"margin-top":topmargin,
		"padding-top":parseFloat(settings.descheight)/4+"em",
		"background-color":"gray",
		"opacity":"0.6",
		"filter":"alpha(opacity=60)"
	});
	
	obj.children("ul").children("li").children("span").children("a:nth-child(1)").css("float","left");
	obj.children("ul").children("li").children("span").children("a:nth-child(3)").css("float","right");
}

function getCarouselsHtml(data,img_width,img_height){
	var html="";
	$.each( data.datasource, function( i,obj ) {
   		html=html+"<li style=\"background-image:url("+obj.imageUrl+")\">"+
//				  "<img src=\""+obj.imageUrl+"\" width=\""+
//					img_width+"\" height=\""+img_height+"\"/>"+
				  "<span style=\"display:none\">"+
				  "<a href=\"#\">&lt;&lt;Prev</a>"+
				  "<a target=\"_blank\" href=\""+obj.targeturl+"\">"+obj.desc+"</a>"+
					"<a href=\"#\">Next&gt;&gt;</a></span></li>";
	});
	html="<ul>"+html+"</ul>";
	
	return html;
}

function running(obj,width){
	var $ul=obj.children("ul");
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

function initlizeMouseEvent(obj){
	//on mouse over ul show desc
	//on mouse over ul show nav button
	//response mouse click nav event
	obj.bind({
		  mouseover: function() {
			  obj.children("ul").children("li").children("span").css("display","block");
		  },
		  mouseout: function() {
			obj.children("ul").children("li").children("span").hide();
	}});
	
	
	obj.children("ul").children("li").children("span").children("a:nth-child(1)").bind({
		  click: function() {
			 
			  obj.children("ul").css({'margin-left':0}).  
                                children('li').  
                                first().  
                                before(                              														obj.children("ul").children('li').last()  
                                ); 
			  
		  }});
	
		obj.children("ul").children("li").children("span").children("a:nth-child(3)").bind({
		  click: function() {
			obj.children("ul").css({'margin-left':0}).  
                                children('li').  
                                last().  
                                after(                              														obj.children("ul").children('li').first()  
                                );  
		  }});
}
	
}(jQuery));

