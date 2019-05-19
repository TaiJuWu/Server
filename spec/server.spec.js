var foo = require('../test')
//my
describe('A spy,when configured to fake a series of return valuw0' ,
function(){
  beforeEach(function(){
    spyOn(foo ,'getRequest')
  });
  it('tracks that the spy was called',function(){
    foo.getRequest('http://baidu.com');
    expect(foo.getRequest).toHaveBeenCalled();
  })
})

//writer
// describe("A spy, when configured to fake a series of return values", function() {
//     beforeEach(function() {
//         spyOn(foo,"getRequest")
//     });

//     it("tracks that the spy was called", function() {
//         foo.getRequest("http://baidu.com");
//         expect(foo.getRequest).toHaveBeenCalled();
//     });

// });