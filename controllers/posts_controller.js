// creating the posts controller

// requiring post schema
const Post=require('../models/post');
const Comment=require('../models/comment');
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
            // we represent json with 200 success
            return res.status(200).json({
                data:{
                    post:post
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
            return res.redirect('back');
        }

    }catch (err)
    {
        req.flash('error','You are not authorized to delete it');
  return res.redirect('back');
    }
}