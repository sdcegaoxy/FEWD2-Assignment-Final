(function($) {

    $.fn.gmenu = function( options ) {
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
		
		//console.log(this.selector);
var menuSelector=this.selector;
var acontent=document.URL.split("/");
var currentpage=acontent[acontent.length-1];

console.log("gmenu selector is "+ menuSelector);
console.log("settings.padview.initwidth:"+settings.padview.initwidth);
console.log("settings.mobileview.initwidth:"+settings.mobileview.initwidth);
console.log("document.URL:"+currentpage);
		
		var swidth=$(window).width();
		var htmlMenu=getMenu(settings.datasource);
		var htmlMobile=getSelect(settings.datasource,0,currentpage);
		htmlMobile="<select  >"+htmlMobile+"</select>";
		
		if(swidth>=settings.mobileview.initwidth){
			this.html(htmlMenu);
			initlizeMenu(menuSelector,settings);
			initMenuMouseEvent(menuSelector);			
			
		}else{
			this.html(htmlMobile);
			initlizeSelect(menuSelector);
			initlizeSelectEvent(menuSelector);
		}
		
	$(window).resize(function(){
		var width=$(window).width();
		//console.log("window.resize.width:"+width);
		if(width>=settings.mobileview.initwidth){
			$(this).html(htmlMenu);
			initlizeMenu(menuSelector,settings);
			initMenuMouseEvent(this);	
		}else{
			$(this).html(htmlMobile);
			initlizeSelect(menuSelector);
			initlizeSelectEvent(menuSelector);
		}
		location.reload();
	 });	
		
		return this;
    }
	
	
	function getSelect(data,currentlevel,currentpage){
	var html="";
	
	$.each( data, function( i,obj ) {
		var datalength=data.length;
		var prevsign="";
		
		switch(currentlevel) {
    case 1:
        prevsign="&nbsp;&nbsp;|-";
        break;
    case 2:
        prevsign="&nbsp;&nbsp;&nbsp;&nbsp;|-";
        break;
    case 3:
        prevsign="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-";
        break;
	case 4:
        prevsign="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-";
        break;
}
		
		var isselect="";
		
		console.log(currentpage);
		console.log(obj.url);
		if(currentpage==obj.url||("s"+currentpage)==obj.url){
			isselect="selected";
			
			console.log("-------------------");
		}else{
			isselect="";
		}
		
   		html=html+"<option  value='"+obj.url+"' "+isselect+"   >"+prevsign+obj.title+"</option>\n";
		if(obj.submenu!=null){	
			html=html+getSelect(obj.submenu,currentlevel+1);
		}
		
		if(i==datalength-1){
			currentlevel=currentlevel-1;
		}
				
	});
	return html;
}

function initlizeSelect(obj){
	$(obj+" select").css("width","100%");
}


function initlizeSelectEvent(){
	$(obj+">select").change(function(){
		window.location=$(obj+">select").val();
	});
}

function getMenu(data){
	var html="";
	$.each( data, function( i,obj ) {
   		html=html+"<li><a href='"+obj.url+"'>"+obj.title;
		if(obj.submenu!=null){
			html=html+getMenu(obj.submenu);
		}
		html=html+"</a></li>";
 		
	});
	html="<ul>"+html+"</ul>"
	return html;
}

function initlizeMenu(obj,settings){
	
		var width=$(obj).width();
		var menucol=$(obj+">ul>li").length;
		
		 //alert(width);
		console.log("width="+width);
		console.log("menucol="+menucol);
	
		var unitewidth=Math.floor(
			width/menucol
				-settings.menumargin*2
				-settings.menuborder*2
				-settings.menupadding*2
				-10
		);
	
        console.log("unitewidth="+unitewidth);
        
		//$("#gmenu>ul li").css("width",unitewidth);
		$(obj+">ul>li").css("width",unitewidth);
        $(obj+">ul li").css("width",unitewidth);
    
		//$("#gmenu>ul>li").css("min-width","auto");
        $(obj+">ul li").css("margin",settings.menumargin+"px");
    
		$(obj+">ul li").css("margin",settings.menumargin+"px");
		$(obj+">ul li").css("padding",settings.menupadding+"px");
    
		$(obj+">ul>li").css("float",settings.topmenufloat);
		$(obj+">ul>li li").css("margin","-"+settings.menuborder+"px");
    
		$(obj+">ul li").css("text-align",settings.menutextalign);
	    $(obj+">ul>li li").css("float",settings.submenufloat);
	   
        $(obj+">ul>li ul").css("overflow","visible");
	
		$(obj+">ul ul").hide();
	
}

function initMenuMouseEvent(obj){
	
	$(obj+">ul li").mouseover(function(event){
		event.stopPropagation();
		
		var liwidth=$(this).width()+1;
		var liheight=$(this).height();
		var ifloat=$(this).css("float");
		var zindex=$(this).css("z-index");
		var linum=$(this).children("ul").children("li").length;
		
		
		if(ifloat=="none"){							            	           		$(this).children("ul").css({
								"position":"absolute",												                    "left":liwidth,
								"top":liheight*Math.round(linum/2),
								"z-index":zindex+1
								});
		
						}
		else{
			$(this).children("ul").css({
								"position":"absolute",				
								"z-index":zindex+1
								});
		}
		
		
		$(this).nextAll().find("ul").hide();
		$(this).prevAll().find("ul").hide();
		
		gmenushow($(this).children("ul"));
		
	});
	
	
	
	 $(obj+" li").hover(
		 function(){//in class
 			$(this).addClass("gmenuhighlight");
			$(this).children().css({"color":"black"});
	 	},function(){//out class
			$(this).removeClass("gmenuhighlight");
			$(this).children().css({"color":"darkgray"});
	 });
 
	
		$(obj).click(function(event){
			event.stopPropagation() 
			//return false;
		});
		$(obj+" a").hover(function(){
			return false;
		});
		$("html").click(function(){	
			gmenuhide($(obj+">ul ul"));
		});
}



function gmenuhide(obj){
	obj.slideUp(100);
}

function gmenushow(obj){	
	if(obj.css("display")!="block"){
		obj.slideDown(100);
	}
	
}
	
}(jQuery));



