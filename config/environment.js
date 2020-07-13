const fs = require('fs');
const rfs = require('rotating-file-stream');
const path= require('path');
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync (logDirectory) || fs.mkdirSync (logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory,
    
});

const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'jhatanya16aug@gmail.com',
            pass:'dhan&Dv1p'
        }
    },
   google_client_id:"300436104118-kcrqa8epf11il9aitb31jqhl7hvrb0sd.apps.googleusercontent.com",
    google_client_secret:"677Ftetxd6kskF-f4SlKZyhb",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream : accessLogStream}
    }
}
const production={
    name:"production" ,
    asset_path:process.env.CODEIAL_ASSET_PATH,
    // session_cookie_key:'tQCuUTAoyvx8YlxqCGXnScuotSQUfsgr',
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USER,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
   google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALLABACK_URL,
    // jwt_secret:'HEWjug7Q3IQtYJd13nNJxMhzb6C32H8r'
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream : accessLogStream}
    }
}


//  module.exports=development;
 module.exports=eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
