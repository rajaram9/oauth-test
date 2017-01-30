var express=require('express');


var app=express();


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})


app.get('/callback',function(req,res){
    res.sendFile(__dirname+'/callback.html');
})

var port = process.env.PORT || 3000;
app.listen(port,function () {
    console.log('ready');
})