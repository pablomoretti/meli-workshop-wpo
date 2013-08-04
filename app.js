
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//1


//enviroment
global.isDev = (!process.env.DYNO != null);


String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

//4
app.locals.createStaticLink = function(paht) {
  //console.log(this.req.get('User-Agent').indexOf('Chrome') != -1);
  return ('http://dev-meli-workshop-wpo.herokuapp.com' + ':3000' + paht);
  //return ('http://dev-meli-wpo-static.zapto.org' + ':3000' + paht);
}

//5
app.locals.createImageLink = function(paht) {
  //var domains = ['dev-meli-wpo1.zapto.org','dev-meli-wpo2.zapto.org'];
  var domains = ['dev-meli-workshop-wpo.herokuapp.com','dev-meli-workshop-wpo.herokuapp.com'];
  var pos = Math.abs(paht.hashCode()) % domains.length;
  return ('http://' + domains[pos] + ':3000' + paht);
}


app.locals.convertWebP = function(url) {
  if(this.req.get('User-Agent').indexOf('Chrome') != -1){
    return url.replace('.jpg','.webp').replace('.png','.webp')
  }else{
    return url;
  }
}


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//1
app.all(/((^\/javascripts\/.*)|(^\/stylesheets\/.*)|(^\/images\/.*))$/, function(req, res, next){
	res.set('Cache-Control', 'max-age=3000000');
    next();
});

app.all('*', function(req, res, next){
	res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', routes.index);

app.get('/page', routes.page);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
