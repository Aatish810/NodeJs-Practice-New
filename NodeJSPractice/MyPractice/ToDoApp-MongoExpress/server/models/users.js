const mongoose =  require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minLength: 1,
            trim: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a email'
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
);

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return lodash.pick(userObject, ['_id', 'email']);
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
   // jwt.verify()
   try {
     decoded = jwt.verify(token, 'secretKey');
   } catch (e) {
      return Promise.reject()
   }

  return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'auth'
   })
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secretKey').toString();

    user.tokens.push({access, token});
   // user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then((token) => {
      return token
   })
}

UserSchema.pre('save', function(next) {
    var user = this;
     if(user.isModified('password')) {
         // var password =  user.password
         bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(user.password, salt, (err, hash) =>{
                user.password = hash;
                next();
             })
         })
     } else {
         next();
     }
})

var Users = mongoose.model('Users', UserSchema)

module.exports = {Users}