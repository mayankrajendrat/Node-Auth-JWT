var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');//encrypted value using Bcrypt.


var UserSchema =new Schema({
    username: {
        type: String,
        unique : true,
        required: true
    },
    password : {
        type: String,
        required: true 
    }
});


//password--> 10xacademy
//Generating Encrypt password
UserSchema.pre("save" , function(next){
    var user=this;
    if(this.isModified('password') || this.isNew){
//salt--> 3434gfdfsdfs34234234
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err);
            }
            //hash= 3434gfdfsdfs34234234 +10xacademy --> kdsbkjfbshd233242323432
            bcrypt.hash(user.password, salt, null, function(err, hash){
                if(err){
                    return next(err);
                }
                user.password=hash;
                
                next()
            });
        });
    }
    else {
       return next();
    }
});

UserSchema.statics.comparePassword =function(passw, comparerPassword, callback){
    bcrypt.compare(passw, comparerPassword, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    }); 
}

module.exports = mongoose.model('User', UserSchema);