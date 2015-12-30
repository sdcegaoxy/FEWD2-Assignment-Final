(function($) {

    $.fn.gAccording = function( options ) {
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
        $("#gAccording").html(getAccordingHtml(settings));
		setDefaultCSS(settings);
		setMouseEvent();
   
		return this;
    }
}(jQuery));

function getAccordingHtml(settings){
	var html="";
	$.each( settings.datasource, function( i,obj ) {
   		html=html+"<li>"+obj.title+"</li>"+
			"<li>"+obj.about+"</li>";
	});
	html="<ul>"+html+"</ul>";
	return html;
}

function setDefaultCSS(settings){
	var size=caculateHegiht(settings);
	
	$("#gAccording").css("overflow","hidden");
	$("#gAccording,ul,li").css(
		{"margin":"0px",
		 "padding":"0px",
		 "list-style":"none"}); 

	$("#gAccording li:nth-child(odd)").css({
		"background-color":"#CCC",
		"padding-left":"5px",
		"padding-right":"5px",
		//"height":"2em",
		"font-size":"1em",
	    "line-height":"2em"
	}); 
	
	$("#gAccording li:nth-child(even)").css({
		"background-color":"#fff",
		"display":"none",
		"padding-left":"15px",
		"padding-right":"15px",
		"line-height":"1.6em",
		"font-size":"0.8em",
		"overflow":"auto"
	}); 
	
	$("#gAccording li:nth-child(2)").css({
		"display":"block"
	}); 
	
	var ilength=settings.datasource.length;
	var w_leng=$("#gAccording").height();
	var li_position=0;
	
	$("#gAccording li").css("position","realitive");

	$("#gAccording li:nth-child(2)").css("height",size.contentheight);
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


function caculateHegiht(settings){
	var objlen=settings.datasource.length;
	var boxheight=$("#gAccording").height();
	var titleheight=parseInt(settings.titleheight);
	var size={};
	
	var contentheight=boxheight-objlen*titleheight;
	if(contentheight<0){
		contentheight=3*titleheight;
		$("#gAccording ul").css("overflow","scroll");
	}
	
	console.log("obj len is "+objlen);
	console.log("box height is "+boxheight);
	console.log("title height is "+titleheight);
	console.log("content height is "+contentheight);
	 size.contentheight=contentheight+"px";
	
	return size;
	
}

function setMouseEvent(settings){
	$( "#gAccording" ).bind({
		  mouseover: function() {
			//high light css
		  },
		  mouseout: function() {
			 //normal css
		  },
		  click:function(event){
		  	//hide all list of content
			//show the correct list content
			$("#gAccording li:nth-child(even)").hide();  
			  
			var indexli=$("li").index(event.target)+2;
			console.log("the index of li which is clicked is "+indexli);
//			console.log(indexli+1);
			$("li:nth-child("+indexli+")").css({
				"display":"block",
				"height":"240px"
			});
		  }
	});
	
}