var http=require('http')
var querystring = require('querystring')
var fs=require('fs')
http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var str="";
    var data=[]
    req.on("data",function(data){
        console.log(data)
        str+=data;
    })
    req.on("end",function(err){ 
        var json=querystring.parse(str) 
        var data = fs.readFileSync('a.txt','utf-8')
        data = JSON.parse(data)
        data.push({user:json.user,pass:json.pass})
        fs.writeFileSync('a.txt',JSON.stringify(data));
        res.write(JSON.stringify(data))
        res.end();
    })
}).listen(8888,function(){
    console.log("成功")
})