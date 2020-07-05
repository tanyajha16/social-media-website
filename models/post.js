const mongoose=require('mongoose');


const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include the array of ids of all comments in this post schema
   comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment',
        }
    ],
    // no need of referinng like schema because only the field
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;