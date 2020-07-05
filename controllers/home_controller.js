// require the post schema
const Post=require('../models/post');

const User=require('../models/user');
 const Like=require('../models/like');
// using async await here
module.exports.home=async function(req,res)
{
  try{
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      },
      populate:{
        path:'likes'
      }
    }).populate('likes');

    
    let users=await User.find({});
    return res.render('home',{
      title:"Codeial | home",
      posts:posts,
      all_users:users
    });
    }
    catch(err){
      console.log('error',err);
      return;
  }
}



// .exec(function(err,posts)
// using then
// Post.find({}).populate('comments').then(function());


// using promise
// let posts=Post.find({}).populate('comments').exec();
// posts.then()
