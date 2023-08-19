const passport = require('passport');
const passportJWT=require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')

require('dotenv').config()

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.jwtSecret,
    issuer : 'Jwt Authenticator',
    audience : 'http://127.0.0.1:8000/'
}

passport.use(
    new passportJWT(opts, async(jwt_payload,done) => {
        console.log("Inside Jwt verification");
        try {
            console.log("Paylod ID:", jwt_payload);
            let user = await User.findOne({
                _id: jwt_payload._id
            })
            console.log("USer Mila Ki nahi?::", user);
            if(user){
                console.log("User Found!", user);
                return done(null, user);
            }else{
                console.log("User Not Found!");
                return done(null, false);
            }
        } catch (error) {
            console.log("Error Locating User!",error);
            return done(err, false)
        }
    })
);

module.exports = passport;