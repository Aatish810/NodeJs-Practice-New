const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var data = {
    id: 10
}
var token = jwt.sign(data, 'secretKey123');
console.log(token);

var decoded =  jwt.verify(token, 'secretKey123');
console.log('decoded', decoded);


var password = "Hello-world@123";
bcrypt.genSalt(10, (err, salt)=>{
     bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
     })
});

var hashedPassword = '$2a$10$VxFfgHwU47iPz8hBo4Z7Yu/nmqJH64jupyA84huc/SCVg2eZzdk3W';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})