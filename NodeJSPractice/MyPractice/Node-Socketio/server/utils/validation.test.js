var expect = require('expect');

var {isRealString} = require('./validation');

describe('checking for new string validation method isRealString', () => {
 it('should reject anything without string', () => {
     var res = isRealString(90);
     expect(res).toBe(false)
 })
 it('should reject string with only spaces', ()=> {
    var res = isRealString('       ')
    expect(res).toBe(false)
 })

 it('should accept strings having chars', ()=> {
     var res = isRealString('  Aatish   ')
     expect(res).toBe(true);
 })
})