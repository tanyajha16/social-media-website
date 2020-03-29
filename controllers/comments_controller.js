 const Comment=require('../models/comment');
const Post=require('../models/post');


 module.exports.create=function(req,res)
 {
     Post.findById(req.body.post,function(err,post)
     {
         if(post)
         {
          let comment= Comment.create({
                 content:req.body.content,
                 post:req.body.post,
                 user:req.user._id
             },
             function(err,comment)
             {
                // if(req.xhr)
                // {
                //     // we represent json with 200 success
                //     return res.status(200).json({
                //         data:{
                //             comment:comment
                //         },
                //         message:"comment created!"
                //     });
                // }
               
                 req.flash('success','comment created');
             
                //  handle error
                if(err)
                {
                   req.flash('error',err);
                   return res.redirect('back');
                }

                post.comments.push(comment);
            //   after updating something we need to save it
                post.save();

                res.redirect('/');
             });
         }
     });

 }


 module.exports.destroy=function(req,res)
 {
     Comment.findById(req.params.id,function(err,comment)
     {
         if(comment.user == req.user.id)
         {
        //  now find the post to delete the comment from the post
         let postId=comment.post;
         comment.remove();

        //  $ pull is a syntax pf mongodb
         Post.findByIdAndUpdate(postId,{ $pull :{comments:req.params.id}},function(err,post)
         {
             req.flash('success',"comment deleted");
             return res.redirect('back');
         })
    }else{
        req.flash('success','you ae not authorized to delete the comment');
        return res.redirect('back');
   }
     });
 }