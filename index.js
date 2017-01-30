var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var http = require('http');
var request = require('request');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})


app.get('/callback.html', function (req, res) {
    res.sendFile(__dirname + '/callback.html');
})

app.post('/callback/code', function (req, res) {
    console.log('body: ' + req.body.code);
    PostCode(req.body.code);
})


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('ready');
})



function PostCode(code) {
    var formData = {
        'client_id': 'd968fe59ccb6ad496279',
        'client_secret': 'd55dc454df32038c6ab8126603c3153f21564fe2',
        'code': code,
    };
    request.post({ url: 'https://github.com/login/oauth/access_token', formData: formData }, function (err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}