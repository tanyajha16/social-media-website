const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');
const User=require('../models/user');
const env=require('./environment');


// using client id
// tell passport to use the new strategy for google login
passport.use(new googleStrategy({
    // clientID:"300436104118-kcrqa8epf11il9aitb31jqhl7hvrb0sd.apps.googleusercontent.com",
    // clientSecret:"677Ftetxd6kskF-f4SlKZyhb",
    // callbackURL:"http://localhost:8000/users/auth/google/callback",

    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url
},
// callback function
function (accessToken,refreshToken,profile,done)
{
    // find the user
    // authenticating the user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user)
    {
        if(err)
        {
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);
        if(user)
        {
            // if found,set this user as req.user
            return done(null,user);

        }
        else{
            // if not found the create the user and set it as req.user
            User.create({
            name:profile.displayName,
             email:profile.emails[0].value,
            //  crypto is used for creating the object passport 
             passport:crypto.randomBytes(20).toString('hex')
            },function(err,user)
            {
                if(err){
                console.log('error in creating user in google strategy passport',err);
                 return;
                }
                return  done(null,user);
            });
        }
    });
}


));

module.exports=passport;