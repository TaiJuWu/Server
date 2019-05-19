var fs = require('fs');

exports.readDir = function(path,callback){
  fs.readdir(path,function(err,data){
    if(err){
      console.log(err);
      return;
      // throw err;
    }
    callback(data);
  })
}

function searchSlash(path){

  var slashPosition = [];

  for(var i = 0 ; i < path.length ; i++){

    if( path[i] == '/' || path[i] == '\\'){
      slashPosition.push(i);
    }
    
  }
  return slashPosition;
}

lastSlash = function(path){
  var a = searchSlash(path);
  return a[a.length - 1];
}

function baseDir(path){
  var lastSlashPosition = lastSlash(path);
  var str = '';
  for(var i = 0 ;i <= lastSlashPosition ;i++){
    str += path[i];
  }
  return str;
}

exports.url_encode = function url_encode(url){
  url = encodeURIComponent(url);
  url = url.replace(/\%3A/g, ":");
  url = url.replace(/\%2F/g, "/");
  url = url.replace(/\%3F/g, "?");
  url = url.replace(/\%3D/g, "=");
  url = url.replace(/\%26/g, "&");
  
  return url;
}

exports.searchSlash = searchSlash;
exports.lastSlash = lastSlash;
exports.basDir = baseDir;