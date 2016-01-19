(function($) {

    $.fn.gAccordion = function( options ) {
		var settings = $.extend({
		// These are the defaults.
                datasource:"",
				width:"90%",
			    height:"90%",
				titleheight:"2em",
				titlefontsize:"1em",
				txtlineheight:"1.6em",
				txtfontsize:"0.8em"
			
		}, options );
				
        console.log("data length="+settings.datasource.length);
		this.append(getAccordionHtml(this,settings));	
		setDefaultCSS(this,settings);
		setMouseEvent(this,settings);
		
		return this;
    }
	
	function getAccordionHtml(obj,settings){
	 console.log("data length="+settings.datasource.length);
	var html="";
	$.each( settings.datasource, function( i,obj ) {
   		html=html+"<li>"+obj.title+"</li>"+
			"<li>"+obj.about+"</li>";
	});
	html="<ul>"+html+"</ul>";
	return html;
}

function setDefaultCSS(obj,settings){
	var size=caculateHegiht(obj,settings);
	
	obj.css({overflow:"hidden",
			"margin":"0px",
			 "padding":"0px",
			 "list-style":"none"	
			});
	obj.children("ul").css({overflow:"hidden",
			"margin":"0px",
			 "padding":"0px",
			 "list-style":"none"	
			});

	obj.children("ul").children("li:nth-child(odd)").css({
		"background-color":"#CCC",
		"padding-left":"5px",
		"padding-right":"5px",
		//"height":"2em",
		"font-size":"1em",
	    "line-height":"2em"
	}); 
	
	obj.children("ul").children("li:nth-child(even)").css({
		"background-color":"#fff",
		"display":"none",
		"padding-left":"15px",
		"padding-right":"15px",
		"line-height":"1.6em",
		"font-size":"0.8em",
		"overflow":"auto"
	}); 
	
	obj.children("ul").children("li:nth-child(2)").css({
		"display":"block"
	}); 
	
	var ilength=settings.datasource.length;
	var w_leng=obj.height();
	var li_position=0;
	
	obj.children("ul").children("li").css("position","realitive");

	obj.children("ul").children("li:nth-child(2)").css("height",size.contentheight);
 	
}


function caculateHegiht(obj,settings){
	var objlen=settings.datasource.length;
	var boxheight=obj.height();
	var titleheight=parseInt(settings.titleheight);
	var size={};
	
	var contentheight=boxheight-objlen*titleheight;
	if(contentheight<0){
		contentheight=3*titleheight;
		obj.children("").css("overflow","scroll");
	}
//	console.log("obj len is "+objlen);
//	console.log("box height is "+boxheight);
//	console.log("title height is "+titleheight);
//	console.log("content height is "+contentheight);
	 size.contentheight=contentheight+"px";
	
	return size;
	
}

function setMouseEvent(obj,settings){
	obj.bind({
		  mouseover: function() {
			//high light css
		  },
		  mouseout: function() {
			 //normal css
		  },
		  click:function(event){
			//var indexli=$("li").index(event.target)+2;
			  var indexli=obj.children("ul").children("li").index(event.target)+2;
var height=caculateHegiht(obj,settings);
			  
			console.log("the index of li which is clicked is "+indexli);
			if(indexli%2==0){  
				obj.children("ul").children("li:nth-child(even)").hide();  	
				obj.children("ul").children("li:nth-child("+indexli+")").css({
					"display":"block",
					"height":height.contentheight
				});}
		  }
	});
	
}
	
}(jQuery));

