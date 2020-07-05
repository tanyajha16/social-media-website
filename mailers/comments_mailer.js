const nodeMailer = require('../config/nodemailer');


// this is another way of exporting the function
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');



    nodeMailer.transporter.sendMail({
        from:"tanya16@gmail.com",
        to:comment.user.email,
        subject:"new comment published",
        html:htmlString
    },(err,info) =>
    {
     if(err)
     {
         console.log('error in sending email',err);
         return;
        }
        console.log("message sent",info);
         return;
    
    });
}
