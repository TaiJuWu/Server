var elem = document.getElementsByTagName("body")[0];
var event = new Event('test');
elem.addEventListener('test', function (e) { 
    console.log("test事件被触发了！");
}, false);
elem.dispatchEvent(event); //test事件被触发了！


function customEvents(){
  return {

      callbacks: {}, //空对象用来存储事件队列

      addEvent: function(msg,callback){
          this.callbacks[msg] = this.callbacks[msg] || [];
          this.callbacks[msg].push(callback); // 存入事件
      },
      fireEvent: function(msg){
          this.callbacks[msg] = this.callbacks[msg] || [];
          for(var i = 0,len = this.callbacks[msg].length; i < len; i++){
              this.callbacks[msg][i].apply(this,arguments); // 触发
          };
      },
      removeEvent: function(msg){
          this.callbacks[msg] = null; //删除该事件
      }

  };
}


var a = new customEvents();
function bigbang(){
    console.log("bigbang!!");
}

a.addEvent("fire",bigbang); // 绑定fire事件，执行bigbang
a.fireEvent("fire"); //bigbang！！
a.removeEvent("fire"); //解除该事件绑定
a.fireEvent("fire"); //