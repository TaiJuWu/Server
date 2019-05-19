var http = 'http://localhost:3000/?name=name/'

var reg = new RegExp("[^s]");
console.log(reg)
var test ='s';  //傳回false
console.log(reg.test('dddsd')); //猜測會傳回false，但傳回true