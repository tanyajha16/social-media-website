// creating the posts controller

// requiring post schema
const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create = function(req,res)
{
    console.log(req.user);
    console.log(req.cookies);
    Post.create({
        
    content:req.body.content,
    user:req.user.id
    },function(err,post)
    {
        if(err)
        {
            console.log("error in creating");
            return;
        }
        return res.redirect('back');

    });
    
}

// to delete the post
module.exports.destroy=function(req,res)
{
    Post.findById(req.params.id,function(err,post)
    {
        // .id converts the object to the string
        if(post.user==req.user.id)
        {
          post.remove();
          Comment.deleteMany({post:req.params.id},function(err)
          {
              return res.redirect('back');
          });
        }else{
            return res.redirect('back');
        }
    });
}