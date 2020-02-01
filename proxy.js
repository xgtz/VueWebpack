const http = require('http');
const request = require('request');
const queryString = require('querystring');

const hostname='127.0.0.1';
const port ='4001';

// 创建一个api代理服务器
const apiServer = http.createServer((req,res) => {
    const url ='http://localhost:4000'+req.url;
    console.log('url:'+url);
    let options = { url:url };
    function callback(error,response,body){
        if(!error && response.statusCode === 200){
            // 设置编码类型，否则中文会显示为乱码
            res.setHeader('Content-Type','text/plain;charset=UTF-8');
            // 设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin','*');
            // 返回代理后的内容
            res.end(body);
        }
    }
    console.log(req.method);
    if(req.method.toLowerCase()=="post" ){
        var str='';
        req.on('data',function(chunk){
            str += chunk;
        });
        req.on('end',()=>{
            var newObj =null;
            console.log(str);
            try{
                if(/\{/ig.test(str)){
                    newObj = JSON.parse(str);
                } else{
                    newObj = queryString.parse(str);
                }
                
                console.log( JSON.stringify(newObj));
             }catch(e){
                 console.log('error'+e);
             }
            options.form = JSON.parse(JSON.stringify(newObj));
            // request.post(options,callback);

            request({
                url:options.url,
                method:'POST',
                json:false,
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                //headers:{"Content-Type":"application/json"},
                form: JSON.parse(JSON.stringify(newObj)),
                callback
            })
        });
    } else {
        request.get(options,callback);
    }   
    //request.get(options,callback);
});

apiServer.listen(port,hostname,()=>{
    console.log(`接口代理运行在http://${hostname}:${port}/`)
});