
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

//1//
//app.use(express.compress());

//enviroment
//var isDev = ('development' == app.get('env'));
var isDev = !(process.env.PORT || false)

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

function enviromentHost(url){
    if(isDev){
    //if(false){
      return url;
    }else{
      //return url.replace('dev-','');
      return url.replace('dev-','').replace(':3000','');
    }
}

//4//
var staticHost = 'http://dev-meli-workshop-wpo.herokuapp.com' + ((isDev)?':3000':'');
//var staticHost = 'http://dev-wpo-static.zapto.org' + ((isDev)?':3000':'');


app.locals.createStaticLink = function(paht) {
  return (enviromentHost(staticHost) + paht);
}

//5//
var imagesHost = [
  ('http://' + 'dev-meli-workshop-wpo.herokuapp.com' + ((isDev)?':3000':'')),
  ('http://' + 'dev-meli-workshop-wpo.herokuapp.com' + ((isDev)?':3000':''))
  ];
/*
var imagesHost = [
	  ('http://' + 'dev-meli-wpo1.zapto.org' + ((isDev)?':3000':'')),
	  ('http://' + 'dev-meli-wpo2.zapto.org' + ((isDev)?':3000':''))
	  ];
*/

app.locals.createImageLink = function(paht) {
  var pos = Math.abs(paht.hashCode()) % imagesHost.length;
  return (enviromentHost(imagesHost[pos]) + paht);
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

//2//
/*
app.all(/((^\/javascripts\/.*)|(^\/stylesheets\/.*)|(^\/images\/.*))$/, function(req, res, next){
	res.set('Cache-Control', 'max-age=3000000');
    next();
});
*/

/*
app.all('*', function(req, res, next){
	res.set('Access-Control-Allow-Origin', '*');
    next();
});
*/

app.get('/', routes.index);

app.get('/page', routes.page);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
