//Passport.js is an authentication middleware for Node.js environment.

var JwtStrategy=require("passport-jwt").Strategy;
var ExtractJwt=require("passport-jwt").ExtractJwt;


var User =require("../models/user");
var config=require('../config/db');

module.exports=function(passport){
    var opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");//Pick JWT token from Header
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
}