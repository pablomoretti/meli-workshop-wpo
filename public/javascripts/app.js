

var locaJqueryWindow = $(window);

(function imageLazy(jqueryWindow){

	function lazyImages(){
		var obj;
		$("img.lazy").each(function changeSouce(){
			obj=$(this);
	  		obj.attr("src",obj.attr("data-src-original"));
	  	});
	}

	jqueryWindow.load(lazyImages);

})(locaJqueryWindow);


(function imageOnDemand(jqueryWindow){

	var isOnTop = jqueryWindow.scrollTop() != 0;

	function onScroll(){
		var obj;
		$("img.scroll").each(function changeSouce(){
			obj=$(this);
  			obj.attr("src",obj.attr("data-src-original"));
 		 });
	}

	if(isOnTop){
		onScroll();
	}else{
		jqueryWindow.one('scroll', onScroll);
	}

})(locaJqueryWindow);
