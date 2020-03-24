// require the post schema
const Post=require('../models/post');

const User=require('../models/user');

module.exports.home=function(req,res)
{
  // console.log(req.cookies);

  // changing the value of cookie
  // res.cookie('user_id',89);
  
//   Post.find({},function(err,posts)
//   {
//     return res.render('home',{
//       title:"Codial | Home",
//       posts:posts
//     });

// });

// populate the user of each posts

Post.find({})
.populate('user')
.populate({
  path:'comments',
  populate:{
    path:'user'
  }
})
.exec(function(err,posts)
{

  User.find({},function(err,users)
  {
    return res.render('home',{
      title:"Codeial | home",
      posts:posts,
      all_users:users
    });
  });
})

}