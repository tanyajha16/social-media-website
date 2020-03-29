// requiring the Schema
const User=require('../models/user');
const fs=require('fs');
const path=require('path');



module.exports.profile=function(req,res)
{
    // if(req.user){
    // User.findById(req.user,function(err,user)
    // {
    //     if(user)
    //     {
            User.findById(req.params.id,function(err,user)
            {

           
            return res.render('user_profile',{
                title:"User Profile",
                profile_user:user
               
            });
        });

        }
        // return res.redirect('/users/sign-in');
    // })

//     }else{
//         return res.redirect('/users/sign-in');
//     }
    
// }


// for update things in profile
module.exports.update= async function(req,res)
 {
//     if(req.user.id == req.params.id)
//     {
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
//         {
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('unauthorized');
//     }
if(req.user.id == req.params.id)
{
try{
let user=await User.findById(req.params.id);
User.uploadedAvatar(req,res,function(err)
{
if(err)
{
    console.log('****Multer ERROR:',err);

}
user.name=req.body.name;
user.email=req.body.email;

// console.log(req.file);

if(req.file)
{

    // if the user already has an avatar then delete it and update iy
    if(user.avatar)
    {
        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
    }
    // this is saving the path of the uploaded file into the avatar field
    user.avatar = User.avatarPath + "/" + req.file.filename;
}
user.save();
return res.redirect('back');
});

}catch(err)
{
    req.flash('error',err);
    return res.redirect('back');

}
}
else{
    req.flash('error','Unauthorized!');
    return res.status(401).send('unauthorized');
}
}

// adding actions for sign up
module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
      return res.redirect('/users/profile');
    }
return res.render('user_sign_up',{
    title:"codial Sign up"
})
}

// adding actions for sign in
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"codial sign in"

    })
}

// get the sign up data
module.exports.create=function(req,res)
{
    // to check whether the password and confirm password are same
    if(req.body.password!= req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log('error in finding user in signing up');
    return;
}
if(!user)
{
    User.create(req.body,function(err,user)
    {
        if(err)
        {
            console.log(  'error in creating user while signing up');
        return;
        }
        return res.redirect('/users/sign-in');
    })
}
else{
    return res.redirect('back');
}
     });
}

// to get the sign in data
module.exports.createSession=function(req,res)
{
    // if the user exists then check the password in the database and seee it in cookie
//    steps to authenticate

    // find the user
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('error in finding user to sign in');
            return;
        }
        if(user)
        {
            // handle password which dont match
            if(user.password!=req.body.password){
            return res.redirect('back');

        }
// handle session creation
res.cookie('user_id',user.id);
return res.redirect('/users/profile');
    }
    
        else{
            // handle user not found
            return res.redirect('back');
        }
    });

    // handle user found



    
}

// sign in and create a session sign out
module.exports.createSession=function(req,res)
{
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    req.logout();
    req.flash('success','logged out successfully');
    return res. redirect('/');
}