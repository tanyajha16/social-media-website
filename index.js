const express= require('express');

// to require the cookie parser
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const db=require('./config/mongoose');
// requiring express session to use libraries
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo')(session);
// requiring sass file
 const sassMiddleware=require('node-sass-middleware');
// requiring flash
const flash =require('connect-flash');
const customMware=require('./config/middleware');

 app.use(sassMiddleware({
     src:'./assets/scss',
     dest:'./assets/css',
     debug:true,
     outputStyle:'extended',
     prefix:'/css'
}));
app.use(express.urlencoded());
// importing cookie parser
app.use(cookieParser());
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

//require the static files
app.use(express.static('./assets')); 

// using multer make the upoads path available to the browser
// the image avatar requires a path so using it here
app.use('/uploads',express.static(__dirname + '/uploads'));

//  require the layouts


// using styles and scripts from the subpages into the layouts
app.set('layout extractStyles',true );
app.set('layout extractScripts',true);




//to set view engine

app.set('view engine','ejs');
app.set('views','./views');

// momgo store is used to store the session cookie in the db
app.use(session({
    name:'codial tanya',
// todo
// encrypted key which is not shared by anyone
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{ 
    maxAge:(1000 * 60 * 100)
},
store:new MongoStore({
    
        mongooseConnection:db,
        // do i want to remove this automatically
        autoRemove:'disabled'
    },
    function(err){
        console.log(err ||'connect-mongodb setup ok');
    } 
)
}));

 //  using passport 
app.use(passport.initialize());
app.use(passport.session());

// after checking the authenticationn we weill see if the user is able to view the page and here we will see the user is authenticated or not
app.use(passport.setAuthenticatedUser);

// using flash after session cookie tahts why after passport session
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log('error in running the server:'+port);

    }
    else{
        console.log('server is running on the port: '+port);
    }
});
