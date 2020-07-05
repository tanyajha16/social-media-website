// using the mailer

const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment')


// part which sends the email and how the communication takes place
let transporter=nodemailer.createTransport(env.smtp);

// how i will send the html email where the file is in the views
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
            if(err)
            {
                console.log('error in rendering template',err);
                return;
            }
            mailHTML=template;
        }    
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}