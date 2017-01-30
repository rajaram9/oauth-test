var express=require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var http = require('http');


var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})


app.get('/callback.html',function(req,res){
    res.sendFile(__dirname+'/callback.html');
})

app.post('/callback/code',function(req,res){
    console.log('body: ' +req.body.code);
    PostCode(req.body.code);
})


var port = process.env.PORT || 3000;
app.listen(port,function () {
    console.log('ready');
})




function PostCode(code) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'client_id' : 'd968fe59ccb6ad496279',
      'client_secret': 'd55dc454df32038c6ab8126603c3153f21564fe2',
      'code': code,
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'github.com',
      path: '/login/oauth/access_token',
      port:443,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}