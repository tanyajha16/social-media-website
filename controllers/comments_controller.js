 const Comment=require('../models/comment');
const Post=require('../models/post');


 module.exports.create=function(req,res)
 {
     Post.findById(req.body.post,function(err,post)
     {
         if(post)
         {
             Comment.create({
                 content:req.body.content,
                 post:req.body.post,
                 user:req.user._id
             },function(err,comment)
             {
                //  handle error
                if(err)
                {
                    console.log('error in handling ');
                }

                post.comments.push(comment);
            //   after updating something we need to save it
                post.save();

                res.redirect('/');
             });
         }
     });

 }