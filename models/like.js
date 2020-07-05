const mongoose= require('mongoose');


const LikeSchema=new mongoose.Schema({
    // likes belong to the user who is liking it
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    // this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    //  this field is used for defining the type of 
    // the liked object since this is a liked object
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});


const Like=mongoose.model('Like',LikeSchema);
module.exports=Like;