(function($) {

    $.fn.gTab = function( options ) {
		var settings = $.extend({
		// These are the defaults.
                datasource:"",
				width:"90%",
			    height:"90%",
				titleheight:"2em",
				titlefontsize:"1em",
				txtlineheight:"1.6em",
				txtfontsize:"0.8em",
				activeclassname:"active"
			
		}, options );
        $(this).append(getgTabHtml(settings));
		setgTabDefaultCSS(this,settings);
		setgTabMouseEvent(this,settings);
   
		return this;
    }
	
	function getgTabHtml(settings){
 
	
	var html="";
	var html2="";
	
	$.each( settings.datasource, function( i,obj ) {
   		html=html+"<li>"+obj.title+"</li>";
		html2=html2+"<li title=\""+obj.title+"\">"+obj.about+"</li>";
	});
	
	
	html="<ul>"+html+"</ul>";
	html2="<ul>"+html2+"</ul>";
	
	return html+"<div style=\"clear:both\"></div>"+html2;
}

function setgTabDefaultCSS(obj,settings){
	var size=caculateHegiht(settings);
	
	obj.css({overflow:"hidden",
			"margin":"0px",
//			 "padding":"0px",
			 "list-style":"none"	
			});
	
	obj.children("ul").css({overflow:"hidden",
			"margin":"0px",
//			 "padding":"0px",
			 "list-style":"none",
			//"background-color":"red"
			});
	
	obj.children("ul").children("li").css({overflow:"hidden",
			"margin":"0px",
//			 "padding":"0px",
			 "list-style":"none"	
			});

		obj.children("ul").css({
		"width":"100%"
	});
	
	
		obj.children("ul:nth-child(1)").children("li").css({
		"float":"left",
//		"padding":"2px",
		"width":Math.floor(parseInt(settings.width)/size.tabcount)+"%"
	});
	
	obj.children("ul:nth-child(1)").children("li:nth-child(1)").toggleClass(settings.activeclassname);
	
		obj.children("ul:nth-child(3)").children("li").css({
		"display":"none",
		"float":"left",
//		"padding":"10px"
	});
	
	obj.children("ul:nth-child(3)").children("li:nth-child(1)").css({
		"display":"block"
	});
	
}


function caculateHegiht(settings){
	var objlen=settings.datasource.length;
	
	var size={};
	// size.contentheight=contentheight+"px";
	 size.tabcount=objlen;
	return size;
	
}

function setgTabMouseEvent(obj,settings){
	obj.children("ul:nth-child(1)").children("li" ).bind({
		  mouseover: function() {
			//high light css
		  },
		  mouseout: function() {
			 //normal css
		  },
		  click:function(){
			  obj.children("ul:nth-child(1)").children("li" ).removeClass(settings.activeclassname);
			  $(this).toggleClass(settings.activeclassname);
			 
			  obj.children("ul:nth-child(3)").children("li").css({
				"display":"none",
				"float":"left",
//				"padding":"10px"
			  });
 
			  
			  var tabid=$(this).html();
			  //alert(tabid);
			  obj.children("ul:nth-child(3)").children("li[title=\""+tabid+"\"]").css({
			  	"display":"block"
			  });
			 
		  }
	});
	
}
	
}(jQuery));

