// creating the posts controller

// requiring post schema
const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');

module.exports.create = async function(req,res)
{
     console.log(req.user);
     console.log(req.cookies);
 try{
    let post = await Post.create({

        content:req.body.content,
        user:req.user.id
        
        });

        if(req.xhr)
        {
              // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
              post = await post.populate('user', 'name').execPopulate();

            // we represent json with 200 success
            return res.status(200).json({
                data:{
                    post:post,
                    
                },
                message:"post created!"
            });
        }
       
        req.flash('success','post published');
             return res.redirect('back');
        
    
 }catch(err)
 {
     req.flash('error',err);
     return res.redirect('back');
     
 }
}
   

// to delete the post using normal method
// module.exports.destroy=function(req,res)
// {
//     Post.findById(req.params.id,function(err,post)
//     {
//         // .id converts the object to the string
//         if(post.user==req.user.id)
//         {
//           post.remove();
//           Comment.deleteMany({post:req.params.id},function(err)
//           {
//               return res.redirect('back');
//           });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

// using async and await
module.exports.destroy= async function(req,res)
{
    try{
        let post= await Post.findById(req.params.id);
        
        if(post.user==req.user.id)
        {
            //  change::delete the associated likes for the post and all its comments
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});


          post.remove();
          await Comment.deleteMany({post:req.params.id});
         
         if(req.xhr)
         {
             return res.status(200).json({
                 data:{
                     post_id:req.params.id
                 },
                 message:"post deleted successfully"
             })
         }

          req.flash('success','post-deleted alongwith all its comments');
              return res.redirect('back');
         
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch (err)
    {
        req.flash('error','You are not authorized to delete it');
  return res.redirect('back');
    }
}