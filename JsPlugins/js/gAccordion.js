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
				
        this.append(getAccordionHtml(settings));	
		setDefaultCSS(this,settings);
		setMouseEvent(this);
   
		
		return this;
    }
}(jQuery));

function getAccordionHtml(settings){
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
//	for (var i=0;i<ilength;i++){
//		
//		var li_count=2*i+1;
//		li_position=w_leng-(ilength-i)*parseInt(settings.titleheight)*16;
//		if(li_count==1)li_position=0;
//		console.log("li count is "+li_count+"  li_position="+li_position);
// 		
//		
//		$("#gAccording li:nth-child("+li_count+")").css("bottom",li_position);
//	}	
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

function setMouseEvent(obj){
	obj.bind({
		  mouseover: function() {
			//high light css
		  },
		  mouseout: function() {
			 //normal css
		  },
		  click:function(event){
			var indexli=$("li").index(event.target)+2;
			console.log("the index of li which is clicked is "+indexli);
			if(indexli%2==0){  
				obj.children("ul").children("li:nth-child(even)").hide();  	
				$("li:nth-child("+indexli+")").css({
					"display":"block",
					"height":"240px"
				});}
		  }
	});
	
}