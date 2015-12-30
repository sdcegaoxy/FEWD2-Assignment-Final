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
				txtfontsize:"0.8em"
			
		}, options );
        $("#gTab").html(getHtml(settings));
		setDefaultCSS(settings);
		setMouseEvent();
   
		return this;
    }
}(jQuery));

function getHtml(settings){
/**	
<ul>
	<li>aaaa</li>
	<li>bbbb</li>
</ul>
<ul>
	<li title="aaaa"></li>
	<li title="bbbb"></li>
</ul>
//*/
	
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

function setDefaultCSS(settings){
	var size=caculateHegiht(settings);
	
	$("#gTab").css("overflow","hidden");
	$("#gTab,ul,li").css(
		{"margin":"0px",
		 "padding":"0px",
		 "list-style":"none"}); 

	$("#gTab>ul").css({
		"width":"100%"
	});
	
	$("#gTab>ul:nth-child(1)>li").css({
		"float":"left",
		"padding":"2px",
		"width":Math.floor(parseInt(settings.width)/size.tabcount)+"%"
	});
	
		$("#gTab>ul:nth-child(3)>li").css({
		"display":"none",
		"float":"left",
		"padding":"10px"
	});
	
	$("#gTab>ul:nth-child(3)>li:nth-child(1)").css({
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

function setMouseEvent(settings){
	$( "#gTab>ul:nth-child(1)>li" ).bind({
		  mouseover: function() {
			//high light css
		  },
		  mouseout: function() {
			 //normal css
		  },
		  click:function(){
			 
			  $("#gTab>ul:nth-child(3)>li").css({
				"display":"none",
				"float":"left",
				"padding":"10px"
			  });
 
			  
			  var tabid=$(this).html();
			  $("#gTab>ul:nth-child(3)>li[title=\""+tabid+"\"]").css({
			  	"display":"block"
			  });
			 
		  }
	});
	
}