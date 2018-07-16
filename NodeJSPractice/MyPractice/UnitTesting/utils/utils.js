module.exports.add = (a, b) => a + b;

module.exports.square = (num) => num*num;


module.exports.setName = (user, fullName) => {
 var name = fullName.split(' ');
  user.firstName = name[0];
  user.lastName = name[1];
  return user;
}

module.exports.asyncAdd = (a, b, callback) => {
     setTimeout(()=>{
         callback(a + b);
     }, 1000)
}

module.exports.asyncSquare = (a, callback) => {
    setTimeout(()=> {
        callback(a*a);
    }, 1000)
}