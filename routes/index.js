
/*
 * GET home page.
 */

exports.index = function(req, res){

	var model = {
		'title' : 'Site Speed',
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

exports.lazy = function(req, res){

	var model = {
		'title' : 'Site Speed',
		'req'	: req
	};

  	res.render('lazy', model);
};