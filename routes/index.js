
/*
 * GET home page.
 */

exports.index = function(req, res){

	var model = {
		'title' : 'HOME',
		'req'	: req
	};

  	res.render('index', model);
};


exports.page = function(req, res){

	var model = {
		'title' : 'PAGE',
		'req'	: req
	};

  	res.render('page', model);
};