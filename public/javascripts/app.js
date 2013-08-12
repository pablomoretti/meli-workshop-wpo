/**
 * Cached window object
 * @type {object}
 */
var locaJqueryWindow = $(window);

/**
 * Lazy Load
 */
(function imageLazy(jqueryWindow){

	var isLoadead = (document.readyState === "complete");

	function init(){
		var obj;
		$("img.lazy").each(function changeSouce(){
			obj=$(this);
	  		obj.attr("src",obj.attr("data-src-original"));
	  		obj.fadeIn();
	  	});
	}

	if (isLoadead) {
		init();
	}else{
		jqueryWindow.load(init);
	}
	

})(locaJqueryWindow);


/**
 * Images on demand
 */
(function imageOnDemand(jqueryWindow){

	var isOnTop = jqueryWindow.scrollTop() != 0;

	function init(){
		var obj;
		$("img.scroll").each(function changeSouce(){
			obj=$(this);
  			obj.attr("src",obj.attr("data-src-original"));
  			obj.fadeIn();
 		 });
	}

	if(isOnTop){
		init();
	}else{
		jqueryWindow.one('scroll', init);
	}

})(locaJqueryWindow);


(function prettyTiming(jqueryWindow){

	var isLoadead = (document.readyState === "complete");

	function init(){
		setTimeout(function(){
			var t = performance.timing;
			var perfMap = {
				ttfb: t.responseStart - t.connectEnd,
				domLoaded: t.domContentLoadedEventEnd - t.responseStart,
				onLoad: t.loadEventStart - t.responseEnd,
				total:  t.loadEventEnd - t.navigationStart
			}
			$("#timerTtfb").text((perfMap.ttfb/1000)+" s");
			$("#timerDomLoaded").text((perfMap.domLoaded/1000)+" s");
			$("#timerOnloaded").text((perfMap.onLoad/1000)+" s");
			$("#timerTotal").text((perfMap.total/1000)+" s");

		},0);
	}

	if (isLoadead) {
		init();
	}else{
		jqueryWindow.load(init);
	}
	

})(locaJqueryWindow);





(function preload(jqueryWindow){

	var isLoadead = (document.readyState === "complete");


	function preloadResouces(arr) {
	    var i = arr.length,
	        d = document,
	        b = d.body,
	        isIE = 'fileSize' in document,
	        o;
	    while (i--) {
	        if (isIE) {
	            new Image().src = arr[i];
	            continue;
	        }
			o = d.createElement('object');
	    	o.data = arr[i];
	    	o.width = o.height = 0;
	    	o.style.position = "absolute";
	    	b.appendChild(o);
	    }
	}

	function init(){
		//preloadResouces([prefech]);
	}

	if (isLoadead) {
		init();
	}else{
		jqueryWindow.load(init);
	}
	
})(locaJqueryWindow);

/**
 * Page Scroll
 */
// (function(window, undefined, ch) {
// 	var animElement = ($.browser.msie || $.browser.mozilla) ? $('html') : $('body');

// 	var priv = {
// 		'$selectedItem': undefined,
// 		'hashes': {},
// 		'triggers': {},
// 		// adds and remove the class from the selected item and the deselected item
// 		'selectNavItem': function ($selected) {

// 				if(priv.$selectedItem){
// 					priv.$selectedItem.removeClass('dc-main-navigation-item-selected');
// 				}

// 				priv.$selectedItem = $selected.parent();
// 				priv.$selectedItem.addClass('dc-main-navigation-item-selected');

// 		},
// 		// initializes the navigation
// 		'animateScroll': function (jQObject) {

// 			jQObject.each(function(i, e){
// 				var e = $(e);

// 				var sectionReference = e.attr('href'),
// 					sectionName = sectionReference.split('#')[1],
// 					offset = parseInt($(sectionReference).offset().top),
// 					endOffset = parseInt(offset + $(sectionReference).outerHeight() - 1);

// 				// saves the offset in each button
// 				e.attr('data-section',sectionName).attr('data-offset', offset + 1);
// 				priv.hashes[sectionName] = [parseInt(offset), parseInt(endOffset)];
// 				if(!priv.triggers[sectionName]){
// 					priv.triggers[sectionName] = e.attr('id', sectionName + '-trigger');
// 				}
// 			});

// 			jQObject.on('click', function (event) {
// 				event.preventDefault();

// 				var $me = $(this),
// 					offset = $me.attr('data-offset'),
// 					sectionName = $me.attr('data-section');

// 				priv.animOn = true;

// 				animElement.animate({
// 					scrollTop: (offset - 10)
// 				}, 1000, function () {
// 					priv.animOn = false;
// 					window.location.hash = "!" + sectionName;

// 				});

// 				priv.selectNavItem(priv.triggers[sectionName]);

// 			});
// 		},

// 		'checkScrollPosition': function () {
// 			var HTMLOffset = ( animElement.scrollTop() + 100 ),
// 				viewportHeight = ch.viewport.height;
// 			// si offset es mayor que HTMLOffset y menor que

// 			if(!priv.animOn){
// 				for(var hash in priv.hashes){
// 					var	id = '#' + hash;
// 					var offset = priv.hashes[hash];

// 					if((HTMLOffset > offset[0]) && (HTMLOffset <= offset[1])) {
// 						priv.selectNavItem($(id + '-trigger'));
// 						window.location.hash = '!' + hash;
// 						break;
// 					}

// 				}
// 			}

// 		},
// 		'checkActiveSection': function() {
// 			var hash = window.location.hash;

// 			if( hash ){
// 				var	sectionName = hash.split('!')[1],
// 					$sectionSelected = $('#' + sectionName + '-trigger'),
// 					offset = $('#' + sectionName + '-trigger').attr('data-offset');

// 					if(sectionName){
// 						priv.animOn = true;
// 						animElement.animate({
// 							scrollTop: (offset - 49)
// 						}, 1000, function () {
// 							priv.animOn = false;
// 							priv.selectNavItem($sectionSelected);

// 						});
// 					}
// 			}
// 		},
// 		'animOn': false
// 	};

// 	var app = (function () {
// 		var core = {
// 			animateNav: function (jQObject) {

// 				priv.animateScroll(jQObject);
// 				window.setTimeout(priv.checkActiveSection, 75);
			
// 			},
// 			animOn: priv.animOn
// 		};
// 		window.onscroll = priv.checkScrollPosition;

// 		return core;
// 	})();

// 	window.devConf = app;

// })(this, undefined, ch);
