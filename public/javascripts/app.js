


var lazyImages = function(){
	var obj;
	$("img.lazy").each(function changeSouce(){
		obj=$(this);
  		obj.attr("src",obj.attr("data-src-original"));
  });
};

$(window).load(function () {
	//lazyImages();
});




