var express=require('express');


var app=express();


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})


app.get('/callback',function(req,res){
    res.sendFile(__dirname+'/callback.html');
})


app.listen('3000',function () {
    console.log('ready');
})