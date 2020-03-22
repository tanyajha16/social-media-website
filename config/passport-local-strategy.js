
// requiring passport

const passport=require('passport');
 

// to require local strategy
const LocalStrategy=require('passport-local').Strategy;

// requiring schema and user
const User=require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done)
{
// to find the user and establish the identity
User.findOne({email:email},function(err,user)
{
    if(err)
    {
        console.log("error in finding user -->Passport");
        return done(err);
    }
    if(!user || user.password !=password)
    {
        console.log("invalid username/password");
        return done(null,false);
    } 
    return done(null,user);
});
}
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done)
{
done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('error in finding the user');

        }
        return done(null,user);

    });
});

// check if the user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    // if the user is signed in then pass on the request
    if(req.isAuthenticated())
    {
        return next();
    }
    // if the user  is not signed in
    return res.redirect('/users/sign-in');
}
// now if the user is signed in then set the authentication
// to set the users for the views
passport.setAuthenticatedUser=function(req,res,next)
{
    // if the user is signed in then pass the request to the next function
    if(req.isAuthenticated())
    {
        // req.user contsins signed in user from the session cookie
        // and we are just sending this to the locals
        res.locals.user=req.user;
    }
    next(); 
}

module.exports=passport;