var express = require('express');
var fs = require('fs');
var url = require('url');
var methods = require("./myMethods/myMethods.js");
var path = require('path');
var formidable = require('formidable');
var util = require('util');



var app = express();
//the root of dir
var root = "C:\\Users\\User\\Desktop\\learn\\note";
// var root = __dirname + '/upload';
var mediaRoot = "D:/media"; 
var reg = new RegExp("(/[^?]){1,}");
var log = __dirname + '/log/log.txt';
var downloadReg = new RegExp("/download(/?.){0,}");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/upload'));
app.use('/',express.static(root));
app.use('/media',express.static(mediaRoot));



app.get('/',function(req,res){

  var logData = req.ip +"  request  /\r\n";
  console.log(logData);

  fs.appendFile(log ,logData,function(err){
    if(err)
      fs.appendFile(log,'記錄此筆資料失敗\r\n');
  })

  methods.readDir(root + req.url,function(dir){ //封裝method
  res.render('myServer.ejs',{'dir' : dir});
  });
})

app.get('/favicon.ico',function(req,res){
  res.end();
})

app.get('/testMedia',function(req,res){
  res.sendFile(__dirname + '/views/test.ejs');
})


app.get('/upload',function(req,res){
  var logData = req.ip +"  request upload  /\r\n";
  console.log(logData);
  fs.appendFile(log ,logData,function(err){
    if(err)
      fs.appendFile(log,'記錄此筆資料失敗\r\n');
  })
  res.sendFile(__dirname + '/views/upload.html')
})

app.post('/upload',function(req,res){

  var form = new formidable.IncomingForm();

  form.uploadDir = __dirname + '/upload';
  form.keepExtensions = true;
  form.maxFileSize = 5 *1024 * 1024 * 1024;
  form.maxFields = 1000;
  form.hash = false;
  form.multiples = true;
    form.parse(req, function(err, fields, files) {
      if(err){
        console.log(err);
        res.end("error");
        return;
      }
      // console.log(files);
    
      if(!(files.file1 instanceof Array)){
        var logData = req.ip + '  upload  ' + files.file1.name +'\r\n';
        console.log(req.ip + '  upload  ' + files.file1.name);
        
        fs.appendFile(log ,logData,function(err){
          if(err)
            fs.appendFile(log,'記錄此筆資料失敗\r\n');
        })

        fs.rename(files.file1.path,methods.basDir(files.file1.path) + Date.now() +files.file1.name ,function(err){
          if(err){
            console.log('rename fail');
          }
        })
      }
      else{
        for(var i = 0; i < files.file1.length; i++){
          var logData = req.ip + '  upload  ' + files.file1[i].name +'\r\n';
          console.log(req.ip + '  upload  ' + files.file1[i].name);
          
          fs.appendFile(log ,logData,function(err){
            if(err)
              fs.appendFile(log,'記錄此筆資料失敗\r\n');
          })
  
          fs.rename(files.file1[i].path, methods.basDir(files.file1[i].path) + Date.now()+ files.file1[i].name ,function(err){
            if(err){
              console.log('rename fail');
            }
          })
        }
      }

      res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end('upload finish');
    });
})
//this function is not test
app.get(downloadReg ,function(req,res){
  var reqURL = url.parse(req.url);
  var pathname = reqURL.pathname.slice(9);
  var logData = req.ip + '  download  ' + pathname +'\r\n';
  console.log(req.ip + '  download  ' + pathname);
  
  fs.appendFile(log ,logData,function(err){
    if(err)
      fs.appendFile(log,'記錄此筆資料失敗\r\n');
  })
  res.download(root + pathname);
})



app.get(reg,function(req,res){ //查詢根目錄這裡也會被search,與我理解的不同
  
  var pathname = url.parse(req.url).pathname;

  if( pathname.substr(-1) != '/'){
    res.writeHead(302 , {"Location" : pathname +'/'});
    res.end('page redirect');
    return;
  }
  // res.render('myServer.ejs',{'dir' : dir});
  fs.stat(root + req.url.toString(),function(err,stat){

    if(err){
      console.log(req.ip + " request  " + req.url );
      var logData = req.ip + " request  " + req.url+' 但此頁面不存在 ' +'\r\n' ;
      fs.appendFile(log ,logData,function(err){
        if(err)
          fs.appendFile(log,'記錄此筆資料失敗\r\n');
      })
      res.end('the page is not exist');
      return;
    }
    
    if(stat.isDirectory()){ //send Direectory
      console.log(req.ip + " request  " + req.url );
      var logData = req.ip + " request  " + req.url +'\r\n' ;
      fs.appendFile(log ,logData,function(err){
        if(err)
          fs.appendFile(log,'記錄此筆資料失敗\r\n');
      })
      methods.readDir(root + req.url,function(dir){
        // console.log(dir);
        res.render('myServer.ejs',{'dir' : dir});
      });
    }
  });

})

// process.on('uncaughtException', function (err) {
//   console.log(err);
//   fs.appendFile(log ,err,function(err){
//     if(err)
//       throw err;
//   })
  // try {
  //     var killTimer = setTimeout(function () {
  //         process.exit(1);
  //     }, 30000);
  //     killTimer.unref();
  //     server.close();
  // } catch (e) {
  //     console.log('error when exit', e.stack);
  // }
// });


app.listen(3000);
console.log("sever create at port 3000");