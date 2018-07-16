const utils = require('./utils');
const expect = require('expect');


// writing describe for some specific 
describe('Utils', () => {
// test cases for number

// unit testing of specific function
describe('#add function', ()=>{
    it('should add two number', () => {
        var res = utils.add(33, 11);
         expect(res).toBe(44).toBeA('number');
         // if (res!=44) {
         //     throw new Error(`expected answer to be 44 but got ${res}`)
         // }
     })
})

 it('should sqaure number', () => {
   var res = utils.square(2);
   expect(res).toBe(4).toBeA('number');
 })

 // testing a async function
it('should add two number with async call', (done) => {
    utils.asyncAdd(3, 4, (sum) => {
     expect(sum).toBe(7).toBeA('number')
     done();
    })
 })
 
 it('should square a number with async call', (done) => {
     utils.asyncSquare(4, (square) => {
     expect(square).toBe(16).toBeA('number');
     done();
     })
 })
 
})


// test cases for object
it('should match object', () => {
    expect({name: "Aatish"}).toEqual({name: "Aatish"});
})
it('should test individual key of object', () => {
     expect({name:'Aatish', age:25})
     .toInclude({age: 25})
     .toExclude({age: 23})
})

//testing array
it('should test array to include or exxlude property', ()=> {
    expect([1, 2, 3]).toInclude(1).toExclude(4)
})

//testing a functiona and array
it('should take user object and fullName and assign first and last name', () => {
   var user = {
    firstName: '',
    lastName: '',
    age: 25
   }
   expect(user).toBeA('object')
            .toInclude({firstName: ''})
            .toInclude({lastName: ''})
            .toInclude({age: 25})
    
    var name = utils.setName(user, 'Aatish Sharma');
     expect(name).toInclude({
        firstName: 'Aatish',
        lastName: 'Sharma'
     })
})


