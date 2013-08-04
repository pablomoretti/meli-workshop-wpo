(function(window){
	var document = window.document;

	document.getElementById('ads').innerHTML = "Soy la publicidad \r\n";

	var image = new Image();

	image.onload = function(){ 
 		document.getElementById('ads').innerHTML = document.getElementById('ads').innerHTML + "<br>\t\t<img src=\"http:\/\/wallpaper-fullhd.com\/wp-content\/uploads\/2013\/03\/at-the-beach-hd-wallpaper-1920x1200.jpg\" width=\"30\" height=\"30\">";
 	};

	image.src = 'http://wallpaper-fullhd.com/wp-content/uploads/2013/03/at-the-beach-hd-wallpaper-1920x1200.jpg';

})(parent.window);

